[[toc]]

## affix 图钉 还有 bug

> 非 template/render 模式下，请使用 blue-affix

:::demo

```html
<template>
  <div>
    <div>
      <Affix :offset-top="70" @change="onchange1"
        ><blue-button
          class="blue-btn"
          :class="{'blue-btn-green': status.fixed1}"
        >
          固定在距离顶部偏移量70px的位置
        </blue-button></Affix
      >
    </div>
    <div v-height="10"></div>
    <div>
      <Affix :offset-top="120" @change="onchange2"
        ><blue-button
          class="blue-btn"
          :class="{'blue-btn-yellow': status.fixed2}"
        >
          固定在距离顶部偏移量120px的位置
        </blue-button></Affix
      >
    </div>
    <div v-height="10"></div>
    <div>
      <Affix :offset-top="170" @change="onchange3"
        ><blue-button
          class="blue-btn"
          :class="{'blue-btn-blue': status.fixed3}"
        >
          固定在距离顶部偏移量190px的位置
        </blue-button></Affix
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: {
          fixed1: false,
          fixed2: false,
          fixed3: false
        }
      };
    },
    methods: {
      onchange1(fixed) {
        this.status.fixed1 = fixed;
      },
      onchange2(fixed) {
        this.status.fixed2 = fixed;
      },
      onchange3(fixed) {
        this.status.fixed3 = fixed;
      }
    }
  };
</script>
```

:::

### 固定到底部的

:::demo

```html
<Affix :offset-bottom="10" :offset-top="220" @change="onchange"
  ><blue-button class="blue-btn" :class="{'blue-btn-red': fixed4}">
    固定在距离底部偏移量10px的位置
  </blue-button></Affix
>
```

:::

### 固定到容器的相对位置

:::demo

```html
<style lang="less">
  .affix-demo-3-vue {
    overflow: hidden;
  }
  .affix-demo-3 {
    float: right;
    width: 120px;
  }
</style>
<template>
  <div
    v-height="1000"
    class="affix-demo-3-vue bg-gray2-color relative text-right"
  >
    <Affix
      :fixed-offset-top="80"
      :offset-top="20"
      :offset-bottom="20"
      class="affix-demo-3"
      :container="getContainer"
      @change="onchange"
    >
      <blue-button class="blue-btn blue-btn-blue" v-height="300"
        >固定容器内</blue-button
      >
    </Affix>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fixed: false
      };
    },
    methods: {
      onchange(fixed) {
        this.fixed = fixed;
      },
      getContainer() {
        return this.$el;
      }
    }
  };
</script>
```

:::

### affix 参数

| 参数           | 说明                               | 类型     | 可选值 | 默认值 |
| -------------- | ---------------------------------- | -------- | ------ | ------ |
| offsetTop      | 定位在距离窗口顶部达到指定偏移量后 | Number   | -      | -      |
| offsetBottom   | 定位在距离窗口底部达到指定偏移量后 | Number   | -      | -      |
| fixedOffsetTop | 定位在距离页面顶部达到指定偏移量后 | Number   | -      | -      |
| container      | 使用容器内的定位                   | Function | -      | -      |
| disabled       | 禁用                               | Boolean  | -      | false  |

### affix 事件

| 参数     | 说明                           |
| -------- | ------------------------------ |
| onchange | 固定状态发生变化时触发该方法。 |

### affix 方法

| 参数    | 说明                                          |
| ------- | --------------------------------------------- |
| refresh | 未监测到的页面变化，需要刷新 affix 组件的位置 |

<script>
  export default {
    data() {
      return {
          fixed4:false,
          fixed: false,
        status: {
          
          fixed1: false,
          fixed2: false,
          fixed3: false,
        }
      };
    },
    methods: {
      onchange1(fixed) {
        this.status.fixed1 = fixed;
      },
      onchange2(fixed) {
        this.status.fixed2 = fixed;
      },
      onchange3(fixed) {
        this.status.fixed3 = fixed;
      },
      onchange(fixed) {
        this.fixed = fixed;
      },
      getContainer() {
        return this.$el;
      }
    }
  };
</script>
<style lang="less">
.affix-demo-3-vue{
  overflow: hidden;
}
.affix-demo-3{
  float: right;
  width: 120px;
}
</style>
