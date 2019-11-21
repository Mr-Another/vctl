[[toc]]

## Circle 进度环

> 非 template/render 模式下，请使用 blue-circle

### 基本调用

:::demo

```html
<template>
  <div>
    <blue-circle :percent="60"><span>项目1</span></blue-circle>
    <blue-circle :percent="99" color="#13CE66"><span>项目2</span></blue-circle>
    <blue-circle :percent="12" color="#E11617"><span>项目2</span></blue-circle>
  </div>
</template>
```

:::

### 组合形式

:::demo

```html
<template>
  <div v-width="600">
    <p>
      <blue-numberinput
        v-model="value"
        :step="10"
        :min="0"
        :max="100"
        use-operate
      ></blue-numberinput>
    </p>
    <p>
      <blue-circle :percent="value" :stroke-width="18" :size="200">
        <p class="gray-color" v-font="28">122,332,98</p>
        <div v-height="5"></div>
        <p class="dark-color" v-font="13">目前达成比例</p>
        <p class="gray-color">
          <span class="primary-color" v-font="16"
            >{{parseInt(123*value/100)}}</span
          >/<span>123</span>
        </p>
      </blue-circle>
      <blue-circle :percent="value" :stroke-width="8" :size="80"
        ><span v-font="12">占比: {{value}}%</span></blue-circle
      >
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 10
      };
    }
  };
</script>
```

:::

### Circle 参数

| 参数         | 说明     | 类型   | 可选值 | 默认值  |
| ------------ | -------- | ------ | ------ | ------- |
| percent      | 显示比例 | Number | -      | 0       |
| color        | 显示颜色 | String | RGB    | primary |
| stroke-width | 宽度     | Number | -      | 10      |
| size         | 大小     | Number | -      | 120     |

<script>
  export default {
    data() {
      return {
        value: 10
      };
    }
  };
</script>
