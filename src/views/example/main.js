// 第三方
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 浏览器兼容
import 'babel-polyfill';
// 公共
import '@/layout/styles/index.scss';
import $console from '@/igrow/utils/logger';
import '@/components';
// 自定义
import router from './router';
import App from './app.vue';
import store from './store';
import './app.scss';
// 注册全局API
import { API } from './api';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$api = API;
Vue.prototype.$console = $console;
window.$console = $console;
Vue.mixin({
    data() {
        return {
            APP_TITLE: ''
        };
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
