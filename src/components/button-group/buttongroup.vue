<template>
  <div :class="buttonGroupCls">
    <slot></slot>
  </div>
</template>
<script>
const prefix = 'blue-btn-group';
const Props = {
  size: new Set(['l', 's', 'xs'])
};
export default {
  name: 'blueButtonGroup',
  props: {
    circle: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator(value) {
        return Props.size.has(value);
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    buttonGroupCls() {
      return {
        [`${prefix}`]: true,
        [`${prefix}-circle`]: !!this.circle,
        [`${prefix}-${this.size}`]: !!this.size
      };
    }
  }
};
</script>
