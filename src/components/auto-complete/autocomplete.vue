<template>
  <div :class="autocompleteCls">
    <div :class="showCls">
      <template v-if="multiple">
        <span v-for="(obj, index) of objects" :key="index+''+obj.key">
          <span>{{obj.title}}</span>
          <i class="blue-icon-close icon-close" @click.stop="remove(obj)" v-if="!disabled"></i>
        </span>
        <input
          :disabled="disabled"
          ref="input"
          type="text"
          class="blue-autocomplete-input blue-input"
          @focus="focus"
          v-model="tempValue"
          @blur.stop="blur"
          @paste="paste"
          @keyup="handle"
          @keydown="keydownHandle"
          @keypress.enter="enterHandle"
          :placeholder="showPlaceholder"
        >
        <i class="icon-loading" v-if="loading"></i>
      </template>
      <template v-if="!multiple">
        <input
          type="text"
          ref="input"
          :disabled="disabled"
          class="blue-autocomplete-input blue-input"
          @focus="focus"
          v-model="tempValue"
          @paste="paste"
          @blur.stop="blur"
          @keyup="handle"
          @keypress.enter="enterHandle"
          :placeholder="showPlaceholder"
        >
        <i class="blue-icon-loading icon-loading" v-if="loading"></i>
        <i
          class="blue-icon-close icon-close text-hover"
          v-else-if="tempValue&&!disabled"
          @mousedown="clear"
        ></i>
      </template>
    </div>
    <div :class="groupCls">
      <ul class="blue-autocomplete-ul" v-if="isShow">
        <slot name="top" :results="results"></slot>
        <li
          v-for="(result, index) of results"
          :key="result.key"
          class="blue-autocomplete-item"
          :class="{'blue-autocomplete-item-selected': index == nowSelected}"
          @mousedown="picker(result)"
        >
          <div v-if="!!result.html" v-html="result.html"></div>
          <template v-else-if="!$scopedSlots.item">{{result.title}}</template>
          <slot v-else :item="result" name="item"></slot>
        </li>
        <li
          v-if="results.length==0 && showDropdownWhenNoResult"
          class="blue-autocomplete-empty-content"
        >{{showEmptyContent}}</li>
        <slot name="bottom" :results="results"></slot>
      </ul>
    </div>
  </div>
</template>
<script>
import config from "@/src/utils/config";
import utils from "@/src/utils/utils";
import Dropdown from "@/src/plugins/dropdown";
import Locale from "@/src/mixins/locale";

const prefix = "blue-autocomplete";

export default {
  name: "blueAutoComplete",
  mixins: [Locale],
  props: {

    // 参数
    multiple: { //多选
      type: Boolean,
      default: false
    },
    mustMatch: { // 是否必须是选择的项
      type: Boolean,
      default: true
    },
    autoSelectFirst: { // 是否自动选中第一个选项
      type: Boolean,
      default: false
    },
    type: { // 类型
      type: [String],
      default: "key" // object, title
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    datas: [Array, Object], // 选择的数据
    dict: String, // 调用全局定义的字典
    placeholder: { // 展示默认提示语
      type: String
    },
    value: [Number, String, Array, Object],
    option: Object,
    show: String, // 默认展示的文字，针对与存储 key 值，但是拥有 show 值的情景
    emptyContent: { // 没有搜索到值的提示语
      type: [String, Object]
    },
    config: String, // 使用全局配置的方法
    className: String, // 自定义 className
    delay: {
      type: Number,
      default: 100
    },
    endInput: String,
    showDropdownWhenNoResult: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      html: "autocomplete_rander_html",
      focusing: false,
      objects: [],
      object: {
        key: null,
        title: this.show,
        value: null
      },
      nowSelected: -1,
      tempValue: null,
      searchValue: null,
      oldValue: this.value,
      focusValue: null,
      loading: false,
      content: null,
      loadDatas: [],
      isShow: false,
      searchTimeout: null,
      el: null,
      lastTrigger: null
    };
  },
  watch: {
    value() {
      if (this.oldValue == this.value) {
        return;
      }
      this.parse();
    },
    disabled() {
      if (this.disabled) {
        this.dropdown.disabled();
      } else {
        this.dropdown.enabled();
      }
    },
    nowSelected() {
      this.$nextTick(() => {
        if (this.content && this.nowSelected > -1) {
          let dom = this.content.querySelector(
            ".blue-autocomplete-item-selected"
          );
          let uldom = this.content.querySelector(".blue-autocomplete-ul");
          if (dom && uldom) {
            if (
              dom.offsetTop + dom.offsetHeight - this.content.scrollTop >
              this.content.offsetHeight
            ) {
              this.content.scrollTop =
                dom.offsetTop + dom.offsetHeight - this.content.offsetHeight;
            } else if (dom.offsetTop - this.content.scrollTop < 0) {
              this.content.scrollTop = dom.offsetTop;
            }
          }
        }
      });
    }
  },
  beforeMount() {
    this.parse();
  },
  beforeDestroy() {
    let el = this.el;
    if (el) {
      el.style.display = "none";
      this.$el.appendChild(el);
    }
    if (this.dropdown) {
      this.dropdown.destory();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let el = (this.el = this.$el.querySelector(".blue-autocomplete-show"));
      this.content = this.$el.querySelector(".blue-autocomplete-group");
      let that = this;
      this.dropdown = new Dropdown(el, {
        trigger: "",
        triggerOnce: true,
        content: this.content,
        disabled: this.disabled,
        equalWidth: true,
        events: {
          show() {
            that.isShow = true;
          }
        }
      });
    });
  },
  methods: {
    getKey(key) {
      return key + Math.random();
    },
    parse() {
      this.tempValue = null;
      if (this.multiple) {
        let os = [];
        if (utils.isArray(this.value) && this.value.length > 0) {
          for (let v of this.value) {
            os.push(this.getValue(v));
          }
        }
        this.objects = os;
      } else {
        let value = null;
        if (this.type == "key") {
          if (!utils.isNull(this.value)) {
            if (!this.show && (this.dict || this.datas) && this.results) {
              let result = this.results.filter(
                item => item[this.param.keyName] == this.value
              );
              if (result.length > 0) {
                value = result[0];
              }
            }
            if (!value) {
              value = {
                [this.param.keyName]: this.value,
                [this.param.titleName]: this.show
              };
            }
          }
        } else if (this.type == "title") {
          if (!utils.isNull(this.value)) {
            value = {
              [this.param.keyName]: this.value,
              [this.param.titleName]: this.value
            };
          }
        } else {
          value = this.value;
        }
        if (utils.isNull(value)) {
          this.object = {
            key: null,
            title: null,
            value: null
          };
        } else {
          utils.extend(this.object, this.getValue(value));
        }
        this.tempValue = this.object.title;
      }
      this.oldValue = this.value;
    },
    getDisposeValue() {
      let inputValue = null;
      if (this.type == "key" || this.type == "title") {
        inputValue = this.tempValue;
      } else if (!utils.isBlank(this.tempValue)) {
        inputValue = {
          [this.param.titleName]: this.tempValue
        };
      } else {
        inputValue = null;
      }
      return inputValue;
    },
    dispose() {
      let value = null;
      let inputValue = this.getDisposeValue();
      if (this.multiple) {
        value = [];
        if (utils.isArray(this.objects) && this.objects.length > 0) {
          for (let o of this.objects) {
            value.push(this.getV(o));
          }
        }
        return value;
      } else {
        if (this.mustMatch) {
          value = this.getV(this.object);
        } else {
          if (!utils.isNull(this.object.key) && this.object.key !== "") {
            if (this.type == "key") {
              value = this.object.key;
            } else if (this.type == "title") {
              value = this.object.title;
            } else {
              value = utils.copy(this.object.value);
            }
          } else if (!utils.isNull(inputValue)) {
            value = inputValue;
            this.object.title = this.tempValue;
          }
        }
        return value;
      }
    },
    getV(object) {
      if (this.type == "key") {
        return object.key;
      } else if (this.type == "title") {
        return object.title;
      } else {
        return object.value;
      }
    },
    getValue(item) {
      if (utils.isFunction(this.param.getValue)) {
        return this.param.getValue.call(this.param, item);
      } else {
        if (!utils.isObject(item) && this.type == "object") {
          return utils.getValue(
            {
              [this.param.titleName]: item
            },
            this.param
          );
        } else {
          return utils.getValue(item, this.param);
        }
      }
    },
    focus(event) {
      this.lastTrigger = null;
      this.focusing = true;
      this.focusValue = event.target.value;
      if (this.multiple) this.searchValue = null;
      this.search();
    },
    focusData(value) {
      this.focusValue = this.object.title;
      if (this.multiple) this.searchValue = null;
    },
    paste(event) {
      setTimeout(() => {
        this.search();
      }, 0);
    },
    blur(event) {
      this.focusing = false;
      if (this.lastTrigger == "picker" || this.lastTrigger == "clear") return;
      let nowValue = event.target.value;
      let focusValue = this.focusValue;
      if (focusValue !== nowValue) {
        if (this.mustMatch) {
          if (this.focusValue != "" && !this.multiple) {
            this.object = {
              key: null,
              title: null,
              value: null
            };
            this.setvalue("blur");
          } else {
            this.tempValue = null;
          }
        } else {
          if (nowValue) {
            this.objects.push(this.getValue(nowValue));
          }
          this.setvalue("blur");
        }
      }
      this.loading = false;
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
    },
    keydownHandle(event) {
      let code = event.keyCode || event.which || event.charCode;
      if (code == 8 && event.target.value === "" && this.objects.length > 0) {
        this.remove(this.objects[this.objects.length - 1]);
      } else if (this.endInput && event.key == this.endInput) {
        event.preventDefault();
        this.enterHandle(event);
      }
    },
    handle(event) {
      let code = event.keyCode || event.which || event.charCode;
      if (code == 38) {
        if (this.nowSelected > 0) {
          this.nowSelected -= 1;
        }
      } else if (code == 40) {
        if (this.nowSelected < this.results.length - 1) {
          this.nowSelected += 1;
        }
      } else if (code == 13) {
        // compatible ie，use enterHandle handle。
      } else {
        this.search();
      }
    },
    enterHandle(event) {
      let nowValue = (this.tempValue = event.target.value);
      event.preventDefault();
      if (this.nowSelected >= 0) {
        this.add(this.results[this.nowSelected]);
        this.setvalue("enter");
      } else {
        if (!this.mustMatch && this.multiple && nowValue) {
          this.objects.push(this.getValue(nowValue));
        }
        this.setvalue("enter");
      }
    },
    search() {
      let target = this.$refs.input;
      let value = target.value;
      this.tempValue = value || null;
      if (value != this.object.title && this.object.title) {
        this.object.key = null;
        this.object.title = null;
        this.object.value = null;
      }
      this.loading = false;
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      if (value.length >= this.param.minWord) {
        this.searchTimeout = setTimeout(() => {
          this.updateDropdown();
          if (utils.isFunction(this.param.loadData)) {
            this.loading = true;
            this.param.loadData.call(
              this.param,
              value,
              datas => {
                if (target.value === value) {
                  this.loading = false;
                  this.loadDatas = datas;
                  this.updateDropdown();
                  this.nowSelected = this.autoSelectFirst ? 0 : -1;
                }
              },
              _ => {
                this.loading = false;
              }
            );
          } else {
            this.nowSelected = this.autoSelectFirst ? 0 : -1;
          }
        }, this.delay);
        this.searchValue = value;
        this.dropdown.update();
      } else {
        this.dropdown.hide();
      }
    },
    updateDropdown() {
      this.$nextTick(() => {
        if (this.dropdown) {
          if (this.results.length == 0 && !this.showDropdownWhenNoResult) {
            this.dropdown.hide();
          } else {
            this.dropdown.show();
            this.dropdown.update();
          }
        }
      });
    },
    add(data) {
      if (this.multiple) {
        this.objects.push(utils.copy(data));
      } else {
        if (data === null || data === undefined) {
          this.object = {
            key: null,
            title: null,
            value: null
          };
        } else {
          this.object = utils.copy(data);
        }
      }
      this.tempValue = null;
    },
    remove(object) {
      this.objects.splice(this.objects.indexOf(object), 1);
      this.setvalue("remove");
    },
    picker(data) {
      this.add(data);
      this.setvalue("picker");
    },
    setvalue(trigger) {
      if (this.disabled) return;
      // log('setvalue', trigger)
      this.lastTrigger = trigger;
      this.nowSelected = -1;
      let value = (this.oldValue = this.dispose());
      this.focusValue = null;
      this.focusData();
      if (this.multiple) {
        this.tempValue = null;
      } else {
        this.tempValue = this.object.title;
      }
      // if (this.mustMatch || this.object.key || this.multiple) {
      // }
      // this.focusValue = this.showValue;
      // if (this.object.key === null) this.object.title = this.showValue
      this.$emit("input", value, trigger);
      this.$emit(
        "change",
        utils.copy(this.multiple ? this.objects : this.object),
        trigger
      );
      let event = document.createEvent("CustomEvent");
      event.initCustomEvent("setvalue", true, true, value);
      this.$el.dispatchEvent(event);
      if (trigger) {
        this.$emit(trigger, value);
      }
      this.dropdown.hide();
      setTimeout(() => {
        this.searchValue = null;
      }, 100);
    },
    hide() {
      this.loading = false;
      this.dropdown.hide();
    },
    clear() {
      this.tempValue = null;
      this.focusValue = null;
      this.object = {
        key: null,
        title: null,
        value: null
      };
      this.setvalue("clear");
    }
  },
  computed: {
    showPlaceholder() {
      return this.placeholder || this.t("h.autoComplate.placeholder");
    },
    showEmptyContent() {
      return this.emptyContent || this.t("h.autoComplate.emptyContent");
    },
    param() {
      if (this.config) {
        return utils.extend(
          {},
          config.getOption("autocomplete.default"),
          config.getOption(`autocomplete.configs.${this.config}`),
          this.option
        );
      } else {
        return utils.extend(
          {},
          config.getOption("autocomplete.default"),
          this.option
        );
      }
    },
    autocompleteCls() {
      let autosize = !!this.noBorder;
      if (!autosize) {
        autosize = this.autosize;
      }
      return {
        [`${prefix}`]: true,
        [`${prefix}-input-border`]: !this.noBorder,
        [`${prefix}-multiple`]: this.multiple,
        [`${prefix}-no-autosize`]: !autosize,
        [`${prefix}-disabled`]: this.disabled,
        focusing: this.focusing
      };
    },
    showCls() {
      return {
        [`${prefix}-show`]: true,
        [`${this.className}-show`]: !!this.className,
        focusing: this.focusing
      };
    },
    groupCls() {
      return {
        [`${prefix}-group`]: true,
        [`${prefix}-multiple`]: this.multiple,
        [`${this.className}-dropdown`]: !!this.className
      };
    },
    results() {
      let datas = this.datas;
      if (this.dict) {
        datas = config.getDict(this.dict);
      }
      if (utils.isNull(datas)) {
        datas = this.loadDatas;
      } else {
        datas = config.initOptions(datas, this);
        if (this.searchValue) {
          let searchValue = this.searchValue.toLowerCase();
          datas = datas.filter(item => {
            return (
              (item.html || item[this.param.titleName] || "")
                .toLowerCase()
                .indexOf(searchValue) != -1
            );
          });
        }
      }
      if (this.objects.length > 0) {
        let keyArray = utils
          .getArray(this.objects, "key")
          .filter(item => !utils.isNull(item));
        datas = datas.filter(item => {
          return keyArray.indexOf(item[this.param.keyName]) == -1;
        });
      }
      if (this.maxList) {
        datas.splice(0, this.maxList);
      }
      let results = [];
      for (let data of datas) {
        results.push(this.getValue(data));
      }
      return results;
    }
  }
};
</script>
