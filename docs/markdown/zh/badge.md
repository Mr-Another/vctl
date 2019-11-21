[[toc]]

## Badge 徽标数

> 非 template/render 模式下，请使用 blue-badge。

### 基本应用

:::demo

```html
<template>
  <div>
    <blue-buttongroup size="s">
      <blue-button icon="icon-plus" @click="count++"></blue-button>
      <blue-button icon="icon-minus" @click="count<=0||count--"></blue-button>
    </blue-buttongroup>
    <i class="split"></i>
    <Badge :count="count"><div class="text-center">消息</div></Badge>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 2
      };
    }
  };
</script>
```

:::

### 显示最大数

:::demo

```html
<template>
  <div>
    <Badge :count="100" :max-count="99"
      ><div class="text-center">消息</div></Badge
    >
    <i class="blue-split" v-width="40"></i>
    <Badge :count="1000" :max-count="999"
      ><div class="text-center">消息</div></Badge
    >
  </div>
</template>
```

:::

### 就算 0 也显示

:::demo

```html
<template>
  <div>
    <Badge :count="0" :show-zero="true"
      ><div class="text-center">消息</div></Badge
    >
  </div>
</template>
```

:::

### 小红点

:::demo

```html
<template>
  <div>
    <Badge :count="1" :dot="true">消息</Badge>
    <i class="blue-split" v-width="20"></i>
    <Badge :count="1" :dot="true"
      ><blue-button size="s">消息</blue-button></Badge
    >
  </div>
</template>
```

:::

### 不同的展示方式

:::demo

```html
<template>
  <div v-width="200">
    <div style="position:relative;padding:5px;">
      <span>Menu 1</span>
      <Badge :count="20" position="right"></Badge>
    </div>
    <div style="position:relative;padding:5px;">
      <span>Menu2</span>
      <Badge :count="100" :max-count="99" position="right"></Badge>
    </div>
  </div>
</template>
```

:::

### Badge 参数

| 参数     | 说明                  | 类型    | 可选值 | 默认值 |
| -------- | --------------------- | ------- | ------ | ------ |
| count    | 显示的值              | Number  | -      | 0      |
| maxCount | 最大显示的值          | Number  | -      | 99     |
| showZero | 当值为 0 的时候也显示 | Boolean | -      | false  |
| position | 显示在 parent 的右侧  | String  | right  | -      |

<script>
export default {
  data() {
    return {
      count: 2
    };
  }
};
</script>
