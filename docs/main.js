import Vue from "vue";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import App from "./App";
import router from "./router";

import docConfig from "./config/doc-config";

import demoBlock from "./components/demo-block";
import IconList from "./components/iconlist";

import BlueUI from "blue-ui-lib";
import en from "../src/locale/lang/en-US";
import zh from "../src/locale/lang/zh-CN";

import "blue-ui-style";
require("./assets/style/index.less");

let lang = window.location.pathname.indexOf("/en") == -1 ? "zh" : "en";

Vue.use(VueI18n);
const messages = {
  en: Object.assign({ message: "hello" }, en),
  zh: Object.assign({ message: "你好" }, zh)
};
const i18n = new VueI18n({
  locale: lang, // set locale
  fallbackLocale: "zh",
  messages // set locale messages
});
docConfig();

router.beforeEach((to, from, next) => {
  if (from.name == to.name) next();
  BlueUI.$LoadingBar.start();
  if (to.meta.title && to.name != "Home") {
    document.title = `BlueUI - ${to.meta.title}`;
  } else {
    document.title = "BlueUI";
  }
  next();
});
router.afterEach(() => {
  BlueUI.$LoadingBar.success();
  Vue.nextTick(() => {
    let rightdiv = document.querySelector(".blue-markdown");
    if (rightdiv) rightdiv.scrollTo(0, 0);
  });
});

Vue.use(VueRouter);
Vue.use(BlueUI, { i18n });

Vue.component("demo-block", demoBlock);
Vue.component("icon-list", IconList);

new Vue({
  i18n,
  router,
  el: "#app",
  render: h => h(App)
});

export default app;
