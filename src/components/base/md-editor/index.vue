<template>
    <div>
        <mavon-editor v-model="content"/>
    </div>
</template>
<script>
    import Vue from 'vue';
    import mavonEditor from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';
    // use
    Vue.use(mavonEditor);

    export default {
        data() {
            return {
                content: '## demo'
            };
        }
    };
</script>
