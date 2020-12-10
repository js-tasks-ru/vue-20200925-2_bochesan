import VueRouter from 'vue-router';
import { routes } from './routes';

const router = new VueRouter({
  mode: 'history',
  base: '04-SPA/01-ContentTabs',
  routes,
});

export default router;
