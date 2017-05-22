/*
* @Author: linyajing
* @Date:   2017-04-13 23:48:24
* @Last Modified by:   linyajing
* @Last Modified time: 2017-04-24 23:59:34
*/

'use strict';
var mongoose = require("mongoose");
var AritcalSchema = require('../schemas/Articals.js');
module.exports = mongoose.model('Artical',AritcalSchema);