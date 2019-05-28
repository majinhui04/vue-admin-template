import portal from '@/layout/common/portal';
import exampleRoute from './example';

export default [
    {
        path: '/',
        name: 'root',
        component: portal,
        redirect: { name: 'example' },
        children: [
            ...exampleRoute
        ]
    }];
