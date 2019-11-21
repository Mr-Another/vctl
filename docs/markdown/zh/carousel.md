[[toc]]

## Carousel 走马灯

> 非 template/render 模式下，请使用 blue-carousel

### 基本调用

:::demo

```html
<template>
  <div>
    <p>切换到{{page}}</p>
    <Carousel
      :datas="params"
      :height="300"
      page-theme="circle"
      @change="change"
      @click="click"
    ></Carousel>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page: "Page 1",
        params: [
          {
            title: "Page 1",
            link: true,
            image:
              "https://cdn.pixabay.com/photo/2018/10/20/00/26/ninja-3760010_960_720.jpg"
          },
          {
            title: "Page 2",
            link: "http://www.baidu.com",
            image:
              "https://cdn.pixabay.com/photo/2018/10/19/05/12/naruto-3757871_960_720.jpg"
          },
          {
            title: "Page 3",
            image:
              "https://cdn.pixabay.com/photo/2018/10/20/00/26/ninja-3760010_960_720.jpg"
          },
          {
            title: "Page 4",
            image:
              "https://cdn.pixabay.com/photo/2018/10/20/00/26/ninja-3760010_960_720.jpg"
          }
        ]
      };
    },
    methods: {
      change(index, data) {
        this.page = data.title;
      },
      click(index, data) {
        this.$Message(`点击了${data.title}`);
      }
    }
  };
</script>
```

:::

### 控制参数

:::demo

```html
<style lang="less">
  .carousel-demo1 .blue-carousel-item {
    background: @dark-color;
    .blue-carousel-p {
      color: #fff;
      font-size: 36px;
      padding-top: 120px;
      text-align: center;
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }
</style>
<template>
  <div>
    <div style="padding-bottom: 20px">
      <blue-form readonly :label-width="130">
        <blue-formitem label="自动切换"
          ><blue-switch small v-model="autoplay"></blue-switch
        ></blue-formitem>
        <blue-formitem label="左右切换按钮"
          ><blue-switchlist
            small
            v-model="arrow"
            :datas="arrows"
          ></blue-switchlist
        ></blue-formitem>
        <blue-formitem label="底部指示器样式"
          ><blue-switchlist
            small
            v-model="pageTheme"
            :datas="pageThemes"
          ></blue-switchlist
        ></blue-formitem>
        <blue-formitem label="底部指示器触发"
          ><blue-switchlist
            small
            v-model="paginationTrigger"
            :datas="paginationTriggers"
          ></blue-switchlist
        ></blue-formitem>
        <blue-formitem label="切换效果"
          ><blue-switchlist
            small
            v-model="effect"
            :datas="effects"
          ></blue-switchlist
        ></blue-formitem>
      </blue-form>
    </div>
    <Carousel
      class="carousel-demo1"
      :datas="params1"
      :height="300"
      :autoplay="autoplay"
      :pagination-trigger="paginationTrigger"
      :arrow="arrow"
      :page-theme="pageTheme"
      :speed="2000"
      :change-speed="1000"
      :effect="effect"
    >
      <template slot-scope="{carousel}" slot="item">
        <div class="blue-carousel-p" :style="`background: ${carousel.color}`">
          {{carousel.title}}
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        autoplay: true,
        pageTheme: "square",
        arrow: "hover",
        paginationTrigger: "click",
        effect: "scroll",
        pageThemes: { circle: "圆形", square: "方形", hidden: "隐藏" },
        arrows: { hidden: "隐藏", always: "一直显示", hover: "悬停" },
        paginationTriggers: { click: "点击", hover: "悬停" },
        effects: { fade: "淡入淡出", scroll: "滚动" },
        params1: [
          { title: "Page 1", color: "#d36eb0" },
          { title: "Page 2", color: "#7276f5" },
          { title: "Page 3", color: "#b6cf4d" },
          { title: "Page 4", color: "#cf5e4d" }
        ]
      };
    }
  };
</script>
```

:::

### Carousel 参数

| 参数              | 说明                                | 类型    | 可选值                                         | 默认值 |
| ----------------- | ----------------------------------- | ------- | ---------------------------------------------- | ------ |
| autoplay          | 是否自动循环                        | Boolean | -                                              | true   |
| speed             | 自动循环等待切换的时间,以毫秒为单位 | Number  | -                                              | 3000   |
| height            | 走马灯的高度设置                    | Number  | -                                              | 300    |
| changeSpeed       | 切换的速度                          | Number  | -                                              | 500    |
| arrow             | 左右切换按钮展示方式                | String  | hidden (隐藏), always (一直显示), hover (悬停) | hover  |
| pageTheme         | 底部指示器的样式                    | String  | circle, hidden, square, custom(自定义)         | circle |
| isHoverStop       | 鼠标悬停走马灯的时候，是否停止滚动  | Boolean | true,false                                     | true   |
| paginationTrigger | 底部指示器的触发方式                | String  | hover, click                                   | click  |
| effect            | 切换模式                            | String  | scroll, fade                                   | scroll |

### Carousel 事件

| 事件   | 说明     | 返回值                |
| ------ | -------- | --------------------- |
| change | 切换轮播 | ( index, DataObject ) |
| click  | 点击事件 | ( index, DataObject ) |

### Carousel 方法

| 事件 | 说明       | 参数   |
| ---- | ---------- | ------ |
| prev | 切换上一张 | prev() |
| next | 切换下一张 | next() |

<script>
export default {
  data() {
    return {
      page: 'Page 1',
       autoplay: true,
        pageTheme: "square",
        arrow: "hover",
        paginationTrigger: "click",
        effect: "scroll",
        pageThemes: { circle: "圆形", square: "方形", hidden: "隐藏" },
        arrows: { hidden: "隐藏", always: "一直显示", hover: "悬停" },
        paginationTriggers: { click: "点击", hover: "悬停" },
        effects: { fade: "淡入淡出", scroll: "滚动" },
        params1: [
          { title: "Page 1", color: "#d36eb0" },
          { title: "Page 2", color: "#7276f5" },
          { title: "Page 3", color: "#b6cf4d" },
          { title: "Page 4", color: "#cf5e4d" }
        ],
      params: [
        {
          title: 'Page 1',
          link: true,
          image: 'https://cdn.pixabay.com/photo/2018/10/20/00/26/ninja-3760010_960_720.jpg'
        },
        {
          title: 'Page 2',
          link: 'http://www.baidu.com',
          image: 'https://cdn.pixabay.com/photo/2018/10/19/05/12/naruto-3757871_960_720.jpg'
        },
        {
          title: 'Page 3',
          image: 'https://cdn.pixabay.com/photo/2018/10/21/13/01/toy-3762868_960_720.jpg'
        },
        {
          title: 'Page 4',
          image: 'https://cdn.pixabay.com/photo/2016/04/29/12/53/girl-1360863_960_720.jpg'
        }
      ]
    };
  },
  methods: {
    change(index, data) {
      this.page = data.title;
    },
    click(index, data) {
      this.$Message(`点击了${data.title}`);
    }
  }
};
</script>
<style lang="less">
.carousel-demo1 .blue-carousel-item {
  background: #ccc;
  .blue-carousel-p {
    color: #fff;
    font-size: 36px;
    padding-top: 120px;
    text-align: center;
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
