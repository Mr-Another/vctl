[[toc]]

## DropdownMenu

DropdownMenu 可以添加自定义的 className 定义各种不同的模式的下拉菜单，className 将应用在.blue-dropdownmenu-show 上，该 dom 为触发下拉的元素，包含自定义的内容以及右侧展示状态的 icon。

提示：系统自带一个 blue-text-dropdown 的样式。

注意 1：如果 DropdownMenu 在页面最右边，并且显示异常，请给内容设定固定宽度。

注意 2：由于该样式应用在组件中，所以在调用的 vue 文件中，style 的 scope 属性将无效。

> 非 template/render 模式下，请使用 blue-dropdownmenu。

### 基本

:::demo

```html
<template>
  <div>
    <p><blue-switch v-model="disabled" :small="true">禁用</blue-switch></p>
    <blue-dropdownmenu @click="trigger" :datas="param" :disabled="disabled">
      <span :disabled="disabled">菜单menu</span>
    </blue-dropdownmenu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        disabled: false,
        param: ["测试1", "测试2", "测试3"]
      };
    },
    methods: {
      trigger(code, data, event) {
        this.$Message.info(`您点击了${code}`);
        log(data, event);
      }
    }
  };
</script>
```

:::

### 不同样式组合调用

:::demo

```html
<style lang="less"></style>
<template>
  <div>
    <blue-buttongroup>
      <blue-button icon="icon-inbox">Create</blue-button>
      <blue-dropdownmenu button @click="trigger" :datas="param"
        >Edit</blue-dropdownmenu
      >
    </blue-buttongroup>
    <blue-buttongroup>
      <blue-button color="primary" icon="icon-inbox">Create</blue-button>
      <blue-dropdownmenu
        class="blue-btn-primary"
        button
        @click="trigger"
        placement="bottom-end"
        :datas="param"
      ></blue-dropdownmenu>
    </blue-buttongroup>
    <blue-dropdownmenu
      button
      class="blue-btn-primary"
      @click="trigger"
      :datas="param"
      >开始</blue-dropdownmenu
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "测试1", key: "test1" },
          { title: "测试2", key: "test2" },
          { title: "测试3", key: "test3" }
        ]
      };
    },
    methods: {
      trigger(code) {
        this.$Message.info(`您点击了${code}`);
      }
    }
  };
</script>
```

:::

### 组合调用

:::demo

```html
<style scoped lang="less">
  .header-info {
    background: @dark-color;
    height: 40px;
  }
</style>
<style lang="less">
  .header-info-dropdown {
    color: @white-color;
    cursor: pointer;
    line-height: 40px;
    padding: 0 10px 0 15px;
    transition: 0.2s;
    &:hover,
    &.@{pop-ref-prefix} {
      background: rgba(243, 243, 243, 0.19);
    }
    &-dropdown {
      .blue-dropdownmenu-item {
        line-height: 30px;
        &:not(.disabled):hover {
          background: @dark-color;
          color: #fff;
        }
      }
    }
  }
</style>
<template>
  <div class="header-info">
    <blue-dropdownmenu
      @click="trigger"
      :datas="param1"
      class-name="header-info-dropdown"
      :show-count="true"
      :width="150"
    >
      <span>个人信息</span>
    </blue-dropdownmenu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "首页", key: "Home", icon: "icon-home" },
          { title: "消息", key: "message", icon: "icon-bell", count: 8 },
          { divider: true },
          {
            title: "任务",
            key: "task",
            icon: "icon-complete",
            disabled: true
          }
        ]
      };
    },
    methods: {
      trigger(code) {
        this.$Message.info(`您点击了${code}`);
      }
    }
  };
</script>
```

:::

### 不同位置

> placement: top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end

:::demo

```html
<template>
  <blue-dropdownmenu
    @click="trigger"
    :datas="param"
    @show="show"
    @hide="hide"
    placement="bottom-end"
    class-name="blue-text-dropdown"
  >
    <span>菜单menu</span>
  </blue-dropdownmenu>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "测试1", key: "test1" },
          { title: "测试2", key: "test2" },
          { title: "测试3", key: "test3" }
        ]
      };
    },
    methods: {
      trigger(code) {
        this.$Message.info(`您点击了${code}`);
      },
      show() {
        this.$Message.info("展开");
      },
      hide() {
        this.$Message.info("关闭");
      }
    }
  };
</script>
```

:::

### 不同的触发方式

:::demo

```html
<template>
  <blue-dropdownmenu
    @click="trigger"
    :datas="param"
    trigger="hover"
    class-name="blue-text-dropdown"
  >
    <span>菜单menu</span>
  </blue-dropdownmenu>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "测试1", key: "test1" },
          { title: "测试2", key: "test2" },
          { title: "测试3", key: "test3" }
        ]
      };
    },
    methods: {
      trigger(code) {
        this.$Message.info(`您点击了${code}`);
      }
    }
  };
</script>
```

:::

### 右键触发

:::demo

```html
<style lang="less" scoped>
  .dropdownmenu10-demo {
    height: 100px;
    width: 400px;
    border: 1px solid @gray2-color;
  }
</style>

<template>
  <blue-dropdownmenu
    @click="trigger"
    :datas="param2"
    trigger="contextMenu"
    :toggle-icon="false"
  >
    <div class="dropdownmenu10-demo">右键点击区域内</div>
  </blue-dropdownmenu>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "新建", key: "add", icon: "icon-plus" },
          { title: "编辑", key: "edit", icon: "icon-edit-square" },
          { title: "删除", key: "delete", icon: "icon-delete" }
        ]
      };
    },
    methods: {
      trigger(code) {
        this.$Message.info(`您点击了${code}`);
      }
    }
  };
</script>
```

:::

### 不默认添加右侧的 icon

:::demo

```html
<template>
  <blue-dropdownmenu
    @click="trigger"
    :datas="param"
    :toggle-icon="false"
    class-name="blue-text-dropdown"
  >
    <span>菜单menu</span>
  </blue-dropdownMmnu>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "测试1", key: "test1" },
          { title: "测试2", key: "test2" },
          { title: "测试3", key: "test3" }
        ]
      };
    },
    methods: {
      trigger(code, data) {
        this.$Message.info(`您点击了${code}`);
      }
    }
  };
</script>
```

:::

### 和 dom 同样宽度

:::demo

```html
<template>
  <blue-dropdownmenu
    @click="trigger"
    :datas="param"
    :equal-width="true"
    class-name="blue-text-dropdown"
  >
    <div v-width="150">菜单menu</div>
  </blue-dropdownmenu>
</template>
<script>
  export default {
    data() {
      return {
        param: [
          { title: "测试1", key: "test1" },
          { title: "测试2", key: "test2" },
          { title: "测试3", key: "test3" }
        ]
      };
    },
    methods: {
      trigger(code) {
        this.$Message.info(`您点击了${code}`);
      }
    }
  };
</script>
```

:::

### DropdownMenu 参数

| 参数       | 说明                        | 类型           | 可选值                                                                                                             | 默认值                     |
| ---------- | --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| datas      | 选择的数据                  | Array, Object  | -                                                                                                                  |                            |
| dict       | 调用全局定义的字典          | String         | -                                                                                                                  | -                          |
| trigger    | 触发方式                    | String         | click, hover, focus, contextMenu, manual(手动)                                                                     | click                      |
| equalWidth | 是否和触发的 dom 等宽       | Boolean        | -                                                                                                                  | false                      |
| disabled   | 是否禁用                    | Boolean        | -                                                                                                                  | false                      |
| toggleIcon | 是否显示展示状态的 icon     | Boolean        | -                                                                                                                  | true                       |
| width      | 自定义 menu 的宽度          | Number         | -                                                                                                                  | -                          |
| placement  | menu 显示的位置             | Stirng         | top, top-start, top-end, bottom, bottom-start, bottom-end,left, left-start, left-end,right, right-start, right-end | bottom-start               |
| showCount  | menu 是否显示未读标志数     | Boolean        | -                                                                                                                  | false                      |
| maxCount   | 未读标志数最大数字          | Number         | -                                                                                                                  | 99                         |
| className  | 为点击触发的 dom 添加 class | String         | -                                                                                                                  |                            |
| offset     | 位移                        | String, Number | -                                                                                                                  |                            |
| keyName    | 自定义数据的 key 字段名     | String         | -                                                                                                                  | 全局 config dict.keyName   |
| titleName  | 自定义数据的 title 字段名   | String         | -                                                                                                                  | 全局 config dict.titleName |
| button     | 使用按钮的样式调用          | Boolean        | -                                                                                                                  | false                      |

### DropdownMenu 事件

| 事件  | 说明           | 参数  |
| ----- | -------------- | ----- |
| click | 点击触发的事件 | key   |
| show  | 打开的时候触发 | event |
| hide  | 关闭的时候触发 |       |

<script>

export default {
  data() {
    return {
        param1: [
          { title: "首页", key: "Home", icon: "icon-home" },
          { title: "消息", key: "message", icon: "icon-bell", count: 8 },
          { divider: true },
          {
            title: "任务",
            key: "task",
            icon: "icon-check-circle",
            disabled: true
          }
        ],
    param2: [{ title: '新建', key: 'add', icon: 'icon-plus' }, { title: '编辑', key: 'edit', icon: 'icon-edit-square' }, { title: '删除', key: 'delete', icon: 'icon-delete' }]
    ,
      disabled: false,
      param: ['测试1', '测试2', '测试3']
    };
  },
  methods: {
    trigger(code, data, event) {
      this.$Message.info(`您点击了${code}`);
      console.log(data, event);
    },
      show() {
        this.$Message.info("展开");
      },
      hide() {
        this.$Message.info("关闭");
      }
  }
};
</script>
<style scope>
.dropdownmenu10-demo{
    height: 100px;
    width: 400px;
    border: 1px solid #ccc;
  }
</style>
