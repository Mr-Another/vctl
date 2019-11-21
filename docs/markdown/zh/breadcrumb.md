[[TOC]]

## Breadcrumb

> 非 template/render 模式下，请使用 blue-breadcrumb。

### 基本调用

:::demo

```html
<template>
  <div>
    <blue-breadcrumb :datas="datas"></blue-breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas: [
          {
            title: "Home",
            route: { name: "Alert" }
          },
          {
            title: "Component",
            route: { name: "Button" }
          },
          {
            title: "Breadcrumb"
          }
        ]
      };
    }
  };
</script>
```

:::

### 自定义 Icon

:::demo

```html
<template>
  <div>
    <Breadcrumb :datas="datas1"></Breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas1: [
          {
            icon: "icon-home"
          },
          {
            title: "Component",
            icon: "icon-complete",
            route: { name: "Component" }
          },
          {
            title: "Breadcrumb",
            icon: "icon-star"
          }
        ]
      };
    }
  };
</script>
```

:::

### 自定义样式与执行

:::demo

```html
<style lang="less">
  .breadcrumb-demo3 {
    .blue-breadcrumb-item-separator {
      color: #44c97b;
    }
  }
</style>

<template>
  <div>
    <Breadcrumb
      class="breadcrumb-demo3"
      :datas="datas"
      @click="click"
      self-control
      separator=">"
    ></Breadcrumb>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datas: [
          {
            title: "Home",
            route: { name: "Home" }
          },
          {
            title: "Component",
            route: { name: "Component" }
          },
          {
            title: "Breadcrumb"
          }
        ]
      };
    },
    methods: {
      click(data) {
        this.$Message.info(`处理访问${data.title}`, 1000);
      }
    }
  };
</script>
```

:::

### Breadcrumb 参数

| 参数        | 说明           | 类型    | 可选值 | 默认值 |
| ----------- | -------------- | ------- | ------ | ------ |
| datas       | 数据           | Array   | -      |        |
| separator   | 自定义分隔符   | String  | -      | /      |
| selfControl | 自定义触发执行 | Boolean | -      | false  |

### Breadcrumb 事件

| 事件  | 描述                       | 数据 |
| ----- | -------------------------- | ---- |
| click | 点击 BreadCrumb 触发的事件 | data |

<script>
export default {
  data() {
    return {
      datas: [{
        title: 'Home',
        route: { name: 'Home' }
      }, {
        title: 'Component',
        route: { name: 'Component' }
      }, {
        title: 'Breadcrumb'
      }],
      datas1: [
          {
            icon: "icon-home"
          },
          {
            title: "Component",
            icon: "icon-earth",
            route: { name: "Component" }
          },
          {
            title: "Breadcrumb",
            icon: "icon-star"
          }
        ]
    };
  },methods: {
    click(data) {
      this.$Message.info(`处理访问${data.title}`, 1000);
    }
  }
};
</script>
