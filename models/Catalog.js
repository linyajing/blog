/*
* @Author: linyajing
* @Date:   2017-04-13 23:48:24
* @Last Modified by:   linyajing
* @Last Modified time: 2017-04-19 16:29:21
*/

'use strict';
var mongoose = require("mongoose");
var CategorySchema = require('../schemas/Categories.js');
module.exports = mongoose.model('Catalog',CategorySchema);