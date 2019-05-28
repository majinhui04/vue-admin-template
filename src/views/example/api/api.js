// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const api = [];
for (let key in modules) {
    api.push(...modules[key]);
}

export default api;
