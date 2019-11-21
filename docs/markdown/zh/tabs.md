[[toc]]

## Tabs 标签页

> 非 template/render 模式下，请使用 blue-tabs。

### 基本调用

Tabs 控件只支持简单的 tab 生成，点击切换。默认给 blue-tabs-default 样式，可以自己做自定义 Tabs。
tab 选中时添加 classh-tabs-selected

:::demo

```html
<template>
  <div>
    <blue-tabs :datas="param" v-model="selected" @change="change"></blue-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        param: {
          module1: "module1",
          module2: "module2",
          module3: "module3"
        },
        selected: "module1"
      };
    },
    methods: {
      change(data) {
        this.$Message.info(`切换至${data.title}`, 1000);
      }
    }
  };
</script>
```

:::

### 使用内置样式 2

:::demo

```html
<template>
  <div v-bg-color:gray4 style="padding-top:20px;">
    <blue-tabs
      :datas="param"
      class-name="blue-tabs-card"
      v-model="selected"
      @change="change"
    ></blue-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        param: {
          module1: "module1",
          module2: "module2",
          module3: "module3"
        },
        selected: "module1"
      };
    },
    methods: {
      change(data) {
        this.$Message.info(`切换至${data.title}`, 1000);
      }
    }
  };
</script>
```

:::

### 使用内置样式 3

:::demo

```html
<template>
  <div v-bg-color:gray4 style="padding-top:20px;">
    <blue-tabs
      :datas="param"
      class-name="blue-tabs-menu"
      v-model="selected"
      @change="change"
    ></blue-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        param: {
          module1: "module1",
          module2: "module2",
          module3: "module3"
        },
        selected: "module1"
      };
    },
    methods: {
      change(data) {
        this.$Message.info(`切换至${data.title}`, 1000);
      }
    }
  };
</script>
```

:::

### 自定义样式

:::demo

```html
<template>
  <div v-bg-color:gray4 style="padding-top:20px;">
    <blue-tabs
      :datas="param"
      class-name="blue-tabs-custom"
      v-model="selected"
      @change="change"
    ></blue-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        param: {
          module1: "module1",
          module2: "module2",
          module3: "module3"
        },
        selected: "module1"
      };
    },
    methods: {
      change(data) {
        this.$Message.info(`切换至${data.title}`, 1000);
      }
    }
  };
</script>
```

:::

### 自定义 Tab

:::demo

```html
<template>
  <div v-width="150">
    <blue-tabs
      :datas="param"
      class-name="blue-tabs-menu"
      v-model="selected"
      @change="change"
    >
      <template slot-scope="{tab}" slot="item"
        ><span>{{tab.title}}</span
        ><blue-badge
          :count="tab.count"
          :max-count="99"
          position="right"
        ></blue-badge
      ></template>
    </blue-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        param: [
          {
            key: "module1",
            title: "module1",
            count: 12
          },
          {
            key: "module2",
            title: "module2",
            count: 14
          },
          {
            key: "module3",
            title: "module3",
            count: 2
          }
        ],
        selected: "module1"
      };
    },
    methods: {
      change(data) {
        this.$Message.info(`change to ${data.title}`, 1000);
      }
    }
  };
</script>
```

:::

### Tabs 参数

| 参数      | 说明                      | 类型          | 可选值 | 默认值                     |
| --------- | ------------------------- | ------------- | ------ | -------------------------- |
| datas     | 选择的数据                | Array, Object | -      |                            |
| dict      | 调用全局定义的字典        | String        | -      | -                          |
| keyName   | 自定义数据的 key 字段名   | String        | -      | 全局 config dict.keyName   |
| titleName | 自定义数据的 title 字段名 | String        | -      | 全局 config dict.titleName |

### Tabs 事件

| 事件   | 数据                |
| ------ | ------------------- |
| change | 切换 Tab 触发的事件 |
| click  | 点击 Tab 触发的事件 |

<script>
export default {
  data() {
    return {
      param: [{
        key: 'module1',
        title: 'module1',
        count: 12
      }, {
        key: 'module2',
        title: 'module2',
        count: 14
      }, {
        key: 'module3',
        title: 'module3',
        count: 2
      }],
      selected: 'module1'
    };
  },
  methods: {
    change(data) {
      this.$Message.info(`change to ${data.title}`, 1000);
    }
  }
};
</script>
<style lang="less" scoped>

@color: #999;
.blue-tabs-custom {
  >div {
    display: block;
    padding: 12px 16px;
    line-height:1;
    font-size: 32px;
    +div {
      margin-top: 5px;
    }
    
  }
 }
 </style>
