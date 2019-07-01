// 自定义
import Vue from 'vue';
import router from './router';
import App from './app.vue';
import store from './store';
// 第三方
import './plugins/element.js';
import './plugins/sharegoods.js';
import './plugins/polyfill.js';
// 主题
import './portal/styles/index.scss';
import './app.scss';
import './route.config';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
