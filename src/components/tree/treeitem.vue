<template>
  <li class="blue-tree-li" :class="{'blue-tree-li-opened':data.status.opened}">
    <div
      class="blue-tree-show"
      @click="select"
      :class="{'blue-tree-show-disabled':data.status.disabled, 'blue-tree-show-choose': data.status.choose, 'blue-tree-show-indeterminate': data.status.indeterminate, 'blue-tree-show-selected': status.selected == data.key, 'selected': status.selected == data.key}"
      v-show="!data.status.hide"
    >
      <span v-for="l in level" :key="l" class="blue-tree-show-space"></span>
      <span class="blue-tree-show-expand">
        <span @click.stop="toggleTree()" v-if="data.status.isWait">
          <template v-if="!data.status.loading">
            <i class="blue-icon-right icon-right"></i>
          </template>
          <template v-else>
            <i class="blue-icon-loading icon-loading"></i>
          </template>
        </span>
        <span @click.stop="toggleTree()" v-else-if="data.children&&data.children.length>0">
          <i class="blue-icon-right icon-right"></i>
        </span>
      </span>
      <Checkbox
        :disabled="data.status.disabled"
        v-if="multiple&&data.status.checkable"
        v-model="data.status.choose"
        :indeterminate="data.status.indeterminate"
        @input="choose(data)"
      ></Checkbox>
      <div class="blue-tree-show-desc" @click="clickShow">
        <span class="blue-tree-show-icon" :class="data.icon" v-if="data.icon"></span>
        <span v-if="data.title != null">{{data.title}}</span>
        <span v-else>{{'h.common.empty' | hlang}}</span>
        <TreeSlot :data="data.value"></TreeSlot>
      </div>
      <div class="blue-tree-show-menu" :class="{'blue-tree-show-menu-undisable' : status.selected == data.key}" v-if="operation" >
        <span @click="appendTreeItem(data)" class="blue-tree-show-menu-btn icon-plus-circle"></span>
        <span @click="updateTreeItem(data)" class="blue-tree-show-menu-btn icon-edit"></span>
        <span @click="removeTreeItem(data)" class="blue-tree-show-menu-btn icon-delete-fill"></span>
      </div>
    </div>
    <ul v-if="data.children&&data.children.length>0" class="blue-tree-ul">
      <blueTreeItem
        v-for="child of data.children"
        :key="child.key"
        :data="child"
        :param="param"
        :status="status"
        :multiple="multiple"
        :operation="operation"
        :choose-mode="chooseMode"
        @trigger="trigger"
        @appendTreeItem="appendTreeItem"
        @updateTreeItem="updateTreeItem"
        @removeTreeItem="removeTreeItem"
        :toggleOnSelect="toggleOnSelect"
        :selectOnClick="selectOnClick"
        :level="level+1"
      ></blueTreeItem>
    </ul>
  </li>
</template>
<script>
import TreeSlot from "./treeslot";
import Checkbox from "@/src/components/checkbox";

export default {
  name: "blueTreeItem",
  components: {
    Checkbox,
    TreeSlot
  },
  props: {
    data: Object,
    param: Object,
    multiple: Boolean,
    operation:Boolean,
    status: Object,
    chooseMode: String,
    toggleOnSelect: Boolean,
    selectOnClick: Boolean,
    level: Number,
  },
  data() {
    return {};
  },
  methods: {
    appendTreeItem(data){
      console.log(data);
      const newChild = {id:Number(data.key + '1')}
      console.log(newChild);
      // this.$emit('appendTreeItem',data)
    },
    updateTreeItem(data){
      console.log(data);
      this.$emit('updateTreeItem',data.key,data.value)
    },
    removeTreeItem(data){
      this.$emit('removeTreeItem',data)
    },
    clickShow() {
      if (this.selectOnClick) {
        this.select();
      }
    },
    select(e) {
      if(e.target.classList.contains('blue-tree-show-menu-btn')){
        return;
      }
      if (this.toggleOnSelect || this.multiple) {
        this.toggleTree();
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
    toggleTree() {
      if (this.data.status.isWait) {
        this.loadData();
      } else {
        this.$emit("trigger", { type: "toggleTreeEvent", data: this.data });
      }
    },
    loadData() {
      this.$emit("trigger", { type: "loadDataEvent", data: this.data });
    }
  }
};
</script>
