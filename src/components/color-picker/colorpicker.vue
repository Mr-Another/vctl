<template>
  <div class='blue-colorpicker">
    <div class='blue-colorpicker-show">
      <div class='blue-colorpicker-color-bg"></div>
      <div class='blue-colorpicker-color-show"></div>
      <i class="icon-down"></i>
    </div>
    <div class='blue-colorpicker-group">
      1
    </div>
  </div>
</template>
<script>
import Dropdown from '@/src/plugins/dropdown';

export default {
  name: 'blueColorPicker',
  props: {
    value: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dropdown: null
    };
  },
  watch: {
    disabled() {
      if (this.dropdown) {
        if (this.disabled) {
          this.dropdown.disabled();
        } else {
          this.dropdown.enabled();
        }
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let el = this.el = this.$el.querySelector('.blue-colorpicker-show');
        let content = this.content = this.$el.querySelector('.blue-colorpicker-group');
        let that = this;
        this.dropdown = new Dropdown(el, {
          content,
          disabled: this.disabled,
          trigger: 'click',
          events: {
            show() {
              that.isShow = true;
            }
          }
        });
      });
    }
  },
  computed: {

  }
};
</script>
