export const homeRouter = {
  path: '/',
  name: 'home',
  meta: {
    title: '首页'
  },
  component: resolve => { require(['@/views/Home.vue'], resolve); }
};

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: resolve => { require(['@/views/Login.vue'], resolve); }
};

export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册'
  },
  component: resolve => { require(['@/views/Register.vue'], resolve); }
};

export const forgetRouter = {
  path: '/forget',
  name: 'forget',
  meta: {
    title: '忘记密码'
  },
  component: resolve => { require(['@/views/ForgetPassword.vue'], resolve); }
};

export const goodsDetailRouter = {
  path: '/goodsDetail/:id',
  name: 'goodsDetail',
  meta: {
    title: '商品详情'
  },
  component: resolve => { require(['@/views/GoodsDetail.vue'], resolve); }
};

export const cartRouter = {
  path: '/cart',
  name: 'cart',
  meta: {
    title: '购物车'
  },
  component: resolve => { require(['@/views/Cart.vue'], resolve); }
};

export const goodListRouter = {
  path: '/goodList',
  name: 'goodList',
  meta: {
    title: '搜索结果'
  },
  component: resolve => { require(['@/views/GoodList.vue'], resolve); }
};

export const messageRouter = {
  path: '/message',
  name: 'message',
  meta: {
    title: '搜索结果'
  },
  component: resolve => { require(['@/views/Message.vue'], resolve); }
};
export const routers = [
  homeRouter,loginRouter,registerRouter,forgetRouter,goodsDetailRouter,cartRouter,goodListRouter,messageRouter
];
