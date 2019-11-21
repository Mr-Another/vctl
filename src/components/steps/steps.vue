<template>
  <div :class="stepsCls">
    <div
      v-for="(a, index) of arr"
      :key="index"
      :class="{'blue-steps-actived':index <= stepIndex, 'blue-steps-item': true, 'blue-steps-item-first': index==0, 'blue-steps-item-last': index+1 == arr.length}"
    >
      <div class="blue-steps-tail" :class="{'blue-steps-tail-actived': index+1 <= stepIndex}"></div>
      <div class="blue-steps-content">
        <div class="blue-steps-icon">
          <span v-if="a.icon" class="blue-steps-icon-custom">
            <i :class="a.icon"></i>
          </span>
          <span v-else class="blue-steps-index">
            <i class="blue-steps-index-num">{{index+1}}</i>
            <i class="icon-check blue-steps-success"></i>
          </span>
        </div>
        <div class="blue-steps-words">
          <div class="blue-steps-title">{{a[title]}}</div>
          <div class="blue-steps-desc" v-if="a.desc">{{a.desc}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "@/src/utils/config";
import utils from "@/src/utils/utils";

const prefix = "blue-steps";

export default {
  name: "blueSteps",
  props: {
    dict: String,
    datas: [Object, Array],
    step: {
      type: [String, Number],
      default: 0
    },
    className: {
      type: String,
      default: "blue-tabs-default"
    },
    keyName: {
      type: String,
      default: () => config.getOption("dict", "keyName")
    },
    titleName: {
      type: String,
      default: () => config.getOption("dict", "titleName")
    }
  },
  data() {
    return {
      key: this.keyName,
      title: this.titleName
    };
  },
  computed: {
    stepsCls() {
      return {
        [`${prefix}`]: true
      };
    },
    stepIndex() {
      if (utils.isNumber(this.step)) {
        return this.step;
      }
      let index = 0;
      for (let a of this.arr) {
        if (a[this.key] == this.step) {
          return index;
        }
        index = index + 1;
      }
      return index;
    },
    arr() {
      if (!this.datas && !this.dict) {
        console.error(
          "[BlueUI Error] Steps Component: Datas or dict parameters need to be defined at least."
        );
        return [];
      }
      let datas = this.datas;
      if (this.dict) {
        datas = config.getDict(this.dict);
      }
      return config.initOptions(datas, this);
    }
  }
};
</script>
