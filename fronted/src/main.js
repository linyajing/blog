// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import store from './store'
import './common/css/reset.css'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.http.options.headers = {
  'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
};
Vue.http.options.emulateJSON = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
