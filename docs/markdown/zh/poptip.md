[[toc]]

## Poptip 确认提示

### 普通的提示 1

:::demo

```html
<template>
  <div>
    <Poptip content="确定删除此段内容吗，是否永久删除？" @confirm="confirm"
      ><blue-button class="blue-btn blue-btn-red">删除</blue-button></Poptip
    >
    <Poptip content="确认删除?" @confirm="confirm"
      ><blue-button class="blue-btn blue-btn-text-red blue-btn-no-border">
        <i class="icon-delete "></i></blue-button
    ></Poptip>
  </div>
</template>
<script>
  export default {
    methods: {
      confirm() {
        this.$Message.success("删除成功");
      }
    }
  };
</script>
```

:::

### Poptip 参数

| 参数      | 说明       | 类型   | 可选值 | 默认值                                                                                                               |
| --------- | ---------- | ------ | ------ | -------------------------------------------------------------------------------------------------------------------- |
| content   | 显示的内容 | String | -      | -                                                                                                                    |
| placement | 提示的方向 | String | -      | top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end |
| theme     | 主题       | String | white  | -                                                                                                                    |

### Poptip 事件

| 参数    | 说明               |
| ------- | ------------------ |
| confirm | 点击“确认”触发事件 |

<script>
  export default {
    methods: {
      confirm() {
        this.$Message.success("删除成功");
      }
    }
  };
</script>
