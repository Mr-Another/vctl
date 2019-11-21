<template>
  <li class="blue-cascader-li" :class="{'blue-cascader-li-opened':data.status.opened}">
    <div
      class="blue-cascader-show"
      @click="clickShow"
      :class="{'blue-cascader-show-disabled':data.status.disabled, 'blue-cascader-show-choose': data.status.choose, 'blue-cascader-show-selected': status.selected == data.key}"
      v-show="!data.status.hide"
    >
      <div
        class="blue-cascader-show-desc"
        :class="{'selected': status.selected == data.key}"
        @click="select"
      >
        <span class="blue-cascader-show-icon" :class="data.icon" v-if="data.icon"></span>
        <span v-if="data.title != null">{{data.title}}</span>
        <span v-else>{{'h.common.empty' | hlang}}</span>
      </div>
      <span class="blue-cascader-show-expand">
        <span @click.stop="toggleCascader()" v-if="data.status.isWait">
          <template v-if="!data.status.loading">
            <i class="icon-right"></i>
          </template>
          <template v-else>
            <i class="icon-loading"></i>
          </template>
        </span>
        <span @click.stop="toggleCascader()" v-else-if="data.children&&data.children.length>0">
          <i class="icon-right"></i>
        </span>
      </span>
    </div>
    <template v-if="data.children&&data.children.length>0">
      <transition name="blue-cascader-transition" v-if="data.status.opened">
        <ul class="blue-cascader-ul">
          <hCascaderItem
            v-for="child of data.children"
            :key="child.key"
            :data="child"
            :param="param"
            :multiple="multiple"
            @trigger="trigger"
            :status="status"
            :level="level+1"
          ></hCascaderItem>
        </ul>
      </transition>
    </template>
  </li>
</template>
<script>
export default {
  name: "blueCascaderItem",
  props: {
    data: Object,
    param: Object,
    multiple: Boolean,
    status: Object,
    level: Number
  },
  data() {
    return {};
  },
  methods: {
    clickShow() {
      if (this.selectOnClick) {
        this.select();
      }
    },
    select() {
      if (this.toggleOnSelect || this.multiple) {
        this.toggleCascader();
      }
      if (this.data.status.disabled) return;
      this.$emit("trigger", { type: "selectEvent", data: this.data });
      if (this.multiple && this.data.children.length == 0) {
        this.data.status.choose = !this.data.status.choose;
        this.choose();
      }
    },
    choose() {
      this.data.status.indeterminate = false;
      this.$emit("trigger", { type: "chooseEvent", data: this.data });
    },
    trigger(data) {
      if (data.type == "chooseEvent") {
        if (this.chooseMode != "independent") {
          if (this.data.children) {
            let chooseStatus = true;
            let indeterminateStatus = false;
            for (let child of this.data.children) {
              if (!child.status.choose && chooseStatus) {
                chooseStatus = false;
              }
              if (child.status.choose) {
                indeterminateStatus = true;
              }
            }
            if (this.chooseMode == "all") {
              this.data.status.choose = chooseStatus;
              this.data.status.indeterminate =
                indeterminateStatus && !chooseStatus;
            } else if (this.chooseMode == "some") {
              this.data.status.choose = indeterminateStatus;
              this.data.status.indeterminate = false;
            }
          }
        }
      }
      this.$emit("trigger", data);
    },
    toggleCascader() {
      if (this.data.status.isWait) {
        this.loadData();
      } else {
        this.$emit("trigger", { type: "toggleCascaderEvent", data: this.data });
      }
    },
    loadData() {
      this.$emit("trigger", { type: "loadDataEvent", data: this.data });
    }
  }
};
</script>