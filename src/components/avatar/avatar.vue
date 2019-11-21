<template>
  <div class="blue-avatar" :class="avatarClass">
    <div
      :style="avatarImageStyle"
      @click="click"
      :class="avatarImageClass"
      class="blue-avatar-image-container"
    >
      <div class="blue-avatar-image" :style="imageStyle"></div>
    </div>
    <div class="blue-avatar-info" :style="infoStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import config from "@/src/utils/config";

export default {
  name: "blueAvatar",
  props: {
    shape: {
      type: String,
      default: "circle" // square
    },
    src: String,
    width: {
      type: Number,
      default: 50
    },
    distance: {
      type: Number,
      default: 15
    },
    imageTop: Number,
    type: String
  },
  methods: {
    click(event) {
      this.$emit("click", event);
    }
  },
  computed: {
    imageStyle() {
      if (this.src) {
        return {
          "background-image": `url(${config
            .getOption("avatar")
            .handleSrc.call(this, this.src)})`
        };
      }
      return {};
    },
    avatarClass() {
      return {
        [`h-avatar-type-${this.type}`]: !!this.type,
        [`h-avatar-shape-${this.shape}`]: !!this.shape
      };
    },
    avatarImageClass() {
      if (!this.imageTop) {
        return {
          "blue-avatar-middle": true
        };
      }
      return {};
    },
    avatarImageStyle() {
      let s = {
        width: `${this.width}px`,
        height: `${this.width}px`
      };
      if (this.imageTop) {
        s.top = `${this.imageTop}px`;
      }
      return s;
    },
    infoStyle() {
      return {
        "padding-left": `${this.width + this.distance}px`,
        "min-height": `${this.width}px`
      };
    }
  }
};
</script>
