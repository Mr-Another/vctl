<template>
  <div class="page-header" :class="[
      collapse ? 'collapse' : ''
    ]">
    <div v-if="lang === 'en'" class="nav-container">
      <ul class="navbar left">
        <li>
          <router-link :to="{ name: 'Guide' }">Guide</router-link>
        </li>
      </ul>
      <ul class="navbar right">
        <li>
          <router-link :to="{ name: 'Guide' }">Guide</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Docs-en' }">Component</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Resource-en' }">Resource</router-link>
        </li>
        <li>
          <div class="btn-language" @click="switchLang('zh')">中文</div>
        </li>
      </ul>
    </div>
    <div v-else class="nav-container">
      <ul class="navbar left">
        <li>
          <router-link :to="{ name: 'Guide' }">
            <i class="icon icon-outdent"></i>
          </router-link>
        </li>
      </ul>
      <ul class="navbar right">
        <li>
          <router-link :to="{ name: 'Guide' }">指南</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Docs' }">组件</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Resource' }">资源</router-link>
        </li>
        <li>
          <div class="btn-language" @click="switchLang('en')">EN</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    lang() {
      return this.$route.path.split("/")[1] || "zh";
    }
  },
  mounted() {
    if (!this.collapse) {
      window.addEventListener("scroll", this.headerCollapse);
    } else {
      window.removeEventListener("scroll", this.headerCollapse);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.headerCollapse);
  },
  methods: {
    toggleMenu() {
      const header = document.getElementById("J-page-header");

      if (this.isOpen) {
        this.isOpen = false;
        header.classList.remove("open");
      } else {
        this.isOpen = true;
        header.classList.add("open");
      }
    },
    headerCollapse() {
      const header = document.getElementById("J-page-header");
      const offsetTop = window.scrollY || 0;

      if (offsetTop > 50) {
        header.classList.add("collapse");
      } else {
        header.classList.remove("collapse");
      }
    },
    switchLang(targetLang) {
      if (this.lang === targetLang) return;

      this.$i18n.locale = targetLang;
      localStorage.setItem("blue-ui-language", targetLang);

      if (this.$route.name === "Home") {
        this.$router.push({ name: "Home-en" });
      } else {
        this.$router.push(this.$route.path.replace(this.lang, targetLang));
      }
    }
  }
};
</script>