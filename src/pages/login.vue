<template>
    <div class="login-container">
        <div class="login-form-container">
            <div class="main">
                <div class="main-bg">
                    <div class="login-title">登录</div>
                    <div class="login-form">
                        <div class="form-loginName row">
                            <label :class="{'focus-label': loginNameActive}">手机号/邮箱</label>
                            <div class="value">
                                <input ref="loginName" type="text" class="login-account" v-model.trim="loginForm.loginName" @focus="handleFocus('loginName', 'focus')" @blur="handleBlur('loginName', 'focus')" autocomplete="off" />
                            </div>
                        </div>
                        <div class="login-password row mt0">
                            <label :class="{'focus-label': passwprdActive}">密码</label>
                            <div class="value">
                                <input ref="password" :type="pwdType" class="login-account" v-model.trim="loginForm.password" @focus="handleFocus('password', 'focus')" @blur="handleBlur('password', 'focus')" @keyup.enter.native="handleLogin" autocomplete="off" />
                            </div>
                        </div>
                        <div class="no-value">{{textActive}}</div>
                    </div>
                    <button class="login-submit" @click="handleLogin">登录</button>
                </div>
                <div class="main-banner">
                    <div class="project-logo"></div>
                    <div class="project-title">资金中心</div>
                    <div class="project-banner"></div>
                </div>
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
            redirect: undefined,
            loginNameActive: false,
            passwprdActive: false,
            textActive: ''
        };
    },
    mounted() {},
    methods: {
        handleLogin() {
            if (!this.loginForm.loginName && !this.loginForm.password) {
                this.textActive = '请输入手机号';
                return;
            } else if (!this.loginForm.password) {
                this.textActive = '请输入密码';
                return;
            }
            this.textActive = '';
            this.loading = true;
            this.$store
                .dispatch('LogIn', this.loginForm)
                .then(res => {
                    this.loading = false;
                    this.$router.push({ path: '/' });
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        handleFocus(name, type) {
            this.loginNameActive = name === 'loginName' || this.loginForm.loginName.length > 0 ? true : false;
            this.passwprdActive = name === 'password' || this.loginForm.password.length > 0 ? true : false;
        },
        handleBlur(name, type) {
            if (name === 'loginName') {
                this.loginNameActive = false;
            }
            if (name === 'password') {
                this.passwprdActive = false;
            }
            if (this.loginForm.loginName.length > 0) {
                this.loginNameActive = true;
            }
            if (this.loginForm.password.length > 0) {
                this.passwprdActive = true;
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
    display: table;
    width: 100%;
    height: 100%;
    margin: 0 auto;
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
        display: table-cell;
        width: 100%;
        height: auto;
        vertical-align: middle;
        .main {
            width: 646px;
            margin: 0 auto;
            position: relative;
            box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2), 0 26px 24px 0 rgba(12, 23, 44, 0.1);
            .main-bg {
                width: 346px;
                min-height: 384px;
                margin-left: 300px;
                padding: 32px 48px;
                text-align: left;
                background: #fff;
                transition: all 0.3s ease-in-out;
                .login-title {
                    text-align: center;
                    line-height: 40px;
                    color: #5182e4;
                    transition: all 0.2s ease-in-out;
                    box-shadow: inset 0 -1px 0 #5182e4, 0 1px 0 #5182e4;
                    margin-bottom: 40px;
                    font-size: 16px;
                }
                .login-form {
                    .row {
                        overflow: visible;
                        position: relative;
                        margin-bottom: 30px;
                        label {
                            position: absolute;
                            top: 0;
                            line-height: 32px;
                            text-align: left;
                            font-size: 16px;
                            color: rgba(0, 0, 0, 0.5);
                            transition: 0.2s ease-in-out all;
                        }
                        .focus-label {
                            transition: 0.2s ease-in-out all;
                            top: -30px;
                            font-size: 14px;
                        }
                        .login-account {
                            position: relative;
                            z-index: 2;
                            width: 100%;
                            height: 28px;
                            margin: 2px 0;
                            line-height: 28px;
                            vertical-align: bottom;
                            font-size: 14px;
                            border: 0;
                            background: 0 0;
                            box-shadow: inset 0 -1px 0 0 rgba(81, 130, 228, 0.6);
                            color: rgba(10, 18, 32, 0.87);
                            transition: 0.2s ease-in-out all;
                        }
                        .login-account:focus {
                            box-shadow: inset 0 -1px 0 0 #5182e4;
                            transition: 0.2s ease-in-out all;
                            outline: none;
                        }
                    }
                    .mt0 {
                        margin-bottom: 0;
                    }
                    .no-value {
                        min-height: 32px;
                        line-height: 32px;
                        color: #e45151;
                        font-size: 12px;
                        text-align: left;
                    }
                }
                .login-submit {
                    min-width: 120px;
                    padding: 0 32px;
                    line-height: 40px;
                    border-radius: 40px;
                    font-size: 14px;
                    background: #2e68dc;
                    box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
                    color: #fff;
                }
                .login-submit:focus {
                    outline: none;
                }
            }
            .main-banner {
                position: absolute;
                top: 0;
                left: 0;
                width: 300px;
                height: 100%;
                text-align: center;
                background-image: -webkit-linear-gradient(#4562e9 0, #56b5fe 100%), -webkit-radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
                background-image: -o-linear-gradient(#4562e9 0, #56b5fe 100%), -o-radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
                background-image: linear-gradient(#4562e9 0, #56b5fe 100%), radial-gradient(18% 84%, #5888f5 2%, #586ef5 60%, #7558f4 100%);
                .project-logo {
                    // color: #fff;
                    position: absolute;
                    top: 2px;
                    left: 22px;
                    display: block;
                    line-height: 60px;
                    width: 116px;
                    height: 64px;
                    font-size: 30px;
                    background: url('../assets/img/logo.png') center center no-repeat;
                }
                .project-title {
                    color: #fff;
                    position: absolute;
                    top: 2px;
                    right: 22px;
                    display: block;
                    line-height: 60px;
                    font-size: 30px;
                }
                .project-banner {
                    position: relative;
                    left: 50%;
                    top: 50%;
                    width: 233px;
                    height: 233px;
                    margin-top: -96.5px;
                    margin-left: -116.5px;
                    background: url('../assets/img/banner.jpg') center center no-repeat;
                    background-size: cover;
                }
            }
            .logo {
                width: 70px;
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
                margin-bottom: 50px;
                text-align: center;
            }
        }
    }
}
</style>
