import Vue from 'vue';

/** 权限按钮指令**/
Vue.directive('auth', {
    inserted: function (el) {
    },
    bind: function (el, binding, vnode) {
        const value = binding.value;
        // 获取用户权限
        const getters = vnode.context.$store.getters;
        const roles = getters.roles;
        try {
            el.style.opacity = '0';
        } catch (e) {
            // $console.log(e);
        }
        // 假如不是超级管理员则判断用户用户权限
        if (!roles.includes(value)) {
            // 解决权限模块闪现问题
            setTimeout(function () {
                try {
                    el.parentNode.removeChild(el);
                } catch (e) {
                    // $console.log(e);
                }
            }, 10);
        }
        setTimeout(function () {
            try {
                el.style.opacity = '1';
            } catch (e) {
                // $console.log(e);
            }
        }, 10);
    }
});
