import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router';
import axios from "axios/index";
import Cookies from 'js-cookie'

Vue.use(Router)

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new Router(RouterConfig);

//http拦截
axios.interceptors.response.use(
  response => {
    if(response.data.msg == "请登录"){
      router.push({
        name: 'login',
      });
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.push({
            name: 'login',
          });
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

//路由拦截
router.beforeEach((to, from, next) => {
  if(!Cookies.get('userId') && to.path !== '/' && to.path !== '/login' && to.path !== '/register' && to.path !== '/forget' && to.name !== 'goodsDetail'){
    next({
      name: 'login'
    });
  }else {
    next();
  }

});
