[[toc]]

## Loading 加载中

> 非 template/render 模式下，请使用 blue-loading。

### 模块加载效果

:::demo

```html
<template>
  <div>
    <p v-height="40">
      <blue-switch v-model="loading">change loading</blue-switch>
    </p>
    <div>
      <div style="padding:100px 0;" v-bg-color:gray4 class="text-center">
        content
      </div>
      <Loading text="Loading" :loading="loading"></Loading>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false
      };
    }
  };
</script>
```

:::

### 全局加载效果

:::demo

```html
<template>
  <div>
    <p>
      <blue-button @click="pageload">Vue 调用全局加载</blue-button>
      <blue-button @click="pageloadJs">Js 调用全局加载</blue-button>
    </p>
  </div>
</template>
<script>
  export default {
    methods: {
      pageload() {
        this.$Loading();
        setTimeout(() => {
          this.$Loading.close();
        }, 3000);
      },
      pageloadJs() {
        heyui.$Loading("加载中");
        setTimeout(() => {
          heyui.$Loading.close();
        }, 3000);
      }
    }
  };
</script>
```

:::

### Loading 参数

| 参数    | 说明         | 类型    | 可选值 | 默认值 |
| ------- | ------------ | ------- | ------ | ------ |
| text    | 加载文本说明 | String  | -      | -      |
| loading | loading 状态 | Boolean | -      | false  |

<script>
 export default {
     data() {
      return {
        loading: false
      };
    },
    methods: {
      pageload() {
        this.$Loading();
        setTimeout(() => {
          this.$Loading.close();
        }, 3000);
      },
      pageloadJs() {
        this.$Loading("加载中");
        setTimeout(() => {
          this.$Loading.close();
        }, 3000);
      }
    }
  };
</script>
