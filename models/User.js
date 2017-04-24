/*
* @Author: linyajing
* @Date:   2017-03-02 22:25:12
* @Last Modified by:   linyajing
* @Last Modified time: 2017-03-05 21:33:59
*/

'use strict';
var mongoose = require("mongoose");
var userSchema = require('../schemas/users.js');
module.exports = mongoose.model('User',userSchema);