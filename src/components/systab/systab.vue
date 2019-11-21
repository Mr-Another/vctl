<template>
  <div class="blue-systab" :style="`left:${left}px; top:${top}px`">
    <div class="blue-systab-container unselect" ref="scrollOuter">
      <ul class="blue-systab-body">
        <li
          v-for="(item, index) of tagList"
          :key="`sys-tab-${index}`"
          @click="handleClick(item)"
          class="tab-item"
          :class="{'tab-item-chosen': isCurrentTab(item)}"
        >
          <span>{{item.meta.title}}</span>
          <i
            class="icon-close tab-close"
            @click.stop="handleClose(item)"
            v-if="homePage!=item.name"
          ></i>
          <!-- <span
            class="tab-item-close h-icon-close"
            @click.stop="handleClose(item)"
            v-if="homePage!=item.name"
          ></span>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { showTitle, routeEqual, isExsit } from "./utils";
export default {
  name: "blueSysTab",
  props: {
    value: Object,
    homePage: String,
    left: {
      type: Number,
      default: 220
    },
    top: {
      type: Number,
      default: 50
    }
  },
  data() {
    return { tagList: [] };
  },
  computed: {
    currentRouteObj() {
      const { name, params, query } = this.$route;
      return { name, params, query };
    }
  },
  methods: {
    init() {
      //this.n = Utils.getLocal2Json("SYS_TABS") || [];
      this.addTab(this.$route);
    },
    beforeClose() {
      return this.$Confirm("确定要关闭这一页吗");
    },
    handleClose(current) {
      console.log(current);
      if (
        current.meta &&
        current.meta.beforeCloseName &&
        current.meta.beforeCloseName in beforeClose
      ) {
        new Promise(this.beforeClose[current.meta.beforeCloseName]).then(
          close => {
            if (close) {
              this.close(current);
            }
          }
        );
      } else {
        this.close(current);
      }
    },
    close(route) {
      let index = this.tagList.indexOf(route);
      this.tagList.splice(index, 1);
      let newroute = null;
      if (this.isCurrentTab(route)) {
        if (this.tagList.length > index) {
          newroute = this.tagList[index];
        } else if (this.tagList.length > 0) {
          newroute = this.tagList[index - 1];
        } else {
          this.$router.replace({ patch: "/zh/docs" });
        }
        if (newroute) this.$router.replace(newroute);
      }
      this.saveLocal();
    },
    handleClick(item) {
      this.$router.push(item);
    },
    showTitleInside(item) {
      return showTitle(item, this);
    },
    isCurrentTab(item) {
      return routeEqual(this.currentRouteObj, item);
    },
    addTab(route) {
      if (!route.name) return;

      const { name, query, params, meta } = route;
      // if (meta.notab) return;
      let routeObj = { name, query, params, meta: meta || {} };
      if (!isExsit(routeObj, this.tagList)) {
        this.tagList.push(routeObj);
        this.saveLocal();
      }
    },
    saveLocal() {
      //Utils.saveLocal("SYS_TABS", this.tagList);
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to) {
      this.addTab(to);
    }
  }
};
</script>
