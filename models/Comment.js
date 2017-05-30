/*
* @Author: linyajing
* @Date:   2017-05-30 21:22:44
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-30 21:23:19
*/

'use strict';
var mongoose = require("mongoose");
var commentSchema = require('../schemas/Comments.js');
module.exports = mongoose.model('Comment',userSchema);