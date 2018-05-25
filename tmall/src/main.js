// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible/flexible.js'
import AlloyFinger from 'AlloyFinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import axios from 'axios'
import store from './store/index'
import {router} from './router/index';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import './common/css/font.css'
import './common/js/font.js'
Vue.use(Mint);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
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
