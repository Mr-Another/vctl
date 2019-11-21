[[toc]]

## slider 组件

### 基本

:::demo

```html
<template>
  <div>
    <p>对应的值：{{value}}</p>
    <blue-slider v-model="value"></blue-slider>
    <p>对应的值：{{value2}}</p>
    <blue-slider v-model="value2" multiple></blue-slider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0,
        value2: {
          start: 0,
          end: 20
        }
      };
    }
  };
</script>
```

:::

### 只读

:::demo

```html
<template>
  <div>
    <p>对应的值：{{value}}</p>
    <blue-slider v-model="value" readonly></blue-slider>
    <p>对应的值：{{value2}}</p>
    <blue-slider v-model="value2" multiple readonly></blue-slider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0,
        value2: {
          start: 0,
          end: 20
        }
      };
    }
  };
</script>
```

:::

### step

:::demo

```html
<template>
  <div>
    <p>对应的值：{{value}}</p>
    <blue-slider v-model="value" :step="5"></blue-slider>
    <p>对应的值：{{value2}}</p>
    <blue-slider v-model="value2" :step="5" multiple></blue-slider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0,
        value2: {
          start: 0,
          end: 20
        }
      };
    }
  };
</script>
```

:::

### 自定义展示

:::demo

```html
<template>
  <div>
    <p>对应的值：{{value3}}</p>
    <blue-slider
      v-model="value3"
      :show="show"
      :range="{start: 1000, end: 2000}"
    ></blue-slider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value3: 1300
      };
    },
    methods: {
      show(value) {
        return `现在的值：${value}`;
      }
    }
  };
</script>
```

:::

### 隐藏提示

:::demo

```html
<template>
  <div>
    <p>对应的值：{{value}}</p>
    <blue-slider v-model="value" :showtip="false"></blue-slider>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 0
      };
    }
  };
</script>
```

:::

### Silder 参数

| 参数     | 说明                   | 类型                         | 可选值 | 默认值               |
| -------- | ---------------------- | ---------------------------- | ------ | -------------------- |
| step     | 每个节点大小           | Number                       | -      | -                    |
| readonly | 只读，只用于展示       | Boolean                      | -      | false                |
| show     | 自定义 tip 展示的内容  | Function                     | -      | -                    |
| showtip  | 是否展示 tip           | Boolean                      | -      | true                 |
| range    | 设置 slider 的数值范围 | {start: Number, end: Number} | -      | {start: 0, end: 100} |

### Silder 事件

| 事件   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| change | 当数据产生变动的时候触发 | 完整对象              |
| input  | 当数据产生变动的时候触发 | 当前绑定的 v-model 值 |

<script>
export default {
  data() {
    return {
      value: 0,
      value2: {
        start: 0,
        end: 20
      },
      value3: 1300
    };
  },
  methods: {
    show(value) {
      return `现在的值：${value}`;
    }
  }
};
</script>
