<template>
    <div class="portal-main scroll-y">
        <div class="wrapper">
            <div class="content">
                <h1>这里是个测试页面</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import variables from '../variables.scss';

    export default {
        computed: {
            variables() {
                return variables;
            }
        },
        mounted() {
            console.log(34, this.variables);
        }
    };
</script>
<style scoped>

</style>
