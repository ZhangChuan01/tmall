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
    title: '登录'
  },
  component: resolve => { require(['@/views/Register.vue'], resolve); }
};

export const forgetRouter = {
  path: '/forget',
  name: 'forget',
  meta: {
    title: '登录'
  },
  component: resolve => { require(['@/views/ForgetPassword.vue'], resolve); }
};

export const routers = [
  homeRouter,loginRouter,registerRouter,forgetRouter
];
