[[toc]]

## tag 标签输入

### 基本

:::demo

```html
<template>
  <div>
    <p>value: {{value}}</p>
    <blue-taginput v-model="value" :limit="10" :wordlimit="20"></blue-taginput>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ["test"]
      };
    }
  };
</script>
```

:::

:::demo

```html
<template>
  <div>
    <p>value: {{value1}}</p>
    <blue-taginput
      v-model="value1"
      type="string"
      split=","
      placeholder="请输入"
    ></blue-taginput>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: "test,test2"
      };
    }
  };
</script>
```

:::

:::demo

```html
<template>
  <div>
    <blue-taginput v-model="value2" :readonly="true"></blue-taginput>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value2: ["测试1", "测试2", "测试3", "测试4"]
      };
    }
  };
</script>
```

:::

### TagInput 参数

| 参数        | 说明                               | 类型    | 可选值        | 默认值 |
| ----------- | ---------------------------------- | ------- | ------------- | ------ |
| readonly    | 是否只读                           | Boolean | -             | false  |
| limit       | 限制输入的长度                     | Array   | -             | -      |
| wordlimit   | 限制每个 tag 的文字输入长度        | Number  | -             | 50     |
| placeholder | 输入提示                           | String  | -             | -      |
| type        | 数据类型                           | String  | Array, String | Array  |
| split       | 如果数据类型为 String,设定的分隔符 | String  | -             | ,      |

### TagInput 事件

| 事件   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| change | 当数据产生变动的时候触发 | 完整对象              |
| input  | 当数据产生变动的时候触发 | 当前绑定的 v-model 值 |

<script>
export default {
  data() {
    return {
      value: ['test'],
      value1: ['test,test2'],
      value2: ["测试1", "测试2", "测试3", "测试4"]

    };
  }
};
</script>
