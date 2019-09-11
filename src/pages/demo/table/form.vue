<template>
    <div class="content">
        <sg-page-form
            :ref-obj.sync="formInfo.ref"
            v-model="formInfo.data"
            :field-list="formInfo.fieldList"
            :rules="formInfo.rules"
            :label-width="formInfo.labelWidth"
            @update-account="onUpdateAccont"
            @submit="onSubmit"
        >
            <template slot="form-header">
                <h2>新增账号</h2>
            </template>
            <el-form-item label="测试" prop="test" slot="test">
                <el-input type="text" name="test" v-model="formInfo.data.test"></el-input>
            </el-form-item>
        </sg-page-form>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (!/^[\w_-]{6,16}$/.test(value)) {
                    callback(new Error('密码格式有误'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.formInfo.data.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                // 表单相关
                formInfo: {
                    ref: null,
                    data: {
                        test: '',
                        account: '',
                        password: '',
                        password2: '',
                        note: '这里空空如也',
                        birthday: '',
                        updatetime: '',
                        sex: 2
                    },
                    fieldList: [
                        {
                            name: 'account',
                            label: '账号',
                            fieldType: 'text',
                            class: 'form-item-account'
                        },
                        {
                            name: 'password',
                            label: '密码',
                            type: 'password',
                            fieldType: 'password'
                        },
                        {
                            name: 'password2',
                            label: '确认密码',
                            type: 'password',
                            fieldType: 'password'
                        },
                        {
                            name: 'birthday',
                            label: '生日',
                            type: 'date',
                            fieldType: 'date',
                            valueFormat: 'yyyy-MM-dd'
                        },
                        {
                            name: 'updatetime',
                            label: '编辑时间',
                            type: 'datetimerange',
                            fieldType: 'date'
                        },
                        {
                            name: 'note',
                            label: '备注',
                            type: 'textarea',
                            fieldType: 'textarea'
                        },
                        {
                            name: 'test',
                            fieldType: 'slot'
                        },
                        {
                            name: 'sex',
                            label: '性别',
                            fieldType: 'select',
                            options: [
                                {
                                    label: '男',
                                    value: 1
                                },
                                {
                                    label: '女',
                                    value: 2
                                }
                            ]
                        }
                    ],
                    rules: {
                        // account: [
                        //     { required: true, message: '请输入账号', trigger: 'blur' }
                        // ],
                        password: [
                            { required: true, validator: validatePass, trigger: 'change' }
                        ],
                        password2: [
                            { required: true, validator: validatePass2, trigger: 'change' }
                        ],
                        test: [
                            { required: true, message: '请输入', trigger: 'blur' },
                            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                        ]
                    },
                    labelWidth: '80px'
                }
            };
        },
        mounted() {
        },
        methods: {
            onUpdateAccont(val) {
                console.log('账号更新', val);
            },
            onSubmit() {
                this.formInfo.ref.validate(valid => {
                    if (valid) {
                        console.log('success');
                    }
                });
            }
        }
    };
</script>
<style scoped lang="scss">
</style>
