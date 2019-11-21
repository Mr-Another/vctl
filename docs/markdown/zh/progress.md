[[toc]]

## Progress 进度条

> 非 template/render 模式下，请使用 blue-progress。

### 基本调用

:::demo

```html
<template>
  <div v-width="600">
    <p>
      <blue-progress :percent="60"
        ><span slot="title">项目1</span
        ><span slot="text"
          ><span class="primary-color">180</span> K</span
        ></blue-progress
      >
    </p>
    <p>
      <blue-progress :percent="99" color="green"
        ><span slot="title">项目2</span><span slot="text">成功</span></blue-progress
      >
    </p>
    <p>
      <blue-progress :percent="12" color="red"
        ><span slot="title">项目2</span><span slot="text">失败</span></progress
      >
    </p>
  </div>
</template>
```

:::

### 动态展示

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
      <blue-progress :percent="value" :stroke-width="6"
        ><span slot="title">项目1</span
        ><span slot="text">{{value}}%</span></blue-progress
      >
    </p>
    <p>
      <blue-progress
        :percent="value"
        :stroke-width="10"
        color="#ff5500"
      ></blue-progress>
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

### Progress 参数

| 参数         | 说明     | 类型   | 可选值                                 | 默认值  |
| ------------ | -------- | ------ | -------------------------------------- | ------- |
| percent      | 显示比例 | Number | -                                      | 0       |
| color        | 显示颜色 | String | green, red, yellow, blue, primary, RGB | primary |
| stroke-width | 高度     | Number | -                                      | 10      |

<script>
  export default {
    data() {
      return {
        value: 10
      };
    }
  };
</script>
