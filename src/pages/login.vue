<template>
    <div class="login-container">
        <div class="login-form-container">
            <div class="main">
                <div class="main-bg">
                    <div class="login-title">登录{{test}}</div>
                    <div class="login-form">
                        <div class="form-loginName row">
                            <label :class="{'focus-label': loginNameActive}">账号</label>
                            <div class="value">
                                <input ref="loginName" type="text" class="login-account"
                                       v-model.trim="loginForm.loginName" @focus="handleFocus('loginName', 'focus')"
                                       @blur="handleBlur('loginName', 'focus')" autocomplete="off"
                                       @keyup.enter="handleLogin"/>
                            </div>
                        </div>
                        <div class="login-password row mt0">
                            <label :class="{'focus-label': passwprdActive}">密码</label>
                            <div class="value">
                                <input ref="password" :type="pwdType" class="login-account"
                                       v-model.trim="loginForm.password" @focus="handleFocus('password', 'focus')"
                                       @blur="handleBlur('password', 'focus')" @keyup.enter="handleLogin"
                                       autocomplete="off"/>
                            </div>
                        </div>
                        <div class="no-value">{{textActive}}</div>
                    </div>
                    <div class="login-button"><a class="login-submit" @click="handleLogin">登录</a></div>
                    <div class="tips">tips: 测试账号 admin/123456</div>
                </div>
                <div class="main-banner">
                    <div class="project-title">{{title}}</div>
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
                test: process.env.VUE_APP_BASE_ENV || '',
                loginForm: {
                    loginName: '',
                    password: ''
                },
                loading: false,
                pwdType: 'password',
                redirect: undefined,
                loginNameActive: false,
                passwprdActive: false,
                textActive: '',
                title: this.$store.state.settings.title
            };
        },
        mounted() {
        },
        methods: {
            handleLogin() {
                if (!this.loginForm.loginName && !this.loginForm.password) {
                    this.textActive = '请输入账号';
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
                this.loginNameActive = name === 'loginName' || this.loginForm.loginName.length > 0;
                this.passwprdActive = name === 'password' || this.loginForm.password.length > 0;
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
        .copyright {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 30px;
            width: 100%;
            text-align: center;
            color: rgba(10, 18, 32, .46);
        }
        .login-form-container {
            .tips {
                font-size: 12px;
                padding: 12px 0;
                color: rgba(10, 18, 32, .64);
            }
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
                        margin-bottom: 30px;
                        font-size: 14px;
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
                                font-size: 14px;
                                color: rgba(0, 0, 0, 0.4);
                                transition: 0.2s ease-in-out all;
                            }
                            .focus-label {
                                transition: 0.2s ease-in-out all;
                                top: -28px;
                                font-size: 12px;
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
                                transition: 0.2s ease-in-out all;
                                outline: none;
                                box-shadow: inset 0 -1px 0 #5182e4, 0 1px 0 #5182e4;
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
                    .login-button {
                        .login-submit {
                            display: block;
                            width: 120px;
                            padding: 0 32px;
                            line-height: 40px;
                            border-radius: 40px;
                            font-size: 14px;
                            background: #2e68dc;
                            box-shadow: 0 4px 8px 0 rgba(30, 62, 124, 0.15);
                            color: #fff;
                            text-align: center;
                        }
                        .login-submit:focus {
                            outline: none;
                        }
                    }
                }
                .main-banner {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 300px;
                    height: 100%;
                    text-align: center;
                    background-image: linear-gradient(#4562e9 0, #56b5fe 100%), radial-gradient(#5888f5 2%, #586ef5 60%, #7558f4 100%);
                    .project-logo {
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
                        left: 22px;
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
                        background: url('../assets/img/login-banner1.png') center center no-repeat;
                        background-size: cover;
                    }
                }
            }
        }
    }
</style>
