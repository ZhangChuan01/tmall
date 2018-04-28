// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AlloyFinger from 'AlloyFinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import axios from 'axios'
import store from './store/index'
import {router} from './router/index';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(AlloyFingerPlugin, {
  AlloyFinger
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store,
  components: { App },
  template: '<App/>'
})
