/*
* @Author: linyajing
* @Date:   2017-03-02 22:25:12
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-30 18:45:28
*/

'use strict';
var mongoose = require("mongoose");
var userSchema = require('../schemas/Users.js');
module.exports = mongoose.model('User',userSchema);