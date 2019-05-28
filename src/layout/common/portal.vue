<template>
    <div class="portal-wrapper" :class="{'noHeader':!showHeader,'hasBreadcrumb':showBreadcrumb}">
        <v-header v-if="showHeader"></v-header>
        <router-view :key="name"></router-view>
    </div>
</template>

<script>
    import vHeader from './portal-head';
    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'portal',
        components: {
            vHeader
        },
        data() {
            return {
                name: ''
            };
        },
        computed: {
            ...mapState({
                showHeader: state => state.settings.showHeader,
                showBreadcrumb: state => state.settings.showBreadcrumb
            }),
            ...mapGetters(['routers'])
        },
        watch: {
            // 不同大模块重新渲染view
            $route(newVal, oldVal) {
                // 获取'/'以下的模块列表
                const matched = this.$route.matched;
                const first = matched[1];
                this.name = first.name;
            }
        },
        created() {
            const matched = this.$route.matched;
            const first = matched[1];
            this.name = first.name;
        }
    };
</script>

