[[toc]]

## Transfer 穿梭框

> 非 template/render 模式下，请使用 transfer。

### 基础用法

:::demo

```html
<template>
  <div>
    <p>值：{{value1}}</p>
    <Transfer
      v-model="value1"
      :datas="sourceDatas1"
      :option="option1"
    ></Transfer>

    <p>值：{{value2}}</p>
    <Transfer
      v-model="value2"
      :datas="sourceDatas2"
      :option="option2"
      key-name="id"
    ></Transfer>
  </div>
</template>

<script>
  export default {
    data() {
      let sourceDatas1 = this.generateDemoData("key");
      let sourceDatas2 = this.generateDemoData("id");
      return {
        value1: null,
        sourceDatas1,
        option1: {
          ltText: "左移",
          rtText: "右移"
        },
        value2: [1, 2],
        option2: {
          rtIcon: "icon-plus",
          ltIcon: "icon-minus"
        },
        sourceDatas2
      };
    },
    methods: {
      generateDemoData(propKey) {
        let data = [];
        for (let i = 0; i < 10; i++) {
          data.push({
            [propKey]: i + 1,
            text: `选项${i + 1}`
          });
        }
        return data;
      }
    }
  };
</script>
```

:::

### 带搜索的

:::demo

```html
<template>
  <div>
    <p>值：{{value3}}</p>
    <Transfer
      v-model="value3"
      :datas="sourceDatas3"
      key-name="code"
      :option="option3"
    ></Transfer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        option3: {
          ltHeadText: "一线城市",
          rtHeadText: "开通城市",
          filterable: true,
          placeholder: "输入地址搜索",
          render: function(op) {
            return `${op.text}(${op.code})`;
          }
        },
        value3: [1003, 1011],
        sourceDatas3: [
          { code: 1001, text: "上海" },
          { code: 1002, text: "北京" },
          { code: 1003, text: "苏州" },
          { code: 1004, text: "福建" },
          { code: 1005, text: "杭州" },
          { code: 1006, text: "广州" },
          { code: 1007, text: "武汉" },
          { code: 1008, text: "常州" },
          { code: 1009, text: "深圳" },
          { code: 1010, text: "郑州" },
          { code: 1011, text: "阳泉" },
          { code: 1012, text: "天津" }
        ]
      };
    }
  };
</script>
```

:::

### 自定义文件头

:::demo

```html
<template>
  <div>
    <p>值：{{value3}}</p>
    <Transfer
      v-model="value3"
      :datas="sourceDatas3"
      key-name="code"
      @transfer="test"
    >
      <template slot="sourceHeader"
        ><div class="blue-transfer-header">一线城市</div></template
      >
      <template slot="targetHeader"
        ><div class="blue-transfer-header">开通城市</div></template
      >
      <template slot-scope="{option}" slot="item">
        {{option.text}}({{option.code}})
      </template>
    </Transfer>
  </div>
</template>

<script>
  export default {
    methods: {
      test() {
        console.log(arguments);
      }
    },
    data() {
      return {
        value: [1003, 1011],
        sourceDatas3: [
          { code: 1001, text: "上海" },
          { code: 1002, text: "北京" },
          { code: 1003, text: "苏州" },
          { code: 1004, text: "福建" },
          { code: 1005, text: "杭州" },
          { code: 1006, text: "广州" },
          { code: 1007, text: "武汉" },
          { code: 1008, text: "常州" },
          { code: 1009, text: "深圳" },
          { code: 1010, text: "郑州" },
          { code: 1011, text: "阳泉" },
          { code: 1012, text: "天津" }
        ]
      };
    }
  };
</script>
```

:::

### Transfer 参数

| 参数    | 说明                               | 类型   | 可选值 | 默认值 |
| ------- | ---------------------------------- | ------ | ------ | ------ |
| datas   | 可选择的数据                       | Array  | -      | -      |
| keyName | 用于唯一确定返回值                 | String | -      | key    |
| option  | 配置项，详细参见下面的 option 说明 | Object | -      | -      |

### Transfer 事件

| 事件名   | 说明             | 返回数值                             |
| -------- | ---------------- | ------------------------------------ |
| init     | 初始化的时候触发 | 左右栏的值                           |
| transfer | 数据穿梭时出发   | 穿梭的方向、数据、穿梭前的左右栏的值 |

### Option 配置

| 参数                   | 说明                 | 类型     | 可选值      | 默认值                |
| ---------------------- | -------------------- | -------- | ----------- | --------------------- |
| filterable             | 是否可以输入进行筛选 | Boolean  | true, false | false                 |
| placeholder            | 筛选占位文案         | String   | -           | -                     |
| render                 | 控制 item 的展示内容 | Function | -           | -                     |
| ltHeadText, rtHeadText | 源和目标列表头部文案 | String   | -           | -                     |
| ltText, rtText         | 切换按钮的文案       | String   | -           | -                     |
| ltIcon, rtIcon         | 切换按钮的 Icon      | String   | -           | icon-left, icon-right |

### Slot 配置

| 参数         | 说明                   |
| ------------ | ---------------------- |
| sourceHeader | 左侧头部数据栏头部样式 |
| targetHeader | 右侧头部数据栏头部样式 |
| item         | 数据条目的渲染         |

<script>
  export default {
    data() {
      let sourceDatas1 = this.generateDemoData("key");
      let sourceDatas2 = this.generateDemoData("id");
      return {
        value1: null,
        sourceDatas1,
        option1: {
          ltText: "左移",
          rtText: "右移"
        },
        value2: [1, 2],
        option2: {
          rtIcon: "icon-plus",
          ltIcon: "icon-minus"
        },
        sourceDatas2,
        option3: {
          ltHeadText: "一线城市",
          rtHeadText: "开通城市",
          filterable: true,
          placeholder: "输入地址搜索",
          render: function(op) {
            return `${op.text}(${op.code})`;
          }
        },
        value3: [1003, 1011],
        sourceDatas3: [
          { code: 1001, text: "上海" },
          { code: 1002, text: "北京" },
          { code: 1003, text: "苏州" },
          { code: 1004, text: "福建" },
          { code: 1005, text: "杭州" },
          { code: 1006, text: "广州" },
          { code: 1007, text: "武汉" },
          { code: 1008, text: "常州" },
          { code: 1009, text: "深圳" },
          { code: 1010, text: "郑州" },
          { code: 1011, text: "阳泉" },
          { code: 1012, text: "天津" }
        ]
      };
    },
    methods: {
      generateDemoData(propKey) {
        let data = [];
        for (let i = 0; i < 10; i++) {
          data.push({
            [propKey]: i + 1,
            text: `选项${i + 1}`
          });
        }
        return data;
      },
      test() {
        console.log(arguments);
      }
    
    }
  };
</script>
