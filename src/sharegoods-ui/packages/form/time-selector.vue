<template>
    <el-form-item :label="label">
        <el-date-picker
            v-model="currentValue"
            @input="onInputEvent"
            :type="type || 'datetime'"
            :value-format="valueFormat || 'yyyy-MM-dd'"
            :format="format || 'yyyy-MM-dd'"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        props: ['label', 'name', 'value', 'type', 'valueFormat', 'format'],
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value
            };
        }
    };
</script>
