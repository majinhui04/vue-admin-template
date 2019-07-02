<template>
    <sg-table-editor :headData="headData" :bodyData="bodyData" @multipleData="multipleData" @editData="editData">
        <template slot="operate" slot-scope="props">
            <span @click="splitEdit(props.rowData)">修改</span>
            <span @click="splitAdd(props.rowData)">新增</span>
            <span @click="splitDel(props.rowData)">删除</span>
        </template>
    </sg-table-editor>
</template>

<script>
export default {
    data() {
        return {
            headData: ['城市', '美食', '好玩的地方'],
            bodyData: [
                { city: { value: '北京', type: 'input' }, food: '北京烤鸭', fun: ['故宫', '颐和园', '长城'] },
                {
                    city: '深圳',
                    food: ['肠粉', '牛肉火锅'],
                    fun: ['西冲', '华侨城', '世界之窗']
                },
                {
                    city: ['重庆', '成都', '武汉'],
                    food: ['重庆老火锅', '重庆烤鱼', '重庆小面', '成都小吃', '武汉热干面'],
                    fun: [{ value: '洪崖洞', type: 'input' }, '峨眉山', '黄鹤楼']
                }
            ]
        };
    },
    methods: {
        splitEdit(rowData) {
            for (const key in rowData) {
                const element = rowData[key];
                if (element.value) {
                    element.value = 'newVal'
                }
            }
            console.log('rowData值为', rowData);
        },

        editData(data) {
            console.log('编辑所在行的值为', data);
        },

        splitAdd(data) {
            data.fun.push('大岩山');
            console.log('新增所在行的值为', data);
        },

        splitDel(data) {
            data.fun.pop();
            console.log('删除所在行的值为', data);
        },

        multipleData(data) {
            console.log('复选框选择的值为', data);
        }
    }
};
</script>
