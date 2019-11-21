<template>
  <div class="blue-skeleton">
    <div class="blue-skeleton-content" v-if="loading" :class="{'blue-skeleton-active' : active}">
      <h3 class="blue-skeleton-title" :style="{'width': titleWidth}"></h3>
      <ul class="blue-skeleton-paragraph">
        <li v-for="(item, index) in rows" :key="index"></li>
      </ul>
    </div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
<script>
export default {
  name: "blueSkeleton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: Boolean,
      default: true
    },
    paragraph: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: "38%"
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  },
  computed: {}
};
</script>
