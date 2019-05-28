<template>
    <div class="portal-sidebar" style="z-index: 8;">
        <div class="portal-sidebar-content">
            <div class="head">
                <a href="javascript:void(0)" @click="ToggleSideBar">
                    <i class="icon icon-sidebar-toggle" :class="{'rotate':!sidebar.opened}"></i>
                </a>
            </div>
            <div class="yun-head" v-if="APP_TITLE">{{APP_TITLE}}</div>
            <div class="main">
                <el-menu
                    class="portal-menu"
                    :default-active="$route.name"
                    :collapse="isCollapse"
                    text-color="#8492A6"
                    unique-opened
                    :collapse-transition="false"
                    mode="vertical"
                >
                    <sidebar-item v-for="route in items" :key="route.name" :item="route"/>
                </el-menu>
            </div>
            <div class="foot">
                <div class="user-message">
                    <img src="https://me.bdp.cn/static/images/user/1-head-pic.png" alt class="avatar">
                    <div class="user-name" v-if="userInfo">{{userInfo.nickName}}</div>
                </div>
                <div class="loginout" @click="handleLogout">退出</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { findAllParents } from '@/utils';
import SidebarItem from './menu/sidebar-item';

export default {
    components: {
        SidebarItem
    },
    data() {
        return {
            collapse: false,
            items: []
        };
    },
    computed: {
        ...mapGetters(['routers', 'sidebar', 'userInfo']),
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    methods: {
        // 侧边栏折叠
        ToggleSideBar() {
            this.$store.dispatch('ToggleSideBar');
        },
        // 初始化侧边栏菜单
        initSideRouter() {
            // 获取'/'以下的模块列表
            const routers = this.routers || [];
            const name = this.$route.name || '';
            const ancestors = findAllParents(routers, name);
            // 获取模块祖级name
            const rootName = ancestors[0];
            const moduleName = ancestors[1];
            // 获取模块祖级树
            const root = routers.filter(item => item.name === rootName)[0];
            // 获取模块树
            const module = root.children.filter(
                item => item.name === moduleName
            )[0];
            // 获取模块祖级树下的子级列表中菜单
            this.items = module.children || [];
        },
        // 退出
        handleLogout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload(true);
            });
        }
    },
    mounted() {
        // console.log(this.sidebar);
        this.initSideRouter();
    }
};
</script>

<style scoped lang="scss">
.head {
    height: 40px;
    border-bottom: 1px solid #ddd;
    position: relative;

    .rotate {
        transform: rotateY(180deg) translateY(-50%) !important;
    }
}

.icon-sidebar-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}
</style>
