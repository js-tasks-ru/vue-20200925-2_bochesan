import Vue from 'vue';
import VueRouter from 'vue-router';
import IndexPage from '../views/IndexPage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/05-AuthPages',
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
  ],
});
