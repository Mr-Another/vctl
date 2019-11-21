[[toc]]

## blue-autocomplete 模糊匹配

---

### 基本用法

可以使用 dict 调用系统全局配置的字典，或者通过 datas 传递数据。

可以通过全局配置 autocomplete.default 参数设置控件默认的参数值。

autocomplete 有三种数据类型：key,title,object，如果需求更复杂，请监听 change 事件手动处理。

:::demo

```html
<template>
  <div>
    <p>
      value:{{value}}
      <blue-button class="blue-btn blue-btn-text" @click="update"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-autocomplete
        dict="simple"
        v-model="value"
        @change="onChange"
        :show-dropdown-when-no-result="false"
      ></blue-autocomplete>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "1"
      };
    },
    methods: {
      onChange(data, trigger) {
        log(data, trigger);
      },
      update() {
        this.value = "2";
      }
    }
  };
</script>
```

:::

### 选择模式

:::demo

```html
<template>
  <div>
    <blockquote>type="key"，使用show参数控制展示</blockquote>
    <p>
      value:{{value1}}, show: {{show1}}
      <span class="link" @click="update1">修改值</span>
    </p>
    <div v-width="300">
      <blue-autocomplete
        :option="param"
        :show="show1"
        type="key"
        v-model="value1"
        @change="onChange1"
      ></blue-autocomplete>
    </div>

    <p v-height="10"></p>
    <p>value:{{value2}}</p>
    <div v-width="300">
      <blue-autocomplete
        :option="param"
        type="key"
        multiple
        v-model="value2"
        @change="onChange"
      ></blue-autocomplete>
    </div>

    <p v-height="10"></p>
    <blockquote>type="title"</blockquote>
    <p>value:{{value3}} <span class="link" @click="update3">修改值</span></p>
    <div v-width="300">
      <blue-autocomplete
        :option="param"
        type="title"
        v-model="value3"
        @change="onChange"
      ></blue-autocomplete>
    </div>

    <p v-height="10"></p>
    <p>value:{{value4}} <span class="link" @click="update4">修改值</span></p>
    <div v-width="300">
      <blue-autocomplete
        :option="param"
        type="title"
        multiple
        v-model="value4"
        @change="onChange"
      ></blue-autocomplete>
    </div>

    <p v-height="10"></p>
    <blockquote>type="object"</blockquote>
    <p>value:{{value5}} <span class="link" @click="update5">修改值</span></p>
    <div v-width="300">
      <blue-autocomplete
        :option="param"
        type="object"
        v-model="value5"
        @change="onChange"
      ></blue-autocomplete>
    </div>

    <p v-height="10"></p>
    <p>value:{{value6}} <span class="link" @click="update6">修改值</span></p>
    <div v-width="300">
      <blue-autocomplete
        :option="param"
        type="object"
        :multiple="true"
        v-model="value6"
        @change="onChange"
      ></blue-autocomplete>
    </div>
  </div>
</template>
<script>
  import jsonp from "fetch-jsonp";

  const loadData = function(filter, callback) {
    jsonp(`https://suggest.taobao.com/sug?code=utf-8&q=${filter}`)
      .then(response => response.json())
      .then(d => {
        callback(
          d.result.map(r => {
            return {
              name: r[0],
              code: r[1] + Math.random()
            };
          })
        );
      });
  };

  export default {
    data() {
      return {
        value1: 1,
        show1: "初始化",
        value2: [],
        value3: "初始化",
        value4: ["初始化"],
        value5: { code: 123, name: "初始化" },
        value6: [{ code: 123, name: "初始化" }],
        param: {
          keyName: "code",
          titleName: "name",
          minWord: 1,
          loadData
        }
      };
    },
    methods: {
      onChange(data, trigger) {
        log(data, trigger);
      },
      onChange1(data, trigger) {
        if (data.value) {
          this.show1 = data.value.title;
        } else {
          this.show1 = null;
        }
      },
      update1() {
        this.show1 = "修改值";
        this.value1 = 123;
      },
      update3() {
        this.value3 = "修改";
      },
      update4() {
        this.value4 = ["修改 1", "修改 2"];
      },
      update5() {
        this.value5 = { code: 123, name: "修改" };
      },
      update6() {
        this.value6 = [{ code: 123, name: "修改" }];
      }
    }
  };
</script>
```

:::

### 可以任意输入模式

:::demo

```html
<template>
  <div>
    <p>value:{{value1}} <span class="link" @click="update1">修改值</span></p>
    <div v-width="300">
      <blue-autoComplete
        :option="param"
        type="title"
        v-model="value1"
        :must-match="false"
        @change="onChange"
      ></blue-autoComplete>
    </div>

    <p v-height="10"></p>
    <p>
      多选：value:{{value2}} <span class="link" @click="update2">修改值</span>
    </p>
    <div v-width="300">
      <blue-autoComplete
        :option="param"
        type="title"
        v-model="value2"
        end-input=";"
        :must-match="false"
        multiple
        @change="onChange"
      ></blue-autoComplete>
    </div>

    <p v-height="10"></p>
    <p>
      保存对象：value:{{value3}}
      <span class="link" @click="update3">修改值</span>
    </p>
    <div v-width="300">
      <blue-autoComplete
        :option="param"
        v-model="value3"
        type="object"
        :must-match="false"
        @change="onChange"
      ></blue-autoComplete>
    </div>

    <p v-height="10"></p>
    <p>
      保存对象多选：value:{{value4}}
      <span class="link" @click="update4">修改值</span>
    </p>
    <div v-width="300">
      <blue-autoComplete
        :option="param"
        v-model="value4"
        type="object"
        :must-match="false"
        multiple
        @change="onChange"
      ></blue-autoComplete>
    </div>
  </div>
</template>
<script>
  import jsonp from "fetch-jsonp";

  const loadData = function(filter, callback) {
    jsonp(`https://suggest.taobao.com/sug?code=utf-8&q=${filter}`)
      .then(response => response.json())
      .then(d => {
        callback(
          d.result.map(r => {
            return {
              name: r[0],
              code: r[1] + Math.random()
            };
          })
        );
      });
  };

  export default {
    data() {
      return {
        value1: "23",
        value2: ["23", "45"],
        value3: { code: "1", name: "初始化" },
        value4: [{ code: "1", name: "初始化" }],
        param: {
          keyName: "code",
          titleName: "name",
          loadData,
          minWord: 1
        }
      };
    },
    methods: {
      onChange(data, trigger) {
        log(data, trigger);
      },
      update1() {
        this.value1 = "new value";
      },
      update2() {
        this.value2 = ["value1", "value2"];
      },
      update3() {
        this.value3 = { code: 123, name: "修改" };
      },
      update4() {
        this.value4 = [{ code: 123, name: "修改" }];
      }
    }
  };
</script>
```

:::

### 自定义样式

:::demo

```html
<style lang="less">
  // 将输入框文字变成红色
  .autocomplete-demo-show {
    .blue-autocomplete-input {
      color: @red-color;
    }
  }
  // 将鼠标移动以及选中的背景色变成红色
  .autocomplete-demo-dropdown {
    &.blue-autocomplete-group .blue-autocomplete-item:hover,
    &.blue-autocomplete-group .blue-autocomplete-item.blue-autocomplete-item-selected {
      background-color: @red-color;
      color: #fff;
    }
  }
</style>
<template>
  <div>
    <p>value:{{value}}</p>
    <div v-width="300">
      <blue-autoComplete
        class-name="autocomplete-demo"
        dict="simple"
        v-model="value"
        @change="onChange"
        :show="show"
      >
        <div slot="top" class="text-center">自定义头部</div>
        <div slot="bottom" class="text-center">自定义底部</div>
      </blue-autoComplete>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "1",
        show: "苹果"
      };
    },
    methods: {
      onChange(data, trigger) {
        log(data, trigger);
      }
    }
  };
</script>
```

:::

### 自定义内容

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <div v-width="300">
      <blue-autocomplete
        ref="autocomplete"
        :option="param"
        v-model="value"
        @change="onChange"
      >
        <div slot="top" class="text-center" style="line-height:40px">
          自定义头部
        </div>
        <template slot="item" slot-scope="{item}"
          ><div>
            {{item.title}}<span class="float-right gray-color"
              >{{item.title.length}}个字</span
            >
          </div></template
        >
        <div slot="bottom" @mousedown.stop.prevent>
          <blue-pagination
            :cur="pagination.page"
            :total="pagination.total"
            @change="changePage"
            layout="pager"
            small
          ></blue-pagination>
        </div>
      </blue-autocomplete>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pagination: {
          page: 1,
          total: 30
        },
        value: null,
        param: {
          minWord: 0,
          loadData
        },
        keyword: ""
      };
    },
    methods: {
      loadData(filter, callback) {
        if (this.keyword !== filter) {
          this.keyword = filter;
          this.pagination.page = 1;
        }
        setTimeout(() => {
          callback(
            Array.apply(null, Array(6)).map(
              (item, index) => `page_${filter}_${this.pagination.page}_${index}`
            )
          );
        }, 100);
      },
      changePage(page) {
        this.pagination.page = page.cur;
        this.$refs.autocomplete.search();
      },
      onChange(data, trigger) {
        log(data, trigger);
      }
    }
  };
</script>
```

:::

### 传递外部参数

:::demo

```html
<template>
  <div>
    <p>value:{{value}}</p>
    <p>外部参数：<input type="text" v-model="input" /></p>
    <div v-width="300">
      <blue-autocomplete
        :option="{loadData, input: input}"
        v-model="value"
        type="object"
        :must-match="false"
        @change="onChange"
      ></blue-autocomplete>
    </div>
  </div>
</template>
<script>
  import jsonp from "fetch-jsonp";

  const loadData = function(filter, callback) {
    let input = this.input;
    let list = [];
    for (let i = 0; i < 10; i++) {
      list.push({
        key: `${i}`,
        title: `${input}-结果${filter}${i}`
      });
    }
    callback(list);
  };

  export default {
    data() {
      return {
        input: "参数",
        value: "",
        loadData
      };
    },
    methods: {
      onChange(data, trigger) {
        log(data, trigger);
      },
      update() {
        this.value = [{ key: 123, title: "修改" }];
      }
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
    <p>
      <blue-switch v-model="disabled" :small="true">禁用</blue-switch>
      value:{{value}}
    </p>
    <div v-width="300">
      <blue-autocomplete
        dict="simple"
        :disabled="disabled"
        v-model="value"
        @change="onChange"
      ></blue-autocomplete>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        disabled: true
      };
    },
    methods: {
      onChange(data, trigger) {
        log(data, trigger);
      }
    }
  };
</script>
```

:::

### AutoComplete 参数

| 参数                     | 说明                                                      | 类型          | 可选值             | 默认值           |
| ------------------------ | --------------------------------------------------------- | ------------- | ------------------ | ---------------- |
| disabled                 | 是否禁用                                                  | Boolean       | -                  | false            |
| type                     | 类型                                                      | String        | key, object, title | key              |
| option                   | 配置项，详细参见下面的 option 说明                        | Object        | -                  |                  |
| multiple                 | 多选                                                      | Boolean       | -                  | false            |
| mustMatch                | 是否必须是选择的项                                        | Boolean       | -                  | true             |
| datas                    | 选择的数据                                                | Array, Object | -                  |                  |
| dict                     | 调用全局定义的字典                                        | String        | -                  | -                |
| placeholder              | 展示默认提示语                                            | String        | -                  | 请选择           |
| show                     | 默认展示的文字，针对与存储 key 值，但是拥有 show 值的情景 | String        | -                  | -                |
| emptyContent             | 没有搜索到值的提示语                                      | String        | -                  | 未搜索到相关数据 |
| config                   | 使用全局配置的方法                                        | String        | -                  | -                |
| className                | 自定义 className                                          | String        | -                  |                  |
| autoSelectFirst          | 是否自动选中第一个选项                                    | Boolean       | -                  | false            |
| endInput                 | 设定特殊字符触发 enter                                    | String        | -                  |                  |
| showDropdownWhenNoResult | 当无数据的时候，是否展示下拉列表                          | Boolean       | -                  | true             |

### AutoComplete 事件

| 事件名 | 说明                   | 返回数值                                                             |
| ------ | ---------------------- | -------------------------------------------------------------------- |
| input  | model 值产生变化的触发 | model 对应的值                                                       |
| change | model 值产生变化的触发 | 现在的数据对象，以及触发来源事件：enter, blur, picker, remove, clear |

### AutoComplete 方法

| 事件名 | 说明         | 参数 |
| ------ | ------------ | ---- |
| hide   | 隐藏下拉框   | 无   |
| search | 主动触发搜索 | 无   |

### option 配置

| 参数     | 说明                                        | 类型     | 可选值 | 默认值                              |
| -------- | ------------------------------------------- | -------- | ------ | ----------------------------------- |
| key      | 数据的 key 对应字段                         | String   | -      | 全局配置 autocomplete.default.key   |
| title    | 数据的 title 对应字段                       | String   | -      | 全局配置 autocomplete.default.title |
| getValue | 通过数据定义出标准的输出格式                | Function | -      | -                                   |
| minWord  | 开始查询的最低单词数量                      | Number   | -      | 0                                   |
| loadData | 异步获取数据的方法                          | Function | -      | -                                   |
| delay    | 数据获取的 delay 时间，提升性能，单位为毫秒 | Number   | -      | 100                                 |

### Slot top/bottom

| 参数    | 说明           |
| ------- | -------------- |
| results | 当前列表结果值 |

<script>
import jsonp from "fetch-jsonp";

  const loadData = function(filter, callback) {
    jsonp(`https://suggest.taobao.com/sug?code=utf-8&q=${filter}`)
      .then(response => response.json())
      .then(d => {
        callback(
          d.result.map(r => {
            return {
              name: r[0],
              code: r[1] + Math.random()
            };
          })
        );
      });
  };

  export default {
    data() {
      return {
         pagination: {
          page: 1,
          total: 30
        },
        value:null,
        value1: 1,
        show:'',
        show1: "初始化",
        value2: [],
        value3: "初始化",
        value4: ["初始化"],
        value5: { code: 123, name: "初始化" },
        value6: [{ code: 123, name: "初始化" }],
        param: {
          keyName: "code",
          titleName: "name",
          minWord: 1,
          loadData
        },
        keyword: "",
        input: "参数",
        disabled: true,
        loadData
      };
    },
    methods: {
      
      onChange(data, trigger) {
        console.log(data, trigger);
      },
      onChange1(data, trigger) {
        if (data.value) {
          this.show1 = data.value.title;
        } else {
          this.show1 = null;
        }
      },
      update() {
        this.value = "2";
      },
      update1() {
        this.show1 = "修改值";
        this.value1 = 123;
      },
      update2() {
        this.show1 = "修改值";
        this.value1 = 123;
      },
      update3() {
        this.value3 = "修改";
      },
      update4() {
        this.value4 = ["修改 1", "修改 2"];
      },
      update5() {
        this.value5 = { code: 123, name: "修改" };
      },
      update6() {
        this.value6 = [{ code: 123, name: "修改" }];
      },
      changePage(page) {
        this.pagination.page = page.cur;
        this.$refs.autocomplete.search();
      },
    }
  };
</script>
<style lang="less" >

  @red-color:red;

   // 将输入框文字变成红色
  .autocomplete-demo-show {
    .blue-autocomplete-input {
      color: @red-color;
    }
  }
  // 将鼠标移动以及选中的背景色变成红色
  .autocomplete-demo-dropdown {
    &.blue-autocomplete-group .blue-autocomplete-item:hover,
    &.blue-autocomplete-group .blue-autocomplete-item.blue-autocomplete-item-selected {
      background-color: @red-color;
      color: #fff;
    }
  }
</style>
