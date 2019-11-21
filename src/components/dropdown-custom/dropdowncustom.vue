<template>
  <div :class="dropdowncustomCls">
    <div :class="showCls">
      <div
        class="blue-dropdowncustom-show-content"
        :class="{'blue-dropdowncustom-show-empty': !$slots.default}"
      >
        <slot></slot>
      </div>
      <i class="icon-down" v-if="toggleIcon"></i>
    </div>
    <div :class="groupCls">
      <slot name="content" v-if="isShow"></slot>
    </div>
  </div>
</template>
<script>
import Dropdown from "@/src/plugins/dropdown";

const prefix = "blue-dropdowncustom";

export default {
  name: "blueDropdownCustom",
  props: {
    trigger: {
      type: String, // click,hover
      default: "click"
    },
    equalWidth: {
      type: Boolean,
      default: false
    },
    toggleIcon: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String
    },
    delay: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: "blue-dropdownmenu-default"
    },
    offset: [String, Number],
    showClass: String,
    button: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      dropdown: null,
      el: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      let el = (this.el = this.$el.querySelector(".blue-dropdowncustom-show"));
      let content = this.$el.querySelector(".blue-dropdowncustom-group");
      let that = this;
      this.dropdown = new Dropdown(el, {
        content,
        className: `${this.className}-dropdown-container`,
        offset: this.offset,
        trigger: this.trigger,
        equalWidth: this.equalWidth,
        placement: this.placement,
        disabled: this.disabled,
        delay: this.delay,
        events: {
          show(event) {
            that.isShow = true;
            that.$emit("show", event);
          },
          hide: () => {
            that.$emit("hide");
          }
        }
      });
    });
  },
  watch: {
    disabled() {
      if (this.disabled) {
        this.dropdown.disabled();
      } else {
        this.dropdown.enabled();
      }
    }
  },
  beforeDestroy() {
    let el = this.el;
    if (el) {
      el.style.display = "none";
      this.$el.appendChild(el);
    }
    if (this.dropdown) {
      this.dropdown.destory();
    }
  },
  computed: {
    dropdowncustomCls() {
      return {
        [`${prefix}`]: true,
        "blue-btn": this.button
      };
    },
    showCls() {
      return {
        [`${prefix}-show`]: true,
        [`${prefix}-disabled`]: !!this.disabled,
        [`${prefix}-show-toggle`]: !!this.toggleIcon,
        [this.className]: !!this.className,
        [this.showClass]: !!this.showClass
      };
    },
    groupCls() {
      return {
        [`${prefix}-group`]: true
      };
    }
  },
  methods: {
    update() {
      this.dropdown.update();
    },
    hide() {
      this.dropdown.hide();
    },
    show() {
      this.dropdown.show();
    }
  }
};
</script>
