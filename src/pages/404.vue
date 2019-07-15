<template>
    <div class="content">
        <div class="exception-wrapper">
            <div class="exception-img">
                <img src="../assets/img/404.png" alt="">
            </div>
            <div class="exception-main">
                <div class="exception-code">404</div>
                <div class="exception-message">抱歉，你访问的页面不存在</div>
                <div class="exception-action">
                    <el-button type="primary" @click="goHome">返回首页</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Exception',
        props: {},
        data() {
            return {};
        },
        created() {
        },
        mounted() {
        },
        methods: {
            goHome() {
                this.$router.push('/');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .exception-wrapper {
        width: 600px;
        margin: 0 auto;
        padding: 50px 0;
        padding-top: 150px;
    }

    .exception-img {
        width: 250px;
        display: inline-block;
        vertical-align: top;
        img {
            width: 100%;
        }
    }

    .exception-main {
        width: 300px;
        display: inline-block;
        vertical-align: top;
        margin-left: 30px;
        padding-top: 80px;
    }

    .exception-code {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .exception-message {
        margin-bottom: 15px;
        font-size: 18px;
    }
</style>
