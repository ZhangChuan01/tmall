export const homeRouter = {
  path: '/',
  name: 'home',
  meta: {
    title: '首页'
  },
  component: resolve => { require(['@/views/Home.vue'], resolve); }
};

export const routers = [
  homeRouter
];
