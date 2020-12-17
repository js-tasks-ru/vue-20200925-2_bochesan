import Vue from 'vue';
import VueRouter from 'vue-router';
import PageWithQuery from '../views/PageWithQuery';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/06-Query',
  routes: [
    {
      path: '/',
      component: PageWithQuery,
    },
  ],
});
