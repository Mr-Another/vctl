[[toc]]

## 日期时间控件

> 非 template/render 模式下，请使用 blue-datepicker。

### 普通选择

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" type="datetime"></blue-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ""
      };
    }
  };
</script>
```

:::

### 选择到小时

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" type="datehour"></blue-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ""
      };
    }
  };
</script>
```

:::

### 可以手工输入到秒

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker
      v-model="value"
      type="datetime"
      :has-seconds="true"
    ></blue-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: ""
      };
    }
  };
</script>
```

:::

### 分钟列表 Step 自定义

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker
      v-model="value"
      type="datetime"
      :option="param"
    ></blue-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        param: {
          minuteStep: 10
        }
      };
    }
  };
</script>
```

:::

<!-- ### 属性事件列表实际就是 datepicker 的 -->

### DateTimePicker 参数

| 参数        | 说明                                 | 类型    | 可选值              | 默认值                                        |
| ----------- | ------------------------------------ | ------- | ------------------- | --------------------------------------------- |
| disabled    | 是否禁用                             | Boolean | -                   | false                                         |
| type        | 类型                                 | String  | date                | year, month, week, datetime, datehour         |
| option      | 配置项，详细参见下面的 option 说明   | Object  | -                   |                                               |
| format      | 自定义数据的格式                     | String  | -                   | -                                             |
| hasSeconds  | 当选择日期时间时，是否自动格式化到秒 | Boolean | -                   | false                                         |
| noBorder    | 是否有边框，适用于文字的下拉选择     | Boolean | -                   | false                                         |
| placeholder | 展示默认提示语                       | String  | -                   | 请选择                                        |
| startWeek   | 选择周的时候，设定星期的开始日       | Number  | 1, 2, 3, 4, 5, 6, 7 | 全局配置 datepicker.startWeek，详情至全局配置 |
| readonly    | 输入框是否只读                       | Boolean | -                   | false                                         |
| clearable   | 是否有清空按钮, 1.20.0+              | Boolean | -                   | true                                          |

### DateTimePicker 事件

| 方法名  | 说明         |
| ------- | ------------ |
| input   | 数据产生变化 |
| change  | 数据产生变化 |
| confirm | 点击确定按钮 |
| clear   | 点击清除按钮 |

### option 配置

| 参数      | 说明           | 类型                     | 可选值 | 默认值 |
| --------- | -------------- | ------------------------ | ------ | ------ |
| start     | 开始时间       | Function, Object, String | -      | -      |
| end       | 结束时间       | Function, Object, String | -      | -      |
| disabled  | 不可选日期配置 | Function                 | -      | -      |
| shortcuts | 自定义快捷方式 | [String, Object]         | -      | -      |


<script>
  export default {
    data() {
      return {
        value: "",
        param: {
          minuteStep: 10
        }
      };
    }
  };
</script>
