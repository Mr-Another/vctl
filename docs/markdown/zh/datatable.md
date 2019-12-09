[[toc]]

## DataTable 数据表格

### DataTable 数据渲染

:::demo

```html
<template>
  <div style="height:700px;width:100;">
    <blue-datatable
    @actionclick="actionclick"
      @pageChange="pageChange"
      @filtercolleCtionSearch="filtercolleCtionSearch"
      :tabledatas="tabledatas"
      :tablecolumns="tablecolumns1"
      :actions="actions"
      :filters="filters"
      :advfilters="advfilters"
      ref="table"
      checkbox
      border
      :pagination="pagination"
      @sort="sort"
      @rowSelect="rowSelect"
    ></blue-datatable>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                tabledatas: [
                    { index: 1, id: "abc1", name: "测试1", age: 1, address: "上海1", address2: "上海21" },
                    { index: 2, id: "abc2", name: "测试2", age: 2, address: "上海2", address2: "上海22" },
                    { index: 3, id: "abc3", name: "测试3", age: 3, address: "上海3", address2: "上海23" },
                    { index: 4, id: "abc4", name: "测试4", age: 4, address: "上海4", address2: "上海24" },
                    { index: 5, id: "abc5", name: "测试5", age: 5, address: "上海5", address2: "上海25" },
                    { index: 6, id: "abc6", name: "测试6", age: 6, address: "上海6", address2: "上海26" },
                    { index: 7, id: "abc7", name: "测试7", age: 7, address: "上海7", address2: "上海27" },
                    { index: 8, id: "abc8", name: "测试8", age: 8, address: "上海8", address2: "上海28" },
                    { index: 9, id: "abc9", name: "测试9", age: 9, address: "上海9", address2: "上海29" }
                ],
                actions: [
                    { title: "新增", icon: "icon-check-circle", color: "primary" },
                    { title: "删除", icon: "", color: "primary" }
                ],
                tablecolumns1: [
                    {
                    title: "序号",
                    prop: "index",
                    width: 150,
                    align: "center",
                    sort: true
                    },
                    { title: "ID", prop: "id", width: 150, align: "center" },
                    { title: "姓名", prop: "name", width: 150, align: "center" },
                    { title: "年龄", prop: "age", width: 150, align: "center" },
                    { title: "地址", prop: "address", width: 150, align: "center" }
                ],
                filters: [
                    { title: "姓名", type: "text", name: "name" },
                    { title: "部门", type: "text", name: "dname" },
                    { title: "日期", type: "date", name: "date" },
                    { title: "选择", type: "select", name: "select", datas: ["a", "b"] }
                ],
                advfilters: [
                    { title: "姓名", type: "text", name: "add" },
                    { title: "部门", type: "text", name: "add" },
                    { title: "用户名", type: "text", name: "add" }
                ],
                pagination: {
                    total: 11,
                    size: 10,
                    cur: 1
                }
            }
        },
        methods: {
            actionclick(e) {
                console.log(e);
                this.$refs.table.$refs.table.clearRowSelect();
            },
            pageChange(e) {
                console.log(e);
                this.$refs.table.pagination.cur = e.cur;
                this.$refs.table.pagination.size = e.size;
            },
            filtercolleCtionSearch(params) {
                console.log(params);
            },
            sort(data) {
                this.tabledatas.sort((a, b) => {
                    let ad = a[data.prop],
                    bd = b[data.prop];
                    let index = ad == bd ? 0 : ad > bd ? 1 : -1;
                    return data.type == "asc" ? index : -index;
                });
            },
            rowSelect(param){
                console.log(param)
            }
        },
    }
</script>
```

:::

### DataTable 自定义表头

:::demo

```html
<template>
  <div style="height:700px;width:100;">
    <blue-datatable
    @actionclick="actionclick"
      @pageChange="pageChange"
      @filtercolleCtionSearch="filtercolleCtionSearch"
      :tabledatas="tabledatas"
      :tablecolumns="tablecolumns"
      :actions="actions"
      :filters="filters"
      :advfilters="advfilters"
      :ths="ths"
      ref="table"
      :pagination="pagination"
      @sort="sort"
    ></blue-datatable>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                tabledatas: [
                    { index: 1, id: "abc1", name: "测试1", age: 1, address: "上海1", address2: "上海21" },
                    { index: 2, id: "abc2", name: "测试2", age: 2, address: "上海2", address2: "上海22" },
                    { index: 3, id: "abc3", name: "测试3", age: 3, address: "上海3", address2: "上海23" },
                    { index: 4, id: "abc4", name: "测试4", age: 4, address: "上海4", address2: "上海24" },
                    { index: 5, id: "abc5", name: "测试5", age: 5, address: "上海5", address2: "上海25" },
                    { index: 6, id: "abc6", name: "测试6", age: 6, address: "上海6", address2: "上海26" },
                    { index: 7, id: "abc7", name: "测试7", age: 7, address: "上海7", address2: "上海27" },
                    { index: 8, id: "abc8", name: "测试8", age: 8, address: "上海8", address2: "上海28" },
                    { index: 9, id: "abc9", name: "测试9", age: 9, address: "上海9", address2: "上海29" }
                ],
                actions: [
                    { title: "新增", icon: "icon-check-circle", color: "primary" },
                    { title: "删除", icon: "", color: "primary" }
                ],
                ths: [
                        [
                            { title: "序号", rowspan: 2 },
                            { title: "编码", tooltip: true },
                            { title: "信息", colspan: 2 },
                            { title: "address", rowspan: 2 }
                        ],
                        [
                            { title: "ID", prop: "id", sort: "auto" },
                            { title: "姓名" },
                            { title: "年龄" }
                        ]
                    ],
                tablecolumns: [
                    { prop: "index", width: 100 },
                    { prop: "id", width: 100 },
                    { prop: "name", width: 100 },
                    { prop: "age", width: 100 },
                    { prop: "address", width: 150 }
                  ],
                filters: [
                    { title: "姓名", type: "text", name: "name" },
                    { title: "部门", type: "text", name: "dname" },
                    { title: "日期", type: "date", name: "date" },
                    { title: "选择", type: "select", name: "select", datas: ["a", "b"] }
                ],
                advfilters: [
                    { title: "姓名", type: "text", name: "add" },
                    { title: "部门", type: "text", name: "add" },
                    { title: "用户名", type: "text", name: "add" }
                ],
                pagination: {
                    total: 11,
                    size: 10,
                    cur: 1
                }
            }
        },
        methods: {
            actionclick(e) {
                console.log(e);
                this.$refs.table.$refs.table.clearRowSelect();
            },
            loaded(data, param) {
                console.log("data-loaded", data, param);
            },
            pageChange(e) {
                console.log(e);
                this.$refs.table.pagination.cur = e.cur;
                this.$refs.table.pagination.size = e.size;
            },
            filtercolleCtionSearch(params) {
                console.log(params);
            },
            sort(data) {
                this.tabledatas.sort((a, b) => {
                    let ad = a[data.prop],
                    bd = b[data.prop];
                    let index = ad == bd ? 0 : ad > bd ? 1 : -1;
                    return data.type == "asc" ? index : -index;
                });
            }
        },
    }
</script>
```

:::

### DataTable 参数
| 参数              | 说明                  | 类型    | 可选值 | 默认值   |
| -------------     | -------------------- | ------- | ------ | -------- |
| actions | 定义 DataTable 的按钮  | Array   | - | [] |
| tabledatas   | 列表展示需要的数据  | Array   | -      | []       |
| tablecolumns   | 定义列表表头（详见table组件TableItem / Column 参数）  | Array   | -      | []       |
|filters| 定义过滤条件|  Array  |  - | [] |
|advfilters | 定义高级过滤条件 | Array | - | [] |
| pagination | 定义分页器（详见分页Pagination 参数）  | Object |  - | {} | 
| showPagination | DataTable使用分页器 | Boolean | | true |
| ths | 自定义列表表头（详见table自定义表头） | Array | - | [] |

### DataTable 事件
|方法 | 说明 |
|-----|-----|
|pageChange|切换分页|
|clickactions |按钮点击事件|
|filtersearch | 搜索事件 | 

<script>
    export default {
        data(){
            return {
                tabledatas: [
                    { index: 1, id: "abc1", name: "测试1", age: 1, address: "上海1", address2: "上海21" },
                    { index: 2, id: "abc2", name: "测试2", age: 2, address: "上海2", address2: "上海22" },
                    { index: 3, id: "abc3", name: "测试3", age: 3, address: "上海3", address2: "上海23" },
                    { index: 4, id: "abc4", name: "测试4", age: 4, address: "上海4", address2: "上海24" },
                    { index: 5, id: "abc5", name: "测试5", age: 5, address: "上海5", address2: "上海25" },
                    { index: 6, id: "abc6", name: "测试6", age: 6, address: "上海6", address2: "上海26" },
                    { index: 7, id: "abc7", name: "测试7", age: 7, address: "上海7", address2: "上海27" },
                    { index: 8, id: "abc8", name: "测试8", age: 8, address: "上海8", address2: "上海28" },
                    { index: 9, id: "abc9", name: "测试9", age: 9, address: "上海9", address2: "上海29" }
                ],
                actions: [
                    { title: "新增", icon: "icon-check-circle", color: "primary" },
                    { title: "删除", icon: "", color: "primary" }
                ],
                ths: [
                        [
                                { title: "序号", rowspan: 2 },
                                { title: "编码", tooltip: true },
                                { title: "信息", colspan: 2 },
                                { title: "地址", rowspan: 2 }
                            ],
                            [
                                { title: "ID", prop: "id", sort: "auto" },
                                { title: "姓名" },
                                { title: "年龄" }
                        ]
                    ],
                tablecolumns1: [
                    {
                    title: "序号",
                    prop: "index",
                    width: 150,
                    align: "center",
                    sort: true
                    },
                    { title: "ID", prop: "id", width: 150, align: "center" },
                    { title: "姓名", prop: "name", width: 150, align: "center" },
                    { title: "年龄", prop: "age", width: 150, align: "center" },
                    { title: "地址", prop: "address", width: 150, align: "center" }
                ],
                tablecolumns: [
                    { prop: "index", width: 100 },
                    { prop: "id", width: 100 },
                    { prop: "name", width: 100 },
                    { prop: "age", width: 100 },
                    { prop: "address", width: 150 }
                  ],
                filters: [
                    { title: "姓名", type: "text", name: "name" },
                    { title: "部门", type: "text", name: "dname" },
                    { title: "日期", type: "date", name: "date" },
                    { title: "选择", type: "select", name: "select", datas: ["a", "b"] }
                ],
                advfilters: [
                    { title: "I D", type: "text", name: "add" },
                    { title: "年龄", type: "text", name: "add" },
                    { title: "地址", type: "text", name: "add" }
                ],
                pagination: {
                    total: 11,
                    size: 10,
                    cur: 1
                }
            }
        },
        methods: {
            actionclick(e) {
                console.log(e);
                this.$refs.table.$refs.table.clearRowSelect();
            },
            loaded(data, param) {
                console.log("data-loaded", data, param);
            },
            pageChange(e) {
                console.log(e);
                this.$refs.table.pagination.cur = e.cur;
                this.$refs.table.pagination.size = e.size;
            },
            filtercolleCtionSearch(params) {
                console.log(params);
            },
            sort(data) {
                this.tabledatas.sort((a, b) => {
                    let ad = a[data.prop],
                    bd = b[data.prop];
                    let index = ad == bd ? 0 : ad > bd ? 1 : -1;
                    return data.type == "asc" ? index : -index;
                });
            },
            rowSelect(param){
                console.log(param)
            }
        },
    }
</script>