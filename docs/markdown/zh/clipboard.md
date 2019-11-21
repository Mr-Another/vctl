## Clipboard 复制剪切板

### 基本调用

:::demo

```html
<template>
  <div>
    <p><blue-button @click="copy">直接复制</blue-button></p>
    <div class="blue-input-group" v-width="300">
      <input type="text" v-model="text" placeholder="内容" /><blue-button
        @click="copyText"
        color="primary"
      >
        复制
      </blue-button>
    </div>
    <div style="margin-top:10px">
      <textarea v-model="textarea" cols="40" rows="3"></textarea>
      <blue-button @click="textarea=''">清空</blue-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: "",
        textarea: ""
      };
    },
    methods: {
      copyText() {
        this.$Clipboard({
          text: this.text
        });
      },
      copy() {
        this.$Clipboard({
          text: "测试==复制至剪切板的文本==测试",
          showSuccessTip: "Copy Success"
        });
      }
    }
  };
</script>
```

:::

### Clipboard 参数

| 参数            | 说明             | 类型   | 可选值 | 默认值   |
| --------------- | ---------------- | ------ | ------ | -------- |
| text            | 复制的文本       | String | -      |          |
| showSuccessTip  | 设置复制成功文案 |        | String | 复制成功 |
| showFailureTip  | 设置复制失败文案 |        | String | 复制失败 |
| successCallback | 执行成功后调用   |        | -      |          |
| failureCallback | 执行失败后调用   |        | -      |          |

<script>
export default {
  data() {
    return {
      text: '',
      textarea: ''
    };
  },
  methods: {
    copyText() {
      this.$Clipboard({
        text: this.text
      });
    },
    copy() {
      this.$Clipboard({
        text: '测试==复制至剪切板的文本==测试',
        showSuccessTip: 'Copy Success'
      });
    }
  }
};
</script>
