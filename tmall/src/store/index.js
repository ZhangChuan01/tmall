import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    imgType: ".png"
  },
  mutations: {
    setImgType(state,val){
      state.imgType = val;
    }
  }
});

export default store;
