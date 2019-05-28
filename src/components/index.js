import Vue from 'vue';

import loading from '@/components/common/loading/loading.vue';
import tip from '@/components/common/tip/tip.vue';
import { Flexbox, FlexboxItem } from '@/components/layout/flexbox';
import SgTableFilter from './sg/table/table-filter';
import SgTableView from './sg/table/table-view';

const components = {
    'mr-loading': loading,
    'mr-tip': tip,
    'mr-flexbox': Flexbox,
    'mr-flexbox-item': FlexboxItem,
    'sg-table-filter': SgTableFilter,
    'sg-table-view': SgTableView

};
const install = function (Vue) {
    if (install.installed) return;

    Object.keys(components).forEach(k => {
        Vue.component(k, components[k]);
    });
};

install(Vue);
