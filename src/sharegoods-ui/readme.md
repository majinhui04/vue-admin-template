# components

## SgTableView
表单数据分页展示

Attributes

| Name            | Type        | Default           | Description                   |
| --------------- | ----------- | ----------------- | ----------------------------- |
| tools       | Array      |       | 表格操作按钮列表   |
| tabs       | Array      |       | 表格搜索状态列表   |
| config       | Object      |       | 表格配置项，需要提供`columns`列表配置以及`load`加载数据方法   |
| paramsFormatter       | Object      |       | 分页参数转化{'page':'page','pageSize':'pageSize','activeName':'activeName'}   |
| responseFormatter       | Function      |       | 获取异步数据的列表字段以及分页字段   |


## SgTableFilter
todo

# changelog

## 1.0.0
#### 新特性
- SgTableView
    - 支持修改数据源dataList
#### Bug 修复
#### 优化