<template>
  <div :class="formItemCls" :prop="prop" :validable="validable">
    <label :style="labelStyleCls" class="blue-form-item-label" v-if="showLabel">
      <i v-if="icon" :class="icon"></i>
      <span v-if="!$scopedSlots.label">{{label}}</span>
      <slot v-else :label="label" name="label"></slot>
    </label>
    <div class="blue-form-item-content" :style="contentStyleCls">
      <div class="blue-form-item-wrap">
        <slot></slot>
      </div>
      <div class="blue-form-item-error" v-if="!errorMessage.valid">
        <span v-if="errorMessage.type=='base'" class="blue-form-item-error-label">{{label}}</span>
        <span class="blue-form-item-error-message">{{errorMessage.message}}</span>
        <slot name="error" :type="errorMessage.type"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/src/utils/utils";

const prefixCls = "blue-form-item";
export default {
  name: "blueFormItem",
  props: {
    label: String,
    prop: String,
    icon: String,
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    single: {
      type: Boolean,
      default: false
    },
    validable: {
      type: Boolean,
      default: true
    },
    noPadding: {
      type: Boolean,
      default: false
    }
  },
  inject: [
    "validField",
    "removeProp",
    "requireds",
    "setConfig",
    "updateErrorMessage",
    "getErrorMessage",
    "labelWidth",
    "mode"
  ],
  data() {
    return {
      validResult: null,
      errorMessage: { valid: true }
    };
  },
  beforeDestroy() {
    if (this.prop) {
      this.removeProp(this.prop);
    }
  },
  watch: {
    prop(prop, oldProp) {
      if (this.prop) {
        this.errorMessage = this.updateErrorMessage(prop, oldProp);
      }
    },
    required() {
      this.setConfig(this.prop, { required: this.required });
    }
  },
  mounted() {
    if (this.prop) {
      if (this.required) {
        this.setConfig(this.prop, { required: this.required });
      }
      this.errorMessage = this.getErrorMessage(this.prop, this.label);
    }
  },
  methods: {
    reset() {
      console.warn(
        "[BlueUI WARNING] FormItem Component:  FormItem.reset() will be decapitated, please use method FormItem.resetValid()"
      );
      this.errorMessage.valid = true;
    },
    resetValid() {
      this.errorMessage.valid = true;
    },
    trigger() {
      let prop = this.prop;
      if (!this.validable || utils.isNull(prop)) {
        return;
      }
      this.validField(prop);
    }
  },
  computed: {
    configRequired() {
      if (!this.prop) return false;
      return this.requireds.indexOf(this.prop) > -1;
    },
    initLabelWidth() {
      let mode = this.mode;
      let hasWidth =
        !(mode == "block" || mode == "inline") ||
        (this.single && mode == "twocolumn");
      let width = hasWidth ? this.labelWidth || false : false;
      return width ? `${width}px` : "auto";
    },
    formItemCls() {
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-single`]: this.single,
        [`${prefixCls}-readonly`]: !!this.readonly,
        [`${prefixCls}-required`]: this.required || this.configRequired,
        [`${prefixCls}-valid-error`]: !this.errorMessage.valid,
        [`${prefixCls}-no-padding`]: !!this.noPadding
      };
    },
    labelCls() {
      return {
        [`${prefixCls}-label`]: true
      };
    },
    labelStyleCls() {
      let param = {
        width: this.initLabelWidth
      };
      return param;
    },
    contentStyleCls() {
      let param = {
        "margin-left": this.showLabel ? this.initLabelWidth : "0px"
      };
      return param;
    }
  }
};
</script>
