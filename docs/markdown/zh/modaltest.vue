<template>
  <div>
    <!-- blue-modal-header 将自带modal头部样式 -->
    <header class="blue-modal-header">测试</header>
    <div style="padding:15px">
      <Select dict="simple" v-model="value"></Select>
      <p>传递的参数：{{params.subparam}}, {{fruit}}</p>
      <p>vuex传递的值：</p>
    </div>
    <!-- blue-modal-footer 将自带modal底部样式 -->
    <HFooter class="blue-modal-footer">
      <blue-button class="blue-btn blue-btn-primary" @click="success">确定</blue-button>
      <blue-button class="blue-btn blue-btn-blue" @click="go">跳转</blue-button>
      <blue-button class="blue-btn" @click="close">关闭</blue-button>
    </HFooter>
  </div>
</template>

<script>
// import store from "js/store";
// import { mapGetters } from "vuex";

export default {
  props: {
    params: Object,
    fruit: String
  },
  data() {
    return {
      value: this.fruit
    };
  },
  store: {},
  computed: {
    // ...mapGetters({
    //   test: "getTest"
    // })
  },
  methods: {
    success() {
      // 向外层触发事件, 1.17.0 之前
      // this.$emit('event', 'update', this.value);

      // 直接使用emit触发外部的events监听，兼容性 1.18.0+
      this.$emit("success", this.value);
      this.close();
    },
    go() {
      // 注意：如果使用HeyUI.$Modal的方式调用，将无法使用$router等vue依赖组件。
      this.$router.push({ name: "Home" });
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>