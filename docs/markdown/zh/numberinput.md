[[toc]]

## 基本用法

:::demo

```html
<template>
  <div v-width="300">
    <!-- <p><Button color="green" @click="value=100">设置为100</Button></p>
    <p><Button color="green" @click="value=200">设置为200</Button></p> -->
    <p>普通：{{value}}</p>
    <blue-numberinput v-model="value"></blue-numberinput>
    <p>精确2位小数点：{{value2}}</p>
    <blue-numberinput v-model="value2" :precision="2"></blue-numberinput>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0,
        value2: 0
      };
    }
  };
</script>
```

:::

### 最大最小值

:::demo

```html
<template>
  <div v-width="300">
    <p>{{value}}</p>
    <blue-numberinput v-model="value" :max="10" :min="-1"></blue-numberinput>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0
      };
    }
  };
</script>
```

:::

### 使用加减控制

:::demo

```html
<template>
  <div v-width="300">
    <p>{{value1}}</p>
    <blue-numberinput
      v-model="value1"
      :use-operate="true"
      :use-Int="true"
    ></blue-numberinput>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0
      };
    }
  };
</script>
```

:::

### 使用 step

:::demo

```html
<template>
  <div v-width="300">
    <p>{{value}}</p>
    <blue-numberinput
      v-model="value"
      :step="5"
      :use-operate="true"
    ></blue-numberinput>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0
      };
    }
  };
</script>
```

:::

### 禁用

:::demo

```html
<template>
  <div v-width="300">
    <p>{{value}}</p>
    <blue-numberinput v-model="value" :disabled="true"></blue-numberinput>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0
      };
    }
  };
</script>
```

:::

### NumberInput 参数

| 参数       | 说明                     | 类型    | 可选值 | 默认值 |
| ---------- | ------------------------ | ------- | ------ | ------ |
| disabled   | 是否禁用                 | Boolean | -      | false  |
| min        | 最小值                   | Number  | -      | -      |
| max        | 最大值                   | Number  | -      | -      |
| step       | 每次点击增加或减少的数值 | Number  | -      | 1      |
| useInt     | 控制只能输入整数         | Boolean | -      | false  |
| useOperate | 是否使用加减按钮         | Boolean | -      | false  |
| precision  | 保留几位小数             | Number  | -      | -      |

### NumberInput 事件

| 参数   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| input  | 数据产生改变的时候       | 当前绑定的 v-model 值 |
| change | 数据产生改变 blur 的时候 | 完整对象              |

<script>
export default {
    data() {
      return {
        value: 0,
        value1:0,
        value2: 0
      };
    }
  };
</script>
<style>
  .demo-box.demo-alert .el-alert {
    margin: 20px 0 0;
  }

  .demo-box.demo-alert .el-alert:first-child {
    margin: 0;
  }
</style>
