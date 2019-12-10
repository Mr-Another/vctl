[[toc]]

## Table 表格

主要用于展示大量结构化数据。
:::tip
非 template/render 模式下，请使用 blue-table。
:::

### Columns 定义模式

:::demo

```html
<template>
  <div>
    <blue-table :datas="datas" :columns="columns">
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { title: "Index", prop: "$index", width: 100 },
          { title: "ID", prop: "id", width: 100, sort: "auto" },
          { title: "Name", prop: "name", sort: "auto" },
          { title: "Age", prop: "age", sort: "auto" },
          { title: "Address", prop: "address" }
        ],
        datas: [
          { id: 5, name: "测试5", age: 9, address: "上海" },
          { id: 6, name: "测试6", age: 8, address: "上海" },
          { id: 7, name: "测试7", age: 14, address: "上海" },
          { id: 5, name: "测试5", age: 17, address: "上海" },
          { id: 6, name: "测试6", age: 18, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" }
        ]
      };
    }
  };
</script>
```

:::

### blue-table-item 定义模式

:::demo

```html
<template>
  <div>
    <p> <blue-button color="blue" icon="icon-plus" @click="add(datas)">添加一行</blue-button></p>
    <blue-table :datas="datas" stripe checkbox>
      <blue-tableitem title="Index" :tooltip="true"><template slot-scope="{index}">{{index}}</template></blue-tableitem>
      <blue-tableitem title="Name" prop="name" sort="auto"></blue-tableitem>
      <blue-tableitem title="Age" prop="age"></blue-tableitem>
      <blue-tableitem title="Address" align="center" prop="address"></blue-tableitem>
      <blue-tableitem title="Operate">
        <template slot-scope="{data}">
          {{data.name}}: 自定义展示
        </template>
      </blue-tableitem>
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        datas: [
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" }
        ]
      };
    },
    methods: {
      add(datas) {
        datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
      }
    }
  };
</script>
```

:::

### 数据渲染

Table 组件内置了一系列的数据渲染模式。

- unit: 定义字段的单位
- dict: 定义字段使用字典渲染
- render: 自定义字段渲染方法

:::demo

```html
<template>
  <div>
    <blue-table :datas="datas" stripe>
      <blue-tableitem title="Index" prop="$index"></blue-tableitem>
      <blue-tableitem title="Name" prop="name" sort="auto"></blue-tableitem>
      <blue-tableitem title="Age" prop="age" unit="年"></blue-tableitem>
      <blue-tableitem
        title="Dict"
        prop="dictData"
        dict="simple"
      ></blue-tableitem>
      <blue-tableitem
        title="Render"
        :render="messageRender"
        prop="address"
      ></blue-tableitem>
      <blue-tableitem title="Operate">
        <template slot-scope="{data}">
          {{data.name}}: 自定义展示
        </template>
      </blue-tableitem>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas: [
          { id: 5, name: "测试5", dictData: null, age: 12, address: "上海" },
          { id: 6, name: "测试6", dictData: 2, age: 13, address: "上海" },
          { id: 7, name: "测试7", dictData: 3, age: 0, address: "上海" },
          {
            id: 5,
            name: "测试5",
            dictData: 4,
            age: undefined,
            address: "上海"
          },
          { id: 6, name: "测试6", dictData: 5, age: -1, address: "上海" },
          { id: 7, name: "测试7", dictData: 6, age: null, address: "上海" }
        ]
      };
    },
    methods: {
      messageRender(data) {
        return `${data.name}:${data.address}`;
      }
    }
  };
</script>
```

:::

### 排序与加载

:::demo

```html
<template>
  <div>
    <p><blue-switch v-model="loading">loading</blue-switch></p>
    <blue-table
      :datas="datas"
      :loading="loading"
      :columns="columns"
      @sort="triggerSort"
    >
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        columns: [
          { title: "Index", prop: "$index", width: 100 },
          { title: "ID", prop: "id", width: 100, sort: true },
          { title: "Name", prop: "name", sort: true },
          { title: "Age", prop: "age", sort: true },
          { title: "Address", prop: "address" }
        ],
        datas: [
          { id: 5, name: "测试5", age: 9, address: "上海" },
          { id: 6, name: "测试6", age: 8, address: "上海" },
          { id: 7, name: "测试7", age: 14, address: "上海" },
          { id: 5, name: "测试5", age: 17, address: "上海" },
          { id: 6, name: "测试6", age: 18, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" }
        ]
      };
    },
    methods: {
      loadData() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 5000);
      },
      triggerSort(data) {
        console.log(data);
        this.datas.sort((a, b) => {
          let ad = a[data.prop],
            bd = b[data.prop];
          let index = ad == bd ? 0 : ad > bd ? 1 : -1;
          return data.type == "asc" ? index : -index;
        });
      }
    }
  };
</script>
```

:::

### Table open/hide row

给行数据 data 的某项设置 \_expand 为 true，可以默认展开当前行
:::demo

```html
<template>
  <div>
    <p>
      <blue-button @click="add(datas)" icon="icon-plus">添加一行</blue-button>
    </p>
    <blue-table :datas="datas" stripe checkbox>
      <blue-tableitem title="序号"
        ><template slot-scope="{index}"
          >{{index}}</template
        ></blue-tableitem
      >
      <blue-tableitem title="姓名" prop="name"></blue-tableitem>
      <blue-tableitem title="年龄" prop="age"></blue-tableitem>
      <blue-tableitem title="地址" prop="address"></blue-tableitem>
      <blue-tableitem title="操作">
        <template slot-scope="{data}">
          <span class="text-hover" @click="open(data)"
            >{{data._expand?'收起':'展开'}}</span
          >
          <span class="text-hover" @click="remove(data)">删除</span>
        </template>
      </blue-tableitem>
      <template slot="expand" slot-scope="{index, data}">
        <blue-form readonly mode="twocolumn">
          <blue-formitem label="序号">{{index}}</blue-formitem>
          <blue-formitem label="姓名">{{data.name}}</blue-formitem>
          <blue-formitem label="年龄">{{data.age}}</blue-formitem>
          <blue-formitem label="地址">{{data.address}}</blue-formitem>
        </blue-form>
        <blue-loading :blue-loading="data.loading"></blue-loading>
      </template>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas1: [
          { id: 5, name: "测试5", age: 12, address: "上海", _expand: false },
          { id: 6, name: "测试6", age: 12, address: "上海", _expand: true },
          { id: 7, name: "测试7", age: 12, address: "上海", _expand: false },
          { id: 5, name: "测试5", age: 12, address: "上海", _expand: false },
          { id: 6, name: "测试6", age: 12, address: "上海", _expand: true },
          { id: 7, name: "测试7", age: 12, address: "上海", _expand: false }
        ]
      };
    },
    methods: {
      remove(data) {
        this.datas.splice(this.datas.indexOf(data), 1);
      },
      open(data) {
        this.$set(data, "_expand", !data._expand);
      },
      add(datas) {
        datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
      },
      onselect(data) {
        console.log(data);
      }
    }
  };
</script>
```

:::

### Table fixed column

:::tip
固定的高度和宽度，内部内容超出时自动 scroll。
:::

:::demo

```html
<template>
  <div>
    <p>
      <button class="blue-btn blue-btn-s blue-btn-blue" @click="add(datas)">
        <i class="icon-plus"></i><span>添加一行</span>
      </button>
    </p>
    <blue-table :datas="datas2" :height="400">
      <blue-tableitem title="姓名" prop="name" :width="150"></blue-tableitem>
      <blue-tableitem title="年龄" prop="age" :width="150"></blue-tableitem>
      <blue-tableitem
        title="地址"
        prop="address"
        align="center"
        :width="150"
      ></blue-tableitem>
      <blue-tableitem title="姓名" prop="name" :width="150"></blue-tableitem>
      <blue-tableitem title="年龄" prop="age" :width="150"></blue-tableitem>
      <blue-tableitem
        title="地址"
        prop="address"
        align="center"
        :width="150"
      ></blue-tableitem>
      <blue-tableitem title="姓名" prop="name" :width="150"></blue-tableitem>
      <blue-tableitem title="年龄" prop="age" :width="150"></blue-tableitem>
      <blue-tableitem
        title="地址"
        prop="address"
        align="center"
        :width="150"
      ></blue-tableitem>
      <blue-tableitem title="操作" :width="80" fixed="right">
        <template slot-scope="{data}">
          <button
            class="blue-btn blue-btn-s blue-btn-red"
            @click="remove(datas, data)"
          >
            <i class="icon-delete"></i>
          </button>
        </template>
      </blue-tableitem>
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas2: [
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" }
        ]
      };
    },
    methods: {
      remove(datas, data) {
        datas.splice(datas.indexOf(data), 1);
      },
      add(datas) {
        datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
      }
    }
  };
</script>
```

:::

### Table 多选

设定 selectWhenClickTr 属性可以点击整行选中。

:::demo

```html
<template>
  <div>
    <p>
      <blue-button class="blue-btn blue-btn-s blue-btn-blue" @click="add(datas)"
        ><i class="icon-plus"></i><span>添加一行</span></blue-button
      >
      <blue-button
        class="blue-btn blue-btn-s blue-btn-yellow"
        @click="invereSelection"
        ><span>反选</span></blue-button
      >
      <blue-button
        class="blue-btn blue-btn-s blue-btn-yellow"
        @click="setOddSelection"
        ><span>选择奇数列</span></blue-button
      >
    </p>
    <blue-table
      :datas="datas"
      ref="table"
      :height="400"
      @select="onselect"
      checkbox
      @trclick="trClick"
      @trdblclick="trdblclick"
      select-when-click-tr
    >
      <blue-tableitem
        title="ID"
        prop="id"
        align="center"
        :width="80"
        fixed="left"
      ></blue-tableitem>
      <blue-tableitem title="年龄" prop="age" :width="150"></blue-tableitem>
      <blue-tableitem
        title="地址"
        prop="address"
        align="center"
        :width="150"
      ></blue-tableitem>
      <blue-tableitem title="姓名" prop="name" :width="150"></blue-tableitem>
      <blue-tableitem title="年龄" prop="age" :width="150"></blue-tableitem>
      <blue-tableitem
        title="地址"
        prop="address"
        align="center"
        :width="150"
      ></blue-tableitem>
      <blue-tableitem title="姓名" prop="name" :width="150"></blue-tableitem>
      <blue-tableitem title="年龄" prop="age" :width="150"></blue-tableitem>
      <blue-tableitem
        title="地址"
        prop="address"
        align="center"
        :width="150"
      ></blue-tableitem>
      <blue-tableitem title="操作" align="center" :width="80" fixed="right"
        ><template slot-scope="{data}"
          ><button
            class="blue-btn blue-btn-s blue-btn-red"
            @click="remove(datas, data)"
          >
            <i class="icon-delete"></i></button></template
      ></blue-tableitem>
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas: []
      };
    },
    mounted() {
      setTimeout(() => {
        this.datas = [
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 12, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" }
        ];
      }, 100);
    },
    methods: {
      setOddSelection() {
        this.$refs.table.setSelection(
          this.datas.filter((item, index) => (index + 1) % 2 == 1)
        );
      },
      remove(datas, data) {
        datas.splice(datas.indexOf(data), 1);
      },
      add(datas) {
        datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
      },
      invereSelection() {
        this.$refs.table.invereSelection();
      },
      onselect(data, event) {
        console.log("onselect", data, event);
      },
      trClick(data, event) {
        console.log("trClick", data, event);
      },
      trdblclick(data, event) {
        console.log("trdblclick", data, event);
      }
    }
  };
</script>
```

:::

### Table 单选

:::demo

```html
<template>
  <div>
    <p><blue-button @click="clear" color="primary">清空选中</blue-button></p>
    <blue-table ref="table" :datas="datas" select-row @rowSelect="rowSelect">
      <blue-tableitem title="Index" prop="$index"></blue-tableitem>
      <blue-tableitem title="Name" prop="name" sort="auto"></blue-tableitem>
      <blue-tableitem title="Age" prop="age" unit="年"></blue-tableitem>
      <blue-tableitem
        title="Dict"
        prop="dictData"
        dict="simple"
      ></blue-tableitem>
      <blue-tableitem title="Operate">
        <template slot-scope="{data}">
          {{data.name}}: 自定义展示
        </template>
      </blue-tableitem>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas: [
          { id: 5, name: "测试5", dictData: null, age: 12, address: "上海" },
          {
            id: 6,
            name: "禁止选择",
            dictData: 2,
            age: 13,
            address: "禁止选择",
            _disabledSelect: true
          },
          { id: 7, name: "测试7", dictData: 3, age: 0, address: "上海" },
          {
            id: 5,
            name: "测试5",
            dictData: 4,
            age: undefined,
            address: "上海"
          },
          { id: 6, name: "测试6", dictData: 5, age: -1, address: "上海" },
          { id: 7, name: "测试7", dictData: 6, age: null, address: "上海" }
        ]
      };
    },
    mounted() {
      this.$refs.table.setRowSelect(this.datas[0]);
    },
    methods: {
      clear() {
        this.$refs.table.clearRowSelect();
      },
      rowSelect(data) {
        console.log(data);
      }
    }
  };
</script>
```

:::

### Table 气泡提示与定义 border, stripe 样式

:::demo

```html
<style lang="less">
  .table-tr-tooltip {
    font-size: 13px;
    margin: 0 -2px 1px -2px;
  }
</style>

<template>
  <div>
    <blue-table border stripe :datas="datas" :columns="columns1">
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns1: [
          {
            title: "Index",
            prop: "$index",
            width: 100,
            tooltip: true,
            placement: "top-start",
            content:
              '<div class="table-tr-tooltip">序号<hr>说明：数据的序列号</div>'
          },
          {
            title: "ID",
            prop: "id",
            width: 100,
            tooltip: true,
            placement: "top-start",
            content:
              '<div class="table-tr-tooltip">ID<hr>说明：数据的唯一ID</div>'
          },
          {
            title: "Name",
            prop: "name",
            tooltip: true,
            placement: "top-start",
            content:
              '<div class="table-tr-tooltip">姓名<hr>说明：用户的姓名</div>'
          },
          {
            title: "Age",
            prop: "age",
            tooltip: true,
            placement: "top-start",
            content:
              '<div class="table-tr-tooltip">年龄<hr>说明：用户的年龄</div>'
          },
          {
            title: "Address",
            prop: "address",
            tooltip: true,
            placement: "top-start",
            content:
              '<div class="table-tr-tooltip">地址<hr>说明：用户的地址</div>'
          }
        ],
        datas: [
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 13, address: "上海" },
          { id: 6, name: "测试6", age: 13, address: "上海" }
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### 自定义表头

:::demo

```html
<template>
  <div>
    <blue-table
      border
      :datas="datas"
      :columns="columns"
      :ths="ths"
      :height="200"
    >
      <div slot="empty">自定义提醒：暂时无数据</div>
    </blue-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        columns: [
          { prop: "index", width: 100 },
          { prop: "id", width: 100 },
          { prop: "name", width: 100 },
          { prop: "age", width: 100 },
          { prop: "address", width: 150 }
        ],
        datas: [
          {
            index: 1,
            id: "abc1",
            name: "测试1",
            age: 1,
            address: "上海1",
            address2: "上海21"
          },
          {
            index: 2,
            id: "abc2",
            name: "测试2",
            age: 2,
            address: "上海2",
            address2: "上海22"
          },
          {
            index: 3,
            id: "abc3",
            name: "测试3",
            age: 3,
            address: "上海3",
            address2: "上海23"
          },
          {
            index: 4,
            id: "abc4",
            name: "测试4",
            age: 4,
            address: "上海4",
            address2: "上海24"
          },
          {
            index: 5,
            id: "abc5",
            name: "测试5",
            age: 5,
            address: "上海5",
            address2: "上海25"
          },
          {
            index: 6,
            id: "abc6",
            name: "测试6",
            age: 6,
            address: "上海6",
            address2: "上海26"
          },
          {
            index: 7,
            id: "abc7",
            name: "测试7",
            age: 7,
            address: "上海7",
            address2: "上海27"
          },
          {
            index: 8,
            id: "abc8",
            name: "测试8",
            age: 8,
            address: "上海8",
            address2: "上海28"
          },
          {
            index: 9,
            id: "abc9",
            name: "测试9",
            age: 9,
            address: "上海9",
            address2: "上海29"
          }
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### Table 参数

| 参数              | 说明                                     | 类型    | 可选值 | 默认值   |
| ----------------- | ---------------------------------------- | ------- | ------ | -------- |
| columns           | 定义 table 的 column                     | Array   | -      | [Column] |
| datas             | 列表展示需要的数据                       | Array   | -      | []       |
| height            | Table 固定的高度                         | Number  | -      | -        |
| checkbox          | 是否使用 checkbox 选择器                 | Boolean | -      | false    |
| border            | table 是否有竖线分割                     | Boolean | -      | false    |
| stripe            | table 使用栅格背景                       | Boolean | -      | false    |
| selectRow         | 单行选中切换                             | Boolean |        | false    |
| selectWhenClickTr | 当点击 tr 的时候，触发 checkbox 选中切换 | Boolean |        | false    |

### TableItem / Column 参数

| 参数      | 说明                               | 类型            | 可选值            | 默认值         |
| --------- | ---------------------------------- | --------------- | ----------------- | -------------- |
| title     | 定义 table 的 header 标题          | String          | -                 |                |
| width     | 定义 table 每一项宽度              | Number          | -                 | []             |
| fixed     | 是否为固定栏                       | String          | -                 | left, right    |
| prop      | 按照数据的某个字段渲染数据         | String          | -                 |                |
| align     | table 中的标题对齐方式             | String          | left,right,center | left           |
| tooltip   | table 中的标题是否使用提示框       | Boolean         | -                 | false          |
| placement | table 中的标题使用提示框的提醒位置 | String          | -                 |                |
| content   | table 中的标题使用提示框的内容     | String          | -                 | 默认使用 title |
| sort      | 是否添加排序触发                   | Boolean, String | true/auto         | false          |
| dict      | 字典渲染字段                       | String          |                   |                |
| unit      | 字段显示单位                       | String          |                   |                |
| render    | 自定义字段处理方法                 | Function        |                   |                |

### Table 事件

| 事件       | 说明                               |
| ---------- | ---------------------------------- |
| sort       | 当排序的时候触发的事件             |
| select     | 当 checkbox 有变动的时候触发的事件 |
| selectAll  | 当 checkbox 全选的时候             |
| trclick    | 当 tr 被点击的时候                 |
| trdblclick | 当 tr 被双击的时候                 |
| rowSelect  | 当 tr 被单击选中的时候             |

### Table 方法

| 方法             | 说明             |
| ---------------- | ---------------- |
| clearSort        | 清空排序         |
| clearSelection   | 清空选中         |
| setSelection     | 设置选中的值     |
| getSelection     | 获取选中的值     |
| inverseSelection | 设置选中的值反选 |

<script>
  export default {
    data() {
      return {
        loading: false,
        ths: [
        [
          {title: '序号', rowspan: 2},
          {title: '编码', tooltip: true},
          {title: '信息', colspan: 2},
          {title: 'address', rowspan: 2},
        ],[
          {title: 'ID', prop: 'id', sort: 'auto'},
          {title: '姓名'},
          {title: '年龄'},
        ]
      ],
        columns: [
          { title: "Index", prop: "$index", width: 100 },
          { title: "ID", prop: "id", width: 100, sort: "auto" },
          { title: "Name", prop: "name", sort: "auto" },
          { title: "Age", prop: "age", sort: "auto" },
          { title: "Address", prop: "address" }
        ],
        columns1: [
        { title: 'Index', prop: '$index', width: 100 , tooltip: true, placement: 'top-start', content: '<div class="table-tr-tooltip">序号<hr>说明：数据的序列号</div>'},
        { title: 'ID', prop: 'id', width: 100, tooltip: true, placement: 'top-start', content: '<div class="table-tr-tooltip">ID<hr>说明：数据的唯一ID</div>' },
        { title: 'Name', prop: 'name', tooltip: true, placement: 'top-start', content: '<div class="table-tr-tooltip">姓名<hr>说明：用户的姓名</div>' },
        { title: 'Age', prop: 'age', tooltip: true, placement: 'top-start', content: '<div class="table-tr-tooltip">年龄<hr>说明：用户的年龄</div>' },
        { title: 'Address', prop: 'address', tooltip: true, placement: 'top-start', content: '<div class="table-tr-tooltip">地址<hr>说明：用户的地址</div>' },
      ],
        datas: [
          { id: 5, name: "测试5", age: 9, dictData: null, address: "上海" },
          { id: 6, name: "测试6", age: 8, dictData: 1, address: "上海" ,_disabledSelect: true},
          { id: 7, name: "测试7", age: 14, dictData: 2, address: "上海" },
          { id: 5, name: "测试5", age: 17, dictData: 3, address: "上海" },
          { id: 6, name: "测试6", age: 18, dictData: 1, address: "上海" },
          { id: 7, name: "测试7", age: 12, dictData: 2, address: "上海" }
        ],
        datas2: [
        { id: 5, name: '测试5', age: 12, address: "上海" },
        { id: 6, name: '测试6', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
        { id: 5, name: '测试5', age: 12, address: "上海" },
        { id: 6, name: '测试6', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
        { id: 5, name: '测试5', age: 12, address: "上海" },
        { id: 6, name: '测试6', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
        { id: 5, name: '测试5', age: 12, address: "上海" },
        { id: 6, name: '测试6', age: 12, address: "上海" },
        { id: 7, name: '测试7', age: 12, address: "上海" },
      ]
      };
    },
    methods: {
       clear() {
        this.$refs.table.clearRowSelect();
      },
      rowSelect(data) {
        console.log(data);
      },
       setOddSelection() {
        this.$refs.table.setSelection(
          this.datas.filter((item, index) => (index + 1) % 2 == 1)
        );
      },
      invereSelection() {
        this.$refs.table.invereSelection();
      },
      onselect(data, event) {
        console.log("onselect", data, event);
      },
      trClick(data, event) {
        console.log("trClick", data, event);
      },
      trdblclick(data, event) {
        console.log("trdblclick", data, event);
      },
    add(datas) {
      datas.push({ id: 7, name: '添加', age: 12, address: "然后添加的" });
    },messageRender(data) {
      return `${data.name}:${data.address}`;
    },
    loadData() {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 5000);
    },
    remove(data) {
      this.datas.splice(this.datas.indexOf(data), 1);
    },
    open(data) {
      this.$set(data, '_expand', !data._expand)
    },
    triggerSort(data) {
      console.log(data)
      this.datas.sort((a, b)=>{
        let ad = a[data.prop], bd = b[data.prop];
        let index = ad == bd ? 0 : (ad > bd) ? 1 : -1;
        return data.type == 'asc' ? index: -index;
      })
    }
  }
  };
</script>
