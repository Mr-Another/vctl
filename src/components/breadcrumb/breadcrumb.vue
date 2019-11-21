<template>
  <div class="blue-breadcrumb">
    <span v-for="(data, index) of datas" :key="data.title" class="blue-breadcrumb-item">
      <span class="blue-breadcrumb-item-separator" v-if="index > 0">{{separator}}</span>
      <span
        class="blue-breadcrumb-item-title"
        @click="trigger(data, index)"
        :class="{'blue-breadcrumb-item-link': data.route, 'blue-breadcrumb-item-current': index==datas.length - 1}"
      >
        <i :class="data.icon" v-if="data.icon" class="h-breadcrumb-item-icon"></i>
        <span class="h-breadcrumb-item-word">{{data.title}}</span>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  name: "blueBreadcrumb",
  props: {
    datas: {
      Array,
      default: () => ({})
    },
    separator: {
      type: String,
      default: "/"
    },
    selfControl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    trigger(data) {
      if (!this.selfControl && data.route && this.$router) {
        this.$router.push(data.route);
      }
      this.$emit("click", data);
    }
  }
};
</script>
