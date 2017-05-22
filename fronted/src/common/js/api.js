/*
* @Author: linyajing
* @Date:   2017-05-16 00:54:54
* @Last Modified by:   linyajing
* @Last Modified time: 2017-05-20 11:29:45
*/

'use strict';
/**
 * 用于统一的请求控制，使用vue-resource进行请求
 * 约定200为成功状态码
 * 使用Promise进行异步管理
 * @Author   wangweixin
 * @DateTime 2017-02-07T14:37:28+0800
 */

import Vue from 'vue';
import vueResource from 'vue-resource';
Vue.use(vueResource);

//interceptor会首先对所有的请求进行拦截
//json格式化
Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if(typeof(res.data) == 'string'){
      var json = {};
      try {
        json = JSON.parse(res.data);
      } catch(e) {
        json = {
          code: 500,
          message: '服务器异常，请重试！'
        }
      }
      return json;
    }else{
      return res;
    }
  })
});

//code状态码200判断，需要和后端商议好统一的状态码格式
Vue.http.interceptors.push((request, next) => {
  next((res) => {
    if(typeof(Vue.hideLoading) == 'function') {
      Vue.hideLoading();
    }
    if(res.status === 200) {
        return res;     
    } else {
      return Promise.reject(res);
    }
  })
});

/**
 * get方法
 * @param    {[String]}                 url  [请求api]
 * @param    {[Object]}                 data [参数]
 */
export const get = function (url, data, showLoading) {
  if(showLoading && typeof(Vue.showLoading) == 'function') {
    Vue.showLoading();
  }
  let params = data?'&' + formatParams(data):'';
  return Vue.http.get( ENV_OPT.baseApi + url + params).then(r=>{
    return r.body;
  });
}

export const post = function (url, data, showLoading) {
  if(showLoading && typeof(Vue.showLoading) == 'function') {
    Vue.showLoading();
  }

  return Vue.http.post( ENV_OPT.baseApi + url , data ).then(r=>{
    return r.body;
  })
}

function formatParams(data) {
  const arr = [];

  for (let name of Object.keys(data) ) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }
  return arr.join('&');
}