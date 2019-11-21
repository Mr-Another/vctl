[[toc]]

## switch 开关

### 基本

:::demo

```html
<template>
  <div>
    <div>{{check1}}</div>
    <div><blue-switch v-model="check1">测试</blue-switch></div>
    <div>{{check2}}</div>
    <div><blue-switch v-model="check2" :small="true">测试</blue-switch></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        check1: false,
        check2: false
      };
    }
  };
</script>
```

:::

### 自定义 true 与 false 的值

:::demo

```html
<template>
  <div>
    <div>{{check3}}</div>
    <div>
      <blue-switch v-model="check3" :true-Value="1" :false-Value="2"
        >1/2</blue-switch
      >
    </div>
    <div>{{check4}}</div>
    <div>
      <blue-switch
        v-model="check4"
        true-Value="yes"
        false-Value="no"
        :small="true"
        >yes/no</blue-switch
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        check3: 2,
        check4: "no"
      };
    }
  };
</script>
```

:::

### 禁用

:::demo

```html
<template>
  <div>
    <div><blue-switch v-model="check1" :disabled="true">测试</blue-switch></div>
    <br />
    <div>
      <blue-switch v-model="check2" :small="true" :disabled="true"
        >测试</blue-switch
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        check1: false,
        check2: false
      };
    }
  };
</script>
```

:::

### Switch 参数

| 参数       | 说明                      | 类型    | 可选值 | 默认值 |
| ---------- | ------------------------- | ------- | ------ | ------ |
| small      | 尺寸更小                  | Boolean | -      | false  |
| disabled   | 是否禁用                  | Boolean | -      | false  |
| trueValue  | 选中的值，使用 === 比较   | -       | -      | true   |
| falseValue | 未选中的值，使用 === 比较 | -       | -      | false  |

### Switch 事件

| 事件   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| change | 当数据产生变动的时候触发 | 完整对象              |
| input  | 当数据产生变动的时候触发 | 当前绑定的 v-model 值 |

<script>

export default {
  data() {
    return {
      check1: false,
      check2: false,
      check3: 2,
      check4: "no"
    };
  }
};
</script>
