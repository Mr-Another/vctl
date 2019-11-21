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

### 属性事件列表实际就是 datepicker 的

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
