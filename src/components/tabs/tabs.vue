<template>
  <div :class="tabsCls">
    <div
      v-for="(a, index) of arr"
      @click="trigger(a, index)"
      :key="a[key]"
      :class="{'blue-tabs-selected':a[key] == value, 'blue-tabs-item-selected':a[key] == value}"
      class="blue-tabs-item"
    >
      <span v-if="!$scopedSlots.item">{{a[title]}}</span>
      <slot v-else :tab="a" name="item"></slot>
    </div>
  </div>
</template>
<script>
import config from "@/src/utils/config";

const prefix = "blue-tabs";

export default {
  name: "blueTabs",
  props: {
    dict: String,
    datas: [Object, Array],
    value: [String, Number, Symbol],
    className: {
      type: String,
      default: "blue-tabs-default"
    },
    keyName: {
      type: String,
      default: () => config.getOption("dict", "keyName")
    },
    titleName: {
      type: String,
      default: () => config.getOption("dict", "titleName")
    }
  },
  data() {
    return {
      key: this.keyName,
      title: this.titleName
    };
  },
  methods: {
    trigger(data, index) {
      if (this.value != data[this.key]) {
        this.$emit("input", data[this.key]);
        this.$emit("change", data, index);
      }
      this.$emit("click", data, index);
    }
  },
  computed: {
    tabsCls() {
      return {
        [`${prefix}`]: true,
        [this.className]: !!this.className
      };
    },
    arr() {
      if (!this.datas && !this.dict) {
        console.error(
          "[BlueUI Error] Tabs Component: Datas or dict parameters need to be defined at least."
        );
        return [];
      }
      let datas = this.datas;
      if (this.dict) {
        datas = config.getDict(this.dict);
      }
      return config.initOptions(datas, this);
    }
  }
};
</script>
