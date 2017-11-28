var express = require('express');
var router = express.Router();
//引入模型类，给我们返回一个构造函数，构造函数中有操作数据库的方法
var User = require('../models/User.js');
//点同意统一的返回格式
var responseData;
router.use(function (req, res, next) {
  responseData = {
    code: 200,
    message: ''
  };
  next();
});

/*
	首页加载获取cookie
 */
router.get("/user/userInfo", function (req, res, next) {
  if (req.userInfo._id) {
    responseData.message = '获取登录信息成功';
    responseData.data = {};
    responseData.data._id = req.userInfo._id;
    responseData.data.username = req.userInfo.username;
    responseData.data.isAdmin = req.userInfo.isAdmin;
  } else {
    responseData.code = 0;
    responseData.message = '没有登录信息';
  }
  res.json(responseData);
});

/*
 *用户注册
 */
router.post('/user/register', function (req, res, next) {
  //1.基本验证：用户名不能为空
  //2.密码不能为空
  //3.两次密码必须一致
  //4.验证用户名是否已经被注册
  var username = req.body.username;
  var password = req.body.password;
  var repassword = req.body.repassword;
  //操作数据库
  User.findOne({
    username: username
  }).then((userInfo) => {
    if (userInfo) {
      responseData.code = 0;
      responseData.message = '用户名已经被注册';
      res.json(responseData);
      return;
    } else {
      var user = new User({
        username: username,
        password: password
      });
      return user.save(); //仍然返回一个promise对象
    }
  }).then((newUserInfo) => {
    var userInfo = {};
    userInfo._id = newUserInfo._id;
    userInfo.username = newUserInfo.username;
    responseData.message = '注册成功';
    //注册成功就向客户端发送一个cooike
    req.cookies.set('userInfo', JSON.stringify(userInfo));
    res.json(responseData);
  });
});

/*
 *用户登录
 */
router.post("/user/login", function (req, res, next) {
  var query = {
    username: '',
    password: ''
  };

  query.username = req.body.username;
  query.password = req.body.password;

  User.findOne(query).then((userInfo) => {
    if (!userInfo) {
      responseData.code = 0;
      responseData.message = '用户名或密码错误';
      res.json(responseData);
      return;
    } else {
      var userCookie = {};
      userCookie._id = userInfo._id;
      userCookie.username = userInfo.username;
      req.cookies.set('userInfo', JSON.stringify(userInfo));

      responseData.message = '登录成功';
      responseData.userInfo = {
        username: userInfo.username,
        _id: userInfo._id,
        isAdmin: userInfo.isAdmin
      };
      res.json(responseData);
      return;
    }
  });
});

/*
 *退出登录
 */
router.get("/user/layout", function (req, res) {
  req.cookies.set('userInfo', null);
  responseData.message = "成功退出登录";
  res.json(responseData);
  return;
});


module.exports = router;