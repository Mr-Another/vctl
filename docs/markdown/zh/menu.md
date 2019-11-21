[[toc]]

## Menu 菜单

> 非 template/render 模式下，请使用 blue-menu。

### 基本黑色

选中的方法主要是针对于 vue-router 等单页应用的选中逻辑。

:::demo

```html
<style lang="less">
  .menu-demo-1-vue {
    transition: 0.2s width cubic-bezier(0.01, 0.71, 0.54, 1);
  }
</style>

<template>
  <div>
    <p>
      <blue-switchList
        v-model="theme"
        :datas="{'blue-menu-white': '白色', 'blue-menu-dark': '黑色'}"
      ></blue-switchList>
    </p>
    <p><blue-switch v-model="accordion" small>手风琴模式</blue-switch></p>
    <p><blue-switch v-model="inlineCollapsed" small>收起菜单</blue-switch></p>
    <p>
      <button class="blue-btn blue-btn-s" @click="select('favor2-3')">
        选中"收藏-2-3"
      </button>
      <button class="blue-btn blue-btn-s" @click="select('task1-1')">
        选中"任务-1"
      </button>
      <button class="blue-btn blue-btn-s" @click="select('welcome')">
        选中"首页"
      </button>
    </p>
    <div class="bg-gray2-color" v-padding="20">
      <div
        class="menu-demo-1-vue"
        :style="{width: inlineCollapsed?'70px':'250px'}"
      >
        <blue-menu
          :datas="data"
          :class-name="theme"
          :inline-collapsed="inlineCollapsed"
          ref="menu"
          :accordion="accordion"
          @select="triggerSelect"
          @click="triggerClick"
        ></blue-menu>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        accordion: false,
        inlineCollapsed: false,
        theme: "blue-menu-dark",
        data: [
          {
            title: "首页",
            key: "welcome",
            icon: "icon-home"
          },
          {
            title: "查询",
            key: "search",
            icon: "icon-search"
          },
          {
            title: "收藏",
            key: "favor",
            icon: "icon-star",
            count: 100,
            children: [
              {
                title: "收藏-1",
                key: "favor2-1"
              },
              {
                title: "收藏收藏收藏收藏收藏收藏收藏收藏-2",
                key: "favor3-2",
                children: [
                  {
                    title: "收藏收藏收藏收藏收藏收藏收藏收藏-2-3",
                    key: "favor2-3"
                  },
                  {
                    title: "收藏收藏收藏收藏收藏收藏收藏收藏-2-4",
                    key: "favor3-4"
                  }
                ]
              }
            ]
          },
          {
            title: "任务",
            icon: "icon-task",
            key: "task",
            children: [
              {
                title: "任务-1",
                icon: "icon-bell",
                key: "task1-1"
              },
              {
                title: "任务-2",
                icon: "icon-home",
                key: "task1-2"
              }
            ]
          }
        ]
      };
    },
    methods: {
      select(key) {
        this.$refs.menu.select(key);
      },
      triggerClick(data) {
        console.log(data);
      },
      triggerSelect(menu) {
        this.$Message.info(`选中${menu.title}`);
      }
    }
  };
</script>
```

:::

### Menu 参数

| 参数            | 说明                               | 类型    | 可选值 | 默认值                          |
| --------------- | ---------------------------------- | ------- | ------ | ------------------------------- |
| datas           | menu 的数据                        | Array   | -      | []                              |
| option          | 配置项，详细参见下面的 option 说明 | Object  | -      | 全局配置 config.menu            |
| className       | 自定义 class                       | string  | -      | blue-menu-dark, blue-menu-white |
| inlineCollapsed | 是否使用折叠模式，兼容：1.13.1+    | Boolean | -      | false                           |
| accordion       | 是否启动手风琴模式，兼容：1.12.0+  | Boolean | -      | false                           |

### Menu 事件

| 事件   | 说明                 |
| ------ | -------------------- |
| click  | 每个 menu 的点击事件 |
| select | menu 的选中事件      |

### Option 参数

| 参数         | 说明                     | 类型   | 可选值 | 默认值   |
| ------------ | ------------------------ | ------ | ------ | -------- |
| titleName    | menu 的数据 titleName    | String | -      | title    |
| keyName      | menu 的数据 keyName      | String | -      | key      |
| childrenName | menu 的数据 childrenName | String | -      | children |

<script>
export default {
  data() {
    return {
      accordion: false,
      inlineCollapsed: false,
      theme: 'blue-menu-dark',
      data: [
        {
          title: '首页',
          key: 'welcome',
          icon: 'icon-home'
        },
        {
          title: '查询',
          key: 'search',
          icon: 'icon-search'
        },
        {
          title: '收藏',
          key: 'favor',
          icon: 'icon-star',
          count: 100,
          children: [
            {
              title: '收藏-1',
              key: 'favor2-1'
            },
            {
              title: '收藏收藏收藏收藏收藏收藏收藏收藏-2',
              key: 'favor3-2',
              children: [
                {
                  title: '收藏收藏收藏收藏收藏收藏收藏收藏-2-3',
                  key: 'favor2-3'
                },
                {
                  title: '收藏收藏收藏收藏收藏收藏收藏收藏-2-4',
                  key: 'favor3-4'
                }
              ]
            }
          ]

        },
        {
          title: '任务',
          icon: 'icon-wallet',
          key: 'task',
          children: [
            {
              title: '任务-1',
              icon: 'icon-bell',
              key: 'task1-1'
            },
            {
              title: '任务-2',
              icon: 'icon-home',
              key: 'task1-2'
            }
          ]
        }
      ]
    };
  },
  methods: {
    select(key) {
      this.$refs.menu.select(key);
    },
    triggerClick(data) {
      console.log(data);
    },
    triggerSelect(menu) {
      this.$Message.info(`选中${menu.title}`);
    }
  }
};
</script>

<style lang="less">
 .menu-demo-1-vue{
   transition: 0.2s width cubic-bezier(0.01, 0.71, 0.54, 1);
 }
</style>
