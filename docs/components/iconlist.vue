<template>
  <blue-row :space="10">
    <div
      v-for="name in icons"
      class="blue-col blue-col-xs-12 blue-col-sm-12 blue-col-md-6 blue-col-lg-4 blue-col-xl-3 blue-col-4"
      @click="copy(name)"
    >
      <div class>
        <p>
          <i class="icon" :class="name"></i>
        </p>
        <p>{{name}}</p>
      </div>
    </div>
  </blue-row>
</template>

<script>
import IconData from "../icons.json";

export default {
  props: {
    type: {
      type: String,
      default: "core"
    }
  },
  data() {
    return {
      showCopy: false,
      icons: IconData[this.type]
    };
  },
  methods: {
    copy(name) {
      this.$Clipboard({
        text: name,
        showSuccessTip: `拷贝图标 [${name}] 成功`
      });
    }
  }
};
</script>


<style lang="less" scoped>
.blue-row {
  > div {
    padding: 7px 8px 8px 7px;
    > div {
      border-radius: 3px;
      padding: 20px 5px;
      text-align: center;
      border: 1px solid #eee;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        background-color: @bg-color-light;
        transform: scale(1.05);
      }
      [class^="icon-"],
      [class*=" icon-"] {
        font-size: 22px;
      }
      p {
        margin: 10px 0px;
      }
    }
  }
}
@bg-color-light: #ecf5fd;

.icon-list-item {
  position: relative;
  height: 100px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  i {
    font-size: 26px;
  }
  p {
    margin-top: 5px;
    font-size: 12px;
  }
}
</style>