[[toc]]

## Tooltip 气泡提示

> 注意：如果 tooltip 在页面最右边，并且换行异常，请使用样式给内容设定固定宽度。
> 注意：如果使用 tooltip 做编辑模块，请添加参数 editable ，一般展示的 tooltip 的 z-index 属性比编辑的 tooltip 模块高。

### 普通提示

:::demo

```html
<template>
  <div>
    <p><blue-switch small v-model="enable">开启</blue-switch></p>
    <p>
      <blue-button
        class="text-hover"
        v-tooltip="enable"
        :content="content"
        @click="content+='1'"
      >
        Directive调用，点我
      </blue-button>
    </p>
    <p>
      <Tooltip :content="content" :disabled="!enable">
        <blue-button class="text-hover" @click="content+='1'">
          Component调用，点我
        </blue-button></Tooltip>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        enable: true,
        content: "1"
      };
    }
  };
</script>
```

:::

### 不同位置的提示

:::demo

```html
<template>
  <div class="tooltip2-demo">
    <Row :space="10" v-width="300" style="margin-left:80px;">
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="top-start"
          content="提示语"
        >
          上左
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="top"
          content="提示语"
        >
          上中
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="top-end"
          content="提示语"
        >
          上右
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="left-start"
          content="提示语"
        >
          左上
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button class="blue-btn blue-btn-text">中间</blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="right-start"
          content="提示语"
        >
          右上
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="left"
          content="提示语"
        >
          左中
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button class="blue-btn blue-btn-text">中间</blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="right"
          content="提示语"
        >
          右中
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="left-end"
          content="提示语"
        >
          左下
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button class="blue-btn blue-btn-text">中间</blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="right-end"
          content="提示语"
        >
          右下
        </blue-button>
      </Cell>
      <Cell :width="8"
        ><blue-button
          class="blue-btn"
          v-tooltip
          placement="bottom-start"
          content="提示语"
        >
          下左
        </blue-button></Cell
      >
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="bottom"
          content="提示语"
        >
          下中
        </blue-button>
      </Cell>
      <Cell :width="8">
        <blue-button
          class="blue-btn"
          v-tooltip
          placement="bottom-end"
          content="提示语"
        >
          下右
        </blue-button>
      </Cell>
    </Row>
  </div>
</template>
```

:::

### 点击触发

:::demo

```html
<template>
  <div>
    <blue-button
      class="blue-btn blue-btn-text"
      v-tooltip
      trigger="click"
      content="这是一个详情"
    >
      点我一下
    </blue-button>
    <blue-button
      class="blue-btn blue-btn-text"
      v-tooltip
      trigger="click"
      theme="white"
      content="这是一个详情2"
    >
      再点我一下
    </blue-button>
    <Tooltip content="Component调用" trigger="click"
      ><blue-button class="blue-btn blue-btn-text"
        >Component click 调用</blue-button
      ></Tooltip
    >
    <Tooltip content="Component调用|白色风格" trigger="click" theme="white"
      ><blue-button class="blue-btn blue-btn-text">
        Component click 白色风格
      </blue-button></Tooltip
    >
  </div>
</template>
```

:::

### 自定义内容

:::demo

```html
<template>
  <div>
    <span v-tooltip ref-el="demo" class="text-hover" theme="white"
      >模板调用</span
    >
    <i class="blue-split" v-width="30"></i>
    <Tooltip theme="white" @show="show" trigger="click" @hide="hide" editable>
      <span class="text-hover">Component调用</span>
      <div slot="content">
        <div v-padding="10">
          <blue-select
            dict="simple"
            v-model="value"
            style="width: 200px;"
          ></blue-select>
        </div>
      </div>
    </Tooltip>

    <div tmpl="demo" v-width="220">
      <div v-padding="20">
        <img
          :width="80"
          :height="80"
          style="border-radius:80px;float:left"
          src="https://cn.vuejs.org/images/logo.png"
        />
        <div style="height:80px;margin-left:90px;line-height:80px;">
          用户名: <a>gongrui</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        a: 1,
        value: null
      };
    },
    methods: {
      change() {
        this.a = this.a + 1;
      },
      show() {
        console.log("show");
      },
      hide() {
        console.log("hide");
      }
    }
  };
</script>
```

:::

### Tooltip 参数

| 参数      | 说明                    | 类型    | 默认值               |   可选值                                                                                                              |
| --------- | ----------------------- | ------- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| content   | 显示的内容              | String  | -                     | -  |
| placement | 提示的方向              | String  | -| top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start,right-end |
| theme     | 主题                    | String  | white，或者自定义参数 | -                                                                                                                    |
| className | tooltip 框添加样式      | String  | -                     | -                                                                                                                    |
| trigger   | 触发事件                | String  | hover  |  hover, click, focus                                                                                                                 |
| disabled  | 是否禁用                | Boolean | false                      | true,false                                                                                                                |
| editable  | 是否为编辑模块, 1.18.0+ | Boolean | false                     | true,false                                                                                                                |
| delay     | 延迟                   | Number |  0                    |  -                                                                                                                |
### Tooltip 事件

| 参数 | 说明                   | 参数 |
| ---- | ---------------------- | ---- |
| show | tooltip 打开的时候触发 |      |
| hide | tooltip 关闭的时候触发 |      |

### Tooltip 方法

| 方法   | 说明             |
| ------ | ---------------- |
| show   | 显示             |
| hide   | 关闭显示         |
| update | 更新提示框的位置 |
| init   | 初始化          |

<script>
  export default {
    data() {
      return {
        enable: true,
        content: "1",
         a: 1,
        value: null
      };
    },
    methods: {
      change() {
        this.a = this.a + 1;
      },
      show() {
        console.log("show");
      },
      hide() {
        console.log("hide");
      }
    }
  };
</script>
