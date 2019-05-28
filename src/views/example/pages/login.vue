<template>
    <div class="login-container">
        <div class="login-form-container">
            <div class="main">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="off">
                    <div class="logo"></div>
                    <div class="head">
                        <span class="title">后台管理系统</span>
                    </div>
                    <el-form-item prop="loginName">
                        <el-input
                            size="big"
                            v-model.trim="loginForm.loginName"
                            name="phone"
                            type="text"
                            auto-complete="off"
                            placeholder="账号"
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            size="big"
                            :type="pwdType"
                            v-model.trim="loginForm.password"
                            name="password"
                            auto-complete="off"
                            placeholder="密码"
                            @keyup.enter.native="handleLogin"
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            size="big"
                            :loading="loading"
                            type="primary"
                            style="width:100%;"
                            @click="handleLogin"
                        >登录</el-button>
                    </el-form-item>
                    <div class="tips">账号 : admin 密码 : 随便填</div>
                </el-form>
            </div>
        </div>

        <!--浙ICP备33010902002069-->
        <div class="copyright">Copyright © 2018 杭州名融网络有限公司 All Rights Reserved</div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    loginName: '',
                    password: ''
                },
                loginRules: {
                    loginName: [{ required: true, message: '请填写登录名', trigger: 'blur' }],
                    password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
                },
                loading: false,
                pwdType: 'password',
                redirect: undefined
            };
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('LogIn', this.loginForm).then(res => {
                            this.loading = false;
                            this.$router.push({ path: '/' });
                        }).catch(() => {
                            this.loading = false;
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
    position: fixed;
    height: 100%;
    width: 100%;

    .copyright {
        position: fixed;
        text-align: center;
        z-index: -1;
        left: 0;
        bottom: 30px;
        width: 100%;
        color: #333;
    }

    .login-form-container {
        z-index: 10;
        width: 1140px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .main {
            position: absolute;
            width: 400px;
            height: 350px;
            padding: 30px 60px;
            border-radius: 10px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2),
                0 26px 24px 0 rgba(12, 23, 44, 0.1);

            .logo {
                box-shadow: 0 -2px 3px -1px rgba(0, 0, 0, 0.2);
                width: 120px;
                height: 120px;
                border-radius: 100%;
                position: absolute;
                left: 50%;
                top: 0;
                background: #FFF url("../assets/img/logo.png") no-repeat center center;
                background-size: 60% 60%;
                transform: translate(-50%,-50%);
                border-top: 1px solid #ddd;
            }
            .title {
                font-size: 26px;
                font-weight: 400;
                color: #333;
                margin-left: 10px;
                text-align: center;
            }

            .head {
                margin-top: 30px;
                margin-bottom: 30px;
                text-align: center;
            }
        }
    }
}
</style>
