import Vue from 'vue';
import App from './App.vue';
import './assets/styles/app.css';
import './assets/styles/_button.css';
import './assets/styles/_checkbox.css';
import './assets/styles/_forms.css';
import { router } from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
