[[toc]]

### Timeline 时间轴

> 非 template/render 模式下，请使用 blue-timeline, blue-timelineitem。

### 示例

:::demo

```html
<template>
  <blue-timeline :pending="true">
    <blue-timelineitem>
      北京
    </blue-timelineitem>
    <blue-timelineitem color="green">
      长春
    </blue-timelineitem>
    <blue-timelineitem>
      到达呼伦贝尔
    </blue-timelineitem>
    <blue-timelineitem icon="icon-eye">
      蒙古的草原
    </blue-timelineitem>
    <blue-timelineitem icon="icon-check-circle" color="green">
      满洲里，外面的俄罗斯是什么样子的世界？
    </blue-timelineitem>
    <blue-timelineitem>
      <a href="">加载更多</a>
    </blue-timelineitem>
  </blue-timeline>
</template>
```

:::

### 展示带左侧时间的时间轴

> 可以通过:time="true"设定展示左侧样式，:time-width="200"设定左侧宽度。

:::demo

```html
<template>
  <blue-timeline :pending="true" :time="true" :time-width="200">
    <blue-timelineitem>
      北京
    </blue-timelineitem>
    <blue-timelineitem color="green">
      长春
    </blue-timelineitem>
    <blue-timelineitem>
      <i class="icon-user primary-color" slot="icon"></i>
      <div slot="time">2012-12-23</div>
      <div slot="content">到达呼伦贝尔</div>
    </blue-timelineitem>
    <blue-timelineitem icon="icon-eye">
      <div slot="time">
        <p>2012-12-23</p>
        <p>天气晴</p>
      </div>
      <div slot="content">蒙古的草原</div>
    </blue-timelineitem>
    <blue-timelineitem icon="icon-check-circle" color="green">
      <div slot="time">
        <p>2012-12-23</p>
        <p>小雨</p>
      </div>
      <div slot="content">
        <p v-font="18">春夜洛城闻笛</p>
        <p class="gray-color">谁家玉笛暗飞声</p>
        <p class="gray-color">散入春风满洛城</p>
        <p class="gray-color">此夜曲中闻折柳</p>
        <p class="gray-color">何人不起故园情</p>
      </div>
    </blue-timelineitem>
    <blue-timelineitem>
      <a href="">加载更多</a>
    </blue-timelineitem>
  </blue-timeline>
</template>
```

:::

### Timeline 参数

| 参数      | 说明                 | 类型    | 可选值     | 默认值 |
| --------- | -------------------- | ------- | ---------- | ------ |
| time      | 是否显示左侧         | boolean | true,false | false  |
| pending   | 最后一个显示加载样式 | boolean | true,false | false  |
| timeWidth | 显示左侧的宽度       | number  | -          | 100    |

### TimelineItem 参数

| 参数  | 说明       | 类型   | 可选值                          | 默认值 |
| ----- | ---------- | ------ | ------------------------------- | ------ |
| color | 时间轴颜色 | string | blue,green,yellow,red,#**\*\*** | blue   |
| icon  | 图标       | string |                                 | -      |

### TimelineItem Slot

| name    | 说明         | 参数 |
| ------- | ------------ | ---- |
| content | 定义展示内容 | 无   |
| time    | 定义时间展示 | 无   |
| icon    | 定义图标展示 | 无   |
