[[toc]]

### 输入框

---

### 基本

:::demo

```html
<template>
  <div>
    <p>input value：{{value}}</p>
    <div>
      <input type="text" v-model="value" />
    </div>
    <p>textarea value：{{value2}}</p>
    <div>
      <textarea v-model="value2"></textarea>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: "",
        value2: ""
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
    <div>
      <input type="text" value="当前是只读状态" readonly />
      <textarea readonly>当前是只读状态</textarea>
    </div>
  </div>
</template>
```

:::

### 禁用

:::demo

```html
<template>
  <div>
    <div>
      <input type="text" value="当前是禁用状态" disabled />
      <textarea disabled>当前是禁用状态</textarea>
    </div>
    <br />
    <div></div>
  </div>
</template>
```

:::

### 带图标

:::demo

```html
<template>
  <div>
    <div class="blue-input blue-input-prefix-icon">
      <input type="text" />
      <i class="icon-search"></i>
    </div>
    <div class="blue-input blue-input-suffix-icon">
      <input type="text" />
      <i class="icon-calendar"></i>
    </div>
  </div>
</template>
```

:::

### 自动适用高度的输入框

:::demo

```html
<template>
  <div>
    <div>
      <blue-button @click.native="setvalue" color="blue" size="s"
        >加载值</blue-button
      ><blue-button @click.native="removevalue" color="red" size="s"
        >清除值</blue-button
      >
    </div>
    <br />
    <div>
      <textarea
        v-autosize
        v-model="value"
        rows="1"
        placeholder="请输入"
      ></textarea>
      <textarea
        v-autosize
        v-model="value"
        rows="3"
        placeholder="请输入"
      ></textarea>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: ""
      };
    },
    methods: {
      setvalue() {
        this.value = "1\n2\n3\n4\n5\n6";
      },
      removevalue() {
        this.value = "";
      }
    }
  };
</script>
```

:::

### 复合输入框

:::demo

```html
<template>
  <div>
    <div class="blue-input-group" v-width="500">
      <div class="blue-input-addon">
        <blue-select
          v-model="select1"
          :datas="param1"
          :no-border="true"
        ></blue-select>
      </div>
      <input type="text" placeholder="起始金额" />
      <span class="blue-input-addon">-</span>
      <input type="text" placeholder="结束金额" />
      <span class="blue-input-addon">K</span>
    </div>
    <br />
    <div class="blue-input-group" v-width="500">
      <span class="blue-input-addon">公司福利</span>
      <input type="text" placeholder="起始金额" />
      <span class="blue-input-addon">-</span>
      <input type="text" placeholder="结束金额" />
      <span class="blue-input-addon">K</span>
    </div>
    <br />
    <div class="blue-input-group" v-width="500">
      <input type="text" placeholder="输入" />
      <blue-button color="primary">确定</blue-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select1: 1,
        param1: { 1: "人民币", 2: "美金", 3: "卢布" }
      };
    },
    methods: {},
    components: {}
  };
</script>
```

:::

<script>

  export default {
    data() {
      return {
        value: "",
        value2: "",
         select1: 1,
        param1: { 1: "人民币", 2: "美金", 3: "卢布" }

      };
    }, methods: {
      setvalue() {
        this.value = "1\n2\n3\n4\n5\n6";
      },
      removevalue() {
        this.value = "";
      }
    }
  };
</script>
