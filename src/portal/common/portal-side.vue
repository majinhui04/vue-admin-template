<template>
    <div class="portal-sidebar" style="z-index: 8;">
        <div class="portal-sidebar-content">
            <div class="head" v-if="title">
                <span class="head-text">{{title}}</span>
            </div>
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
            <div class="foot" v-if="showSidebarToggle">
                <a href="javascript:void(0);" class="toggle-sidebar-button" @click="ToggleSideBar">
                    <template v-if="sidebar.opened">
                        <svg-icon icon-class="angle-double-left"  class-name='icon-angle-double-left' />
                    </template>
                    <template v-else>
                        <svg-icon icon-class="angle-double-right"  class-name='icon-angle-double-right' />
                    </template>
                    <span class="collapse-text" v-show="sidebar.opened">收起菜单</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
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
            ...mapState({
                menus: state => state.permission.menus,
                title: state => state.settings.title,
                hasTopRoute: state => state.settings.hasTopRoute,
                showSidebarToggle: state => state.settings.showSidebarToggle
            }),
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
                const routers = this.menus;
                const matched = this.$route.matched;
                const rootName = matched[0].name;
                const topName = matched[1].name;
                // 获取根模块
                const root = routers.filter(item => item.name === rootName)[0];
                // 获取顶级模块列表
                const rootChildren = root.children || [];

                // 是否有顶级模块
                // 获取顶级模块
                const top = rootChildren.filter(item => item.name === topName)[0];
                // 获取模块祖级树下的子级列表中菜单
                this.items = this.hasTopRoute ? top.children : rootChildren;
            },
            // 退出
            handleLogout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload(true);
                });
            }
        },
        mounted() {
            this.initSideRouter();
        }
    };
</script>

<style scoped lang="scss">
    .head {
        padding: 16px 12px;
        color: #707070;
        text-align: center;
        position: relative;
        .head-text {
            font-size: 16px;
            font-weight: 500;
            display: block;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    .toggle-sidebar-button {
        display: block;
        padding: 16px 0;
        color: #707070;
        border-top: 1px solid #dddddd;

        .collapse-text {
            margin-left: 7px;
        }
    }
</style>
