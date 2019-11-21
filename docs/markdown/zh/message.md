[[toc]]

## Message 提示

### 普通的 Message 提示

这里写了两种调用，实际是同一个方法对象，下面的用例都使用 vue 调用做示例，js 调用模式与 vue 调用一样。
:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="vueinfo()">Vue 调用提示</blue-button>
    <blue-button class="blue-btn" @click="jsinfo()">Js 调用提示</blue-button>
  </p>
</template>
<script>
  export default {
    methods: {
      vueinfo() {
        this.$Message("这是一个普通的提醒");
      },
      jsinfo() {
        this.$Message("这是一个普通的提醒");
      }
    }
  };
</script>
```

:::

### 不同类型的提示

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn blue-btn-blue" @click="message('info')"
      >消息</blue-button
    >
    <blue-button class="blue-btn blue-btn-green" @click="message('success')"
      >成功</blue-button
    >
    <blue-button class="blue-btn blue-btn-yellow" @click="message('warn')"
      >警告</blue-button
    >
    <blue-button class="blue-btn blue-btn-red" @click="message('error')"
      >错误</blue-button
    >
  </p>
</template>
<script>
  export default {
    methods: {
      message(type) {
        let text = {
          info: "消息",
          success: "成功",
          warn: "警告",
          error: "错误"
        }[type];
        this.$Message({
          type,
          text: `这是一个${text}的消息`
        });
      }
    }
  };
</script>
```

:::

### 不自动关闭的提示

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="message1()">不自动关闭</blue-button>
  </p>
</template>
<script>
  export default {
    methods: {
      message1() {
        this.$Message(`这是一个不会自动关闭的消息`, 0);
        // this.$Message({
        //   text:`这是一个不会自动关闭的消息`,
        //   timeout: 0
        // })
      }
    }
  };
</script>
```

:::

### 加载中的 loading

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="message2()">显示加载中</blue-button>
  </p>
</template>
<script>
  export default {
    methods: {
      message2() {
        let message = this.$Message.loading(`正在加载中`, 0);
        // this.$Message({
        //   type: 'loading',
        //   text:`正在加载中`,
        //   timeout: 0
        // })
        setTimeout(() => {
          message.close();
        }, 4000);
      }
    }
  };
</script>
```

:::

### 设置全局自动关闭时间

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="config()"
      >设置全局自动关闭时间为1秒</blue-button
    >
  </p>
</template>
<script>
  export default {
    methods: {
      config() {
        this.$Message.config({
          timeout: 1000
        });
      }
    }
  };
</script>
```

:::

### Message 参数

| 参数    | 说明                   | 类型   | 可选值                              | 默认值 |
| ------- | ---------------------- | ------ | ----------------------------------- | ------ |
| text    | 提示的文本             | String | -                                   | -      |
| type    | 提示类型               | String | loading, info, warn, success, error | info   |
| timeout | 显示多少毫秒后自动关闭 | Number | -                                   | 3000ms |

### Message 方法

| 方法  | 说明         | 参数 |
| ----- | ------------ | ---- |
| close | 关闭 Message | 无   |

<script>
export default {
  methods: {
    vueinfo() {
      this.$Message('这是一个普通的提醒');
    },
    jsinfo() {
      this.$Message('这是一个普通的提醒');
    },
    message(type) {
        let text = {
          info: "消息",
          success: "成功",
          warn: "警告",
          error: "错误"
        }[type];
        this.$Message({
          type,
          text: `这是一个${text}的消息`
        });
      },
     message1() {
        this.$Message(`这是一个不会自动关闭的消息`, 0);
        // this.$Message({
        //   text:`这是一个不会自动关闭的消息`,
        //   timeout: 0
        // })
      },
    message2() {
        let message = this.$Message.loading(`正在加载中`, 0);
        // this.$Message({
        //   type: 'loading',
        //   text:`正在加载中`,
        //   timeout: 0
        // })
        setTimeout(() => {
          message.close();
        }, 4000);
      },
    config() {
        this.$Message.config({
          timeout: 1000
        });
      }
  }
};
</script>
