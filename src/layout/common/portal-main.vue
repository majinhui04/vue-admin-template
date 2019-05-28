<template>
    <div class="portal-main" id="portalMain" :class="classObj">
        <v-sidebar></v-sidebar>
        <div class="portal-content" id="appContent">
            <v-breadcrumb v-if="showBreadcrumb"></v-breadcrumb>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapState } from 'vuex';
    import vSidebar from './portal-side';
    import vBreadcrumb from '@/layout/common/portal-breadcrumb.vue';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapState({
                showBreadcrumb: state => state.settings.showBreadcrumb
            }),
            ...mapGetters(['sidebar']),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                };
            }
        },
        components: {
            vSidebar,
            vBreadcrumb
        }
    };
</script>
