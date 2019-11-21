## Button 按钮

### 组件调用

使用基本的 Button 组件实现各种 button 的样式。

:::warning
如果需要使用 stop 等事件处理方案，请使用 stop 参数
:::

:::demo

```html
<style lang="less">
  .button2-demo-vue {
    .buttons {
      > .blue-btn,
      > .blue-btn-group {
        margin-bottom: 10px;
      }
    }
  }
</style>
<template>
  <div class="button2-demo-vue">
    <h4>Basic</h4>
    <div class="buttons">
      <blue-button>Default</blue-button>
      <blue-button color="primary">Main color</blue-button>
      <blue-button :text="true">Text button</blue-button>
      <blue-button :no-border="true">Text button 2</blue-button>
    </div>
    <h4>Colour</h4>
    <div class="buttons">
      <blue-button color="primary">Main button</blue-button>
      <blue-button color="yellow">YELLOW button</blue-button>
      <blue-button color="green">GREEN button</blue-button>
      <blue-button color="red">RED button</blue-button>
      <blue-button color="blue">BLUE button</blue-button>
      <blue-button color="gray">GRAY button</blue-button>
    </div>
    <h4>Hover Colour</h4>
    <div class="buttons">
      <blue-button text-color="primary">Main button</blue-button>
      <blue-button text-color="yellow">YELLOW button</blue-button>
      <blue-button text-color="green">GREEN button</blue-button>
      <blue-button text-color="red">RED button</blue-button>
      <blue-button text-color="blue">BLUE button</blue-button>
      <blue-button text-color="gray">GRAY button</blue-button>
    </div>
    <h4>Text Button</h4>
    <div class="buttons">
      <blue-button no-border text-color="primary">Main button</blue-button>
      <blue-button no-border text-color="yellow">YELLOW button</blue-button>
      <blue-button no-border text-color="green">GREEN button</blue-button>
      <blue-button no-border text-color="red">RED button</blue-button>
      <blue-button no-border text-color="blue">BLUE button</blue-button>
      <blue-button no-border text-color="gray">GRAY button</blue-button>
    </div>
    <h4>Block</h4>
    <div>
      <div v-width="300">
        <blue-button :block="true" text-color="red">Block button</blue-button>
      </div>
    </div>
    <h4>Disabled</h4>
    <div class="buttons">
      <blue-button :disabled="true">Default</blue-button>
      <blue-button color="primary" :disabled="true">Main button</blue-button>
      <blue-button :text="true" :disabled="true">Text button</blue-button>
      <blue-button color="blue" :disabled="true" icon="icon-completed">
        Icon
      </blue-button>
    </div>
    <h4>Icon</h4>
    <div class="buttons">
      <blue-button icon="icon-inbox"></blue-button>
      <blue-button icon="icon-search" color="primary">Search</blue-button>
      <blue-button icon="icon-outbox" color="green">Upload</blue-button>
      <blue-button icon="icon-reload" color="yellow">Refresh</blue-button>
    </div>
    <h4>Loading</h4>
    <div class="buttons">
      <blue-button color="primary" :loading="true">Loading</blue-button>
      <blue-button
        color="green"
        :loading="loading1"
        @click.native="loading1=!loading1"
      >
        Sumbit
      </blue-button>
      <blue-button
        text-color="red"
        icon="icon-trash"
        :loading="loading2"
        @click.native="loading2=!loading2"
      >
        Delete
      </blue-button>
    </div>
    <h4>Circle</h4>
    <div class="buttons">
      <blue-button :circle="true" icon="icon-inbox"></blue-button>
      <blue-button :icon-circle="true" icon="icon-inbox"></blue-button>
      <blue-button color="primary" :circle="true" icon="icon-search">
        Search
      </blue-button>
      <blue-button color="yellow" :circle="true">YELLOW button</blue-button>
      <blue-button text-color="yellow" :circle="true">Text button</blue-button>
    </div>
    <h4>Sizes</h4>
    <div class="buttons">
      <blue-button size="l">Large</blue-button>
      <blue-button>Normal</blue-button>
      <blue-button size="s" icon="icon-inbox">Download</blue-button>
      <blue-button size="xs">Tiny</blue-button>
      <blue-button size="xs" :text="true">Share</blue-button>
      <blue-button size="xs" :text="true">Select</blue-button>
    </div>
    <h4>Button Group</h4>
    <div class="buttons">
      <blue-buttonGroup>
        <blue-button
          color="primary"
          v-tooltip
          content="后退"
          icon="icon-left"
        ></blue-button>
        <blue-button
          color="primary"
          v-tooltip
          content="前进"
          icon="icon-right"
        ></blue-button>
      </blue-buttonGroup>
      <blue-buttonGroup>
        <blue-button icon="icon-inbox">Create</blue-button>
        <blue-button icon="icon-trash" :disabled="true">Delete</blue-button>
        <blue-button icon="icon-reload">Refresh</blue-button>
        <blue-button icon="icon-star">Favorite</blue-button>
      </blue-buttonGroup>
      <blue-buttonGroup :circle="true">
        <blue-button color="primary" icon="icon-left"></blue-button>
        <blue-button color="primary" icon="icon-right"></blue-button>
      </blue-buttonGroup>
    </div>
    <h4>Button Group Sizes</h4>
    <div class="buttons">
      <blue-buttonGroup size="l">
        <blue-button icon="icon-inbox">Create</blue-button>
        <blue-button icon="icon-trash">Delete</blue-button>
        <blue-button icon="icon-reload">Refresh</blue-button>
        <blue-button icon="icon-star">Favorite</blue-button>
      </blue-buttonGroup>
      <blue-buttonGroup :circle="true" size="s">
        <blue-button icon="icon-left"></blue-button>
        <blue-button icon="icon-right"></blue-button>
      </blue-buttonGroup>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        loading1: false,
        loading2: false
      };
    }
  };
</script>
```

:::

### 原生 class

:::demo

```html
<style lang="less">
  .button1-demo-vue {
    .buttons {
      > .blue-btn,
      > .blue-btn-group {
        margin-bottom: 10px;
      }
    }
  }
</style>

<template>
  <div class="button1-demo-vue">
    <h4>基本</h4>
    <div class="buttons">
      <blue-button class="blue-btn">默认</blue-button>
      <blue-button class="blue-btn blue-btn-primary">主色系按钮</blue-button>
      <blue-button class="blue-btn blue-btn-text">文字按钮</blue-button>
      <blue-button class="blue-btn blue-btn-no-border">文字按钮2</blue-button>
    </div>
    <h4>颜色</h4>
    <div class="buttons">
      <blue-button class="blue-btn blue-btn-primary">主色系按钮</blue-button>
      <blue-button class="blue-btn blue-btn-yellow">YELLOW按钮</blue-button>
      <blue-button class="blue-btn blue-btn-green">GREEN按钮</blue-button>
      <blue-button class="blue-btn blue-btn-red">RED按钮</blue-button>
      <blue-button class="blue-btn blue-btn-blue">BLUE按钮</blue-button>
      <blue-button class="blue-btn blue-btn-gray">GRAY按钮</blue-button>
    </div>
    <h4>hover颜色</h4>
    <div class="buttons">
      <blue-button class="blue-btn blue-btn-text-primary"
        >主色系按钮</blue-button
      >
      <blue-button class="blue-btn blue-btn-text-yellow"
        >YELLOW按钮</blue-button
      >
      <blue-button class="blue-btn blue-btn-text-green">GREEN按钮</blue-button>
      <blue-button class="blue-btn blue-btn-text-red">RED按钮</blue-button>
      <blue-button class="blue-btn blue-btn-text-blue">BLUE按钮</blue-button>
      <blue-button class="blue-btn blue-btn-text-gray">GRAY按钮</blue-button>
    </div>
    <h4>文字颜色</h4>
    <div class="buttons">
      <blue-button class="blue-btn blue-btn-no-border blue-btn-text-primary">
        主色系按钮
      </blue-button>
      <blue-button class="blue-btn blue-btn-no-border blue-btn-text-yellow">
        YELLOW按钮
      </blue-button>
      <blue-button class="blue-btn blue-btn-no-border blue-btn-text-green">
        GREEN按钮
      </blue-button>
      <blue-button class="blue-btn blue-btn-no-border blue-btn-text-red">
        RED按钮
      </blue-button>
      <blue-button class="blue-btn blue-btn-no-border blue-btn-text-blue">
        BLUE按钮
      </blue-button>
    </div>
    <h4>block</h4>
    <div>
      <div v-width="300">
        <blue-button class="blue-btn blue-btn-text-red blue-btn-block">
          整行按钮
        </blue-button>
      </div>
    </div>
    <h4>禁用</h4>
    <div class="buttons">
      <blue-button class="blue-btn" disabled>默认</blue-button>
      <blue-button class="blue-btn blue-btn-primary" disabled
        >主色系按钮</blue-button
      >
      <blue-button class="blue-btn blue-btn-text" disabled
        >文字按钮</blue-button
      >
      <blue-button class="blue-btn blue-btn-blue" disabled>
        <i class="icon-completed"></i><span>图标</span>
      </blue-button>
    </div>
    <h4>图标</h4>
    <div class="buttons">
      <blue-button class="blue-btn"><i class="icon-inbox"></i></blue-button>
      <blue-button class="blue-btn blue-btn-primary">
        <i class="icon-search"></i><span>查询</span>
      </blue-button>
      <blue-button class="blue-btn blue-btn-green">
        <span>上传</span><i class="icon-outbox"></i>
      </blue-button>
      <blue-button class="blue-btn blue-btn-yellow">
        <span>刷新</span><i class="icon-reload"></i>
      </blue-button>
    </div>
    <h4>loading</h4>
    <div class="buttons">
      <blue-button class="blue-btn blue-btn-primary blue-btn-loading">
        <i class="icon-loading"></i><span> loading</span>
      </blue-button>
      <blue-button
        class="blue-btn blue-btn-primary"
        :class="{'blue-btn-loading':loading1}"
        @click="loading1=!loading1"
      >
        <i class="icon-loading" v-if="loading1"></i><span>提交</span>
      </blue-button>
      <blue-button
        class="blue-btn blue-btn-text-red"
        :class="{'blue-btn-loading':loading2}"
        @click="loading2=!loading2"
      >
        <i class="icon-trash" v-if="!loading2"></i
        ><i v-else class="icon-loading"></i><span>删除</span>
      </blue-button>
    </div>
    <h4>圆角</h4>
    <div class="buttons">
      <blue-button class="blue-btn blue-btn-circle">
        <i class="icon-inbox"></i>
      </blue-button>
      <blue-button class="blue-btn blue-btn-icon-circle">
        <i class="icon-inbox"></i>
      </blue-button>
      <blue-button class="blue-btn blue-btn-primary blue-btn-circle">
        <i class="icon-search"></i><span> 查询</span>
      </blue-button>
      <blue-button class="blue-btn blue-btn-yellow blue-btn-circle">
        YELLOW按钮
      </blue-button>
      <blue-button class="blue-btn blue-btn-text-yellow blue-btn-circle">
        文字按钮
      </blue-button>
    </div>
    <h4>大小</h4>
    <div class="buttons">
      <blue-button class="blue-btn blue-btn-l">超大</blue-button>
      <blue-button class="blue-btn">正常</blue-button>
      <blue-button class="blue-btn blue-btn-s">
        <i class="icon-inbox"></i><span>下载</span>
      </blue-button>
      <blue-button class="blue-btn blue-btn-xs">超小</blue-button>
      <blue-button class="blue-btn blue-btn-text blue-btn-xs">分享</blue-button>
      <blue-button class="blue-btn blue-btn-text blue-btn-xs">选择</blue-button>
    </div>
    <h4>按钮组</h4>
    <div class="buttons">
      <div class="blue-btn-group">
        <blue-button class="blue-btn blue-btn-primary">
          <i class="icon-left"></i>
        </blue-button>
        <blue-button class="blue-btn blue-btn-primary">
          <i class="icon-right"></i>
        </blue-button>
      </div>
      <div class="blue-btn-group">
        <blue-button class="blue-btn">
          <i class="icon-inbox"></i><span>新建</span>
        </blue-button>
        <blue-button class="blue-btn" disabled>
          <i class="icon-trash"></i><span>删除</span>
        </blue-button>
        <blue-button class="blue-btn">
          <i class="icon-reload"></i><span>刷新</span>
        </blue-button>
        <blue-button class="blue-btn">
          <i class="icon-star"></i><span>收藏</span>
        </blue-button>
      </div>
      <div class="blue-btn-group blue-btn-group-circle">
        <blue-button class="blue-btn blue-btn-primary">
          <i class="icon-left"></i>
        </blue-button>
        <blue-button class="blue-btn blue-btn-primary">
          <i class="icon-right"></i>
        </blue-button>
      </div>
    </div>
    <h4>按钮组大小</h4>
    <div class="buttons">
      <div class="blue-btn-group blue-btn-group-l">
        <blue-button class="blue-btn">
          <i class="icon-inbox"></i><span>新建</span>
        </blue-button>
        <blue-button class="blue-btn">
          <i class="icon-trash"></i><span>删除</span>
        </blue-button>
        <blue-button class="blue-btn">
          <i class="icon-reload"></i><span>刷新</span>
        </blue-button>
        <blue-button class="blue-btn">
          <i class="icon-star"></i><span>收藏</span>
        </blue-button>
      </div>
      <div class="blue-btn-group blue-btn-group-circle blue-btn-group-s">
        <blue-button class="blue-btn"><i class="icon-left"></i></blue-button>
        <blue-button class="blue-btn"><i class="icon-right"></i></blue-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        loading1: false,
        loading2: false
      };
    }
  };
</script>
```

:::

<style lang="less">
    h4{
        font-size: 17px;
    margin: 30px 0 10px;
    }
    
  .button1-demo-vue {
    .buttons {
      > .blue-btn,
      > .blue-btn-group {
        margin-bottom: 10px;
      }
    }
  }

  .button2-demo-vue {
    .buttons {
      > .blue-btn,
      > .blue-btn-group {
        margin-bottom: 10px;
      }
    }
  }
</style>

<script>
  export default {
    data: function() {
      return {
        loading1: false,
        loading2: false
      };
    }
  };
</script>
