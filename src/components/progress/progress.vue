<template>
  <div class="blue-progress">
    <div class="blue-progress-title" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div class="blue-progress-inner"
         :style="progressInnerStyle">
      <div class="blue-progress-bg"
         :style="progressBgStyle"
         :class="progressBgClass"></div>
    </div>
    <div class="blue-progress-text" v-if="$slots.text">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
const colors = ['red', 'blue', 'primary', 'gray', 'yellow', 'green'];

export default {
  name: 'blueProgress',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    percent: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {};
  },
  computed: {
    progressInnerStyle() {
      let s = {};
      s.height = `${this.strokeWidth}px`;
      return s;
    },
    progressBgStyle() {
      let s = {};
      if (!colors.includes(this.color)) {
        s['background-color'] = this.color;
      }
      s.width = `${this.percent}%`;
      s.height = `${this.strokeWidth}px`;
      return s;
    },
    progressBgClass() {
      let s = {};
      if (colors.includes(this.color)) {
        s[`bg-${this.color}-color`] = true;
      }
      return s;
    }
  }
};
</script>
