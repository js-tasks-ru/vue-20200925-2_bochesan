import Vue from './vue.esm.browser.js';

// const app = ...
// Рекомендуется использовать МЕТОД в качестве обработчика события

const app = new Vue({
    el: '#app',
    data: function() {
        return {
            count: 0
        }
    },
    methods: {
        countUp: function() {
            this.count++;
        }
        
    }
});