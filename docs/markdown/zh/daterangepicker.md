[[toc]]

## DateRangePicker 日期范围控件

> 非 template/render 模式下，请使用 blue-datepicker。

### 普通选择

数据默认使用{start,end}的对象，同时也可以自定义参数。详情请参考全局配置
:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-daterangepicker v-model="value"></blue-daterangepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: {}
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
    <p><blue-switch v-model="disabled" :small="true">禁用</blue-switch></p>
    <p>
      <blue-daterangepicker
        v-model="value"
        :disabled="disabled"
      ></blue-daterangepicker>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: {},
        disabled: true
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
    <blue-daterangepicker
      v-model="value"
      :option="param"
    ></blue-daterangepicker>
  </div>
</template>

<script>
  import BlueUI from "@/src";
  const mm = BlueUI.$mm;

  export default {
    data() {
      return {
        value: {},
        param: {
          start: mm().add(-1, mm.DAY),
          end: mm().add(46, mm.DAY)
          // disabled: (value) => {
          //   return value.date()%10 == 0;
          // }
        }
      };
    }
  };
</script>
```

:::

### 快捷方式

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-daterangepicker
      v-model="value"
      :option="param2"
    ></blue-daterangepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: {},
        param2: {
          shortcuts: [
            {
              title: "近三天",
              value() {
                return {
                  start: mm().add(-3, mm.DAY),
                  end: mm()
                };
              }
            }
          ]
        }
      };
    }
  };
</script>
```

:::

### 单独选择开始结束

针对一些可选开始或者结束日期的需求，可以通过 start，end 参数控制

:::demo

```html
<template>
  <div>
    <p>value:{{min}}-{{max}}</p>
    <div>
      <blue-datepicker
        v-model="min"
        placeholder="请选择开始日期"
        :option="{end:max}"
      ></blue-datepicker>
      -
      <blue-datepicker
        v-model="max"
        placeholder="请选择结束日期"
        :option="{start:min}"
      ></blue-datepicker>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        min: null,
        max: null
      };
    }
  };
</script>
```

:::

### DateRangePicker 参数

| 参数        | 说明                               | 类型    | 可选值              | 默认值                                        |
| ----------- | ---------------------------------- | ------- | ------------------- | --------------------------------------------- |
| disabled    | 是否禁用                           | Boolean | -                   | false                                         |
| option      | 配置项，详细参见下面的 option 说明 | Object  | -                   |                                               |
| noBorder    | 是否有边框，适用于文字的下拉选择   | Boolean | -                   | false                                         |
| placeholder | 展示默认提示语                     | String  | -                   | 请选择                                        |
| startWeek   | 选择周的时候，设定星期的开始日     | Number  | 1, 2, 3, 4, 5, 6, 7 | 全局配置 datepicker.startWeek，详情至全局配置 |

### DateRangePicker 事件

| 方法名  | 说明         |
| ------- | ------------ |
| input   | 数据产生变化 |
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
import BlueUI from '@/src';
const mm = BlueUI.$mm;
  export default {
    data() {
      return {
        value: {},
        disabled: true,
        min: null,
        max: null,
        param: {
          start: mm().add(-1, mm.DAY),
          end: mm().add(46, mm.DAY)
          // disabled: (value) => {
          //   return value.date()%10 == 0;
          // }
        },
        param2: {
          shortcuts: [
            {
              title: "近三天",
              value() {
                return {
                  start: mm().add(-3, mm.DAY),
                  end: mm()
                };
              }
            }
          ]
        }
      };
    }
  };
</script>
