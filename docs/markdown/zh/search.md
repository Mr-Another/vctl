[[toc]]

## Search 搜索框

> 非 template/render 模式下，请使用 blue-search。

### 基本调用

:::demo

```html
<template>
  <div>
    <p>Enter触发</p>
    <p><Search @search="search" v-model="searchText1"></Search></p>
    <p>Keyup触发</p>
    <p>
      <Search
        @search="search"
        v-model="searchText2"
        position="front"
        trigger-type="input"
      ></Search>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText1: null,
        searchText2: null
      };
    },
    methods: {
      search(data) {
        this.$Message.info(`查询“${data}”`);
      }
    }
  };
</script>
```

:::

### 拥有搜索按钮的查询组件

:::demo

```html
<template>
  <div>
    <p>
      <Search
        @search="search"
        v-model="searchText1"
        v-width="300"
        show-search-button
        placeholder="查询示例1"
      ></Search>
    </p>
    <p>
      <Search
        @search="search"
        v-model="searchText2"
        v-width="300"
        show-search-button
        search-text="Search"
        placeholder="查询示例2"
      ></Search>
    </p>
    <p>
      <Search
        @search="search"
        v-model="searchText3"
        v-width="300"
        show-search-button
        placeholder="查询示例3"
        ><i class="icon-search"></i
      ></Search>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText1: "",
        searchText2: "",
        searchText3: ""
      };
    },
    methods: {
      search(data) {
        this.$Message.info(`查询“${data}”`);
      }
    }
  };
</script>
```

:::

### 自定义样式

:::demo

```html
<template>
  <div>
    <blockquote>设置 高40px, 宽300px</blockquote>
    <Search
      @search="search"
      v-model="searchText1"
      :height="40"
      :width="320"
      show-search-button
      placeholder="查询示例3"
    ></Search>
    <blockquote>整行</blockquote>
    <Search
      @search="search"
      v-model="searchText2"
      block
      show-search-button
      placeholder="查询示例3"
    ></Search>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText1: null,
        searchText2: null
      };
    },
    methods: {
      search(data) {
        this.$Message.info(`${data}`);
      }
    }
  };
</script>
```

:::

### Search 参数

| 参数             | 说明                      | 类型    | 可选值       | 默认值           |
| ---------------- | ------------------------- | ------- | ------------ | ---------------- |
| position         | Search Icon 显示的位置    | String  | -            | end              |
| placeholder      | placeholder               | String  | -            | 请输入关键词查询 |
| block            | 是否 display: block       | Boolean | -            | false            |
| showSearchButton | 是否查询按钮              | Boolean | -            | false            |
| searchText       | 搜索按钮的文本            | String  | -            | 搜索             |
| triggerType      | 查询触发类型              | String  | enter, input | enter            |
| height           | 设置搜索框的高度, 1.19.0+ | Number  |              |                  |
| width            | 设置搜索框的高度, 1.19.0+ | Number  |              |                  |

### Search 事件

| 参数   | 说明                    |
| ------ | ----------------------- |
| search | 触发查询的事件          |
| input  | 触发 input 值修改的事件 |

<script>
export default {
  data() {
    return {
       searchText1: "",
        searchText2: "",
        searchText3: ""
    };
  },
  methods: {
    search(data) {
      this.$Message.info(`查询“${data}”`);
    }
  }
};
</script>
