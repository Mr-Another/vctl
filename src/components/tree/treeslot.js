const getParent = function(vm) {
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
    console.log(this.data)
    // if (parent.$scopedSlots && parent.$scopedSlots.item) {
    //   return h(
    //     "div",
    //     {
    //       class: "blue-tree-item-slot"
    //     },
    //     [
    //       parent.$scopedSlots.item({
    //         item: tblueis.data
    //       })
    //     ]
    //   );
    // }
    return (
      parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {}) : console.log(2)
    )
  }
};
