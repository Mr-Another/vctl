[[toc]]

## ImagePreview 图片预览

\$ImagePreview 方法：还没完成

> 非 template/render 模式下，请使用 blue-imagepreview。

### 基本调用

:::demo

```html
<template>
  <div>
    <blue-button @click="openPreview(0)">打开图片预览</blue-button>
    <p>
      <blue-imagepreview :datas="datas" @click="openPreview" />
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      const link = "https://cdn.pixabay.com/photo/2015/06/01/00/20/";
      return {
        datas: [
          {
            thumbUrl: `${link}thumb-4.jpg`,
            url: `${link}man-792821_960_720.jpg`
          },
          {
            thumbUrl: `${link}man-792821_960_720.jpg`,
            url: `${link}man-792821_960_720.jpg`
          },
          {
            thumbUrl: `${link}man-792821_960_720.jpg`,
            url: `${link}man-792821_960_720.jpg`
          }
        ]
      };
    },
    methods: {
      openPreview(index = 0, data) {
        console.log(2121);
        this.$ImagePreview(this.datas, index);
      }
    }
  };
</script>
```

:::

### 定制默认大小

:::demo

```html
<template>
  <div>
    <p><blue-imagepreview :datas="datas" @click="openPreview" /></p>
    <p>
      <blue-imagepreview
        :width="70"
        :border-radius="4"
        :datas="datas"
        @click="openPreview"
      />
    </p>
    <p>
      <blue-imagepreview
        :width="80"
        :border-radius="5"
        :distance="15"
        :datas="datas"
        @click="openPreview"
      />
    </p>
  </div>
</template>
<script>
  export default {
    data() {
      const link = "https://cdn.pixabay.com/photo/";
      return {
        datas: [
          {
            thumbUrl: `${link}2018/10/20/00/26/ninja-3760010_960_720.jpg`,
            url: `${link}2018/10/20/00/26/ninja-3760010_960_720.jpg`
          },
          {
            thumbUrl: `${link}2018/10/19/05/12/naruto-3757871_960_720.jpg`,
            url: `${link}2018/10/19/05/12/naruto-3757871_960_720.jpg`
          },
          {
            thumbUrl: `${link}2018/10/21/13/01/toy-3762868_960_720.jpg`,
            url: `${link}2018/10/21/13/01/toy-3762868_960_720.jpg`
          },
          {
            thumbUrl: `${link}/2016/04/29/12/53/girl-1360863__340.jpg`,
            url: `${link}/2016/04/29/12/53/girl-1360863__340.jpg`
          }
        ]
      };
    },
    methods: {
      openPreview(index = 0, data) {
        this.$ImagePreview(this.datas, index);
      }
    }
  };
</script>
```

:::

### \$ImagePreview 方法

| 方法           | 说明                                         |
| -------------- | -------------------------------------------- |
| \$ImagePreview | this.\$ImagePreview(urlList:[{url}], index); |

### ImagePreview 参数

| 参数         | 说明           | 类型                     | 可选值 | 默认值 |
| ------------ | -------------- | ------------------------ | ------ | ------ |
| datas        | 图片展示列表   | Array, [{thumbUrl, url}] | -      | -      |
| width        | 图像大小       | Number                   | -      | 60     |
| distance     | 图片的间距     | Number                   | -      | 10     |
| borderRadius | 图片圆边的大小 | Number                   | 3      |        |

### ImagePreview 事件

| 事件  | 描述         | 返回值        |
| ----- | ------------ | ------------- |
| click | 图片点击事件 | (index, data) |

https://cdn.pixabay.com/photo/

<script>
export default {
  data() {
      const link = "https://cdn.pixabay.com/photo/";
      return {
        datas: [
          {
            thumbUrl: `${link}2018/10/20/00/26/ninja-3760010_960_720.jpg`,
            url: `${link}2018/10/20/00/26/ninja-3760010_960_720.jpg`
          },
          {
            thumbUrl: `${link}2018/10/19/05/12/naruto-3757871_960_720.jpg`,
            url: `${link}2018/10/19/05/12/naruto-3757871_960_720.jpg`
          },
          {
            thumbUrl: `${link}2018/10/21/13/01/toy-3762868_960_720.jpg`,
            url: `${link}2018/10/21/13/01/toy-3762868_960_720.jpg`
          }, 
          {
            thumbUrl: `${link}2016/04/29/12/53/girl-1360863_960_720.jpg`,
            url: `${link}2016/04/29/12/53/girl-1360863_960_720.jpg`
          }, 
          {
            thumbUrl: `${link}2015/06/24/16/54/lighthouse-820431_960_720.jpg`,
            url: `${link}2015/06/24/16/54/lighthouse-820431_960_720.jpg`
          }
        ]
      };
    },
  methods: {
    openPreview(index = 0, data) {
      this.$ImagePreview(this.datas, index);
    }
  }
};
</script>
