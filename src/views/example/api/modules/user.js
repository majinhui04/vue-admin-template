export default [
    {
        name: 'userLogin',
        label: '用户登录',
        path: '/user/login',
        method: 'post',
        processData(data) {
            if (data) {
                data.account = data.loginName;
            }
            return data;
        },
        success(res) {
            const data = res.data || {};
            data.nickName = data.nickName || data.account;
            return res;
        }
    }
];
