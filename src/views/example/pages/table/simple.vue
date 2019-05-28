<template>
    <div class="content">
        <sg-table-filter :config="filterConfig" v-model="formData" @submit="search" class="news-filter-container"></sg-table-filter>
        <sg-table-view :config="tableConfig" :tabs="tabs" :tools="tools" ref="sgTableView"></sg-table-view>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                formData: {
                    code: '',
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
                }],
                tabs: [
                    {
                        label: '选项A',
                        name: 'a'
                    },
                    {
                        label: '选项B',
                        name: 'b'
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
                            label: '标题',
                            prop: 'title'
                        },
                        {
                            label: '作者',
                            prop: 'author'
                        },
                        {
                            label: '操作',
                            prop: 'title',
                            buttons: [
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
                                    }
                                }
                            ]
                        }
                    ],
                    load: (params) => {
                        const data = { ...params, ...this.formData };
                        return this.$api.articleList(data).then(res => {
                            console.log(44, res);
                            return res;
                        }).catch(err => {
                            console.log(33, err);
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
                            name: 'beginTime',
                            label: '开始时间',
                            fieldType: 'TimeSelector',
                            cols: 8
                        },
                        {
                            name: 'endTime',
                            label: '结束时间',
                            fieldType: 'TimeSelector',
                            cols: 8
                        }
                    ]
                }
            };
        },
        created() {
            this.queryOrderType();
        },
        methods: {
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
