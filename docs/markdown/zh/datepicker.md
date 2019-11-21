[[toc]]

## DatePicker 日期控件

### 基本使用

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value"></blue-datepicker>
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

### 日期控件参数

:::demo

```html
<template>
  <div>
    <p><blue-switch v-model="disabled" :small="true">禁用</blue-switch></p>
    <p><blue-switch v-model="readonly" :small="true">只读</blue-switch></p>
    <p><blue-switch v-model="clearable" :small="true">可清空</blue-switch></p>
    <p>
      <blue-datepicker
        v-model="value"
        :readonly="readonly"
        :disabled="disabled"
        :clearable="clearable"
      ></blue-datepicker>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: "2019-01-01",
        disabled: true,
        readonly: true,
        clearable: true
      };
    }
  };
</script>
```

:::

### 日期格式自定义

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" format="YYYY/MM/DD"></blue-datepicker>
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

### 不同类型的选择控件

:::demo

```html
<template>
  <div>
    <p>
      <blue-switchlist
        v-model="type"
        :datas="{year: '年', month: '月', quarter: '季度', week: '周', date: '日'}"
      ></blue-switchlist>
    </p>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" :type="type"></blue-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        type: "date"
      };
    }
  };
</script>
```

:::

### 选择周控件

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" type="week"></blue-datepicker>

    <p>周日当一周的开始，不定义缺省是周一.</p>
    <p>value:{{value2}}</p>
    <blue-datepicker
      v-model="value2"
      type="week"
      :start-week="7"
      @change="change"
    ></blue-datepicker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: null,
        value2: this.$mm().format("YYYY-MM")
      };
    },
    methods: {
      change(value) {
        console.log(this.$mm().format("YYYY"));
        this.$Message.info(this.$mm().format("YYYY-MM"));
      }
    }
  };
</script>
```

:::

### 自定义快捷方式

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <blue-datepicker v-model="value" :option="param"></blue-datepicker>
  </div>
</template>

<script>
  import BlueUI from "@/src";
  const mm = BlueUI.$mm;
  export default {
    data() {
      return {
        value: "",
        param: {
          // 具体配置在"config.datepicker.shortcuts"中
          shortcuts: [
            {
              title: "后天的事情",
              value() {
                return mm().add(3, mm.DAY);
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

### 控件范围控制

:::demo

```html
<template>
  <div>
    <p>
      value:{{value}}
      <blue-button class="blue-btn blue-btn-text" @click="changeParam()"
        >修改范围</blue-button
      >
    </p>
    <blue-datepicker v-model="value" :option="param1"></blue-datepicker>
  </div>
</template>

<script>
  import BlueUI from "@/src";
  const mm = BlueUI.$mm;

  export default {
    data() {
      return {
        value: "",
        param1: {
          start: mm().add(-1, mm.DAY),
          end: mm().add(46, mm.DAY),
          disabled: value => {
            return value.date() % 5 == 0;
          }
        }
      };
    },
    methods: {
      changeParam() {
        this.param.start = "2019-02-01";
        this.param.end = "2019-06-03";
        this.$Message(
          `选择范围变为${this.param.start}至${this.param.end}`,
          5000
        );
      }
    }
  };
</script>
```

:::

### 文本选择

:::demo

```html
<template>
  <div>
    <blue-datepicker v-model="value" :no-border="true"></blue-datepicker>
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

### inline 模式

:::demo

```html
<template>
  <div>
    <p>
      value: {{value}}
    </p>
    <blue-datepicker v-model="value" :inline="true"></blue-datepicker>
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

### DatePicker 参数

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

### DatePicker 事件

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
import BlueUI from '@/src';
const mm = BlueUI.$mm;
export default {
  data() {
    return {
        value: null,
        value2:this.$mm().format("YYYY-MM"),
        disabled: true,
        readonly: true,
        clearable: true,
        type: "date",
        param: {
          // 具体配置在"config.datepicker.shortcuts"中
          shortcuts: [
            {
              title: "后天的事情",
              value() {
                return mm().add(3, mm.DAY);
              }
            }
          ]
        },
        param1: {
          start: mm().add(-1, mm.DAY),
          end: mm().add(46, mm.DAY),
          disabled: value => {
            return value.date() % 5 == 0;
          }
        }
    };
  },
  methods: {
     change(value) {
         console.log(this.$mm().format('YYYY'))
         this.$Message.info(this.$mm().format("YYYY-MM"));

     },
    changeParam() {
        this.param.start = "2019-02-01";
        this.param.end = "2019-06-03";
        this.$Message(
          `选择范围变为${this.param.start}至${this.param.end}`,
          5000
        );
      }
  } 
};
</script>
