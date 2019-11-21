[[toc]]

## TextEllipsis 超出文本省略

> 非 template/render 模式下，请使用 blue-textellipsis。

### 基本调用

:::demo

```html
<template>
  <blue-textellipsis :text="text" :height="50" v-width="200">
    <template slot="more"
      >...</template
    >
  </blue-textellipsis>
</template>

<script>
  export default {
    data() {
      return {
        text:
          "《华盛顿自由灯塔报》几天前报道称，美国国防部官员透露中国近日进行第十次东风-41洲际导弹的试射活动，这次试射中东风-41导弹投射了多个弹头并成功命中中国西部靶场目标。"
      };
    },
    methods: {}
  };
</script>
```

:::

### 自定义前后缀

:::demo

```html
<template>
  <blue-textellipsis :text="text" :height="100" v-width="200">
    <template slot="more"
      >...</template
    >
    <span slot="before" class="blue-tag blue-tag-red">new</span>
    <span slot="after">[09/14]</span>
  </blue-textellipsis>
</template>
```

:::

### 当被隐藏文字的时候，使用 tooltip 提示

:::demo

```html
<template>
  <div>
    <blue-textellipsis
      v-for="text of texts"
      :key="text"
      :text="text"
      :height="40"
      v-width="300"
      use-tooltip
      tooltip-theme="white"
      placement="right"
    >
      <template slot="more"
        >...</template
      >
    </blue-textellipsis>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        texts: [
          "超级长超级长的公司名称超级长超级长超级长超级长",
          "有创意的公司名字"
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### TextEllipsis 参数

| 参数          | 说明                 | 类型    | 可选值 | 默认值 |
| ------------- | -------------------- | ------- | ------ | ------ |
| text          | 需要省略的文本       | String  | -      | -      |
| height        | 限制的高度           | Number  | -      | -      |
| isLimitHeight | 是否开启限制         | Boolean | -      | true   |
| useTooltip    | 是否使用 tooltip     | Boolean | -      | false  |
| tooltipTheme  | tooltip 的风格       | String  | -      |        |
| placement     | tooltip 的 placement | String  | -      |        |

### TextEllipsis 事件

| 参数 | 说明                                         |
| ---- | -------------------------------------------- |
| show | 当 isLimitHeight 为 true，文本全部展示的时候 |
| hide | 当 isLimitHeight 为 true，文本省略的时候     |

<script>

export default {
  data() {
    return {
      text: '《华盛顿自由灯塔报》几天前报道称，美国国防部官员透露中国近日进行第十次东风-41洲际导弹的试射活动，这次试射中东风-41导弹投射了多个弹头并成功命中中国西部靶场目标。',
      texts: [
          "超级长超级长的公司名称超级长超级长超级长超级长",
          "有创意的公司名字"
        ]
    };
  },
  methods: {

  }
};
</script>
