<template>
    <div class="content">
        <sg-table-filter :config="filterConfig" v-model="formData" @submit="search"></sg-table-filter>
        <sg-table-view
            resize-target="appContent"
            :config="tableConfig"
            :tabs="tabs"
            :tools="tools"
            ref="sgTableView"
            :response-formatter="responseFormatter"
            :params-formatter="{'activeName':'status','pageSize':'limit'}">
            <button slot="tools">
                <router-link :to="{path:'/demo/table/form'}">新增</router-link>
            </button>
            <el-table-column align="center" slot="author" label="上课了" width="120">
                <template slot-scope="scope"><a href="javascript:void(0)" @click="handleLink(scope.row)">{{
                    scope.row.author }}</a></template>
            </el-table-column>
        </sg-table-view>
    </div>
</template>

<script>

    export default {
        name: 'DemoTableSimple',
        components: {},
        data() {
            return {
                formData: {
                    code: '123',
                    orderType: 'key1',
                    beginTime: '2019-5-12',
                    endTime: ''
                },
                tools: [{
                    label: '导出',
                    onClick: () => {
                        const val = this.$refs['sgTableView'].getChecked();
                        const checked = val.map((item) => item.author);
                        this.$notify({
                            title: 'Success',
                            message: checked.join(','),
                            type: 'success',
                            duration: 2000
                        });
                    }
                },
                    {
                        name: 'tools',
                        type: 'slot'
                    }, {
                        label: '导出',
                        onClick: () => {
                            const val = this.$refs['sgTableView'].getChecked();
                            const checked = val.map((item) => item.author);
                            this.$notify({
                                title: 'Success',
                                message: checked.join(','),
                                type: 'success',
                                duration: 2000
                            });
                        }
                    }],
                tabs: [
                    {
                        label: '选项A',
                        name: ''
                    },
                    {
                        label: '选项B',
                        name: 'b'
                    },
                    {
                        label: '选项C',
                        name: 'c'
                    }
                ],
                tableConfig: {
                    columns: [
                        {
                            width: 55,
                            type: 'selection'
                        },
                        {
                            label: '日期',
                            prop: 'timestamp',
                            customRender(row) {
                                return `<b>${row.timestamp}</b>`;
                            }
                        },
                        {
                            type: 'slot',
                            label: '作者',
                            prop: 'author'
                        },
                        {
                            width: 200,
                            label: '标题',
                            prop: 'title1'
                        },
                        {
                            width: 800,
                            label: '标题',
                            prop: 'title1'
                        },
                        {
                            label: '作者',
                            prop: 'author'
                        },
                        {
                            width: 300,
                            label: '操作',
                            type: 'button',
                            prop: 'title',
                            buttons: [
                                {
                                    customRender(row) {
                                        if (row.status === 'draft') {
                                            return '草稿';
                                        } else {
                                            return '';
                                        }
                                    },
                                    onClick: (row) => {
                                        console.log('test', row);
                                    }
                                },
                                {
                                    label: '删除',
                                    type: 'danger',
                                    onClick: (row) => {
                                        console.log('删除', row);
                                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning'
                                        }).then(() => {
                                            this.$notify({
                                                title: 'Success',
                                                message: '操作成功',
                                                type: 'success',
                                                duration: 2000
                                            });
                                            this.$refs['sgTableView'].fetchList();
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: '已取消删除'
                                            });
                                        });
                                    }
                                },
                                {
                                    label: '修改',
                                    onClick: (row) => {
                                        console.log('修改', row);
                                        this.$api.articleDetail(row).then(res => {
                                            console.log(12345, res);
                                        });
                                    }
                                }
                            ]
                        }
                    ],
                    load: (params) => {
                        const data = { ...params, ...this.formData };
                        return this.$api.articleList(data).then(res => {
                            console.log(res);
                            return res;
                        }).catch(err => {
                            console.log(err);
                            return err;
                        });
                    }
                },
                filterConfig: {
                    fields: [
                        {
                            name: 'code',
                            label: '定单编码',
                            fieldType: 'TextInput',
                            cols: 8
                        },
                        {
                            name: 'orderType',
                            label: '定单类型',
                            fieldType: 'SelectList',
                            options: [],
                            cols: 8
                        },
                        {
                            name: 'endTime',
                            label: '结束时间',
                            type: 'year',
                            fieldType: 'TimeSelector',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            valueFormat: 'yyyy-MM-dd',
                            cols: 8
                        },
                        {
                            name: 'beginTime',
                            label: '时间范围',
                            type: 'datetimerange',
                            defaultTime: ['12:00:00', '18:00:00'],
                            fieldType: 'TimeSelector',
                            cols: 12
                        }
                    ]
                }
            };
        },
        created() {
            this.queryOrderType();
        },
        mounted() {
        },
        methods: {
            handleLink(row) {
            },
            responseFormatter(res) {
                const body = res.data || {};
                const list = body.data || body.items || [];
                const total = body.totalNum || body.total || 0;
                return {
                    list,
                    total
                };
            },
            search() {
                console.log('getFormData', this.formData);
                this.$refs['sgTableView'].fetchList({ page: 1 });
            },
            queryOrderType() {
                setTimeout(() => {
                    this.filterConfig.fields[1].options = [
                        { label: 'select1', value: 'key1' },
                        { label: 'select2', value: 'key2' },
                        { label: 'select3', value: 'key3' }
                    ];
                }, 1000);
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
