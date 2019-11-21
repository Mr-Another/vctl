## 原生样式

### 原生样式

框架的样式除了一些基本标准格式，还输出一些基本的 class 调用。

:::demo

```html
<template>
  <div>
    <blockquote>颜色</blockquote>
    <div>
      <div>
        <span class="primary-color">主色系</span>
        <span class="green-color">绿色</span>
        <span class="yellow-color">黄色</span>
        <span class="red-color">红色</span>
        <span class="blue-color">蓝色</span>
      </div>
      <div>
        <span class="dark-color">暗黑</span>
        <span class="gray-color">灰</span>
        <span class="gray1-color">灰1</span>
        <span class="gray2-color">灰2</span>
        <span class="gray3-color">灰3</span>
        <span class="gray4-color">灰4</span>
      </div>
      <div>
        <span class="bg-primary-color white-color">背景主色系</span>
        <span class="bg-green-color white-color">背景绿色</span>
        <span class="bg-yellow-color white-color">背景黄色</span>
        <span class="bg-red-color white-color">背景红色</span>
        <span class="bg-blue-color white-color">背景蓝色</span>
      </div>
      <div>
        <span class="bg-dark-color white-color">背景暗黑</span>
        <span class="bg-gray-color white-color" 背景>灰</span>
        <span class="bg-gray1-color white-color">背景灰1</span>
        <span class="bg-gray2-color">背景灰2</span>
        <span class="bg-gray3-color">背景灰3</span>
        <span class="bg-gray4-color">背景灰4</span>
      </div>
    </div>
    <blockquote>通用调用</blockquote>
    <div>
      <span class="text-hover">可点击文本</span>
      <span class="link">链接式文本</span>
      <span class="float-right">浮动到右侧</span>
    </div>
    <blockquote>垂直居中对齐</blockquote>
    <div v-height="100" class="relative">
      <i class="middle-right" style="right:5px;"><i class="icon-right"></i></i>
      <div class="middle-center">垂直居中对齐</div>
    </div>
    <blockquote>超出内容省略</blockquote>
    <div class="text-ellipsis" v-width="100">超出内容省略超出内容省略</div>
    <blockquote>对齐方式</blockquote>
    <div>
      <div class="text-left">左对齐</div>
      <div class="text-center">居中对齐</div>
      <div class="text-right">右对齐</div>
    </div>
    <blockquote>边框底线</blockquote>
    <div class="bottom-line"></div>
  </div>
</template>
```

:::

### Directive 样式

使用基本的 directive 调用实现简单的样式调整。

:::demo

```html
<template>
  <div>
    <blockquote>颜色</blockquote>
    <div>
      <div>
        <span v-color:primary>主色系</span>
        <span v-color:green>绿色</span>
        <span v-color:yellow>黄色</span>
        <span v-color:red>红色</span>
        <span v-color:blue>蓝色</span>
      </div>
      <div>
        <span v-color:dark>暗黑</span>
        <span v-color:gray>灰</span>
        <span v-color:gray1>灰1</span>
        <span v-color:gray2>灰2</span>
        <span v-color:gray3>灰3</span>
        <span v-color:gray4>灰4</span>
      </div>
      <div>
        <span v-bg-color:primary v-color:white>背景主色系</span>
        <span v-bg-color:green v-color:white>背景绿色</span>
        <span v-bg-color:yellow v-color:white>背景黄色</span>
        <span v-bg-color:red v-color:white>背景红色</span>
        <span v-bg-color:blue v-color:white>背景蓝色</span>
      </div>
      <div>
        <span v-bg-color:dark v-color:white>背景暗黑</span>
        <span v-bg-color:gray v-color:white 背景>灰</span>
        <span v-bg-color:gray1 v-color:white>背景灰1</span>
        <span v-bg-color:gray2>背景灰2</span>
        <span v-bg-color:gray3>背景灰3</span>
        <span v-bg-color:gray4>背景灰4</span>
      </div>
    </div>
    <blockquote>自定义颜色</blockquote>
    <div>
      <span v-bg-color:#ff49e9 v-color:white>背景自定义</span>
      <span v-color="'#ff49e9'">自定义颜色</span>
    </div>
    <blockquote>字体大小</blockquote>
    <div>
      <div v-font="18">18px</div>
      <div v-font="16">16px</div>
      <div v-font="14">14px</div>
      <div v-font="12">12px</div>
    </div>
    <blockquote>高度，宽度, padding, margin</blockquote>
    <div>
      <div v-height="30" v-bg-color:gray2>高度30px</div>
      <div v-width="100" v-bg-color:gray1>宽度100px</div>
      <div v-padding="30" v-bg-color:gray2>padding30px</div>
      <div v-margin="30" v-bg-color:gray2>margin30px</div>
    </div>
  </div>
</template>
```

:::
