<template>
    <div class="portal-main scroll-y">
        <div class="wrapper">
            <div class="content">
                <h1>这里是个测试页面</h1>
                <!--<mr-flexbox>
                    <mr-flexbox-item>阿斯达；</mr-flexbox-item>
                    <mr-flexbox-item>按时来达到了；案例；的</mr-flexbox-item>
                </mr-flexbox>-->
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
