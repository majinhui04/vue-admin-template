<template>
    <div class="portal-son">
        <div class="portal-sidebar" style="width: 210px">
            <slot></slot>
            <v-menu v-if="items" :items="items"></v-menu>
        </div>
        <div class="portal-content">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.name + uuid"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" :key="$route.name + uuid"></router-view>
        </div>
    </div>
</template>
<script>
    import { asyncRouter } from '@/router/index.js';
    import vMenu from '@/layout/common/menu/index.vue';
    import { findAllParentsData } from '@/utils';

    export default {
        components: {
            vMenu
        },
        data() {
            return {
                items: null,
                uuid: ''
            };
        },
        mounted() {
            this.syncUI();
        },
        methods: {
            // 获取当前父亲路由菜单
            syncUI() {
                const routes = asyncRouter[0].children || [];
                const name = this.$route.name;
                const ancestors = findAllParentsData(routes, name);
                let ancestor = null;
                for (let i = ancestors.length - 1; i >= 0; i--) {
                    if (ancestors[i].nav === 'sidebar') {
                        ancestor = ancestors[i];
                        break;
                    }
                }
                this.items = ancestor.children || [];
            }
        }
    };
</script>
<style scoped>
</style>
