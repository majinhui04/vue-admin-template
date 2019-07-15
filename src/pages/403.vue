<template>
    <div class="content">
        <div class="exception-wrapper">
            <div class="exception-img">
                <img src="../assets/img/404.png" alt="">
            </div>
            <div class="exception-main">
                <div class="exception-code">403</div>
                <div class="exception-message">请联系管理员，设置页面权限</div>
                <div class="exception-action">
                    <el-button type="primary" @click="goLogin">返回登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store';

    export default {
        props: {},
        data() {
            return {};
        },
        created() {
        },
        mounted() {
        },
        methods: {
            goLogin() {
                store.dispatch('LogOut').then(() => {
                    this.$router.push('/login');
                    setTimeout(() => {
                        location.reload(true);
                    }, 100);
                });
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
