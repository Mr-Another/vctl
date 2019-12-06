[[toc]]

## BackTop 返回顶部 有 bug 
- icon图标没有
- 由于是fixed相对于窗口定位，展示效果较差

> 非 template/render 模式下，请使用 blue-backtop。

:::demo

```html
<template>
  <div class="text" v-for="item in 50" :key="item">展示内容</div>
  <blue-backtop :target="getTarget" :bottom="310" :right="275"></blue-backtop>
</template>

<script>
  export default {
    methods: {
      getTarget() {
        return document.querySelector(".blue-markdown");  // 选择滚动的元素
      }
    }
  };
</script>
```

:::

### Backtop 参数

| 参数                    | 说明            | 类型           | 可选值          | 默认值           |
| ------------------ | ------------ | ----------- | ------------ | ------------- |
| bottom                 | 距离窗口底部的长度 | Number    | -               | 50               |
| right                   | 距离窗口右侧的长度 | Number    | -               | 50               |

<script>
export default {
  methods: {
    getTarget() {
      return document.querySelector('.blue-markdown');
    }
  }
};
</script>
