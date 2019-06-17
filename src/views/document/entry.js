import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import SharegoodsUI from '@/sharegoods-ui/lib';
import moment from 'moment';

import './demo-styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
import icon from './icon.json';
import { API } from './api';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

Vue.filter('formatDate', function (value) {
    return moment(value).format('YYYY-MM-DD hh:mm:ss');
});

Vue.use(SharegoodsUI);
Vue.prototype.$api = API;

const globalEle = new Vue({
    data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
    computed: {
        $isEle: {
            get: () => (globalEle.$data.$isEle),
            set: (data) => {
                globalEle.$data.$isEle = data;
            }
        }
    }
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

router.afterEach(route => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
});

new Vue({ // eslint-disable-line
    ...entry,
    router
}).$mount('#app');
