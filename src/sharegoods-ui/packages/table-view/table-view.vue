<template>
    <div class="sg-table-container">
        <div class="sg-tools">
            <el-button :type="item.type || 'primary'" v-for="(item,i) in tools" :key="i"
                       @click="item.onClick">{{item.label}}
            </el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleTabClick" v-if="tabs" class="sg-tabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab,index) in tabs" :key="index"></el-tab-pane>
        </el-tabs>
        <el-table
            class="sg-table"
            v-loading="listLoading"
            :data="dataSource"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @selection-change="handleSelectionChange"
        >
            <template v-for="(col,index) in columns">
                <el-table-column v-if="col.type ==='selection'" :key="index" type="selection" :width="col.width"
                                 align="center"></el-table-column>
                <el-table-column v-else :label="col.label" :prop="col.prop" align="center" :key="index" :type="col.type"
                                 :width="col.width">
                    <template slot-scope="scope" v-if="col.prop">
                        <template v-if="col.customRender">
                            <div v-html="col.customRender(scope.row)"></div>
                        </template>
                        <template v-else-if="col.buttons">
                            <div>
                                <el-button :type="item.type || 'primary'" v-for="(item,i) in col.buttons" :key="i"
                                           @click="item.onClick(scope.row)">{{item.customRender?item.customRender(scope.row):item.label}}
                                </el-button>
                            </div>
                        </template>
                        <template v-else-if="col.prop">
                            {{scope.row[col.prop]}}
                        </template>
                        <template v-else></template>
                    </template>
                </el-table-column>
            </template>

        </el-table>
        <div class="" style="height: 14px;" v-if="paginationFixed"></div>
        <pagination
            v-show="total>0"
            :total="total"
            :page.sync="pagination.page"
            :limit.sync="pagination.limit"
            @pagination="fetchList"
            :class="{'fixed':paginationFixed}"
            class="right sg-pagination"
        />
    </div>
</template>

<script>
    import Pagination from '../pagination/index.vue';

    export default {
        name: 'SgTableView',
        components: { Pagination },
        props: {
            paginationFixed: {
                type: Boolean,
                default: false
            },
            auto: {
                type: Boolean,
                default: true
            },
            tools: {
                type: Array,
                default() {
                    return null;
                }
            },
            tabs: {
                type: Array,
                default() {
                    return null;
                }
            },
            config: {
                type: Object,
                default() {
                    return {};
                }
            },
            query: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        computed: {},
        data() {
            return {
                activeName: '',
                pagination: {
                    page: 1,
                    limit: 10
                },
                total: 0,
                listLoading: false,
                dataSource: [],
                columns: this.config.columns || [],
                multipleSelection: []
            };
        },
        created() {
            if (this.tabs) {
                this.activeName = this.tabs[0].name;
            }
            this.auto && this.fetchList({
                page: 1
            });
        },
        methods: {
            // 获取选中数据
            getChecked() {
                return this.multipleSelection;
            },
            // 点击tab触发数据加载
            handleTabClick(k) {
                this.fetchList({
                    page: 1
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 加载数据
            fetchList({ page }) {
                const activeName = this.activeName;
                this.listLoading = true;
                if (page) {
                    this.pagination.page = page;
                }
                this.config.load && this.config.load({ ...this.pagination, activeName }).then(res => {
                    const body = res.data || {};
                    const list = body.data || body.items || [];
                    this.total = body.total;
                    this.dataSource = list;
                    this.listLoading = false;
                }).catch(() => {
                    this.listLoading = false;
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .sg-tabs {
        width: 100%;
    }

    .sg-tools {
        margin-bottom: 15px;
    }

    .sg-table {
        margin-bottom: 15px;
    }
    .sg-pagination {
        &.fixed {
            height: 50px;
            padding-top: 10px;
            position: fixed;
            bottom: 0;
            background-color: #FFF;
            z-index: 10;
            border: 1px solid #ddd;
        }
    }
</style>
