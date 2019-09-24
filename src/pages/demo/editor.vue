<template>
    <div class="content">
        <md-editor v-model="content"></md-editor>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: ''
            };
        },
        mounted() {
        }
    };
</script>
<style scoped lang="scss">
</style>
