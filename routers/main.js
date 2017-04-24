/*
* @Author: linyajing
* @Date:   2017-02-28 22:43:11
* @Last Modified by:   linyajing
* @Last Modified time: 2017-03-08 23:24:14
*/

'use strict';
var express = require("express");
var router = express.Router();
router.get("",function(req,res,next){
	res.render('index',{userInfo:req.userInfo});
});
module.exports = router;