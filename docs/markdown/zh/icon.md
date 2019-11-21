[[toc]]

## Icon 图标

---

语义化的矢量图形，`BLUE-UI` 使用阿里巴巴开源的 [iconfont](https://www.iconfont.cn/) 作为图标库，依照 antd 的推荐图标并制作成了 `iconfont`。`iconfont` 使用的是 `22x22` 的尺寸，拥有一致的圆角，一致的笔画宽度，确保整个图标系统保持视觉上的统一性。

## 如何使用

使用 `class="icon"` 来声明图标，具体图标的名称请 `copy` 相应的标签

:::demo

```html
<i class="icon-zoomin"></i> <i class="icon-zoomout"></i>
<i class="icon-check"></i> <i class="icon-close"></i>
```

:::

## 图标示例

### 主要

<icon-list type="core"></icon-list>

### 填充

<icon-list type="filled"></icon-list>

### LOGO

<icon-list type="logos"></icon-list>

<style lang="less" scoped>
.icon {
  font-size: 20px;
  margin-right: 10px;
}
</style>
