<template>
  <div class="wrapper">
    <m-header></m-header>

    <sidebar :data="navs"></sidebar>
    <div class="blue-markdown">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <transition name="fade" mode="out-in" @after-leave="afterLeave">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
  </div>
</template>



<script>
import MHeader from "../components/header";
import MFooter from "../components/footer";
import Sidebar from "../components/sidebar";
import navsConfig from "../router/nav.config.yml";
import "blue-ui-style";

export default {
  components: {
    Sidebar,
    MHeader,
    MFooter
  },
  data() {
    return {
      navs: navsConfig.zh.components
    };
  },
  methods: {
    afterLeave() {
      window.scrollTo(0, 0);
    }
  }
};
</script>


<style lang="less" >
@import "../assets/style/index.less";
.sys-tab-vue {
  top: 50px;
  width: 100%;
  padding-left: 220px;
}
.table {
  width: 100%;
}
</style>
