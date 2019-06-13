<template>
    <el-button
        :type="type"
        :size="size"
        :disabled="disabled"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        v-loading.fullscreen.lock="loading"
        @click="handleClick">
        <slot></slot>
    </el-button>
</template>

<script>
    import flatry from '../lib/utils/flatry';

    export default {
        name: 'SgExportButton',
        props: ['api', 'type', 'size', 'disabled', 'tips', 'method'],
        data() {
            return {
                loading: false,
                loadingText: this.tips || '正在导出 Excel ',
                formData: {}
            };
        },
        methods: {
            setFormData(data) {
                this.formData = { ...data };
            },
            handleClick: async function () {
                const method = this.method ? this.method.toUpperCase() : 'POST';
                const params = method === 'POST' ? null : this.formData || {};
                const formData = method === 'POST' ? this.formData || {} : null;
                this.loading = true;
                this.$emit('click');
                const { data } = await flatry(this.$http.download(method, this.api, params, formData));

                if (data === false) {
                    this.$message({
                        type: 'warning',
                        message: '下载文件失败',
                        duration: 1500
                    });
                }

                this.loading = false;
            }
        }
    };
</script>
