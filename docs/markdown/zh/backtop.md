[[toc]]

## BackTop 返回顶部 有 bug

> 非 template/render 模式下，请使用 blue-backtop。

:::demo

```html
<template>
  <blue-backtop :target="getTarget" :bottom="40" :right="50"></blue-backtop>
</template>

<script>
  export default {
    methods: {
      getTarget() {
        return document.querySelector(".blue-markdown");
      }
    }
  };
</script>
```

:::

<div style="height:800px">333</div>

<script>

export default {
methods: {
getTarget() {
return document.querySelector('.right-frame');
}
}
};
</script>
