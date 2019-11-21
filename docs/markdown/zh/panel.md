[[toc]]

## Panel 面板

### 基础调用

:::demo

```html
<template>
  <div v-width="400">
    <div class="blue-panel">
      <div class="blue-panel-bar">
        <span class="blue-panel-title">标题</span>
        <span class="blue-panel-right"><a>More</a></span>
      </div>
      <div class="blue-panel-body">
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </div>
    </div>
  </div>
</template>
```

:::

### 头部自定义

:::demo

```html
<template>
  <div>
    <div class="blue-panel">
      <div class="blue-panel-bar">
        <span class="blue-panel-title">标题</span>
        <div class="blue-panel-right">
          <Search placeholder="查询" v-width="200"></Search
          ><i class="blue-split"></i
          ><button class="blue-btn blue-btn-green blue-btn-m">查询</button>
        </div>
      </div>
      <div class="blue-panel-bar">
        <Checkbox v-model="selectAll">全选</Checkbox><i class="blue-split"></i>
        <span class="link" :disabled="!selectAll">下载</span
        ><i class="blue-split" v-width="10"></i
        ><span class="link" :disabled="!selectAll">分享</span>
        <i class="blue-split"></i>
        <blue-dropdownmenu
          :disabled="!selectAll"
          dict="simple"
          class-name="blue-text-dropdown"
          ><span :disabled="!selectAll">更多</span></blue-dropdownmenu
        >
      </div>
      <div class="blue-panel-body">
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selectAll: false
      };
    }
  };
</script>
```

:::

### 无边框

:::demo

```html
<template>
  <div v-bg-color:gray2 v-width="400" v-padding="20">
    <div class="blue-panel blue-panel-no-border">
      <div class="blue-panel-bar">
        <span class="blue-panel-title">标题</span>
        <span class="blue-panel-right"><a>More</a></span>
      </div>
      <div class="blue-panel-body">
        <p>content</p>
        <p>content</p>
        <p>content</p>
      </div>
    </div>
  </div>
</template>
```

:::

### 单独使用头部

:::demo

```html
<template>
  <div class="blue-panel">
    <div class="blue-panel-bar">
      <span class="blue-panel-title">标题</span>
      <span v-color:gray v-font="13">说明~~</span>
      <div class="blue-panel-right">
        <Search placeholder="查询" v-width="200"></Search
        ><i class="blue-split"></i
        ><button class="blue-btn blue-btn-green blue-btn-m">查询</button>
      </div>
    </div>
    <div class="blue-panel-bar">
      <span class="link">下载</span><i class="blue-split" v-width="10"></i
      ><span class="link" :disabled="!selectAll">分享</span>
      <i class="blue-split"></i>
      <blue-dropdownmenu :datas="menus" class-name="blue-text-dropdown"
        ><span :disabled="!selectAll">更多</span></blue-dropdownmenu
      >
      <div class="blue-panel-right">
        <Pagination
          :cur="page.cur"
          :total="page.total"
          :small="true"
          layout="pager"
          @change="currentChange"
        ></Pagination>
      </div>
    </div>
    <div class="blue-panel-body bottom-line">
      <blue-table :datas="datas" checkbox :columns="columns"></blue-table>
    </div>
    <div class="blue-panel-bar">
      <Pagination
        :cur="page.cur"
        :total="page.total"
        :small="true"
        align="right"
        @change="currentChange"
      ></Pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menus: ["Operate1", "Operate2", "Operate3"],
        selectAll: false,
        page: {
          cur: 3,
          total: 58
        },
        columns: [
          { title: "序号", prop: "$index", width: 100 },
          { title: "ID", prop: "id", width: 100 },
          { title: "姓名", prop: "name" },
          { title: "年龄", prop: "age" },
          { title: "地址", prop: "address" }
        ],
        datas: [
          { id: 5, name: "测试5", age: 12, address: "上海" },
          { id: 6, name: "测试6", age: 13, address: "上海" },
          { id: 7, name: "测试7", age: 14, address: "上海" },
          { id: 5, name: "测试5", age: 17, address: "上海" },
          { id: 6, name: "测试6", age: 18, address: "上海" },
          { id: 7, name: "测试7", age: 12, address: "上海" }
        ]
      };
    },
    methods: {
      currentChange(page) {
        this.page.cur = page.cur;
      }
    },
    components: {}
  };
</script>
```

:::

<script>

export default {
  data() {
    return {
        
      menus: ['Operate1', 'Operate2', 'Operate3'],
      selectAll: false,
      page: {
        cur: 3,
        total: 58
      },
      columns: [
        { title: '序号', prop: '$index', width: 100 },
        { title: 'ID', prop: 'id', width: 100 },
        { title: '姓名', prop: 'name' },
        { title: '年龄', prop: 'age' },
        { title: '地址', prop: 'address' }
      ],
      datas: [
        { id: 5, name: '测试5', age: 12, address: '上海' },
        { id: 6, name: '测试6', age: 13, address: '上海' },
        { id: 7, name: '测试7', age: 14, address: '上海' },
        { id: 5, name: '测试5', age: 17, address: '上海' },
        { id: 6, name: '测试6', age: 18, address: '上海' },
        { id: 7, name: '测试7', age: 12, address: '上海' }
      ]
    };
  },
  methods: {
    currentChange(page) {
      this.page.cur = page.cur;
    }
  },
  components: {
  }
};
</script>
