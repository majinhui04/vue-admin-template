<template>
    <div class="content">
        <div class="filter-container">
            <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
                <el-form-item prop="date" label="时间选择">
                    <el-date-picker
                        style="width: 380px"
                        :default-time="['00:00:00','23:59:59']"
                        v-model="listQuery.dateRange"
                        type="daterange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        clear-icon
                    ></el-date-picker>
                </el-form-item>
                <el-form-item prop="date" label="内容">
                    <el-input v-model="listQuery.key"></el-input>
                </el-form-item>
                <el-form-item label>
                    <el-button @click="handleFilter">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="data-container">
            <el-table
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;"
            >
                <el-table-column label="ID" prop="id" align="center" width="80">
                    <template slot-scope="scope">
                        <span>{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Date" width="150px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timestamp}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Title" min-width="150px">
                    <template slot-scope="{row}">
                        <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
                        <el-tag>{{ row.type }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Author" width="110px" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column v-if="showReviewer" label="Reviewer" width="110px" align="center">
                     <template slot-scope="scope">
                         <span style="color:red;">{{ scope.row.reviewer }}</span>
                     </template>
                </el-table-column>-->
                <el-table-column label="Readings" align="center" width="95">
                    <template slot-scope="{row}">
                        <span
                            v-if="row.pageviews"
                            class="link-type"
                            @click="handleFetchPv(row.pageviews)"
                        >{{ row.pageviews }}</span>
                        <span v-else>0</span>
                    </template>
                </el-table-column>
                <el-table-column label="Status" class-name="status-col" width="100">
                    <template slot-scope="{row}">
                        <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="Actions"
                    align="center"
                    width="230"
                    class-name="small-padding fixed-width"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" @click="handleUpdate(row)">Edit</el-button>
                        <el-button
                            v-if="row.status!='published'"
                            size="mini"
                            type="success"
                            @click="handleModifyStatus(row,'published')"
                        >Publish</el-button>
                        <el-button
                            v-if="row.status!='draft'"
                            size="mini"
                            @click="handleModifyStatus(row,'draft')"
                        >Draft</el-button>
                        <el-button
                            v-if="row.status!='deleted'"
                            size="mini"
                            type="danger"
                            @click="handleDelete(row)"
                        >Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
            class="right"
        />
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="left"
                label-width="70px"
                style="width: 400px; margin-left:50px;"
            >
                <el-form-item label="Date" prop="timestamp">
                    <el-date-picker
                        v-model="temp.timestamp"
                        type="datetime"
                        placeholder="Please pick a date"
                    />
                </el-form-item>
                <el-form-item label="Title" prop="title">
                    <el-input v-model="temp.title"/>
                </el-form-item>
                <el-form-item label="Status">
                    <el-select
                        v-model="temp.status"
                        class="filter-item"
                        placeholder="Please select"
                    >
                        <el-option
                            v-for="item in statusOptions"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Remark">
                    <el-input
                        v-model="temp.remark"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        type="textarea"
                        placeholder="Please input"
                    />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="dialogStatus==='create'?createData():updateData()"
                >确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/common/pagination/index.vue';

    export default {
        components: {
            Pagination
        },
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
            this.getList();
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
