[[toc]]

## ScrollIntoView 滚动至视图内

### 基本调用

:::demo

```html
<template>
  <div>
    <div v-height="1200" class="demo-top relative">
      <p class="middle-center">点</p>
    </div>
    <blue-button @click="scrollIntoView('top')">将点集中在视图顶部</blue-button>
    <blue-button @click="scrollIntoView('center')"
      >将点集中在视图中部</blue-button
    >
  </div>
</template>

<script>
  export default {
    methods: {
      scrollIntoView(position) {
        this.$ScrollIntoView(this.$el.querySelector(".middle-center"), {
          time: 500,
          align: {
            top: position == "top" ? 0 : 0.5, // 视图比例 0 to 1, 默认 0.5 (center)
            topOffset: position == "top" ? 80 : 0 // 视图位移 pixels to offset top alignment
          }
        });
      }
    }
  };
</script>
```

:::

### javascript 调用

```javascript
this.$ScrollIntoView(someElement, {
  time: 500, // 半秒
  align:{
    top: 0 to 1, // default 0.5 (center)
    left: 0 to 1, // default 0.5 (center)
    topOffset: 0, // 偏移顶部对齐的像素
    leftOffset: 0, // 偏移左边对齐的像素
  },
  isScrollable: function(target, defaultIsScrollable){
    // 判断对象是否可以滚动，针对有多层scroll父层的情况
    return defaultIsScrollable(target) || ~target.className.indexOf('scrollable');
  }
});
```

### ScrollIntoView 参数

| 参数         | 说明                                               | 类型   | 可选值 | 默认值 |
| ------------ | -------------------------------------------------- | ------ | ------ | ------ |
| time         | 位移消耗的时间                                     | Number | -      | 0      |
| align        | 位置，包含 top, topOffset                          |        | -      |        |
| isScrollable | 判断对象是否可以滚动，针对有多层 scroll 父层的情况 |        |        |        |

<script>

export default {
  methods: {
    scrollIntoView(position) {
      this.$ScrollIntoView(this.$el.querySelector('.middle-center'), {
        time: 500,
        align: {
          top: position == 'top' ? 0 : 0.5, // 视图比例 0 to 1, 默认 0.5 (center)
          topOffset: position == 'top' ? 80 : 0 // 视图位移 pixels to offset top alignment
        }
      });
    }
  }
};
</script>
