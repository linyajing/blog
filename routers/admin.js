/*
* @Author: linyajing
* @Date:   2017-02-28 22:43:11
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-23 00:28:45
*/

'use strict';
//这个文件主要处理管理员数据admin
var express = require("express")
var router = express.Router();
//引入用户模型类
var User = require('../models/User.js');
//引入分类模型类
var Category = require('../models/Category.js');
//引入文章模型类
var Artical = require("../models/Artical.js");


//这里只要写相对路由就可以的，不需要admin/user

var responseData;
router.use(function(req,res,next) {
  responseData = {
    code:200,
    message:''
  };
  next();
});

/*获取用户列表*/
router.post("/users",function(req,res,next){
	var currentPage = Number(req.body.currentPage);
	var limit = Number(req.body.limit);
  var pages = 0;
	//User.count获取表格数据个数
  User.count().then((count) => {
  	//计算总页数
  	pages = Math.ceil(count / limit);
  	//取值不能超过pages
  	currentPage = Math.min(currentPage, pages );
  	//取值不能小于1
  	currentPage = Math.max(currentPage, 1 );
  	//跳过多少条数据
  	var skip = (currentPage - 1) * limit;

  	User.find().limit(limit).skip(skip).then(function(users) {
  	    var responseData={};
  	    if(users){
  	    	responseData.code = 200,
  	    	responseData.meta = {
  	    		"currentPage":currentPage,
  	    		"limit":limit,
  	    		"pages":pages,
  	    		"total":count
  	    	},
  	    	responseData.data = users;
  	    	res.json(responseData);
  	    	return ;
  	    } else {
  	    	responseData.code = 0,
  	    	responseData.message("没有注册用户");
          res.json(responseData);
          return ;
  	    }
  	});
  });
});

/*新建分类*/
router.post("/category/add",function(req,res,next){
  const name = req.body.name;
  if(req.userInfo.isAdmin) {
    var category = new Category({ name:name});
    category.save((err,newName) => {
      if(err) {
        responseData.code = 0;//出错
        responseData.message = "分类添加失败";
        res.json(responseData);
      } else {
        var data = {};
        data.name = newName.name;
        data._id = newName._id;
        responseData.code= 200;
        responseData.message = "分类添加成功";
        responseData.data = data;
        res.json(responseData);
      }
      return ;
    });
  }
});

//获取文章分类
router.get("/category/get",function(req,res,next){
  Category.find().then((categloryInfo) => {
    var data = categloryInfo.map((item, index) => {
     return {name:item.name,_id:item._id}
    });
    responseData.code= 200;
    responseData.message = "分类获取成功";
    responseData.data = data;
    res.json(responseData);
  });
});

//新建文章
router.post("/artical/edit",function(req,res,next){
  const title = req.body.title;
  const desc = req.body.desc;
  const category = req.body.category;
  const content = req.body.content;
  let artical=null;
  if(req.body._id) {//如果是编辑
    Artical.findById(req.body._id, function (err, articalInfo){
      if(!err){
        articalInfo.title = title;
        articalInfo.desc = desc;
        articalInfo.category = category;
        articalInfo.content = content;
        articalInfo.update(function(err,newArticalInfo){
          if(!err){
            responseData.code = 200;
            responseData.message = "编辑文章成功";
            responseData.data = newArticalInfo;
            return;
          } else {
            responseData.code = 0 ;
            responseData.message = "编辑文章失败";
            return;
          }
        });
      } else {
        responseData.code = 0 ;
        responseData.message = "编辑文章失败";
        return;
      }
    });    
  } else {
    artical = new Artical({
      title:title,
      desc:desc,
      category:category,
      content:content
    });

    artical.save((err,newArtical) => {
      console.log('新添加的分类',newArtical);
      if(err) {
        responseData.code= 0 ;//出错
        responseData.message = "文章添加失败";
        res.json(responseData);
      } else {
        responseData.code= 200;
        responseData.message = "文章添加成功";
        responseData.data = newArtical;
        res.json(responseData);
      }
      return ;
    });
  }
});

//获取文章列表
router.post("/artical/list",function(req,res,next){
  console.log('获取文章')
  var currentPage = Number(req.body.currentPage);
  var limit = Number(req.body.limit);
  var pages = 0;
  Artical.count().then((count) => {
    pages = Math.ceil(count / limit);
    currentPage = Math.min(currentPage, pages );
    currentPage = Math.max(currentPage, 1 );
    var skip = (currentPage - 1) * limit;

    Artical.find().limit(limit).skip(skip).
      populate({path:'category', select:{name:1,_id:1}}).then(function(articals) {
        var responseData={};
        if(articals){
          responseData.code = 200,
          responseData.meta = {
            "currentPage":currentPage,
            "limit":limit,
            "pages":pages,
            "total":count
          },
          responseData.data = articals;
          res.json(responseData);
          return ;
        } else {
          responseData.code = 0 ,
          responseData.message("没有文章");
          res.json(responseData);
          return ;
        }
    });
  });
});

/*
获取文章详情
 */
router.post("/artical/detail",function(req,res,next){
  Artical.findById(req.body.id).then((articalInfo) =>{
    if(articalInfo){
      Artical.update({_id:req.body.id},{views:articalInfo.views+1}, function (error) {  
        if (!error) {
          articalInfo.views = articalInfo.views+1;
          responseData.code = 200;
          responseData.message = "获取文章成功";
          responseData.data = articalInfo;  
        } else {  
          responseData.code = 0 ;
          responseData.message = "获取文章失败";  
        }  
      });      
    } else {
      responseData.code = 0 ;
      responseData.message = "获取文章失败";
    }
    console.log(responseData);
    res.json(responseData);
    return;
  });
});



module.exports = router;
