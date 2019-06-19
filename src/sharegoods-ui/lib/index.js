import TableFilter from '../packages/table-filter/index.js';
import TableView from '../packages/table-view/index.js';
import TableEditor from '../packages/table-editor/index.js';
import Loading from '../packages/loading/index.js';
import ExportButton from '../packages/export-button/index.js';
import SgChart from '../packages/chart/index.js';
import '../packages/portal/styles/index.scss';

const components = [
    SgChart,
    ExportButton,
    TableFilter,
    TableView,
    Loading,
    TableEditor
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '1.1.0',
    install
};
