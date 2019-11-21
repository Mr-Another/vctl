[[toc]]

## LoadingBar 加载进度条

###基础调用

:::demo

```html
<template>
  <div>
    <blue-button color="primary" @click="start">开始</blue-button>
    <blue-button color="green" @click="success">成功</blue-button>
    <blue-button color="red" @click="fail">失败</blue-button>
  </div>
</template>
<script>
  export default {
    methods: {
      start() {
        this.$LoadingBar.start();
      },
      success() {
        this.$LoadingBar.success();
      },
      fail() {
        this.$LoadingBar.fail();
      }
    }
  };
</script>
```

:::

### vueroute 如何使用

```javascript
import VueRouter from "vue-router";
import BlueUi from "blue-ui";

const routerParam = {};
const router = new VueRouter(routerParam);
router.beforeEach((to, from, next) => {
  BlueUi.$LoadingBar.start();
  next();
});
router.afterEach(() => {
  BlueUi.$LoadingBar.success();
});
```

<script>
export default {
  methods: {
    start() {
      this.$LoadingBar.start();
    },
    success() {
      this.$LoadingBar.success();
    },
    fail() {
      this.$LoadingBar.fail();
    }
  }
};
</script>
