[[toc]]

## Grid 栅格

> 我们采用标准的 24 格布局容器，利用容器完成简单的网络布局。

### 基本的排版

:::demo 利用基本的 class `.blue-col-{n}`进行排版布局。

```html
<style type="text/css" scopedblue .blue-row>
  .demo1 > div {
    height: 30px;
    color: #fff;
    text-align: center;
  }
</style>
<template>
  <div class="blue-row demo1">
    <div class="blue-col-6 bg-gray-color"></div>
    <div class="blue-col-6 bg-gray1-color"></div>
    <div class="blue-col-6 bg-gray2-color"></div>
    <div class="blue-col-6 bg-gray3-color"></div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {};
    }
  };
</script>
```

:::

### 组件排版

:::demo

```html
<style lang="less" scoped>
  .demo2.blue-row {
    display:block;
    > div > div {
      padding: 8px;
      color: #fff;
      border-radius: 3px;
      text-align: center;
      background-color: @gray-color;
    }
</style>
<template>
  <Row :space="9" class="demo2">
    <Cell v-for="n in 8" :key="n" width="6"><div>{{n}}</div></Cell>
    <Cell width="24"><div>Top</div></Cell>
    <Cell width="6"><div>Left</div></Cell>
    <Cell width="18"><div>Right</div></Cell>
    <Cell width="18"><div>Left</div></Cell>
    <Cell width="6"><div>Right</div></Cell>
  </Row>
</template>
```

:::

### 横竖向间隔

> 通过给 Row 添加`space-x`,`space-y`属性，让`Cell`产生间距。

:::demo

```html
<style lang="less" scoped>
  .blue-row > div > div {
    padding: 8px;
    color: #fff;
    border-radius: 3px;
    text-align: center;
    background-color: @gray-color;
  }
</style>
<template>
  <Row :space-x="19" :space-y="35" class="demo3">
    <Cell width="24"><div>Top</div></Cell>
    <Cell width="6"><div>Left</div></Cell>
    <Cell width="18"><div>Right</div></Cell>
    <Cell width="18"><div>Left</div></Cell>
    <Cell width="6"><div>Right</div></Cell>
  </Row>
</template>
```

:::

### Flex 布局

> Flex 布局主要使用在 flex 自适应的场景中。

:::demo

```html
<style lang="less" scoped>
  .demo5 .blue-row-flex > div {
    color: #fff;
    border-radius: 3px;
    text-align: center;
    background-color: @gray-color;
  }
</style>
<template>
  <div class="demo5">
    <p>默认横向排列</p>
    <Row :space-x="10" type="flex" v-height="50">
      <Cell v-width="50"> left </Cell>
      <Cell v-width="100"> center</Cell>
      <Cell :flex="1"> right </Cell>
    </Row>
    <blockquote>
      direction方向:row(默认), column, row-reverse, column-reverse
    </blockquote>
    <p>direction: column</p>
    <Row type="flex" direction="column" v-height="150" :space-y="10">
      <Cell v-height="30"> top </Cell>
      <Cell v-height="30"> middle </Cell>
      <Cell :flex="1"> bottom </Cell>
    </Row>
    <blockquote>
      justify排列方式: start, end, center, space-around, space-between
    </blockquote>
    <p>justify: end</p>
    <Row type="flex" justify="end" :space="10">
      <Cell :width="4" v-for="n in 4" :key="n">{{n}}</Cell>
    </Row>
    <p>justify: space-around</p>
    <Row type="flex" justify="space-around" :space="10">
      <Cell :width="4" v-for="n in 4" :key="n">{{n}}</Cell>
    </Row>
    <blockquote>align对齐方式:top, middle, bottom</blockquote>
    <p>align: bottom</p>
    <Row type="flex" align="bottom" :space="10">
      <Cell :width="4" v-for="n in 4" :key="n" v-height="n*15">{{n}}</Cell>
    </Row>
    <p>align: top</p>
    <Row type="flex" align="top" :space="10">
      <Cell :width="4" v-for="n in 4" :key="n" v-height="n*15">{{n}}</Cell>
    </Row>
  </div>
</template>
```

:::

### 自适应布局

> 实现响应式设计，利用五个尺寸：xs, sm, md, lg, xl。

max-768px, 768px, 992px,1200px , min-1800px

:::demo

```html
<style lang="less" scoped>
  .demo6.blue-row > div > div {
    color: #fff;
    border-radius: 3px;
    padding: 5px;
    text-align: center;
    background-color: @gray-color;
  }
</style>
<template>
  <div>
    <Row :space="10" class="demo6">
      <Cell :xs="24" :sm="12" :md="8" :lg="4" :xl="2" v-for="n in 12" :key="n"
        ><div>{{n}}</div></Cell
      >
    </Row>
  </div>
</template>
```

:::

### Row 参数

| 参数      | 说明                  | 类型   | 可选值                                          | 默认值 |
| --------- | --------------------- | ------ | ----------------------------------------------- | ------ |
| type      | 模式                  | string | flex                                            | -      |
| space     | 区块间隔              | number | -                                               | 0      |
| space-x   | 横向区块间隔          | number | -                                               | 0      |
| space-y   | 竖向区块间隔          | number | -                                               | 0      |
| direction | flex 布局区块方向     | string | row, column, row-reverse, column-reverse        | row    |
| justify   | flex 布局区块排列方式 | string | start, end, center, space-around, space-between | start  |
| align     | flex 布局区块对齐方式 | string | top, middle, bottom                             | top    |

### Cell 参数

| 参数  | 说明                           | 类型   | 可选值  | 默认值 |
| ----- | ------------------------------ | ------ | ------- | ------ |
| width | 比例                           | number | 1 至 24 | -      |
| flex  | flex 模式下的 flex 值          | number | -       | -      |
| xs    | 自适应模式下大屏幕的显示比例   | number | -       | -      |
| sm    | 自适应模式下中大屏幕的显示比例 | number | -       | -      |
| md    | 自适应模式下中小屏幕的显示比例 | number | -       | r-w    |
| lg    | 自适应模式下小屏幕的显示比例   | number | -       | -      |

<style type="text/css" lang="less" scoped>
@import (less) "../../../themes/var.less";
  .demo1 > div  {
    height: 30px;
    color: #fff;
    text-align: center;
  }
 
  .demo2.blue-row {
    display:block;
    > div > div {
      padding: 8px;
      color: #fff;
      border-radius: 3px;
      text-align: center;
      background-color: @gray-color;
    }
  }

  .demo3.blue-row>div>div{
    padding: 8px;
    color: #FFF;
    border-radius: 3px;
    text-align: center;
    background-color: @gray-color;
  }
 .demo5 .blue-row-flex > div {
    color: #fff;
    border-radius: 3px;
    text-align: center;
    background-color: @gray-color;
  }
.demo6.blue-row > div > div {
    color: #fff;
    border-radius: 3px;
    padding: 5px;
    text-align: center;
    background-color: @gray-color;
  }
</style>
