const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
};

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://www.gravatar.com/avatar/9e534860526289cf56ece3461ab3578c?s=46&d=identicon',
        name: 'Super Admin',
        nickName: 'Super Admin',
        permission: ['/dashboard/index', '/directive/table/index']
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://www.gravatar.com/avatar/9e534860526289cf56ece3461ab3578c?s=46&d=identicon',
        name: 'Normal Editor',
        nickName: 'Normal Editor',
        permission: ['/dashboard/index', '/color/index','dashboard.button1']
    }
};

export default [
    // user login
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            const {
                account
            } = config.body;
            const token = tokens[account];
            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect'
                };
            }

            return {
                code: 0,
                data: {
                    token: +new Date(),
                    ...users[token.token]
                }
            };
        }
    },

    // get user info
    {
        url: '/user/info\.*',
        type: 'get',
        response: config => {
            const {
                token
            } = config.query;
            const info = users[token];

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                };
            }

            return {
                code: 0,
                data: info
            };
        }
    },

    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: 'success'
            };
        }
    },

    // user logout
    {
        url: '/user/ownDetails',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: {
                    nickName: 'damon',
                    avatar: 'https://www.gravatar.com/avatar/9e534860526289cf56ece3461ab3578c?s=46&d=identicon'
                }
            };
        }
    }
];
