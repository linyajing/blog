/*
* @Author: linyajing
* @Date:   2017-05-30 18:56:51
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-30 21:22:27
*/

/*
* @Author: linyajing
* @Date:   2017-03-21 21:51:41
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-30 18:47:58
*/

var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	content:String,
	articalId:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Artical'
	}
})