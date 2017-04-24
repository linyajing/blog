/*
* @Author: linyajing
* @Date:   2017-03-21 21:51:41
* @Last Modified by:   linyajing
* @Last Modified time: 2017-04-21 23:49:59
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
	comment: {
		type: Array,
		default:[]
	},
	content: {
		type: String,
		default:''
	}

})