<template>
  <DropdownCustom
    :button="button"
    ref="dropdown"
    @show="showEvent"
    :delay="delay"
    @hide="hideEvent"
    :class="dropdownmenuCls"
    :trigger="trigger"
    :equalWidth="equalWidth"
    :toggleIcon="toggleIcon"
    :placement="placement"
    :disabled="disabled"
    :className="className"
    :offset="offset"
    showClass="blue-dropdownmenu-show"
  >
    <slot></slot>
    <ul slot="content" :class="groupCls" :style="groupStyle">
      <li
        class="blue-dropdownmenu-item"
        :class="{'blue-dropdownmenu-item-divider':!!option.divider,'disabled': !!option.divider || option.disabled}"
        v-for="option of options"
        @click="onclick($event, option)"
        :key="option[key]"
      >
        <div v-if="option[html]" v-html="option[html]"></div>
        <template v-else>
          <i v-if="option.icon" :class="option.icon"></i>
          <span>{{option[title]}}</span>
        </template>
        <Badge
          v-if="showCount&&option.count"
          :count="option.count"
          :max-count="maxCount"
          position="right"
        ></Badge>
      </li>
    </ul>
  </DropdownCustom>
</template>
<script>
import config from "@/src/utils/config";
import DropdownCustom from "@/src/components/dropdown-custom";
import Badge from "@/src/components/badge";

const prefix = "blue-dropdownmenu";

export default {
  name: "blueDropdownMenu",
  props: {
    dict: String,
    datas: [Array, Object],
    trigger: {
      type: String, // click,hover,contextMenu`
      default: "click"
    },
    equalWidth: {
      type: Boolean,
      default: false
    },
    width: Number,
    toggleIcon: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: "bottom-start"
    },
    showCount: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxCount: {
      type: Number,
      default: 99
    },
    delay: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: "blue-dropdownmenu-default"
    },
    keyName: {
      type: String,
      default: () => config.getOption("dict", "keyName")
    },
    titleName: {
      type: String,
      default: () => config.getOption("dict", "titleName")
    },
    offset: [String, Number],
    button: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      key: this.keyName,
      title: this.titleName,
      html: "dropdownmenuHtml",
      isShow: false,
      el: null
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    onclick(event, option) {
      if (option.disabled) return;
      this.$emit("onclick", option[this.key], option, event);
      this.$emit("click", option[this.key], option, event);
      this.$refs.dropdown.hide();
    },
    showEvent(event) {
      this.$emit("show", event);
    },
    hideEvent(event) {
      this.$emit("hide", event);
    }
  },
  computed: {
    dropdownmenuCls() {
      return {
        [`${prefix}`]: true
      };
    },
    groupStyle() {
      let styles = {};
      if (this.width) {
        styles.width = `${this.width}px`;
      }
      return styles;
    },
    showCls() {
      return {
        [`${prefix}-show`]: true,
        [`${prefix}-disabled`]: !!this.disabled,
        [this.className]: true
      };
    },
    groupCls() {
      return {
        [`${this.className}-dropdown`]: !!this.className,
        "blue-dropdownmenu-group": true
      };
    },
    options() {
      if (!this.datas && !this.dict) {
        console.error(
          "[BlueUI Error] Dropdownmenu Component: Datas or dict parameters need to be defined at least."
        );
        return [];
      }
      let datas = this.datas;
      if (this.dict) {
        datas = config.getDict(this.dict);
      }
      datas = config.initOptions(datas, this);
      return datas;
    }
  },
  components: {
    Badge,
    DropdownCustom
  }
};
</script>
