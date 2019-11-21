[[toc]]

## Notice 通知

### 普通的通知

这里写了两种调用，实际是同一个方法对象，下面的用例都使用 vue 调用做示例，js 调用模式与 vue 调用一样

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="vueinfo()">Vue 调用提示</blue-button>
    <blue-button class="blue-btn" @click="jsinfo()">Js 调用提示</blue-button>
  </p>
</template>
<script>
  // import heyui from 'heyui'; 实际调用
  export default {
    methods: {
      vueinfo() {
        this.$Notice("这是一个普通的通知");
      },
      jsinfo() {
        this.$Notice("这是一个普通的通知");
      }
    }
  };
</script>
```

:::

### 各种通知

:::demo

```html
<template>
  <div>
    <blockquote>普通通知</blockquote>
    <p>
      <blue-button color="blue" @click="notice('info')">消息</blue-button>
      <blue-button color="green" @click="notice('success')">成功</blue-button>
      <blue-button color="yellow" @click="notice('warn')">警告</blue-button>
      <blue-button color="red" @click="notice('error')">错误</blue-button>
      <blue-button color="primary" icon="icon-bell" @click="noticeIcon(false)">
        自定义Icon
      </blue-button>
    </p>
    <blockquote>标题通知</blockquote>
    <p>
      <blue-button color="blue" @click="noticeTitle('info')">消息</blue-button>
      <blue-button color="green" @click="noticeTitle('success')"
        >成功</blue-button
      >
      <blue-button color="yellow" @click="noticeTitle('warn')"
        >警告</blue-button
      >
      <blue-button color="red" @click="noticeTitle('error')">错误</blue-button>
      <blue-button color="primary" icon="icon-bell" @click="noticeIcon(true)">
        自定义Icon
      </blue-button>
    </p>
  </div>
</template>
<script>
  export default {
    methods: {
      notice(type) {
        let text = {
          info: "消息",
          success: "成功",
          warn: "警告",
          error: "错误"
        }[type];
        this.$Notice[type](`这是一个${text}的通知`);
      },
      noticeIcon(hasTitle) {
        this.$Notice({
          icon: "icon-bell",
          title: hasTitle ? "自定义Icon" : null,
          content: `这是一个自定义Icon的通知`
        });
      },
      noticeTitle(type) {
        let text = {
          info: "消息",
          success: "成功",
          warn: "警告",
          error: "错误"
        }[type];
        this.$Notice({
          type,
          title: text,
          content: `这是一个${text}的通知`
        });
      }
    }
  };
</script>
```

:::

### 设置 timeout 时间

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="notice()">不自动关闭</blue-button>
    <blue-button class="blue-btn" @click="notice2(1000)">1s</blue-button>
    <blue-button class="blue-btn" @click="notice2(5000)">5s</blue-button>
    <blue-button class="blue-btn" @click="notice2(15000)">15s</blue-button>
  </p>
</template>
<script>
  export default {
    methods: {
      notice() {
        this.$Notice(`这是一个不会自动关闭的通知`, 0);
      },
      notice2(timeout) {
        this.$Notice({
          title: `${timeout / 1000}s关闭`,
          content: `这是一个${timeout / 1000}s就关闭的消息`,
          timeout: timeout,
          buttons: [
            {
              name: "关闭",
              type: "cancel"
            }
          ]
        });
      }
    }
  };
</script>
```

:::

### 自定义通知

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="noticeButton()"
      >自定义按钮</blue-button
    >
    <blue-button class="blue-btn" @click="noticeButton(true)"
      >自定义按钮2</blue-button
    >
  </p>
</template>
<script>
  export default {
    methods: {
      noticeButton(hasTitle = false) {
        let info = {
          type: "info",
          content: `这是一个可以自己关闭的通知`,
          timeout: 0,
          buttons: [
            {
              name: "忽略",
              type: "cancel"
            },
            {
              name: "去看看",
              color: "primary",
              type: "confirm"
            }
          ],
          events: {
            confirm: e => {
              this.$Message("去处理看看");
              e.close();
            },
            cancel: e => {
              this.$Message("我已经去忽略了");
              e.close();
            }
          }
        };
        if (hasTitle) {
          info.title = "自定义通知";
        }
        this.$Notice(info);
      }
    }
  };
</script>
```

:::

### 组件式通知

:::demo

```html
<template>
  <p>
    <blue-button class="blue-btn" @click="noticeButtoncc()"
      >打开Notice</blue-button
    >
  </p>
</template>
<script>
  import noticeTest from "./noticeTest";
  export default {
    methods: {
      noticeButtoncc() {
        let info = {
          component: {
            vue: noticeTest,
            datas: {
              fruit: "苹果"
            }
          },
          events: {
            success: (modal, data) => {
              this.$Message(data);
            }
          }
        };
        this.$Notice(info);
      }
    }
  };
</script>
```

:::

> noticetest 里面使用的代码

```vue
<template>
  <div>
    <header class="blue-notice-header">测试</header>
    <div v-padding="15">传递的参数：{{ fruit }}</div>
    <footer class="blue-notice-footer">
      <button class="blue-btn" @click="close">关闭</button>
      <button class="blue-btn blue-btn-primary" @click="triggerEvent">
        去处理
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 1,
      param1: { 1: "选择1", 2: "选择2", 3: "选择3" }
    };
  },
  props: {
    fruit: String
  },
  methods: {
    triggerEvent() {
      this.$emit("success", "测试");
      this.$router.push({ name: "Home" });
      this.close();
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>
```

### Notice 参数

| 参数    | 说明                   | 类型   | 可选值                                                | 默认值           |
| ------- | ---------------------- | ------ | ----------------------------------------------------- | ---------------- |
| content | 提示的文本             | String | -                                                     | -                |
| title   | 提示的标题             | String | -                                                     | -                |
| type    | 提示类型               | String | loading, info, warn, success, error                   | info             |
| timeout | 显示多少毫秒后自动关闭 | Number | -                                                     | 全局配置 timeout |
| icon    | 引用 icon              | string | 其实是定义一个 icon 的 class，也可以自己写 class 样式 | -                |

<script>
 export default {
    methods: {
      vueinfo() {
        this.$Notice("这是一个普通的通知");
      },
      jsinfo() {
        this.$Notice("这是一个普通的通知");
      },
      notice(type) {
      let text = { info: '消息', success: '成功', warn: '警告', error: '错误' }[type];
      this.$Notice[type](`这是一个${text}的通知`);
    },
    noticeIcon(hasTitle) {
      this.$Notice({
        icon: 'icon-bell',
        title: hasTitle ? '自定义Icon' : null,
        content: `这是一个自定义Icon的通知`
      });
    },
    noticeTitle(type) {
      let text = { info: '消息', success: '成功', warn: '警告', error: '错误' }[type];
      this.$Notice({
        type,
        title: text,
        content: `这是一个${text}的通知`
      });
    },
    notice() {
        this.$Notice(`这是一个不会自动关闭的通知`, 0);
      },
      notice2(timeout) {
        this.$Notice({
          title: `${timeout / 1000}s关闭`,
          content: `这是一个${timeout / 1000}s就关闭的消息`,
          timeout: timeout,
          buttons: [
            {
              name: "关闭",
              type: "cancel"
            }
          ]
        });
      },
      noticeButton(hasTitle = false) {
        let info = {
          type: "info",
          content: `这是一个可以自己关闭的通知`,
          timeout: 0,
          buttons: [
            {
              name: "忽略",
              type: "cancel"
            },
            {
              name: "去看看",
              color: "primary",
              type: "confirm"
            }
          ],
          events: {
            confirm: e => {
              this.$Message("去处理看看");
              e.close();
            },
            cancel: e => {
              this.$Message("我已经去忽略了");
              e.close();
            }
          }
        };
        if (hasTitle) {
          info.title = "自定义通知";
        }
        this.$Notice(info);
      },
      noticeButtoncc() {
        let info = {
          component: {
            vue: noticeTest,
            datas: {
              fruit: "苹果"
            }
          },
          events: {
            success: (modal, data) => {
              this.$Message(data);
            }
          }
        };
        this.$Notice(info);
      }
    }
  };
</script>
