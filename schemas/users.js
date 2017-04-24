/*
* @Author: linyajing
* @Date:   2017-02-28 23:26:27
* @Last Modified by:   linyajing
* @Last Modified time: 2017-03-11 00:15:36
*/

'use strict';
var mongoose = require("mongoose");
//定义用户表结构
module.exports = new mongoose.Schema({
	//用户名
	username:String,
	//密码
	password:String,
	//是否是管理员
	isAdmin:{
		type:Boolean,
		default:false
	}
});