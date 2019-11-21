[[toc]]

## TreePicker 树下拉选择 (暂时还有 bug)

> 非 template/render 模式下，请使用 blue-treepicker。

### 基本调用

:::demo

```html
<template>
  <div>
    <p>value: {{value}}</p>
    <p>修改展示：<blue-button @click="update">更新值</blue-button></p>
    <p><blue-switch v-model="disabled" small>Disabled</blue-switch></p>
    <p v-width="300">
      <blue-treepicker
        :option="param"
        :disabled="disabled"
        ref="treepicker"
        v-model="value"
        @change="change"
        @choose="choose"
        @select="select"
      ></blue-treepicker>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      let list = [
        { id: 1, title: "一级" },
        { id: 2, title: "二级" },
        { id: 3, title: "三级", disabled: true },
        { id: 10, title: "一级-0", parent: 1 },
        { id: 11, title: "一级-1", parent: 1 },
        { id: 12, title: "一级-2", parent: 1 },
        { id: 13, title: "一级-3", parent: 1 },
        { id: 14, title: "一级-4", parent: 1 },
        { id: 20, title: "二级-0", parent: 2 },
        { id: 21, title: "二级-1", parent: 2 },
        { id: 22, title: "二级-2", parent: 2 },
        { id: 23, title: "二级-3", parent: 2 },
        { id: 24, title: "二级-4", parent: 2 },
        { id: 30, title: "三级-0", parent: 3 },
        { id: 31, title: "三级-1", parent: 3 },
        { id: 32, title: "三级-2", parent: 3 },
        { id: 33, title: "三级-3", parent: 3 },
        { id: 34, title: "三级-4", parent: 3 }
      ];
      return {
        value: null,
        disabled: false,
        param: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          datas: list
        }
      };
    },
    methods: {
      change() {
        // 选择器关闭的时候触发
      },
      choose(data) {
        console.log(data);
      },
      update() {
        // 1.17.0+ 支持该方式更新，其他版本请使用 updateShow
        this.value = 12;

        // 如果数据异步分布请求
        // this.$refs.treepicker.updateShow({ id: 1, title: '1级' });
      },
      select(data) {
        console.log(data);
      }
    }
  };
</script>
```

:::

### 多选

:::demo

```html
<template>
  <div>
    <p>value: {{value}},</p>
    <p>
      <blue-switch v-model="showCount" small
        >展示为统计的方式（tree有可能会选择过多）</blue-switch
      >
    </p>
    <p>修改展示：<blue-button @click="update">更新值</blue-button></p>
    <p v-width="300">
      <blue-treepicker
        ref="treepicker"
        :option="param"
        multiple
        :show-count="showCount"
        filterable
        v-model="value"
        @change="change"
        @choose="choose"
        @select="select"
      ></blue-treepicker>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      let list = [
        { id: 1, title: "一级" },
        { id: 2, title: "二级" },
        { id: 3, title: "三级", disabled: true },
        { id: 10, title: "一级-0", parent: 1 },
        { id: 11, title: "一级-1", parent: 1 },
        { id: 12, title: "一级-2", parent: 1 },
        { id: 13, title: "一级-3", parent: 1 },
        { id: 14, title: "一级-4", parent: 1 },
        { id: 20, title: "二级-0", parent: 2 },
        { id: 21, title: "二级-1", parent: 2 },
        { id: 22, title: "二级-2", parent: 2 },
        { id: 23, title: "二级-3", parent: 2 },
        { id: 24, title: "二级-4", parent: 2 },
        { id: 30, title: "三级-0", parent: 3 },
        { id: 31, title: "三级-1", parent: 3 },
        { id: 32, title: "三级-2", parent: 3 },
        { id: 33, title: "三级-3", parent: 3 },
        { id: 34, title: "三级-4", parent: 3 }
      ];
      return {
        value: null,
        showCount: false,
        param: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          datas: list
        }
      };
    },
    methods: {
      change() {
        // 选择器关闭的时候触发
      },
      update() {
        // 1.17.0+ 支持该方式更新，其他版本请使用 updateShow
        this.value = [1];
      },
      choose(data) {
        log(data);
      },
      select(data) {
        log(data);
      }
    }
  };
</script>
```

:::

### 自定义样式 2121

:::demo

```html
<style lang="less">
  // 将placeholder文字变成红色
  .tree-picker-demo-show {
    .blue-treepicker-placeholder {
      color: red !important;
    }
  }
  // 将tree选中的背景色变成红色
  .tree-picker-demo-dropdown {
    .blue-tree-show-desc.selected {
      background-color: red !important;
    }
  }
</style>

<template>
  <div>
    <p>自定义<code>className</code>参数可以自定义特殊的样式</p>
    <p v-width="300">
      <blue-treepicker
        class-name="tree-picker-demo"
        :option="param2"
        ref="treepicker"
        v-model="value"
        @change="change"
        @choose="choose"
        @select="select"
      ></blue-treepicker>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      let list = [
        { id: 1, title: "一级" },
        { id: 2, title: "二级" },
        { id: 3, title: "三级", disabled: true },
        { id: 10, title: "一级-0", parent: 1 },
        { id: 11, title: "一级-1", parent: 1 },
        { id: 12, title: "一级-2", parent: 1 },
        { id: 13, title: "一级-3", parent: 1 },
        { id: 14, title: "一级-4", parent: 1 },
        { id: 20, title: "二级-0", parent: 2 },
        { id: 21, title: "二级-1", parent: 2 },
        { id: 22, title: "二级-2", parent: 2 },
        { id: 23, title: "二级-3", parent: 2 },
        { id: 24, title: "二级-4", parent: 2 },
        { id: 30, title: "三级-0", parent: 3 },
        { id: 31, title: "三级-1", parent: 3 },
        { id: 32, title: "三级-2", parent: 3 },
        { id: 33, title: "三级-3", parent: 3 },
        { id: 34, title: "三级-4", parent: 3 }
      ];
      return {
        value: null,
        param: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          datas: list
        }
      };
    },
    methods: {
      change() {
        // 选择器关闭的时候触发
      },
      choose(data) {
        console.log(data);
      },
      select(data) {
        console.log(data);
      }
    }
  };
</script>
```

:::

### TreePicker 参数

multiple, option, config, filterable, disabled 等配置参照 Tree 的配置
|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|multiple|是否多选|Boolean|-|false|
|type|model 的类型，注意：key 模式不支持初始化传入数据，因为对应的 title 展示不出来|key, object|-|key|
|chooseMode|choose 的类型，具体请参考 tree 的文档|all, some|-|all|
|placeholder|展示默认提示语|String|-|请选择|
|toggleOnSelect|是否在选中文本的时候折叠内容|Boolean|-|false|
|className|自定义 className|String|-||
###TreePicker 方法
|方法名|说明|
|---|---|
|updateShow|由于 tree 大多数是异步加载数据，所以可以用于更新展示的文本|
|getChoose|获取选中值(多选)|
|getSelect|获取选中值(单选)|
|getFullChoose|获取所有选中的值(多选)|
|chooseAll|选中所有值(多选)||
|refresh|刷新数据||
###TreePicker 事件
|事件名|说明|
|---|---|
|input|当 v-model 数据产生变化的时候|
|select|当单选的时候|
|choose|当多选的时候|
|loadDataSuccess|当异步数据请求加载成功的时候|

### option 配置

| 参数          | 说明                                                             | 类型            | 可选值     | 默认值                             |
| ------------- | ---------------------------------------------------------------- | --------------- | ---------- | ---------------------------------- |
| keyName       | 数据的 key 对应字段                                              | String          | -          | 全局配置 tree.default.keyName      |
| titleName     | 数据的 title 对应字段                                            | String          | -          | 全局配置 tree.default.titleName    |
| parentName    | 数据的 parent 对应字段，配合数据类型为 list 的数据               | String          | -          | 全局配置 tree.default.parentName   |
| childrenName  | 数据的 children 对应字段，配合数据类型为 tree 的数据             | String          | -          | 全局配置 tree.default.childrenName |
| dataMode      | 提供的数据类型，是平铺需要解析的列表，还是已经生成好的 tree 数据 | String          | list, tree | list                               |
| datas         | 用于 tree 展示的数据                                             | Array, Function | -          | []                                 |
| getTotalDatas | 异步获取用于 tree 展示的数据，一次性全部加载                     | Function        | -          | -                                  |
| getDatas      | 异步获取用于 tree 展示的数据，每一次单击获取子集                 | Function        | -          | -                                  |

<script>
export default {
  data() {
    let list = [
      { id: 1, title: '一级' },
      { id: 2, title: '二级' },
      { id: 3, title: '三级', disabled: true },
      { id: 10, title: '一级-0', parent: 1 },
      { id: 11, title: '一级-1', parent: 1 },
      { id: 12, title: '一级-2', parent: 1 },
      { id: 13, title: '一级-3', parent: 1 },
      { id: 14, title: '一级-4', parent: 1 },
      { id: 20, title: '二级-0', parent: 2 },
      { id: 21, title: '二级-1', parent: 2 },
      { id: 22, title: '二级-2', parent: 2 },
      { id: 23, title: '二级-3', parent: 2 },
      { id: 24, title: '二级-4', parent: 2 },
      { id: 30, title: '三级-0', parent: 3 },
      { id: 31, title: '三级-1', parent: 3 },
      { id: 32, title: '三级-2', parent: 3 },
      { id: 33, title: '三级-3', parent: 3 },
      { id: 34, title: '三级-4', parent: 3 }
    ];
    return {
      value: null,
      showCount:false,
      disabled: false,
      param: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: list
      },
      param2: {
          keyName: "id",
          parentName: "parent",
          titleName: "title",
          dataMode: "list",
          datas: list
        }
    };
  },
  methods: {
    change() {
      // 选择器关闭的时候触发
    },
    choose(data) {
      console.log(data);
    },
    update() {
      // 1.17.0+ 支持该方式更新，其他版本请使用 updateShow
      this.value = 12;
      // 如果数据异步分布请求
      // this.$refs.treepicker.updateShow({ id: 1, title: '1级' });
    },
    select(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less">
  // 将placeholder文字变成红色
  .tree-picker-demo-show {
    .blue-treepicker-placeholder {
      color: red !important;
    }
  }
  // 将tree选中的背景色变成红色
  .tree-picker-demo-dropdown {
    .blue-tree-show-desc.selected {
      background-color: red !important;
    }
  }
</style>
