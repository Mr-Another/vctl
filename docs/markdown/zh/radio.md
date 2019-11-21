[[toc]]

## blue-radio 单选框

---

### 基本

:::demo

```html
<template>
  <div>
    <div>1. {{value}}</div>
    <div><blue-radio :value="param[0]" v-model="value">选择1</blue-radio></div>
    <div><blue-radio :value="param[1]" v-model="value">选择2</blue-radio></div>
    <div><blue-radio :value="param[2]" v-model="value">选择3</blue-radio></div>
    <div>2. {{value2}}</div>
    <div>
      <blue-radio :value="param[0].key" v-model="value2">选择1</blue-radio>
    </div>
    <div>
      <blue-radio :value="param[1].key" v-model="value2">选择2</blue-radio>
    </div>
    <div>
      <blue-radio :value="param[2].key" v-model="value2">选择3</blue-radio>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: null,
        value2: null,
        param: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ]
      };
    }
  };
</script>
```

:::

### 组件式调用

:::demo

```html
<template>
  <div>
    <p v-color:gray>{{value1}}</p>
    <div>
      <blue-radio
        v-model="value1"
        :datas="param1"
        @change="change"
      ></blue-radio>
    </div>
    <p v-color:gray>{{value2}}</p>
    <div><blue-radio v-model="value2" :datas="param2"></blue-radio></div>
    <p v-color:gray>{{value3}}</p>
    <div><blue-radio v-model="value3" :datas="param3"></blue-radio></div>
    <div>禁用</div>
    <div>
      <blue-radio
        v-model="value3"
        :datas="param3"
        :disabled="true"
      ></blue-radio>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: "选择1",
        value2: "1",
        value3: null,
        param1: ["选择1", "选择2", "选择3"],
        param2: { 1: "选择1", 2: "选择2", 3: "选择3" },
        param3: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ]
      };
    },
    methods: {
      change(data) {
        log("change", data);
      }
    }
  };
</script>
```

:::

### 自定义 key，title

:::demo

```html
<template>
  <div>
    <p>自定义key, title字段名</p>
    <div>
      <blue-radio
        v-model="value4"
        :datas="param4"
        key-name="code"
        title-name="name"
      ></blue-radio>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value4: "a1",
        param4: [
          { name: "选择0", code: 0 },
          { name: "选择1", code: "a1", other: "其他值" },
          { name: "选择2", code: "a2" },
          { name: "选择3", code: "a3" }
        ]
      };
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
      <blue-radio v-model="value" :datas="paramc">
        <template slot="item" slot-scope="{item}">
          <i :class="item.icon"></i>
          <span>{{item.key}}:{{item.title}}</span>
        </template>
      </blue-radio>
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
    <div><Radio v-model="value" dict="simple"></Radio></div>
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
        value: "1"
      };
    }
  };
</script>
```

:::

### Radio 参数

| 参数      | 说明                                 | 类型         | 可选值 | 默认值                     |
| --------- | ------------------------------------ | ------------ | ------ | -------------------------- |
| datas     | 数据字典                             | Array,Object | -      | -                          |
| dict      | 调用配置好的字典库，详情请至全局配置 | String       |        |
| disabled  | 是否禁用                             | Boolean      | -      | false                      |
| value     | 单个选择模式                         |              | -      |
| keyName   | 自定义数据的 key 字段名              | String       | -      | 全局 config dict.keyName   |
| titleName | 自定义数据的 title 字段名            | String       | -      | 全局 config dict.titleName |

### Radio 事件

| 事件   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| change | 当数据产生变动的时候触发 | 完整对象              |
| input  | 当数据产生变动的时候触发 | 当前绑定的 v-model 值 |

<script>
  export default {
    data() {
      return {
        value: "",
        value1: "选择1",
        value2: "1",
        value3: null,
        select1: 1,
        param: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ],
        param1: ["选择1", "选择2", "选择3"],
        param2: { 1: "选择1", 2: "选择2", 3: "选择3" },
        param3: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ],
        value4: "a1",
        param4: [
          { name: "选择0", code: 0 },
          { name: "选择1", code: "a1", other: "其他值" },
          { name: "选择2", code: "a2" },
          { name: "选择3", code: "a3" }
        ],paramc:[
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
      }
    }
  };
</script>
