[[toc]]

## blue-layout 布局

### 组件概述

组件在 var.less 中配置三个尺寸，分别为：

- @layout-header-height: 布局中 Header 的高度，默认值为: 64px
- @layout-sider-width: 布局中 Sider 的宽度，默认值为: 200px
- @layout-sider-collapse-width: 布局中 Sider 收起的宽度，默认值为: 70px

用户可以通过自己的设计需求修改这三个尺寸

### 基本的页面布局

:::demo

```html
<template>
  <div class="layout-demo-1-vue">
    <blue-layout>
      <blue-hheader>Header</blue-hheader>
      <blue-content>Content</blue-content>
      <blue-hfooter>Footer</blue-hfooter>
    </blue-layout>
    <br />
    <blue-layout>
      <blue-hheader>Header</blue-hheader>
      <blue-layout>
        <blue-sider>Sider</blue-sider>
        <blue-content>Content</blue-content>
      </blue-layout>
      <blue-hfooter>Footer</blue-hfooter>
    </blue-layout>
    <br />
    <blue-layout>
      <blue-sider>sider</blue-sider>
      <blue-layout>
        <blue-hheader>Header</blue-hheader>
        <blue-content>Content</blue-content>
        <blue-hfooter>Footer</blue-hfooter>
      </blue-layout>
    </blue-layout>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {};
    }
  };
</script>

<style lang="less">
  .layout-demo-1-vue {
    .blue-layout-header,
    .blue-layout-footer {
      background: fade(#45b984, 90%);
      color: #fff;
      line-height: 64px;
      height: 64px;
      text-align: center;
    }
    .blue-layout-content {
      background: fade(#45b984, 80%);
      color: #fff;
      min-height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .blue-layout-sider {
      background: fade(#45b984, 70%);
      color: #fff;
      text-align: center;
      line-height: 120px;
    }
  }
</style>
```

:::

### Layout 参数

| 参数           | 说明           | 类型    | 可选值 | 默认值 |
| -------------- | -------------- | ------- | ------ | ------ |
| headerFixed    | 是否固定头部   | Boolean | false  | -      |
| siderFixed     | 是否固定侧边栏 | Boolean | false  | -      |
| siderCollapsed | 是否收起侧边栏 | Boolean | false  | -      |

### Header 参数

| 参数  | 说明 | 类型   | 可选值 | 默认值      |
| ----- | ---- | ------ | ------ | ----------- |
| theme | 主题 | String |        | white, dark |

### Sider 参数

| 参数  | 说明 | 类型   | 可选值 | 默认值      |
| ----- | ---- | ------ | ------ | ----------- |
| theme | 主题 | String |        | white, dark |

<script>
export default {
      data() {
        return {
        headerFixed: false,
        siderFixed: false,
        siderCollapsed: false,
        menuDatas: [
            { title: '首页', key: 'welcome', icon: 'icon-home' },
            { title: '查询', key: 'search', icon: 'icon-search' },
            { title: '收藏', key: 'favor', icon: 'icon-star', count: 100, children: [{ title: '收藏-1', key: 'favor2-1' }] },
            { title: '任务', icon: 'icon-task', key: 'task' }
        ],
        datas: [
            { icon: 'icon-home' },
            { title: 'Component', icon: 'icon-complete', route: { name: 'Component' } },
            { title: 'Breadcrumb', icon: 'icon-star' }
        ]
        };
    },
    watch: {
        siderFixed() {
        if (!this.siderFixed) {
            this.headerFixed = false;
        }
        }
  }
  };
</script>

<style lang="less">
    


.layout-demo-1-vue {
  .blue-layout-header, .blue-layout-footer{
     background: fade(#45b984, 90%);
     color: #fff;
     line-height: 64px;
     height: 64px;
     text-align: center;
  }
  .blue-layout-content {
     background: fade(#45b984, 80%);
     color: #fff;
     min-height: 120px;
     line-height: 120px;
     text-align: center;
  }
 .blue-layout-sider{
   background: fade(#45b984, 70%);
   color: #fff;
   text-align: center;
   line-height: 120px;
 }
}

</style>
