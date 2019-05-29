import portal from '@/views/example/portal/common/portal';
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
