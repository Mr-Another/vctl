<template>
  <div class="blue-sidebar">
    <div class="blue-sidebar-scroll">
      <div class="blue-logo">
        <router-link to="/">
          <i style="font-size:32px;vertical-align:middle;" class="icon icon-blued"></i>
          <span style="vertical-align:middle;font-size:16px;font-weight:bold;">Blue UIKit</span>
        </router-link>
      </div>
      <nav class="blue-nav unselect">
        <template v-for="item in data">
          <h2 class="blue-nav__title">{{ item.title }}</h2>
          <ul class="blue-nav__items">
            <template v-if="item.items">
              <li class="blue-nav__item" v-for="navItem in item.items" :key="navItem.name">
                <router-link
                  class="blue-nav__page"
                  :to="navItem.name.toLowerCase()"
                >{{ navItem.title }}</router-link>
              </li>
            </template>
            <li class="blue-nav__item active" v-for="group in item.groups" :key="group.title">
              <a class="blue-nav__group" @click="toggleMenu">
                {{ group.title }}
                <i class="icon icon-down"></i>
              </a>
              <ul class="blue-nav__child-items">
                <li class="blue-nav__child-item" v-for="navItem in group.items" :key="navItem.name">
                  <router-link
                    v-if="lang === 'zh'"
                    class="blue-nav__component"
                    :to="navItem.name.toLowerCase()"
                  >
                    {{ navItem.name }}
                    <span>{{ navItem.title }}</span>
                  </router-link>
                  <router-link
                    v-else
                    class="blue-nav__component"
                    :to="navItem.name.toLowerCase()"
                  >{{ navItem.title }}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </template>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    lang() {
      return "zh";
      // return this.$route.path.split("/")[1] || "zh";
    }
  },
  methods: {
    toggleMenu(event) {
      const parentNode = event.target.parentNode;
      if (parentNode.classList.contains("active")) {
        parentNode.classList.remove("active");
      } else {
        parentNode.classList.add("active");
      }
    }
  }
};
</script>

