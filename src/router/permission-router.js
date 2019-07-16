import portal from '../portal/common/portal';
import portalMain from '../portal/common/portal-main';
import portalView from '../portal/common/portal-view';
import routerConfig from '../route.config';

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
  }
 */

const routes = [...routerConfig];
const treeStr = []; // 打印一下

function addRoute(list) {
    const stack = [...list];
    while (stack.length) {
        const curr = stack.shift();
        curr.dir = curr.parentName ? curr.parentName + ':' + (curr.path || 'index') : (curr.path || 'index');
        let space = Array.apply(null, Array(curr.dir.split(':').length * 2)).map(function (item, i) {
            return ' ';
        });
        let title = curr.meta ? curr.meta.title || curr.path || 'index' : curr.path || 'index';
        if (!curr.name) {
            curr.name = '/' + curr.dir.split(':').join('/');
        }
        treeStr.push(...[space.join(''), '├──', title + curr.name, '\n']);
        // 顶级路由
        if (!curr.parentName) {
            curr.component = portalMain;
        } else if (curr.children && curr.children.length) {
            // 层级路由
            curr.component = portalView;
        } else {
            // 叶子路由
            if (!curr.component) {
                curr.component = _import(curr.dir);
            }
        }
        if (curr.children && curr.children.length) {
            curr.children.forEach(item => {
                item.parentName = curr.dir;
            });
            stack.unshift(...curr.children);
        }
    }
    return list;
}

function _import(dir) {
    const result = dir.split(':');
    const name = result.pop();
    const filename = result.join('/') + '/';
    return resolve => require.ensure([], () => resolve(require(`../pages/${filename}${name}.vue`)));
}

addRoute(routes);
console.log(treeStr.join(''));
export default [
    {
        path: '/',
        name: 'root',
        component: portal,
        redirect: '/403',
        children: [
            ...routes
        ]
    }];
