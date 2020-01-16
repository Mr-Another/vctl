[[toc]]

## Upload 头像信息

> 非 template/render 模式下，请使用 blue-avatar

### 基本调用

:::demo

```html
<template>
    <Uploader :type="type"></Uploader>
</template>

<script>
  export default {
    data() {
      return {
        type: "files"
      };
    },
    methods: {
      click(event) {
        log(event);
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
    <Uploader :type="types"></Uploader>
</template>

<script>
  export default {
    data() {
      return {
        types: "images"
      };
    },
    methods: {
      click(event) {
        log(event);
      }
    }
  };
</script>
```

:::

### Upload 参数

| 参数     | 说明                     | 类型   | 可选值                       | 默认值 |
| -------- | ------------------------ | ------ | ---------------------------- | ------ |
| src      | 图像地址                 | String | -                            |        |
| width    | 图像大小                 | Number | -                            | 50     |
| distance | 图片与文字的间距         | Number | -                            | 15     |
| imageTop | 设置图片与顶部的位移     | Number | 如果不设置的话，图像居中对齐 |        |
| type     | 设置不同类型，自定义样式 | String |                              |        |

### Upload 事件

| 事件  | 描述               | 数据  |
| ----- | ------------------ | ----- |
| click | 点击头像触发的事件 | event |

<script>
export default {
    data() {
        return {
            type: "files",
            types:'images'
        };
    },
    methods: {
        click(event) {
            log(event);
        }
    }
};
</script>
