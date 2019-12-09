[[toc]]

## Checkbox 多选框

---

### 基础调用

:::demo

```html
<template>
  <div>
    <Checkbox v-model="value">{{value}}</Checkbox>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: false
      };
    }
  };
</script>
```

:::

### 基本调用

:::demo

```html
<template>
  <div>
    <p>值：{{value6}}</p>
    <p>
      <blue-checkbox v-model="value6" :value="param3[0]">自定义1</blue-checkbox>
      <blue-checkbox v-model="value6" :value="param3[1]">自定义2</blue-checkbox>
    </p>
    <p>值：{{value7}}</p>
    <p>
      <blue-checkbox v-model="value7" :value="1">自定义1</blue-checkbox>
      <blue-checkbox v-model="value7" :value="2">自定义2</blue-checkbox>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        param3: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ],
        value6: null,
        value7: null
      };
    }
  };
</script>
```

:::

### 数据模式调用

:::demo

```html
<template>
  <div>
    <p>值：{{value1}}</p>
    <p>
      <Checkbox
        :indeterminate="value1.length>0&&value1.length<3"
        :checked="value1.length == 3"
        @click.native="checkAll"
        >全选</Checkbox
      >
    </p>
    <p><Checkbox v-model="value1" :datas="param1"></Checkbox></p>
    <p>值：{{value2}}</p>
    <p><Checkbox v-model="value2" :datas="param2"></Checkbox></p>
    <p>值：{{value3}}</p>
    <p><Checkbox v-model="value3" :datas="param3"></Checkbox></p>
    <p>禁用</p>
    <p>
      <Checkbox v-model="value4" :datas="param2" :disabled="true"></Checkbox>
    </p>
    <p>自定义key, title字段名</p>
    <p>
      <Checkbox
        v-model="value8"
        :datas="param4"
        key-name="code"
        title-name="name"
      ></Checkbox>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: [],
        value2: null,
        value3: ["a1"],
        value4: [1],
        value5: false,
        value6: null,
        value7: null,
        value8: [],
        param1: ["选择1", "选择2", "选择3"],
        param2: { 1: "选择1", 2: "选择2", 3: "选择3" },
        param3: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ],
        param4: [
          { name: "选择0", code: 0 },
          { name: "选择1", code: "a1", other: "其他值" },
          { name: "选择2", code: "a2" },
          { name: "选择3", code: "a3" }
        ]
      };
    },
    methods: {
      checkAll() {
        if (this.value1.length == 3) {
          this.value1.splice(0, 3);
        } else {
          this.value1 = ["选择1", "选择2", "选择3"];
        }
      }
    }
  };
</script>
```

:::

### 自定义展示内容

:::demo

```html
<template>
  <div>
    <p>{{value}}</p>
    <p>
      <Checkbox v-model="value" :datas="paramc">
        <template slot="item" slot-scope="{item}">
          <i :class="item.icon"></i>
          <span>{{item.key}}:{{item.title}}</span>
        </template>
      </Checkbox>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: null,
        paramc: [
          {
            icon: "icon-home",
            title: "选择1",
            key: "a1",
            other: "其他值"
          },
          { icon: "icon-user", title: "选择2", key: "a2" },
          { icon: "icon-task", title: "选择3", key: "a3" }
        ]
      };
    }
  };
</script>
```

:::

### 组件式数据字典调用

:::demo

```html
<template>
  <div>
    <p v-color:gray>{{value}}:{{value | dictMapping('simple')}}</p>
    <div><Checkbox v-model="value" dict="simple"></Checkbox></div>
  </div>
</template>
<!-- 
  系统初始化的时候
  HeyUI.initDict({
    simple: { 1: '选择1', 2: '选择2', 3: '选择3' }
  }); 
-->
<script>
  export default {
    data() {
      return {
        value: ["1"]
      };
    }
  };
</script>
```

:::

### Checkbox 参数

| 参数          | 说明                                 | 类型         | 可选值 | 默认值                     |
| ------------- | ------------------------------------ | ------------ | ------ | -------------------------- |
| datas         | 数据字典                             | Array,Object | -      | -                          |
| dict          | 调用配置好的字典库，详情请至全局配置   | String       |        |
| disabled      | 是否禁用                             | Boolean      | -      | false                      |
| checked       | 是否选中，针对 true,false 的多选框    | Boolean      | -      | false                      |
| indeterminate | 不明确的，针对 true,false 的多选框    | Boolean      | -      | false                      |
| keyName       | 自定义数据的 key 字段名               | String       | -      | 全局 config dict.keyName   |
| titleName     | 自定义数据的 title 字段名             | String       | -      | 全局 config dict.titleName |

### Radio 事件

| 事件   | 说明                     | 返回数据 |
| ------ | ------------------------ | -------- |
| change | 当数据产生变动的时候触发   | 完整对象 |

<script>

  export default {
    data() {
      return {
        value: [],
        value1: [],
        value2: [],
        value3: ["a1"],
        value4: [1],
        value5: false,
        value6: [],
        value7: [],
        value8: [],
        param1: ["选择1", "选择2", "选择3"],
        param2: { 1: "选择1", 2: "选择2", 3: "选择3" },
        param3: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ],
        param4: [
          { name: "选择0", code: 0 },
          { name: "选择1", code: "a1", other: "其他值" },
          { name: "选择2", code: "a2" },
          { name: "选择3", code: "a3" }
        ],paramc: [
          {
            icon: "icon-home",
            title: "选择1",
            key: "a1",
            other: "其他值"
          },
          { icon: "icon-user", title: "选择2", key: "a2" },
          { icon: "icon-task", title: "选择3", key: "a3" }
        ]
      };
    }, methods: {
      setvalue() {
        this.value = "1\n2\n3\n4\n5\n6";
      },
      removevalue() {
        this.value = "";
      },
      change(data) {
        console.log("change", data);
      },
      checkAll() {
        if (this.value1.length == 3) {
          this.value1.splice(0, 3);
        } else {
          this.value1 = ["选择1", "选择2", "选择3"];
        }
      }
    }
  };
</script>
