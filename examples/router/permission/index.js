import portal from '../../portal/common/portal';
import exampleRoute from './example';

export default [
    {
        path: '/',
        name: 'root',
        component: portal,
        redirect: { name: 'components' },
        children: [
            ...exampleRoute
        ]
    }];
