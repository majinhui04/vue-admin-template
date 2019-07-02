// 自定义
import Vue from 'vue';
import router from './router';
import App from './app.vue';
import store from './store';
// 第三方
import './plugins/element.js';
import './plugins/sharegoods.js';
import './plugins/polyfill.js';
import './app.scss';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
