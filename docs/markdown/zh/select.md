[[toc]]

## Select 下拉选择

---

### 普通下拉选择

对于对象数组的解析，系统默认使用 key, title 两个参数进行识别。可以通过全局配置修改两个参数名称，详情请参考全局配置
:::demo

```html
<template>
  <div>
    <p>
      选中值：{{select}}<i class="blue-split"></i>
      <blue-button class="blue-btn blue-btn-s" @click="update"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-select
        v-model="select"
        :datas="param"
        placeholder="自定义placeholder"
        null-option-text="自定义请选择项"
        @change="change"
      ></blue-select>
    </div>
    <br />
    <p>
      选中值：{{select2}}<i class="blue-split"></i>
      <blue-button class="blue-btn blue-btn-s" @click="update2"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-select v-model="select2" :datas="param2"></blue-select>
    </div>
    <br />
    <p>
      根据内容自适应长度，选中值：{{select3}} <i class="blue-split"></i>
      <blue-button class="blue-btn blue-btn-s" @click="update3"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-select v-model="select3" autosize :datas="param3"></blue-select>
    </div>
    <p>自定义key, title字段名</p>
    <div v-width="300">
      <blue-select
        v-model="select4"
        :datas="param4"
        key-name="code"
        title-name="name"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  // HeyUI.config('dict.keyName', "code");
  // HeyUI.config('dict.titleName', "title");
  export default {
    data() {
      return {
        select: null,
        param: ["选择1", "选择2", "选择3"],
        select2: null,
        param2: [
          { title: "选择0", key: 0 },
          { title: "禁用选择", key: 1, disabled: true },
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ],
        select3: null,
        param3: { 0: "选择0", a1: "选择1", a2: "选择2", a3: "选择3" },
        select4: null,
        param4: [
          { name: "选择0", code: 0 },
          { name: "选择1", code: "a1", other: "其他值" },
          { name: "选择2", code: "a2" },
          { name: "选择3", code: "a3" }
        ]
      };
    },
    methods: {
      update() {
        this.select = "选择2";
      },
      update2() {
        this.select2 = "a2";
      },
      update3() {
        this.select3 = "a2";
      },
      change(data) {
        //log("changeData:", data);
      }
    }
  };
</script>
```

:::

### 自定义样式

:::demo 通过自定义 className 参数，自己定义特殊的样式。

```html
<style lang="less">
  // 将输入框文字变成红色
  .select-demo-show {
    .blue-select-value-single {
      color: @red-color;
    }
  }
  // 将鼠标移动以及选中的背景色变成红色
  .select-demo-dropdown {
    &.blue-select-group .blue-select-item {
      &:hover,
      &.blue-select-item-selected {
        background-color: @red-color;
        color: #fff;
      }
    }
  }
</style>
<template>
  <div>
    <p>选中值：{{select}}</p>
    <div v-width="300">
      <blue-select
        v-model="select"
        class-name="select-demo"
        :datas="param"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        select: null,
        param: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### 特殊的选择项

:::demo

```html
<template>
  <div>
    <p>选中值：{{select}}</p>
    <div v-width="300">
      <blue-select v-model="select" :datas="paramo"></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        select: "a1",
        paramo: [
          { title: "分组栏", isLabel: true },
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择3", key: "a2" },
          { title: "禁用选择", key: "a3", disabled: true },
          { title: "隐藏选择", key: "a4", hidden: true }
        ]
      };
    }
  };
</script>
```

:::

### 分组

:::demo

```html
<template>
  <div>
    <p>选中值：{{select}}</p>
    <div v-width="300">
      <blue-select v-model="select" :datas="paramo1"></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        select: "选择1",
        paramo1: [
          { title: "分组1", isLabel: true },
          { title: "选择0", key: "23" },
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "分组3", isLabel: true },
          { title: "选择2", key: "a2" },
          { title: "分组3", isLabel: true },
          { title: "选择3", key: "a3" }
        ]
      };
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
    <p>选中值：{{select}}</p>
    <div v-width="300">
      <blue-select v-model="select" :datas="param">
        <template slot-scope="{item}" slot="top"
          ><div class="text-center">自定义头部</div></template
        >
        <template slot-scope="{item}" slot="item"
          ><div>
            标题：{{item.title}}<span style="float:right" class="gray1-color"
              >{{item.key}}</span
            >
          </div>
          <div class="gray1-color">描述：{{item.title}}</div></template
        >
        <template slot-scope="{item}" slot="bottom"
          ><div class="text-center">自定义底部</div></template
        >
      </blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        select: null,
        param: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ]
      };
    },
    methods: {}
  };
</script>
```

:::

### 禁用

:::demo

```html
<template>
  <div>
    <p><blue-switch v-model="disabled" :small="true">禁用</blue-switch></p>
    <p v-width="300">
      <blue-select
        v-model="select"
        :datas="param"
        :disabled="disabled"
        placeholder="请选择您的内容"
      ></blue-select>
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: null,
        select1: [],
        param: ["选择1", "选择2", "选择3"],
        disabled: true
      };
    }
  };
</script>
```

:::

### 没有默认“请选择”选项

:::demo

```html
<template>
  <div>
    <p>选中值：{{select}}</p>
    <div v-width="300">
      <blue-select
        v-model="select"
        :datas="param"
        :null-option="false"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        select: "选择1",
        param: ["选择1", "选择2", "选择3"]
      };
    }
  };
</script>
```

:::

### 多选

:::demo

```html
<template>
  <div>
    <p>
      选中值：{{select5}}
      <blue-button class="blue-btn blue-btn-text" @click="update"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-select
        v-model="select5"
        :datas="param"
        :multiple="true"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select5: [0],
        param: {
          0: "选择1",
          2: "选择2",
          3: "选择3"
        }
      };
    },
    methods: {
      update() {
        this.select = [0, 4];
      }
    }
  };
</script>
```

:::

### 选择对象值

:::demo

```html
<template>
  <div>
    <p>
      选中值：{{select}}
      <blue-button class="blue-btn blue-btn-s" @click="update"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-select v-model="select" :datas="param" type="object"></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: null,
        param: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ]
      };
    },
    methods: {
      update() {
        this.select = { title: "选择1", key: "a1", other: "其他值" };
      }
    }
  };
</script>
```

:::

### 多选对象值

:::demo

```html
<template>
  <div>
    <p>
      选中值：{{select5}}
      <blue-button class="blue-btn blue-btn-s" @click="update"
        >修改值</blue-button
      >
    </p>
    <div v-width="300">
      <blue-select
        v-model="select5"
        :datas="paramo"
        type="object"
        :multiple="true"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: [{ title: "选择1", key: "a1", other: "其他值" }],
        param: [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" },
          { title: "选择3", key: "a3" }
        ]
      };
    },
    methods: {
      update() {
        this.select = [
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择2", key: "a2" }
        ];
      }
    }
  };
</script>
```

:::

### 限制数量

:::demo

```html
<template>
  <div>
    <p>选中值：{{select4}}</p>
    <div v-width="300">
      <blue-select
        v-model="select4"
        :datas="param"
        :multiple="true"
        :limit="2"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: [],
        param: ["选择1", "选择2", "选择3"]
      };
    }
  };
</script>
```

:::

### 可筛选

:::demo

```html
<template>
  <div>
    <p>选中值：{{select}}</p>
    <div v-width="300">
      <blue-select
        v-model="select"
        :datas="paramo2"
        :filterable="true"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: "",
        paramo2: [
          "[美国] Honolulu 夏威夷檀香山",
          "[美国] Anchorage 阿拉斯加安克雷奇",
          "[加拿大] Vancouver 温哥华",
          "[美国] San Francisco 旧金山",
          "[美国] Seattle 西雅图",
          "[美国] Los Angeles 洛杉矶",
          "[加拿大] Aklavik 阿克拉维克",
          "[加拿大] Edmonton 艾德蒙顿",
          "[美国] Phoenix 凤凰城",
          "[美国] Denver 丹佛",
          "[墨西哥] Mexico City 墨西哥城",
          "[加拿大] Winnipeg 温尼伯",
          "[美国] Houston 休斯敦",
          "[美国] Minneapolis 明尼亚波利斯",
          "[美国] St.Paul 圣保罗",
          "[美国] New Orleans 新奥尔良",
          "[美国] Chicago 芝加哥",
          "[美国] Montgomery 蒙哥马利",
          "[危地马拉] Guatemala 危地马拉",
          "[萨尔瓦多] San Salvador 圣萨尔瓦多",
          "[洪都拉斯] Tegucigalpa 特古西加尔巴",
          "[尼加拉瓜] Managua 马那瓜",
          "[古巴] Havana 哈瓦那",
          "[美国] Indianapolis 印地安纳波利斯",
          "[美国] Atlanta 亚特兰大",
          "[美国] Detroit 底特律",
          "[美国] Washington DC 华盛顿哥伦比亚特区",
          "[美国] Philadelphia 费城",
          "[加拿大] Toronto 多伦多",
          "[加拿大] Ottawa 渥太华",
          "[巴哈马] Nassau 拿骚",
          "[秘鲁] Lima 利马",
          "[牙买加] Kingston 金斯敦",
          "[柬埔寨] Bogota 波哥大",
          "[美国] New York 纽约",
          "[加拿大] Montreal 蒙特利尔",
          "[美国] Boston 波士顿",
          "[多米尼加] Santo Domingo 圣多明各",
          "[玻利维亚] La Paz 拉帕兹",
          "[委内瑞拉] Caracas 加拉加斯",
          "[波多黎各] San Juan 圣胡安",
          "[加拿大] Halifax 哈里法克斯",
          "[智利] Santiago 圣地亚哥",
          "[巴拉圭] Asuncion 亚松森",
          "[加拿大] St\.John's 圣约翰斯",
          "[阿根廷] Buenos Aires 布宜诺斯艾利斯",
          "[乌拉圭] Montevideo 蒙特维的亚",
          "[巴西] Brasilia 巴西利亚",
          "[巴西] Sao Paulo 圣保罗",
          "[巴西] Rio de Janeiro 里约热内卢",
          "[冰岛] Reykjavik 雷克雅未克",
          "[葡萄牙] Lisbon 里斯本",
          "[摩洛哥] Casablanca 卡萨布兰卡",
          "[爱尔兰] Dublin 都柏林",
          "[英国] London 伦敦",
          "[西班牙] Madrid 马德里",
          "[西班牙] Barcelona 巴塞罗那",
          "[法国] Paris 巴黎",
          "[尼日利亚] Lagos 拉各斯",
          "[阿尔及利亚] Algiers 阿尔及尔",
          "[比利时] Brussels 布鲁塞尔",
          "[荷兰] Amsterdam 阿姆斯特丹",
          "[瑞士] Geneva 日内瓦",
          "[瑞士] Zurich 苏黎世",
          "[德国] Frankfurt 法兰克福",
          "[挪威] Oslo 奥斯陆",
          "[丹麦] Copenhagen 哥本哈根",
          "[意大利] Rome 罗马",
          "[德国] Berlin 柏林",
          "[捷克] Prague 布拉格",
          "[克罗地亚] Zagreb 萨格雷布",
          "[奥地利] Vienna 维也纳",
          "[瑞典] Stockholm 斯德哥尔摩",
          "[匈牙利] Budapest 布达佩斯",
          "[塞尔维亚与蒙特内哥罗] Belgrade 贝尔格莱德",
          "[波兰] Warsaw 华沙",
          "[南非] Cape Town 开普敦",
          "[保加利亚] Sofia 索非亚",
          "[希腊] Athens 雅典城",
          "[爱沙尼亚] Tallinn 塔林",
          "[芬兰] Helsinki 赫尔辛基",
          "[罗马尼亚] Bucharest 布加勒斯特",
          "[白俄罗斯] Minsk 明斯克",
          "[南非] Johannesburg 约翰尼斯堡"
        ]
      };
    }
  };
</script>
```

:::

### 可筛选多选

:::demo

```html
<template>
  <div>
    <p>选中值：{{select4}}</p>
    <div v-width="600">
      <blue-select
        v-model="select4"
        :datas="paramo2"
        :filterable="true"
        :multiple="true"
      ></blue-select>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        select: "",
        paramo2: [
          "Honolulu 夏威夷檀香山",
          "Anchorage 阿拉斯加安克雷奇",
          "Vancouver 温哥华",
          "San Francisco 旧金山",
          "Seattle 西雅图",
          "Los Angeles 洛杉矶",
          "Aklavik 阿克拉维克",
          "Edmonton 艾德蒙顿",
          "Phoenix 凤凰城",
          "Denver 丹佛",
          "Mexico City 墨西哥城",
          "Winnipeg 温尼伯",
          "Houston 休斯敦",
          "Minneapolis 明尼亚波利斯",
          "St.Paul 圣保罗",
          "New Orleans 新奥尔良",
          "Chicago 芝加哥",
          "Montgomery 蒙哥马利",
          "Guatemala 危地马拉",
          "San Salvador 圣萨尔瓦多",
          "Tegucigalpa 特古西加尔巴",
          "Managua 马那瓜",
          "Havana 哈瓦那",
          "Indianapolis 印地安纳波利斯",
          "Atlanta 亚特兰大",
          "Detroit 底特律",
          "Washington DC 华盛顿哥伦比亚特区",
          "Philadelphia 费城",
          "Toronto 多伦多",
          "Ottawa 渥太华",
          "Nassau 拿骚",
          "Lima 利马",
          "Kingston 金斯敦",
          "Bogota 波哥大",
          "New York 纽约",
          "Montreal 蒙特利尔",
          "Boston 波士顿",
          "Santo Domingo 圣多明各",
          "La Paz 拉帕兹",
          "Caracas 加拉加斯",
          "San Juan 圣胡安",
          "Halifax 哈里法克斯",
          "Santiago 圣地亚哥",
          "Asuncion 亚松森",
          "St\.John's 圣约翰斯",
          "Buenos Aires 布宜诺斯艾利斯",
          "Montevideo 蒙特维的亚",
          "Brasilia 巴西利亚",
          "Sao Paulo 圣保罗",
          "Rio de Janeiro 里约热内卢",
          "Reykjavik 雷克雅未克",
          "Lisbon 里斯本",
          "Casablanca 卡萨布兰卡",
          "Dublin 都柏林",
          "London 伦敦",
          "Madrid 马德里",
          "Barcelona 巴塞罗那",
          "Paris 巴黎",
          "Lagos 拉各斯",
          "Algiers 阿尔及尔",
          "Brussels 布鲁塞尔",
          "Amsterdam 阿姆斯特丹",
          "Geneva 日内瓦",
          "Zurich 苏黎世",
          "Frankfurt 法兰克福",
          "Oslo 奥斯陆",
          "Copenhagen 哥本哈根",
          "Rome 罗马",
          "Berlin 柏林",
          "Prague 布拉格",
          "Zagreb 萨格雷布",
          "Vienna 维也纳",
          "Stockholm 斯德哥尔摩",
          "Budapest 布达佩斯",
          "Belgrade 贝尔格莱德",
          "Warsaw 华沙",
          "Cape Town 开普敦",
          "Sofia 索非亚",
          "Athens 雅典城",
          "Tallinn 塔林",
          "Helsinki 赫尔辛基",
          "Bucharest 布加勒斯特",
          "Minsk 明斯克",
          "Johannesburg 约翰尼斯堡"
        ]
      };
    }
  };
</script>
```

:::

### Select 参数

| 参数           | 说明                                    | 类型          | 可选值      | 默认值                     |
| -------------- | --------------------------------------- | ------------- | ----------- | -------------------------- |
| multiple       | 是否多选                                | Boolean       | -           | false                      |
| type           | 数据的格式                              | String        | key, object | key                        |
| datas          | 选择的数据                              | Array, Object | -           |                            |
| dict           | 调用全局定义的字典                      | String        | -           | -                          |
| limit          | 限制只能选择多少个                      | Number        | -           | -                          |
| nullOption     | 是否有“请选择”选项                      | Boolean       | -           | true                       |
| nullOptionText | “请选择”文本选项                        | String        | -           | 请选择                     |
| filterable     | 是否有搜索框                            | Boolean       | -           | false                      |
| autosize       | 是否根据文字自适应宽度，默认为 100%宽度 | Boolean       | -           | false                      |
| optionRender   | 下拉菜单的展示自定义                    | Function      | -           | -                          |
| placeholder    | 展示默认提示语                          | String        | -           | 请选择                     |
| equalWidth     | 下拉的宽度是否和输入框一致              | Boolean       | -           | true                       |
| className      | 自定义 className                        | String        | -           |                            |
| emptyContent   | 没有搜索到值的提示语                    | String        | -           | 未搜索到相关数据           |
| keyName        | 自定义数据的 key 字段名                 | String        | -           | 全局 config dict.keyName   |
| titleName      | 自定义数据的 title 字段名               | String        | -           | 全局 config dict.titleName |

### Select 事件

| 事件   | 说明                     | 返回数据              |
| ------ | ------------------------ | --------------------- |
| change | 当数据产生变动的时候触发 | 完整对象              |
| input  | 当数据产生变动的时候触发 | 当前绑定的 v-model 值 |

<script>
export default {
  data() {
    return {
      select: null,
      param: ['选择1', '选择2', '选择3'],
      select2: null,
      param2: [{ title: '选择0', key: 0 }, { title: '禁用选择', key: 1, disabled: true }, { title: '选择1', key: 'a1', other: '其他值' }, { title: '选择2', key: 'a2' }, { title: '选择3', key: 'a3' }],
      select3: null,
      param3: { 0: '选择0', a1: '选择1', a2: '选择2', a3: '选择3' },
      select4: null,
      param4: [{ name: '选择0', code: 0 }, { name: '选择1', code: 'a1', other: '其他值' }, { name: '选择2', code: 'a2' }, { name: '选择3', code: 'a3' }],
      select5:[],
      paramo: [
          { title: "分组栏", isLabel: true },
          { title: "选择1", key: "a1", other: "其他值" },
          { title: "选择3", key: "a2" },
          { title: "禁用选择", key: "a3", disabled: true },
          { title: "隐藏选择", key: "a4", hidden: true }
        ],
      paramo1: [
        { title: '分组1', isLabel: true },
        { title: '选择0', key: '23' },
        { title: '选择1', key: 'a1', other: '其他值' },
        { title: '分组3', isLabel: true },
        { title: '选择2', key: 'a2' },
        { title: '分组3', isLabel: true },
        { title: '选择3', key: 'a3' }
      ],disabled: true,
      paramo2: [
          "[美国] Honolulu 夏威夷檀香山",
          "[美国] Anchorage 阿拉斯加安克雷奇",
          "[加拿大] Vancouver 温哥华",
          "[美国] San Francisco 旧金山",
          "[美国] Seattle 西雅图",
          "[美国] Los Angeles 洛杉矶",
          "[加拿大] Aklavik 阿克拉维克",
          "[加拿大] Edmonton 艾德蒙顿",
          "[美国] Phoenix 凤凰城",
          "[美国] Denver 丹佛",
          "[墨西哥] Mexico City 墨西哥城",
          "[加拿大] Winnipeg 温尼伯",
          "[美国] Houston 休斯敦",
          "[美国] Minneapolis 明尼亚波利斯",
          "[美国] St.Paul 圣保罗",
          "[美国] New Orleans 新奥尔良",
          "[美国] Chicago 芝加哥",
          "[美国] Montgomery 蒙哥马利",
          "[危地马拉] Guatemala 危地马拉",
          "[萨尔瓦多] San Salvador 圣萨尔瓦多",
          "[洪都拉斯] Tegucigalpa 特古西加尔巴",
          "[尼加拉瓜] Managua 马那瓜",
          "[古巴] Havana 哈瓦那",
          "[美国] Indianapolis 印地安纳波利斯",
          "[美国] Atlanta 亚特兰大",
          "[美国] Detroit 底特律",
          "[美国] Washington DC 华盛顿哥伦比亚特区",
          "[美国] Philadelphia 费城",
          "[加拿大] Toronto 多伦多",
          "[加拿大] Ottawa 渥太华",
          "[巴哈马] Nassau 拿骚",
          "[秘鲁] Lima 利马",
          "[牙买加] Kingston 金斯敦",
          "[柬埔寨] Bogota 波哥大",
          "[美国] New York 纽约",
          "[加拿大] Montreal 蒙特利尔",
          "[美国] Boston 波士顿",
          "[多米尼加] Santo Domingo 圣多明各",
          "[玻利维亚] La Paz 拉帕兹",
          "[委内瑞拉] Caracas 加拉加斯",
          "[波多黎各] San Juan 圣胡安",
          "[加拿大] Halifax 哈里法克斯",
          "[智利] Santiago 圣地亚哥",
          "[巴拉圭] Asuncion 亚松森",
          "[加拿大] St\.John's 圣约翰斯",
          "[阿根廷] Buenos Aires 布宜诺斯艾利斯",
          "[乌拉圭] Montevideo 蒙特维的亚",
          "[巴西] Brasilia 巴西利亚",
          "[巴西] Sao Paulo 圣保罗",
          "[巴西] Rio de Janeiro 里约热内卢",
          "[冰岛] Reykjavik 雷克雅未克",
          "[葡萄牙] Lisbon 里斯本",
          "[摩洛哥] Casablanca 卡萨布兰卡",
          "[爱尔兰] Dublin 都柏林",
          "[英国] London 伦敦",
          "[西班牙] Madrid 马德里",
          "[西班牙] Barcelona 巴塞罗那",
          "[法国] Paris 巴黎",
          "[尼日利亚] Lagos 拉各斯",
          "[阿尔及利亚] Algiers 阿尔及尔",
          "[比利时] Brussels 布鲁塞尔",
          "[荷兰] Amsterdam 阿姆斯特丹",
          "[瑞士] Geneva 日内瓦",
          "[瑞士] Zurich 苏黎世",
          "[德国] Frankfurt 法兰克福",
          "[挪威] Oslo 奥斯陆",
          "[丹麦] Copenhagen 哥本哈根",
          "[意大利] Rome 罗马",
          "[德国] Berlin 柏林",
          "[捷克] Prague 布拉格",
          "[克罗地亚] Zagreb 萨格雷布",
          "[奥地利] Vienna 维也纳",
          "[瑞典] Stockholm 斯德哥尔摩",
          "[匈牙利] Budapest 布达佩斯",
          "[塞尔维亚与蒙特内哥罗] Belgrade 贝尔格莱德",
          "[波兰] Warsaw 华沙",
          "[南非] Cape Town 开普敦",
          "[保加利亚] Sofia 索非亚",
          "[希腊] Athens 雅典城",
          "[爱沙尼亚] Tallinn 塔林",
          "[芬兰] Helsinki 赫尔辛基",
          "[罗马尼亚] Bucharest 布加勒斯特",
          "[白俄罗斯] Minsk 明斯克",
          "[南非] Johannesburg 约翰尼斯堡"
        ]
    }
  },
  methods: {
    update() {
      this.select = '选择2';
    },
    update2() {
      this.select2 = 'a2';
    },
    update3() {
      this.select3 = 'a2';
    },
    change(data) {
      //log('changeData:', data)
    }
  }
}
</script>
<style lang="less" >

  @red-color:red;

  .select-demo-show {
    .blue-select-value-single {
      color: @red-color;
    }
  }
  // 将鼠标移动以及选中的背景色变成红色
  .select-demo-dropdown {
    &.blue-select-group .blue-select-item {
      &:hover,
      &.blue-select-item-selected {
        background-color: @red-color;
        color: #fff;
      }
    }
  }
</style>
