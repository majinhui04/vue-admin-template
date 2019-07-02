<template>
    <div class="content">
        111123132131
    </div>
</template>

<script>
    export default {
        data() {
            return {
                rules: {
                    type: [{ required: true, message: 'type is required', trigger: 'change' }],
                    timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
                    title: [{ required: true, message: 'title is required', trigger: 'blur' }]
                },
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                dialogFormVisible: false,
                dialogStatus: '',
                // 编辑用的临时数据
                temp: {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published'
                },
                statusOptions: ['published', 'draft', 'deleted'],
                total: 0,
                listQuery: {
                    page: 1,
                    limit: 20
                },
                listLoading: false,
                list: []
            };
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                };
                return statusMap[status];
            }
        },
        created() {
            // this.getList();
        },
        methods: {
            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作Success',
                    type: 'success'
                });
                row.status = status;
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row); // copy obj
                this.temp.timestamp = new Date(this.temp.timestamp);
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate();
                });
            },
            handleFilter() {
                this.listQuery.page = 1;
                this.getList();
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
                        this.temp.author = 'damon';
                        this.$api.articleCreate(this.temp).then(() => {
                            this.list.unshift(this.temp);
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: 'Success',
                                message: 'Created Successfully',
                                type: 'success',
                                duration: 2000
                            });
                        });
                    }
                });
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp);
                        tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                        this.$api.articleUpdate(tempData).then(() => {
                            for (const v of this.list) {
                                if (v.id === this.temp.id) {
                                    const index = this.list.indexOf(v);
                                    this.list.splice(index, 1, this.temp);
                                    break;
                                }
                            }
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: 'Success',
                                message: 'Update Successfully',
                                type: 'success',
                                duration: 2000
                            });
                        });
                    }
                });
            },
            handleDelete(row) {
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
                    this.getList();
                    // const index = this.list.indexOf(row);
                    // this.list.splice(index, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getList() {
                this.listLoading = true;
                this.$api.articleList(this.listQuery).then(response => {
                    this.list = response.data.items;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
