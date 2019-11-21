[[toc]]

## Steps 步骤条

> 非 template/render 模式下，请使用 blue-steps。

### 基本调用

:::demo

```html
<template>
  <div>
    <p>
      <blue-buttongroup size="s">
        <blue-button icon="icon-plus" @click="step>=3||step++"></blue-button>
        <blue-button icon="icon-minus" @click="step<=0||step--"></blue-button>
      </blue-buttongroup>
    </p>
    <blue-steps :datas="data" :step="step"></blue-steps>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: {
          a: "step1",
          b: "step2",
          c: "step3",
          d: "step4"
        },
        step: 0
      };
    }
  };
</script>
```

:::

### 自定义 Icon, 说明

:::demo

```html
<template>
  <div>
    <p>
      <blue-buttongroup size="s">
        <blue-button icon="icon-plus" @click="step>=3||step++"></blue-button>
        <blue-button icon="icon-minus" @click="step<=0||step--"></blue-button>
      </blue-buttongroup>
    </p>
    <blue-steps :datas="data1" :step="step"></blue-steps>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [
          {
            key: "a",
            title: "step1",
            icon: "icon-home",
            desc: "step1 Description"
          },
          {
            key: "b",
            title: "step2",
            icon: "icon-user",
            desc: "step2 Description"
          },
          {
            key: "c",
            title: "step3",
            icon: "icon-star",
            desc: "step3 Description"
          },
          {
            key: "d",
            title: "step4",
            icon: "con-check-circle",
            desc: "step4 Description"
          }
        ],
        step: 0
      };
    }
  };
</script>
```

:::

### 使用 key 值识别第几步

:::demo

```html
<template>
  <div>
    <p>
      <blue-buttongroup size="s">
        <blue-button @click="step='a'">step1</blue-button>
        <blue-button @click="step='b'">step2</blue-button>
        <blue-button @click="step='c'">step3</blue-button>
        <blue-button @click="step='d'">step4</blue-button>
      </blue-buttongroup>
    </p>
    <blue-steps :datas="data1" :step="step"></blue-steps>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [
          {
            key: "a",
            title: "step1",
            icon: "icon-home",
            desc: "step1 Description"
          },
          {
            key: "b",
            title: "step2",
            icon: "icon-user",
            desc: "step2 Description"
          },
          {
            key: "c",
            title: "step3",
            icon: "icon-star-on",
            desc: "step3 Description"
          },
          {
            key: "d",
            title: "step4",
            icon: "con-check-circle",
            desc: "step4 Description"
          }
        ],
        step: 0
      };
    }
  };
</script>
```

:::

### Steps 参数

| 参数      | 说明                      | 类型          | 可选值 | 默认值                     |
| --------- | ------------------------- | ------------- | ------ | -------------------------- |
| datas     | 选择的数据                | Array, Object | -      |                            |
| dict      | 调用全局定义的字典        | String        | -      | -                          |
| step      | 当前第几步，可以是 key    | Number,String | -      | 0                          |
| keyName   | 自定义数据的 key 字段名   | String        | -      | 全局 config dict.keyName   |
| titleName | 自定义数据的 title 字段名 | String        | -      | 全局 config dict.titleName |

<script>
export default {
  data() {
    return {
      data: {
        a: 'step1',
        b: 'step2',
        c: 'step3',
        d: 'step4'
      },
      data1:[{ key: 'a', title: 'step1', icon: 'icon-home', desc: 'step1 Description' },
        { key: 'b', title: 'step2', icon: 'icon-user', desc: 'step2 Description' },
        { key: 'c', title: 'step3', icon: 'icon-star', desc: 'step3 Description' },
        { key: 'd', title: 'step4', icon: 'icon-check-circle', desc: 'step4 Description' }],
      step: 0
    };
  }
};
</script>
