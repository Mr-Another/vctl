<template>
  <div :class="dateCls">
    <template v-if="!inline">
      <div v-if="noBorder" class="blue-datetime-show text-hover">{{showDate||showPlaceholder}}</div>
      <div v-else class="blue-input blue-datetime-show">
        <input
          class="blue-input"
          type="text"
          @change="changeEvent"
          @keydown.enter="changeEvent"
          v-model="showDate"
          :disabled="disabled"
          :readonly="readonly || type == 'week' || type == 'quarter'"
          :placeholder="showPlaceholder"
        >
        <i class="icon-calendar" v-if="!showDate||disabled||!clearable"></i>
        <i class="icon-close text-hover" v-else @click.stop="clear"></i>
      </div>
    </template>
    <div :class="datePickerCls" class="blue-date-picker">
      <div class="blue-date-container" v-if="isShow">
        <div v-if="shortcuts.length>0" class="blue-date-shortcut">
          <div v-for="s of shortcuts" @click="setShortcutValue(s)" :key="s.title">{{s.title}}</div>
        </div>
        <date-base
          ref="datebase"
          :value="nowDate"
          :option="option"
          :type="type"
          :startWeek="startWeek"
          :now-view="nowView"
          format="k"
          @updateView="updateView"
          @input="setvalue"
          @changeView="updateDropdown"
        ></date-base>
      </div>

      <div class="blue-date-footer" v-if="hasConfirm & !inline">
        <button class="blue-btn blue-btn-text" @click="clear">{{'h.common.clear' | hlang}}</button>
        <button
          class="blue-btn blue-btn-primary blue-btn-s"
          @click="hide"
        >{{'h.common.confirm' | hlang}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import mm from "@/src/plugins/mm";

import config from "@/src/utils/config";
import utils from "@/src/utils/utils";
import Dropdown from "@/src/plugins/dropdown";
import dateBase from "@/src/components/date-picker/datebase";
import Locale from "@/src/mixins/locale";

const prefix = "blue-datetime";

const mmType = {
  year: mm.YEAR,
  month: mm.MONTH,
  date: mm.DAY,
  datetime: mm.MINUTE,
  time: mm.MINUTE,
  datehour: mm.HOUR
};

const options = config.getOption("datepicker");

export default {
  name: "hDatePicker",
  mixins: [Locale],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    type: {
      type: [String],
      default: "date" // year, month, week
    },
    option: Object,
    format: String,
    noBorder: {
      type: Boolean,
      default: false
    },
    hasSeconds: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    hasButtons: {
      type: Boolean,
      default: false
    },
    value: String,
    inline: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "bottom-start"
    },
    startWeek: {
      type: Number,
      default: () => config.getOption("datepicker.startWeek")
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      nowDate: "",
      showDate: "",
      nowView: mm(),
      isShow: this.inline
    };
  },
  watch: {
    value() {
      this.parse(this.value);
    },
    disabled() {
      if (this.disabled) {
        this.dropdown.disabled();
      } else {
        this.dropdown.enabled();
      }
    },
    type() {
      this.parse(this.value);
    }
  },
  beforeMount() {
    this.parse(this.value);
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
    let that = this;
    this.$nextTick(() => {
      if (this.inline) return;
      let el = (this.el = this.$el.querySelector(
        `.${prefix}>.blue-datetime-show`
      ));
      let content = this.$el.querySelector(`.blue-date-picker`);

      this.dropdown = new Dropdown(el, {
        trigger: "click",
        triggerOnce: true,
        content,
        disabled: this.disabled,
        placement: this.placement,
        events: {
          show() {
            that.isShow = true;
            that.$nextTick(() => {
              that.parse(that.value);
              that.$refs.datebase.resetView();
              if (that.nowDate) {
                that.nowView = mm(that.nowDate);
              }
            });
          }
        }
      });
      if (this.disabled) {
        this.dropdown.disabled();
      }
    });
  },
  methods: {
    setShortcutValue(s) {
      let value = s.value.call(null);
      this.parse(value);
      this.setvalue(this.nowDate);
      this.hide();
    },
    clear() {
      this.$emit("clear");
      this.setvalue("");
      this.hide();
    },
    confirm() {
      this.$emit("confirm");
      this.hide();
    },
    updateView(value) {
      this.nowView = mm(value);
      this.$nextTick(() => {
        this.updateDropdown();
      });
    },
    updateDropdown() {
      if (this.dropdown) this.dropdown.update();
    },
    inputEvent(event) {
      let value = event.target.value;
      try {
        mm(value);
      } catch (evt) {
        return;
      }
      // this.parse(value, false);
      this.setvalue(value);
    },
    changeEvent(event) {
      let value = event.target.value;
      this.parse(value);
      if (this.nowDate && utils.isObject(this.option) && this.type != "time") {
        let disabled = false;
        let nowDate = mm(this.nowDate);
        let type = mmType[this.type];
        if (this.option.start && nowDate.distance(this.option.start, type) < 0)
          disabled = this.option.start;
        if (
          this.option.end &&
          !disabled &&
          nowDate.distance(this.option.end, type) > 0
        )
          disabled = this.option.end;
        if (
          this.option.disabled &&
          this.option.disabled.call(null, disabled || nowDate)
        )
          disabled = "";
        if (disabled !== false) {
          this.parse(disabled);
        }
      }
      this.setvalue(this.nowDate);
    },
    parse(value, initShow = true) {
      if (value != "" && !utils.isNull(value)) {
        try {
          if (this.type == "time") {
            value = `1980-01-01 ${value}`;
          }
          this.nowView = mm(value);
          this.nowDate = this.nowView.format("k");
          if (initShow) {
            if (this.type == "week") {
              this.showDate = this.t("h.date.show.weekInput", {
                year: this.nowView.year(),
                week: this.nowView.getWeekOfYear(this.startWeek)
              });
            } else if (this.type == "quarter") {
              this.showDate = this.t("h.date.show.quarter", {
                year: this.nowView.year(),
                quarter: Math.ceil(this.nowView.month() / 3)
              });
            } else {
              this.showDate = this.nowView.format(this.nowFormat);
            }
          }
          return;
        } catch (err) {}
      }

      this.nowView = mm();
      this.nowDate = "";
      if (initShow) this.showDate = "";
    },
    hide() {
      if (this.dropdown) this.dropdown.hide();
    },
    setvalue(string, isEnd = true) {
      let value = string;
      if (string != "") {
        value = mm(string).format(this.nowFormat);
      }
      this.$emit("input", value);
      this.$emit("change", value);
      let event = document.createEvent("CustomEvent");
      event.initCustomEvent("setvalue", true, true, value);
      this.$el.dispatchEvent(event);
      if (isEnd) {
        this.hide();
      }
      this.updateDropdown();
    }
  },
  computed: {
    showPlaceholder() {
      return this.placeholder || this.t("h.datepicker.placeholder");
    },
    nowFormat() {
      let format = this.format || options.format[this.type];
      if (this.type == "datetime" && this.hasSeconds) {
        format = options.format.datetimesecond;
      }
      return format;
    },
    hasConfirm() {
      return (
        this.type == "datetime" || this.type == "datehour" || this.hasButtons
      );
    },
    shortcuts() {
      let shortcuts = [];
      let shortcutsConfig = null;
      if (this.option && this.option.shortcuts) {
        shortcutsConfig = this.option.shortcuts;
      }
      if (utils.isArray(shortcutsConfig)) {
        for (let s of shortcutsConfig) {
          if (utils.isString(s)) {
            shortcuts.push(options.shortcuts[s]);
          } else if (utils.isObject(s)) {
            shortcuts.push(s);
          }
        }
      }
      return shortcuts;
    },
    dateCls() {
      return {
        [`${prefix}`]: !this.inline,
        [`${prefix}-inline`]: this.inline,
        [`${prefix}-input-border`]: !this.noBorder,
        [`${prefix}-disabled`]: this.disabled
      };
    },
    datePickerCls() {
      return {
        [`${prefix}-has-shortcut`]: this.shortcuts.length > 0
      };
    }
  },
  components: {
    dateBase
  }
};
</script>
