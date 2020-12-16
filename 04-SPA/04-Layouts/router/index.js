import Vue from 'vue';
import VueRouter from 'vue-router';
import MeetupsPage from '../views/MeetupsPage';
import LoginPage from '../views/LoginPage';
import FormPage from '../views/FormPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/04-Layouts',
  routes: [
    {
      path: '/',
      name: 'meetups',
      component: MeetupsPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage,
    },
  ],
});
