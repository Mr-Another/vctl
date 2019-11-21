

<template>
  <div class="wrapper">
    <m-header></m-header>
    <sidebar :data="navs"></sidebar>
    <blue-systab homePage="Home" :left="220"></blue-systab>

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
      navs: navsConfig.zh.guide
    };
  },
  methods: {
    afterLeave() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
