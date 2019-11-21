[[toc]]

## Pagination 分页

> 非 template/render 模式下，请使用 blue-pagination。

### 基本使用

:::demo

```html
<template>
  <div>
    <p>
      <blue-button @click="updateCur">返回第一条</blue-button
      ><blue-button @click="update">更新分页数据</blue-button>
    </p>
    <p>
      <blue-pagination
        :cur="cur"
        :total="total"
        :size="size"
        @change="change1"
      ></blue-pagination>
    </p>
    <blockquote></blockquote>
    <p>pagination: {{pagination}}</p>
    <p>
      <blue-pagination v-model="pagination" @change="change2"></blue-pagination>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cur: 1,
        total: 100,
        size: 10,
        pagination: {
          page: 1,
          size: 10,
          total: 100
        }
      };
    },
    methods: {
      updateCur() {
        this.cur = 1;
        this.pagination.page = 1;
      },
      update() {
        this.size = this.pagination.size = this.size == 20 ? 10 : 20;
        this.total = this.pagination.total = Math.floor(Math.random() * 300);
        this.updateCur();
      },
      change1(value) {
        this.cur = value.cur;
        this.size = value.size;
        console.log(value);
      },
      change2(value) {
        console.log(value);
      }
    }
  };
</script>
```

:::

### mini 分页

:::demo

```html
<template>
  <blue-pagination
    v-model="pagination"
    @change="currentChange"
    :small="true"
  ></blue-pagination>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          page: 1,
          size: 10,
          total: 100
        }
      };
    },
    methods: {
      currentChange(value) {
        console.log(value);
      }
    }
  };
</script>
```

:::

### 自定义分页

:::demo

```html
<template>
  <Pagination
    v-model="pagination"
    @change="currentChange"
    :small="true"
    layout="total,sizes,pager,jumper"
  ></Pagination>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          page: 1,
          size: 10,
          total: 100
        }
      };
    },
    methods: {
      currentChange(value) {
        console.log(value);
      }
    }
  };
</script>
```

:::

### 更多的自定义

:::demo

```html
<template>
  <Pagination
    v-model="pagination"
    @change="currentChange"
    layout="pager"
    small
  ></Pagination>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          page: 1,
          size: 10,
          total: 100
        }
      };
    },
    methods: {
      currentChange(value) {
        console.log(value.cur, value.size);
      }
    }
  };
</script>
```

:::

### 居右对齐

:::demo

```html
<template>
  <Pagination
    v-model="pagination"
    align="right"
    @change="currentChange"
  ></Pagination>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          page: 1,
          size: 10,
          total: 100
        }
      };
    },
    methods: {
      currentChange(value) {
        console.log(value);
      }
    }
  };
</script>
```

:::

### Pagination 参数

| 参数      | 说明                 | 类型    | 可选值                   | 默认值                                |
| --------- | -------------------- | ------- | ------------------------ | ------------------------------------- |
| size      | 每页条数             | Number  | -                        | 全局配置 size                         |
| sizes     | 每页条数选择器       | Array   | -                        | 全局配置 sizes, 例：[10, 20, 50, 100] |
| align     | 排列方向             | String  | left,center,right        | left                                  |
| cur       | 当前页               | Number  | -                        | 1                                     |
| total     | 总共条数             | Number  | -                        | 0                                     |
| small     | 是否是迷你版本       | Boolean | -                        | 全局配置 small                        |
| layout    | 翻页器排列           | String  | total,pager,jumper,sizes | 全局配置 layout                       |
| pagerSize | 总共出现多少个 pager | Number  | -                        | 5                                     |

<script>
export default {
  data() {
    return {
        check2:false,
      cur: 1,
      total: 100,
      size: 10,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      }
    };
  },
  methods: {
    updateCur() {
      this.cur = 1;
      this.pagination.page = 1;
    },
    update() {
      this.size = this.pagination.size = this.size == 20 ? 10 : 20;
      this.total = this.pagination.total = Math.floor(Math.random() * 300);
      this.updateCur();
    },
    change1(value) {
      this.cur = value.cur;
      this.size = value.size;
      console.log(value);
    },
    change2(value) {
      console.log(value);
    }, currentChange(value) {
      console.log(value);
    }
  }
};
</script>
