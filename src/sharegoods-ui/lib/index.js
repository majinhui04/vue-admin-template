import TableFilter from '../packages/table-filter/index.js';
import TableView from '../packages/table-view/index.js';

const components = [
    TableFilter,
    TableView
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '1.0.0',
    install
};
