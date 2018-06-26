export const homeRouter = {
  path: '/',
  name: 'home',
  meta: {
    title: '首页',
    index: 0
  },
  component: resolve => { require(['@/views/Home.vue'], resolve); }
};

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    index: 1
  },
  component: resolve => { require(['@/views/Login.vue'], resolve); }
};

export const registerRouter = {
  path: '/register',
  name: 'register',
  meta: {
    title: '注册',
    index: 2
  },
  component: resolve => { require(['@/views/Register.vue'], resolve); }
};

export const forgetRouter = {
  path: '/forget',
  name: 'forget',
  meta: {
    title: '忘记密码',
    index: 3
  },
  component: resolve => { require(['@/views/ForgetPassword.vue'], resolve); }
};

export const goodsDetailRouter = {
  path: '/goodsDetail/:id',
  name: 'goodsDetail',
  meta: {
    title: '商品详情',
    index: 4
  },
  component: resolve => { require(['@/views/GoodsDetail.vue'], resolve); }
};

export const cartRouter = {
  path: '/cart',
  name: 'cart',
  meta: {
    title: '购物车',
    index: 5
  },
  component: resolve => { require(['@/views/Cart.vue'], resolve); }
};

export const goodListRouter = {
  path: '/goodList',
  name: 'goodList',
  meta: {
    title: '搜索结果',
    index: 6
  },
  component: resolve => { require(['@/views/GoodList.vue'], resolve); }
};

export const messageRouter = {
  path: '/message',
  name: 'message',
  meta: {
    title: '留言板',
    index: 7
  },
  component: resolve => { require(['@/views/Message.vue'], resolve); }
};
export const routers = [
  homeRouter,loginRouter,registerRouter,forgetRouter,goodsDetailRouter,cartRouter,goodListRouter,messageRouter
];
