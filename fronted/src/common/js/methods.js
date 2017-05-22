/*
* @Author: linyajing
* @Date:   2017-05-09 22:13:08
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-09 23:15:35
*/

'use strict';

export const formatTime = function(time) {
	let date = new Date(time);
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let day = date.getDay();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	return year+'年'+month+'月'+day+'日'+' '+hours+':'+minutes+':'+seconds;
}

export const  postReq = function() {
	
}