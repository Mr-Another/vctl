[[toc]]

### Modal 弹出框

### 简单实用 Confirm

:::demo

```html
<template>
  <div>
    <blue-button class="blue-btn" @click="confirm">Confirm</blue-button>
  </div>
</template>

<script>
  export default {
    methods: {
      confirm() {
        // heyui.$Confirm js调用也可以
        // title为空的时候无头部
        this.$Confirm("确定删除？", "自定义title")
          .then(() => {
            this.$Message.success("确定删除！");
          })
          .catch(() => {
            this.$Message.error("取消");
          });
      }
    }
  };
</script>
```

:::

### 基本调用

:::demo

```html
<template>
  <div>
    <blue-button class="blue-btn" @click="open">Js调用Modal</blue-button>
    <blue-button class="blue-btn" @click="opened=true"
      >Vue调用Modal</blue-button
    >
    <Modal v-model="opened">
      <div slot="header">Vue</div>
      <div>这是使用vue调用的弹出框</div>
      <div slot="footer">
        <blue-button class="blue-btn" @click="opened=false">取消</blue-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        opened: false
      };
    },
    methods: {
      open() {
        this.$Modal({
          title: "Js",
          content: "这是使用Js调用的弹出框"
        });
      }
    }
  };
</script>
```

:::

### Modal 常用参数

:::demo

```html
<template>
  <div>
    <blue-form :label-width="150" readonly>
      <blue-formitem label="点击遮罩可否关闭">
        <blue-switch small v-model="params.closeOnMask"
          >closeOnMask</blue-switch
        >
      </blue-formitem>
      <blue-formitem label="全屏">
        <blue-switch
          small
          v-model="params.fullScreen"
          @change="revert('middle', 'height')"
          >fullScreen</blue-switch
        >
      </blue-formitem>
      <blue-formitem label="垂直居中">
        <blue-switch
          small
          v-model="params.middle"
          @change="revert('fullScreen', 'height')"
          >middle</blue-switch
        >
      </blue-formitem>
      <blue-formitem label="有遮罩">
        <blue-switch small v-model="params.hasMask" @change="revert('height')"
          >hasMask</blue-switch
        >
      </blue-formitem>
      <blue-formitem label="有分割线">
        <blue-switch small v-model="params.hasDivider">hasDivider</blue-switch>
      </blue-formitem>
      <blue-formitem label="测试超长弹框">
        <blue-switch
          small
          v-model="height"
          @change="revert('fullScreen', 'middle', 'hasMask')"
        ></blue-switch>
      </blue-formitem>
    </blue-form>
    <p>
      <blue-button class="blue-btn" @click="open1">Js调用Modal</blue-button>
      <blue-button class="blue-btn" @click="opened=true"
        >Vue调用Modal</blue-button
      >
    </p>
    <Modal v-model="opened" v-bind="params">
      <div slot="header">Vue</div>
      <div :style="{'height': height ? '800px' : 'auto'}">
        <div>这是Vue自定义的弹出框</div>
        <div><blue-select dict="simple" v-width="160"></blue-select></div>
      </div>
      <div slot="footer">
        <blue-button class="blue-btn" @click="close">取消</blue-button>
        <blue-button class="blue-btn blue-btn-primary" @click="confirm">确定</blue-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  const DEFAULT_VALUE = {
    closeOnMask: true,
    fullScreen: false,
    middle: false,
    hasMask: true,
    hasDivider: false
  };
  export default {
    data() {
      return {
        params: {
          ...DEFAULT_VALUE
        },
        height: false,
        opened: false
      };
    },
    methods: {
      revert(...keys) {
        for (let key of keys) {
          if (key == "height") {
            this.height = false;
          } else {
            this.params[key] = DEFAULT_VALUE[key];
          }
        }
      },
      open() {
        let params = {
          title: "Js",
          fullScreen: true,
          content: `<div style="height: ${
            this.height ? "800px" : "auto"
          }">这是Js自定义的弹出框</div>`,
          buttons: [
            {
              type: "cancel",
              name: "取消"
            },
            {
              type: "confirm",
              name: "确认",
              color: "primary"
            }
          ],
          events: {
            confirm: modal => {
              this.$Message("点击确定了。");
              modal.close();
            },
            cancel: modal => {
              modal.close();
            }
          }
        };
        Object.assign(params, this.params);
        this.$Modal(params);
      },
      confirm() {
        this.$Message("点击确定了。");
        this.close();
      },
      close() {
        this.opened = false;
      }
    }
  };
</script>
```

:::

### 自定义操作按钮

:::demo

```html
<template>
  <div>
    <blue-button @click="open3">Js调用Modal</blue-button>
    <blue-button @click="opened1=true">Vue调用Modal</blue-button>
    <Modal v-model="opened1">
      <div slot="header">Vue</div>
      <div>这是使用vue调用的弹出框</div>
      <div slot="footer">
        <blue-button color="primary" @click="modalConfirm">确认</blue-button>
        <blue-button @click="modalClose">关闭</blue-button>
        <blue-button color="red" @click="modalDelete">删除</blue-button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        opened: false,
        opened1: false
      };
    },
    methods: {
      open() {
        this.$Modal({
          title: "Js",
          content: "这是使用Js调用的弹出框",
          buttons: [
            {
              type: "ok",
              name: "确认",
              color: "primary"
            },
            {
              type: "cancel",
              name: "关闭"
            },
            {
              type: "delete",
              name: "删除",
              color: "red"
            }
          ],
          events: {
            $init: modal => {
              // trigger when modal inited
            },
            $close: modal => {
              // trigger when modal closed
            },
            delete: modal => {
              modal.close();
              this.$Message.error("点击了删除按钮");
            },
            ok: modal => {
              this.$Message.info("点击了确认按钮");
              modal.close();
            },
            cancel: modal => {
              this.$Message.warn("点击了取消按钮");
              modal.close();
            }
          }
        });
      },
      modalConfirm() {
        this.$Message.info("点击了确认按钮");
        this.opened = false;
      },
      modalClose() {
        this.$Message.warn("点击了取消按钮");
        this.opened = false;
      },
      modalDelete() {
        this.$Message.error("点击了删除按钮");
        this.opened = false;
      }
    }
  };
</script>
```

:::

### 自定义的弹窗

:::demo

```html
<template>
  <div>
    <p>{{value | dictMapping('simple')}}</p>
    <p>
      <blue-button @click="openSelfDefine()">无背景色弹框</blue-button>
      <blue-button @click="open4('right')">右侧弹框(系统自带)</blue-button>
      <blue-button @click="open4('left')">左侧弹框(系统自带)</blue-button>
    </p>
  </div>
</template>

<script>
  import ModalTest from "./modaltest";

  export default {
    components: {},
    data() {
      return {
        value: null
      };
    },
    methods: {
      openSelfDefine() {
        this.$Modal({
          transparent: true, // 背景透明
          content: `<img src='/static/avatar-female.png' />`,
          buttons: []
        });
      },
      open4(place) {
        this.$Modal({
          type: `drawer-${place}`,
          width: 400,
          component: {
            vue: ModalTest,
            data: { subparam: "我是有父组件传来的值" }, // 子组件使用props params参数获取数据，建议使用datas
            datas: { fruit: this.value } // 子组件直接使用 props 即可使用，兼容性 1.15.0+
          },
          events: {
            success: (modal, data) => {
              this.value = data;
            }
          }
        });
      }
    }
  };
</script>
```

:::

### modal 调用组件

:::demo

```html
<template>
  <div>
    <p>{{value | dictMapping('simple')}}</p>
    <p>
      <blue-button class="blue-btn" @click="open5(false)"
        >Js打开弹出框</blue-button
      >
      <blue-button class="blue-btn" @click="openModal = true"
        >Vue打开弹出框</blue-button
      >
      <Modal v-model="openModal2">
        <ModalTest
          :fruit="value"
          :params="{subparam: 'test1'}"
          @close="openModal2=false"
        ></ModalTest>
      </Modal>
    </p>
  </div>
</template>

<script>
  import ModalTest from "./modalTest";

  export default {
    components: {
      ModalTest
    },
    data() {
      return {
        value: null,
        openModal2: false
      };
    },
    methods: {
      success(data) {
        this.value = data;
      },
      open5() {
        this.$Modal({
          component: {
            // 这里也可以定义异步调用
            // vue: (resolve) => {
            //   require(['./modalTest'], resolve);
            // },
            vue: ModalTest,
            data: { subparam: "这次传递个不一样的" }, // 子组件使用props params参数获取数据，建议使用datas
            datas: { fruit: this.value } // 子组件直接使用 props 即可使用，兼容性 1.15.0+
          },
          events: {
            success: (modal, data) => {
              this.value = data;
            }
          }
        });
      }
    }
  };
</script>
```

:::

> 弹出框中使用的代码

```html
<template>
  <div>
    <!-- blue-modal-header 将自带modal头部样式 -->
    <header class="blue-modal-header">测试</header>
    <div style="padding:15px">
      <select dict="simple" v-model="value"></select>
      <p>传递的参数：{{params.subparam}}, {{fruit}}</p>
      <p>vuex传递的值：{{test}}</p>
    </div>
    <!-- blue-modal-footer 将自带modal底部样式 -->
    <footer class="blue-modal-footer">
      <button class="blue-btn blue-btn-primary" @click="success">确定</button>
      <button class="blue-btn blue-btn-blue" @click="go">跳转</button>
      <button class="blue-btn" @click="close">关闭</button>
    </footer>
  </div>
</template>

<script>
  import store from "js/store";
  import { mapGetters } from "vuex";
  export default {
    props: {
      params: Object,
      fruit: String
    },
    data() {
      return {
        value: this.fruit
      };
    },
    store,
    computed: {
      ...mapGetters({
        test: "getTest"
      })
    },
    methods: {
      success() {
        // 向外层触发事件, 1.17.0 之前
        // this.$emit('event', 'update', this.value);

        // 直接使用emit触发外部的events监听，兼容性 1.18.0+
        this.$emit("success", this.value);
        this.close();
      },
      go() {
        // 注意：如果使用HeyUI.$Modal的方式调用，将无法使用$router等vue依赖组件。
        this.$router.push({ name: "Home" });
        this.$emit("close");
      },
      close() {
        this.$emit("close");
      }
    }
  };
</script>
```

### Modal 参数

| 参数         | 说明                             | 类型    | 可选值 | 默认值                         |
| ------------ | -------------------------------- | ------- | ------ | ------------------------------ |
| hasCloseIcon | 是否有关闭的 Icon                | Boolean | -      | false                          |
| hasMask      | 是否有遮罩层                     | Boolean | -      | true                           |
| hasDivider   | 是否有线条分割头部以及尾部       | Boolean | -      | 全局配置 modal.hasDivider      |
| closeOnMask  | 是否点击遮罩层关闭 modal         | Boolean | -      | true                           |
| middle       | 是否垂直居中展示                 | Boolean | -      | false                          |
| fullScreen   | 是否全屏                         | Boolean | -      | false                          |
| transparent  | 是否背景色透明                   | Boolean | -      | false                          |
| type         | 自定义类型，无默认的打开样式。   | String  | -      | ['drawer-right','drawer-left'] |
| className    | 自定义 class                     | String  | -      | -                              |
| buttons      | 设定底层按钮，目前只支持 js 定义 | Array   | -      | ['cancel']                     |
| content      | 设定内容，目前只支持 js 定义     | String  | -      | -                              |
| width        | 设定宽度，目前只支持 js 定义     | Number  | -      |                                |
| events       | 事件监听，目前只支持 js 定义     | Object  | -      | -                              |

<script>
const DEFAULT_VALUE = {
    closeOnMask: true,
    fullScreen: false,
    middle: false,
    hasMask: true,
    hasDivider: false
};

import ModalTest from "@/docs/markdown/zh/modaltest";

export default {
    data() {
        return {
        opened: false,
        opened1: false,
        value:null,
         openModal2: false,
        params: {
          ...DEFAULT_VALUE
        },
        height: false,
        };
    },
  methods: {
    confirm() {
      // heyui.$Confirm js调用也可以
      // title为空的时候无头部
      this.$Confirm('确定删除？', '自定义title').then(() => {
        this.$Message.success('确定删除！');
      }).catch(() => {
        this.$Message.error('取消');
      });
    },
    open() {
        this.$Modal({
          title: "Js",
          content: "这是使用Js调用的弹出框"
        });
    },
    revert(...keys) {
        for (let key of keys) {
          if (key == "height") {
            this.height = false;
          } else {
            this.params[key] = DEFAULT_VALUE[key];
          }
        }
      },
      open1() {
        let params = {
          title: "Js",
          fullScreen: true,
          content: `<div style="height: ${
            this.height ? "800px" : "auto"
          }">这是Js自定义的弹出框</div>`,
          buttons: [
            {
              type: "cancel",
              name: "取消"
            },
            {
              type: "confirm",
              name: "确认",
              color: "primary"
            }
          ],
          events: {
            confirm: modal => {
              this.$Message("点击确定了。");
              modal.close();
            },
            cancel: modal => {
              modal.close();
            }
          }
        };
        Object.assign(params, this.params);
        this.$Modal(params);
      },
      close() {
        this.opened = false;
      },
      open3() {
        this.$Modal({
          title: "Js",
          content: "这是使用Js调用的弹出框",
          buttons: [
            {
              type: "ok",
              name: "确认",
              color: "primary"
            },
            {
              type: "cancel",
              name: "关闭"
            },
            {
              type: "delete",
              name: "删除",
              color: "red"
            }
          ],
          events: {
            $init: modal => {
              // trigger when modal inited
            },
            $close: modal => {
              // trigger when modal closed
            },
            delete: modal => {
              modal.close();
              this.$Message.error("点击了删除按钮");
            },
            ok: modal => {
              this.$Message.info("点击了确认按钮");
              modal.close();
            },
            cancel: modal => {
              this.$Message.warn("点击了取消按钮");
              modal.close();
            }
          }
        });
      },
      modalConfirm() {
        this.$Message.info("点击了确认按钮");
        this.opened1 = false;
      },
      modalClose() {
        this.$Message.warn("点击了取消按钮");
        this.opened1 = false;
      },
      modalDelete() {
        this.$Message.error("点击了删除按钮");
        this.opened1 = false;
      },
      openSelfDefine() {
        this.$Modal({
          transparent: true, // 背景透明
          content: `<img src='/static/avatar-female.png' width='300'/>`,
          buttons: []
        });
      },
      open4(place) {
        this.$Modal({
          type: `drawer-${place}`,
          width: 400,
          component: {
            vue: ModalTest,
            data: { subparam: "我是由父组件传来的值" }, // 子组件使用props params参数获取数据，建议使用datas
            datas: { fruit: this.value } // 子组件直接使用 props 即可使用，兼容性 1.15.0+
          },
          events: {
            success: (modal, data) => {
              this.value = data;
            }
          }
        });
      },
    open5() {
        this.$Modal({
          component: {
            // 这里也可以定义异步调用
            // vue: (resolve) => {
            //   require(['./modalTest'], resolve);
            // },
            vue: ModalTest,
            data: { subparam: "这次传递个不一样的" }, // 子组件使用props params参数获取数据，建议使用datas
            datas: { fruit: this.value } // 子组件直接使用 props 即可使用，兼容性 1.15.0+
          },
          events: {
            success: (modal, data) => {
              this.value = data;
            }
          }
        });
      }
  }
};
</script>
