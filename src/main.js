// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from './assets/api/base';
import ElementUI from 'element-ui';
import 'lib-flexible/flexible'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import globalFunc from './assets/api/global_func'
import {login} from "./assets/api/global_request";
import global from "./assets/api/global";

import echarts from 'echarts' // 引入echarts
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(globalFunc);

Vue.prototype.$axios = axios;

//使用钩子函数对路由进行权限跳转
/* router.beforeEach((to, from, next) => {

  if(global.isLogin){
    next();
  }else{
    let account = localStorage.getItem('ms_username');
    let password = localStorage.getItem('ms_password');
    if (!account && to.path !== '/login') {
      //没有登录过就去登录
      localStorage.clear();
      next('/login');
    } else if(to.path === '/login') {
      next();
    }else{
      login(account, password)
        .then(function(data){
          if(data !== null){
            if(data.success === true){
              localStorage.setItem("ms_password", password);
              localStorage.setItem('ms_username', account);
              localStorage.setItem('adminToken', data.result.token);
              localStorage.setItem('adminId', data.result.cId);

              global.isLogin = true;
              next();
            }else{
              localStorage.clear();
              next('/login');
            }
          }
        });
    }
  }

}); */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
