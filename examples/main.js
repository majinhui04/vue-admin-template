// 第三方
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 浏览器兼容
import 'babel-polyfill';
// 公共
import $console from '@/sharegoods-ui/lib/utils/logger';
import SharegoodsUI from '@/sharegoods-ui/lib';
// 自定义
import router from './router';
import App from './app.vue';
import store from './store';
import './app.scss';
// 注册全局API
import { API } from './api';
import demoBlock from './components/demo-block.vue';
import hljs from 'highlight.js';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(SharegoodsUI);
Vue.prototype.$api = API;
Vue.prototype.$console = $console;
window.$console = $console;
Vue.component('demo-block', demoBlock);

router.afterEach(route => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
