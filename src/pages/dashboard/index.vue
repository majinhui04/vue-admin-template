<template>
    <div class="content">
        <p>权限测试</p>
        <el-button type="primary" v-auth="'dashboard.button1'">按钮1-dashboard.button1</el-button>
        <el-button type="primary" v-auth="'dashboard.button2'">按钮2-dashboard.button2</el-button>
        <p :class="{'no-auth':!$hasAuth('dashboard.block1')}">
            这里根据不同的权限显示不同的样式,<b>没权限显示红色</b>
        </p>
    </div>
</template>
<script>
    export default {
        mounted(){
        }
    }
</script>
<style scoped lang="scss">
    .no-auth {
        color: red;
    }
</style>
