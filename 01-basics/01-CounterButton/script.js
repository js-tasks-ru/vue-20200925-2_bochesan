import Vue from './vue.esm.browser.js';

export const app = new Vue({
  el: '#app',

  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increment() {
      this.count++;
    },
  },
});
