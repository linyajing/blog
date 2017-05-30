/*
* @Author: linyajing
* @Date:   2017-03-21 21:51:41
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-30 21:37:34
*/

var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category"
	},
	title:String,
	ctime: {
		type:Date,
		default: new Date()
	},
	views: {
		type:Number,
		default:0 
	},
	desc: {
		 type: String,
		 default:''
	},
	comment:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	},
	content: {
		type: String,
		default:''
	}
})