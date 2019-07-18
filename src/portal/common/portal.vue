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
        name: 'Portal',
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
                hasTopRoute: state => state.settings.hasTopRoute,
                showHeader: state => state.settings.showHeader,
                showBreadcrumb: state => state.settings.showBreadcrumb
            }),
            ...mapGetters(['routers'])
        },
        watch: {
            $route(newVal, oldVal) {
                const newModule = newVal.fullPath.slice(1).split('/')[0];
                const oldModule = oldVal.fullPath.slice(1).split('/')[0];
                if (this.hasTopRoute && (newModule !== oldModule)) {
                    this.name = newVal.name;
                    this.$store.dispatch('tagsView/delAllCachedViews');
                    this.$store.dispatch('tagsView/delAllVisitedViews');
                }
            }
        }
    };
</script>

