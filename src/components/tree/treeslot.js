const getParent = function (vm) {
  let parent = vm.$parent;
  let filterTag = new Set(["Tree", "tree", "blueTree", "blue-tree"]);
  while (
    parent != null &&
    !filterTag.has(parent.$options._componentTag || parent.$options.name)
  ) {
    parent = parent.$parent;
  }

  if (!parent) {
    console.error(
      "[BlueUI Error] Tree Component: Please put TreeItem component in the Tree Component"
    );
  }
  return parent;
};

export default {
  name: "blueTreeSlot",
  props: {
    data: Object
  },
  render(h) {
    let parent = getParent(this);
    // if (parent.$scopedSlots && parent.$scopedSlots.item) {
    //   return h(
    //     "div",
    //     {
    //       class: "blue-tree-item-slot"
    //     },
    //     [
    //       parent.$scopedSlots.item({
    //         item: this.data
    //       })
    //     ]
    //   );
    // }
    const data = this.data;
    const key = data.id;
    return (
      parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, { key, data }) : null
    )
  }
};
