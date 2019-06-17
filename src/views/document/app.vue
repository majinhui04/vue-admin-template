<template>
    <div id="app" :class="{ 'is-component': isComponent }">
        <main-header v-if="lang !== 'play'"></main-header>
        <div class="main-cnt">
            <router-view></router-view>
        </div>
        <main-footer v-if="lang !== 'play' && !isComponent"></main-footer>
    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
        },
        mounted() {
        }
    };
</script>
<style lang="scss">
    body {
        background: #FFF !important;
    }
</style>
