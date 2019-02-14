import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue'),
    },
    {
      path: '/personalTax',
      name: 'personalTax',
      component: () => import('./views/personal-tax.vue'),
    },
    {
      path: '/choose',
      name: 'choose',
      component: () => import('./views/choose.vue'),
    },
    {
      path: '/helloWorld',
      name: 'helloWorld',
      component: () => import('./views/hello-world.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue'),
    }
  ],
});
