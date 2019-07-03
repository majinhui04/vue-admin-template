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

function addRoute(list) {
    const stack = [...list];
    while (stack.length) {
        const curr = stack.pop();
        curr.name = curr.parentName ? curr.parentName + '-' + curr.path : curr.path;
        if (!curr.parentName) {
            curr.component = portalMain;
        } else if (curr.children && curr.children.length) {
            curr.component = portalView;
        } else {
            curr.component = _import(curr.name);
        }
        if (curr.children && curr.children.length) {
            curr.children.forEach(item => {
                item.parentName = curr.name;
            });
            stack.push(...curr.children);
        }
    }
    return list;
}

function _import(path) {
    const result = path.split('-');
    const name = result.pop();
    const dir = result.join('/') + '/';
    return resolve => require.ensure([], () => resolve(require(`../pages/${dir}${name}.vue`)));
}

addRoute(routes);

export default [
    {
        path: '/',
        name: 'root',
        component: portal,
        children: [
            ...routes
        ]
    }];
