[[toc]]

## Rate 评分

### 基本

:::demo

```html
<template>
  <div>
    <p><blue-rate v-model="value1"></blue-rate></p>
    <p><blue-rate v-model="value2" show-text></blue-rate></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: 2,
        value2: 2.3
      };
    }
  };
</script>
```

:::

### 只读

:::demo

```html
<template>
  <div>
    <p><blue-rate v-model="value3" readonly show-text></blue-rate></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value3: 2.5
      };
    }
  };
</script>
```

:::

### Rate 参数

| 参数     | 说明             | 类型         | 可选值 | 默认值 |
| -------- | ---------------- | ------------ | ------ | ------ |
| showText | 是否显示星级     | Array,Object | -      | -      |
| readonly | 只读，只用于展示 | Boolean      | -      | false  |

### Rate 事件

| 事件   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| change | 当数据产生变动的时候触发 | 完整对象              |
| input  | 当数据产生变动的时候触发 | 当前绑定的 v-model 值 |

<script>

export default {
  data() {
    return {
      value1: 2,
      value2: 2.3,
      value3: 2.5
    };
  }
};
</script>
