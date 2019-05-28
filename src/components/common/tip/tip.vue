<template>
    <div class="mr-tip-container">
        <template v-if="mode === 'init'">
            <img src="./img/init.png" alt="" class="bg">
        </template>
        <template v-else>
            <img src="./img/bg.png" alt="" class="bg">
        </template>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            mode: {
                type: String,
                default: 'init'
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .mr-tip-container {
        width: 300px;
        margin: 0 auto;
        text-align: center;
        .bg {
            width: 100%;
        }
        .content {
            padding: 30px 0;
            font-size: 20px;
            color: #333;
        }
    }
</style>
