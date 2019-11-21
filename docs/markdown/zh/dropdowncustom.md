[[toc]]

## DropdownCustom 自定义下拉控件

DropdownCustom 可以添加自定义的 className 定义各种不同的模式的下拉控件，className 将应用在.blue-dropdowncustom-show 上，该 dom 为触发下拉的元素，包含自定义的内容以及右侧展示状态的 icon。

> 提示：系统自带一个 blue-text-dropdown 的样式。

- 注意 1：如果 DropdownCustom 在页面最右边，并且显示异常，请给内容设定固定宽度。
- 注意 2：由于该样式应用在组件中，所以在调用的 vue 文件中，style 的 scope 属性将无效。

### 基本调用

:::demo

```html
<template>
  <blue-dropdowncustom class-name="blue-text-dropdown">
    <span>个人信息</span>
    <div slot="content" v-width="200">
      <div v-padding="20">
        <img
          :width="80"
          :height="80"
          style="border-radius:80px;float:left"
          src="/static/avatar-male.png"
        />
        <div style="height:80px;margin-left:90px;line-height:80px;">Blue</div>
      </div>
      <Row style="line-height:40px;border-top:1px solid #EEE;"
        ><Cell
          width="12"
          class="text-center"
          style="border-right:1px solid #EEE;"
          ><a>个人信息</a></Cell
        ><Cell width="12" class="text-center"><a>注销</a></Cell></Row
      >
    </div>
  </blue-dropdowncustom>
</template>
```

:::

### 其他的样式组合

:::demo

```html
<style lang="less"></style>
<template>
  <div>
    <blue-buttongroup>
      <blue-button>Create</blue-button>
      <blue-dropdowncustom button>
        <span>Edit</span>
        <div slot="content" v-width="200" v-height="200">
          自定义
        </div>
      </blue-dropdowncustom>
    </blue-buttongroup>
    <blue-buttongroup>
      <blue-button color="primary">Create</blue-button>
      <blue-dropdowncustom class="blue-btn-primary" button>
        <span>Edit</span>
        <div slot="content" v-width="200" v-height="200">
          自定义
        </div>
      </blue-dropdowncustom>
    </blue-buttongroup>
    <blue-dropdowncustom button class="blue-btn-primary">
      <span>开始</span>
      <div slot="content" v-width="200" v-height="200">
        自定义
      </div>
    </blue-dropdowncustom>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {}
  };
</script>
```

:::

### 内容显示的位置

> placement: top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end

:::demo

```html
<template>
  <blue-dropdowncustom placement="top-start" class-name="blue-text-dropdown">
    <span>个人信息</span>
    <div slot="content" v-width="200">
      <div v-padding="20">
        <img
          :width="80"
          :height="80"
          style="border-radius:80px;float:left"
          src="/static/avatar-male.png"
        />
        <div style="height:80px;margin-left:90px;line-height:80px;">Blue</div>
      </div>
      <Row style="line-height:40px;border-top:1px solid #EEE;"
        ><Cell
          width="12"
          class="text-center"
          style="border-right:1px solid #EEE;"
          ><a>个人信息</a></Cell
        ><Cell width="12" class="text-center"><a>注销</a></Cell></Row
      >
    </div>
  </blue-dropdowncustom>
</template>
```

:::

### 自定义内容的位置

分别控制 left, top 的位移

:::demo

```html
<template>
  <blue-dropdowncustom
    placement="bottom-start"
    offset="0, 20"
    class-name="blue-text-dropdown"
    :delay="200"
    trigger="hover"
  >
    <span>个人信息</span>
    <div slot="content" v-width="200" v-height="200">
      内容
    </div>
  </blue-dropdowncustom>
</template>
```

:::

### 右键弹出

:::demo

```html
<style lang="less" scoped>
  .dropdowncustom7-demo {
    height: 100px;
    width: 400px;
    border: 1px solid @gray2-color;
  }
</style>

<template>
  <div>
    <blue-dropdowncustom
      ref="dropdown"
      trigger="contextMenu"
      :toggle-icon="false"
    >
      <div class="dropdowncustom7-demo">右键点击区域内</div>
      <div slot="content" v-padding="50">内容</div>
    </blue-dropdowncustom>

    <blue-dropdowncustom
      ref="dropdown"
      trigger="contextMenu"
      :toggle-icon="false"
    >
      <div class="dropdowncustom7-demo">右键点击区域内</div>
      <div slot="content" v-padding="50">内容</div>
    </blue-dropdowncustom>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    }
  };
</script>
```

:::

### 自定义下拉控制

:::demo

```html
<template>
  <div>
    <blue-dropdowncustom
      ref="dropdown"
      trigger="manual"
      @show="showEvent"
      @hide="hideEvent"
    >
      <textarea v-model="text" @focus="show" v-autosize rows="1"></textarea>
      <div slot="content" v-width="200">
        <div v-padding="20">
          <blue-button @click="hide">关闭</blue-button>
        </div>
      </div>
    </blue-dropdowncustom>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        text: ""
      };
    },
    watch: {
      text() {
        this.update();
      }
    },
    methods: {
      showEvent(event) {
        this.$Message("show");
      },
      hideEvent() {
        this.$Message("hide");
      },
      update() {
        this.$refs.dropdown.update();
      },
      show() {
        this.$refs.dropdown.show();
      },
      hide() {
        this.$refs.dropdown.hide();
      }
    }
  };
</script>
```

:::

### DropdownCustom 参数

| 参数       | 说明                        | 类型           | 可选值                                                                                                           | 默认值                                                                                   |
| ---------- | --------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| trigger    | 触发方式                    | String         | click, hover, focus, contextMenu, manual(手动)                                                                   | click                                                                                    |
| equalWidth | 是否和触发的 dom 等宽       | Boolean        | -                                                                                                                | false                                                                                    |
| disabled   | 是否禁用                    | Boolean        | -                                                                                                                | false                                                                                    |
| toggleIcon | 是否显示展示状态的 icon     | Boolean        | -                                                                                                                | true                                                                                     |
| placement  | menu 显示的位置             | Stirng         | top, top-start, top-end,bottom, bottom-start, bottom-end,left, left-start, left-end,right, right-start,right-end | bottom-start                                                                             |
| className  | 为点击触发的 dom 添加 class | String         | -                                                                                                                | -                                                                                        |
| offset     | 位移                        | String, Number | -                                                                                                                | left, top 10 '10%' '10, 10' '10%, 10' '10 + 10%' '10 - 5vh + 3%' '-10px + 5vh, 5px - 6%' |
| button     | 使用按钮的样式调用          | Boolean        | -                                                                                                                | false                                                                                    |

### DropdownCustom 方法

| 参数   | 说明                 |
| ------ | -------------------- |
| show   | 显示 dropdown        |
| update | 更新 dropdown 的位置 |
| hide   | 关闭 dropdown        |

### DropdownCustom 事件

| 参数 | 说明           | 参数  |
| ---- | -------------- | ----- |
| show | 打开的时候触发 | event |
| hide | 关闭的时候触发 |       |

<script>
  export default {
    data() {
      return {
           text: ""
      };
    },
    methods: {
      showEvent(event) {
        this.$Message("show");
      },
      hideEvent() {
        this.$Message("hide");
      },
      update() {
        this.$refs.dropdown.update();
      },
      show() {
        this.$refs.dropdown.show();
      },
      hide() {
        this.$refs.dropdown.hide();
      }
    }
  };
</script>
<style lang="less" scoped>

@import (less) "../../../themes/var.less";
  .dropdowncustom7-demo {
    height: 100px;
    width: 400px;
    border: 1px solid @gray2-color;
  }
</style>
