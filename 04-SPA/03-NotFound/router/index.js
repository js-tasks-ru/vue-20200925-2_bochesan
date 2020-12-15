import Vue from 'vue';
import VueRouter from 'vue-router';
import PageA from '../views/PageA';
import PageB from '../views/PageB';
import NotFoundPage from '../views/NotFoundPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/03-NotFound',
  routes: [
    {
      path: '/page-a',
      component: PageA,
    },
    {
      path: '/page-b',
      component: PageB,
    },
    {
      path: '*',
      component: NotFoundPage,
    },
  ],
});
