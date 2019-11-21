[[toc]]

## TimePicker 时间控件

> 非 template/render 模式下，请使用 blue-datepicker。

### 普通选择时间控件

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" type="time"></blue-datepicker>
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

### 禁用

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker
      v-model="value"
      type="time"
      :disabled="true"
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

### 范围控制

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker
      v-model="value"
      type="time"
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
          hours() {
            let hours = [];
            for (let i = 9; i <= 20; i++) {
              hours.push(i);
            }
            return hours;
          },
          minutes(hour) {
            let minutes = [];
            if (hour < 12) {
              minutes.push(7, 15, 23, 17, 34, 47, 58);
            } else {
              minutes.push(1, 3, 34, 45, 46, 47, 52);
            }
            return minutes;
          }
        }
      };
    }
  };
</script>
```

:::

### DatePicker 参数

| 参数        | 说明                                 | 类型    | 可选值 | 默认值                                |
| ----------- | ------------------------------------ | ------- | ------ | ------------------------------------- |
| disabled    | 是否禁用                             | Boolean | -      | false                                 |
| type        | 类型                                 | String  | date   | year, month, week, datetime, datehour |
| option      | 配置项，详细参见下面的 option 说明   | Object  | -      |                                       |
| format      | 自定义数据的格式                     | String  | -      | -                                     |
| hasSeconds  | 当选择日期时间时，是否自动格式化到秒 | Boolean | -      | false                                 |
| noBorder    | 是否有边框，适用于文字的下拉选择     | Boolean | -      | false                                 |
| placeholder | 展示默认提示语                       | String  | -      | 请选择                                |

### option 配置

| 参数       | 说明             | 类型                     | 可选值 | 默认值 |
| ---------- | ---------------- | ------------------------ | ------ | ------ |
| start      | 开始时间         | Function, Object, String | -      | -      |
| end        | 结束时间         | Function, Object, String | -      | -      |
| disabled   | 不可选日期配置   | Function                 | -      | -      |
| shortcuts  | 自定义快捷方式   | [String, Object]         | -      | -      |
| minuteStep | 分钟的间隔       | Number                   | -      | 5      |
| hours      | 自定义可选的小时 | Function                 | -      | -      |
| minutes    | 自定义可选的分钟 | Function                 | -      | -      |

<script>
export default {
  data() {
      return {
        value: "",
        param: {
          hours() {
            let hours = [];
            for (let i = 9; i <= 20; i++) {
              hours.push(i);
            }
            return hours;
          },
          minutes(hour) {
            let minutes = [];
            if (hour < 12) {
              minutes.push(7, 15, 23, 17, 34, 47, 58);
            } else {
              minutes.push(1, 3, 34, 45, 46, 47, 52);
            }
            return minutes;
          }
        }
      };
    }
};
</script>
