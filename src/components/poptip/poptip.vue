<template>
  <Tooltip ref="tooltip" :theme="theme" :placement="placement" trigger="click">
    <slot></slot>
    <div slot="content" class="blue-poptip">
      <div class="blue-poptip-content">
        <i class="yellow-color icon-warn"></i>
        <i class="blue-split"></i>
        {{content}}
      </div>
      <div class="clearfix">
        <div class="float-right">
          <button
            class="blue-btn blue-btn-text blue-btn-xs"
            @click="close"
          >{{'h.common.cancel' | hlang}}</button>
          <button
            @click="trigger"
            class="blue-btn blue-btn-text blue-btn-xs blue-btn-primary"
          >{{'h.common.confirm' | hlang}}</button>
        </div>
      </div>
    </div>
  </Tooltip>
</template>
<script>
export default {
  name: "bluePoptip",
  props: {
    content: String,
    placement: {
      type: String,
      default: "top"
    },
    theme: {
      type: String,
      default: "white"
    }
  },
  methods: {
    close() {
      this.$refs.tooltip.hide();
    },
    trigger() {
      this.$emit("confirm");
      this.close();
    }
  }
};
</script>
