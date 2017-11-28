/*
* @Author: linyajing
* @Date:   2017-02-27 21:50:40
* @Last Modified by:   linyajing
* @Last Modified time: 2017-04-19 22:03:47
*/

'use strict';
//加载express模块
var express = require("express");
//加载模板处理模块
var swig = require('swig');
//数据库初始化
var mongoose = require("mongoose");
//加载body-parse，用于处理post提交过来的数据
var bodyParse = require('body-parser');
//加载cookie
var Cookies = require('cookies');

//创建app应用，=>nodeJS的http.createServer
var app =express();

var User = require('./models/User.js');

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__diename+public下的文件
//express.static()定义静态文件托管路径 ，第一个参数是虚拟路径
app.use("/public",express.static(__dirname+'/public'));
//配置应用模板
//定义当前应用使用的模板引擎，第一个参数表示模板引擎的名称，同时也是模板文件的后缀
//第二个参数用于解析模板内容的方法，swig对象下的renderFile方法
app.engine("html",swig.renderFile);
//设置模板文件存放的目录,一个参数固定为“views”，第二个参数为要解析的文件目录
app.set("views","./views");
//注册所使用的模板引擎，第一个参数必须为view engine,第二个参数为定义的模板引擎的名称一致
app.set("view engine","html");
//使用这个模板引擎需要一点，读取过一次以后会将文件缓存到内存中，如果下次没有变更文件名的话，就不会重新获取，需要不断的重启服务，刚才是为了提高性能设计的缓存机制，开发过程中是需要去取消缓存的
swig.setDefaults({cache:false});
//
/*
*首页，使用app.use("/",require())下面的就可以去掉了
 */
/*app.get("/",function(req,res,next){

	//res.send("<h1>welcome to my blog</h1>");最简单的不同模板引擎的
	
	//读取views目录下的指定文件，解析并返回给客户端
	//第一个参数：表示模板文件
	//第二个参数:可选参数，表示给传递给模板使用的参数
	res.render('index');
});*/

//bodyParse设置,进行这个设置后会在post提交req身上添加
//一个body属性，其中保存前端提交的数据
app.use(bodyParse.urlencoded({extended:true}));
//设置cookie
app.use((req,res,next) => {
	req.cookies = new Cookies(req,res);
	//解析登录的cookies信息
	req.userInfo = {};
	if(req.cookies.get('userInfo')) {
		try{
			req.userInfo = JSON.parse(req.cookies.get('userInfo'));
			User.findById(req.userInfo._id).then((userInfo) =>{
				req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
			})
		} catch(e) {

		}
	}
	next();
	});
/**
 * 根据不同的功能划分模块
 */
app.use("/admin",require("./routers/admin"));
//在api程序没有设置之前，先注释，否则会报错
app.use("/api",require("./routers/api"));
app.use("/",require("./routers/main"));
//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27018/blog',function(err) {
	if(err) {
		console.log('数据库连接失败');
	}else {
		console.log('数据库连接成功');
		//监听http请求
		app.listen(8081);
	}
});
