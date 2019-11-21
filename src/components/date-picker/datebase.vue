<template>
  <div class="blue-date-content">
    <div class="blue-date-header" v-if="type != 'time'">
      <span class="blue-date-year-left-picker" @click.stop="updateView('default', -1)">
        <i class="icon-left"></i>
        <i class="icon-left"></i>
      </span>
      <span
        class="blue-date-month-left-picker"
        @click.stop="updateView('month', -1)"
        v-show="view=='date'||view=='week'"
      >
        <i class="icon-left"></i>
      </span>
      <span class="blue-date-header-show" @click.stop="changeView('year')" v-if="view != 'year'">
        {{nowView.year()}}{{'h.date.header.year'
        | hlang}}
      </span>
      <span class="blue-date-header-show" v-if="view == 'year'">
        {{nowView.year()-6}}&nbsp;&nbsp;-&nbsp;&nbsp;{{nowView.year()+5}}{{'h.date.header.year'
        | hlang}}
      </span>
      <span
        class="blue-date-header-show"
        @click.stop="changeView('month')"
        v-show="view != 'year' && view != 'month' && view != 'quarter'"
      >
        {{months[nowView.month()
        - 1]}}
      </span>
      <span
        class="blue-date-header-show"
        @click.stop="changeView('date')"
        v-show="view == 'hour' || view == 'minute'"
      >
        {{nowView.date()}}{{'h.date.header.day'
        | hlang}}
      </span>
      <span class="blue-date-year-right-picker" @click.stop="updateView('default', 1)">
        <i class="icon-right"></i>
        <i class="icon-right"></i>
      </span>
      <span
        class="blue-date-month-right-picker"
        @click.stop="updateView('month', 1)"
        v-show="view=='date'||view=='week'"
      >
        <i class="icon-right"></i>
      </span>
    </div>
    <div class="blue-date-header" v-show="view=='minute'">
      <span class="blue-date-month-left-picker" @click.stop="updateView('hour', -1)">
        <i class="icon-left"></i>
      </span>
      <span class="blue-date-header-show" @click.stop="changeView('hour')">{{nowView | hoursString}}</span>
      <span class="blue-date-month-right-picker" @click.stop="updateView('hour', 1)">
        <i class="icon-right"></i>
      </span>
    </div>
    <div :class="dateBodyCls">
      <div class="blue-date-body-weeks" v-if="view=='date'">
        <span v-for="w of weeks" :key="w">{{w}}</span>
      </div>
      <div class="blue-date-body-pickers">
        <span
          v-for="d of dates"
          :key="d.string"
          :string="d.string"
          :class="getDateCls(d)"
          @click.stop="chooseDate(d)"
        >{{d.show}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import mm from "@/src/plugins/mm";
import config from "@/src/utils/config";
import utils from "@/src/utils/utils";
import Locale from "@/src/mixins/locale";

const dateprefix = "blue-date";

const viewType = ["year", "month", "date", "hour", "minute", "second"];
const weekViewType = ["year", "month", "week"];
const quarterViewType = ["year", "quarter"];

const options = config.getOption("datepicker");

const startView = {
  year: "year",
  month: "month",
  date: "date",
  week: "week",
  quarter: "quarter",
  datetime: "date",
  datehour: "date",
  time: "hour"
};

const endView = {
  year: "year",
  month: "month",
  date: "date",
  week: "week",
  quarter: "quarter",
  datetime: "minute",
  datehour: "hour",
  time: "minute"
};

const DateJudgeLength = {
  year: 10,
  month: 10,
  date: 10,
  week: 10,
  quarter: 10,
  hour: 13,
  minute: 16
};

const genData = param => {
  let { date, type, show, vm, isNowDays, view } = param;
  let disabled = false;
  if (utils.isObject(vm.option)) {
    if (vm.option.start) disabled = date.distance(vm.option.start, type) < 0;
    if (vm.option.end && !disabled)
      disabled = date.distance(vm.option.end, type) > 0;
    if (vm.option.disabled && !disabled)
      disabled = vm.option.disabled.call(null, date);
  }
  let dis = date.distance(vm.today, type);
  let isToday = dis == 0;
  if (view == "quarter") {
    isToday = dis >= -2 && dis <= 0;
  }
  return {
    date,
    show,
    string: date.format(vm.format),
    disabled,
    isToday,
    isNowDays
  };
};

export default {
  name: "blueDateBase",
  mixins: [Locale],
  props: {
    type: {
      type: [String],
      default: "date" // year, month, week
    },
    option: Object,
    format: String,
    value: [Object, String],
    nowView: Object,
    range: String,
    rangeEnd: String,
    startWeek: {
      type: Number,
      default: () => config.getOption("datepicker.startWeek")
    }
  },
  data() {
    return {
      options: utils.extend({}, options.datetimeOptions, this.option),
      today: mm(),
      view: startView[this.type] // month //year
    };
  },
  filters: {
    hoursString(d) {
      return `${utils.padLeft(d.hours(), 2)}:00`;
    }
  },
  watch: {
    type() {
      this.options = utils.extend({}, options.datetimeOptions, this.option);
      this.view = startView[this.type];
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.range) {
        this.$el.addEventListener(
          "mouseenter",
          event => {
            if (this.view == "date" && !!this.value.start && !this.value.end) {
              let target = event.target;
              if (target.tagName == "SPAN") {
                let string = target.getAttribute("string");
                if (string) this.$emit("updateRangeEnd", string);
              }
            }
          },
          true
        );
        this.$el.addEventListener(
          "mouseout",
          () => {
            if (this.view == "date" && !!this.value.start && !this.value.end) {
              this.$emit("updateRangeEnd", "");
            }
          },
          true
        );
      }
    });
  },
  methods: {
    changeView(view) {
      this.view = view;
      this.$emit("changeView");
    },
    resetView() {
      this.view = startView[this.type];
    },
    updateView(typeString, num) {
      let type = mm.DAY;
      let nowView = mm(this.nowView);
      if (typeString == "month") {
        type = mm.MONTH;
        nowView = nowView.startOf(mm.MONTH);
      } else if (typeString == "hour") {
        type = mm.HOUR;
      } else {
        type = mm.YEAR;
        if (this.view == "hour") {
          type = mm.DAY;
        } else if (this.view == "minute") {
          type = mm.DAY;
        } else if (this.view == "year") {
          num = num * 12;
          type = mm.YEAR;
        }
      }
      nowView.add(num, type);
      this.$emit("updateView", nowView.time(), this.range);
    },
    getDateCls(d) {
      let isStartSelected = false;
      let isEndSelected = false;
      let isRangeSelected = false;
      let isSelected = false;
      if (utils.isObject(this.value)) {
        isStartSelected = this.value.start == d.string;
        isEndSelected = this.value.end == d.string;
      } else {
        let length = DateJudgeLength[this.view];
        isSelected =
          this.value.substring(0, length) == d.string.substring(0, length);
      }
      if (
        this.range &&
        utils.isObject(this.value) &&
        !!this.value.start &&
        !!this.rangeEnd
      ) {
        isRangeSelected =
          (this.value.start < d.string && this.rangeEnd > d.string) ||
          (this.value.start > d.string && this.rangeEnd < d.string);
      }
      return {
        "blue-date-not-now-day": !d.isNowDays,
        "blue-date-today": d.isToday,
        "blue-date-selected": isSelected || isStartSelected || isEndSelected,
        "blue-date-range-selected": isRangeSelected,
        "blue-date-start-selected": isStartSelected,
        "blue-date-end-selected": isEndSelected,
        "blue-date-disabled": d.disabled
      };
    },
    chooseDate(d) {
      if (this.view == endView[this.type]) {
        this.setvalue(d.date, true);
      } else {
        let date = d.date;
        // In addition to the month and year clicks, the other directly complete the assignment
        if (
          !(this.view == "month" && this.type != "month") &&
          !(this.view == "year" && this.type != "year")
        ) {
          if (this.value) {
            if (this.range) {
              try {
                date = mm(this.value[this.range]);
              } catch (e) {
                date = mm(d.date);
              }
            } else {
              date = mm(this.value);
            }
            switch (this.view) {
              case "minutes":
                date.minutes(d.date.minutes());
                break;
              case "hour":
                date.hours(d.date.hours());
                break;
              case "date":
                date.year(d.date.year());
                date.month(d.date.month());
                date.date(d.date.date());
                break;
              case "month":
                date.month(d.date.month());
                if (date.month() > d.date.month()) {
                  date.date(1);
                  date = date.add(-1, mm.DAY);
                }
                break;
              case "year":
                date.year(d.date.year());
                break;
            }
          }

          if (
            this.options.start &&
            mm(date).time() < mm(this.options.start).time()
          ) {
            date = this.options.start;
          }

          if (
            this.options.end &&
            mm(date).time() > mm(this.options.end).time()
          ) {
            date = this.options.end;
          }
          if (!this.range) {
            this.setvalue(date, false);
          }
        }
        // if(this.type == 'week' && this.view == 'year'){
        //   this.view = 'week';
        // } else {

        // }
        let viewTypes = viewType;
        if (this.type == "week") {
          viewTypes = weekViewType;
        } else if (this.type == "quarter") {
          viewTypes = quarterViewType;
        }
        let index = viewTypes.indexOf(this.view);
        this.view = viewTypes[index + 1];
        this.$emit("updateView", mm(date).time(), this.range);
      }
    },
    setvalue(date, isEnd = false) {
      let value = "";
      if (!utils.isNull(date)) {
        value = mm(date).format(this.format);
      }
      this.$emit("input", value, isEnd, this.range);
    }
  },
  computed: {
    dateBodyCls() {
      return {
        [`${dateprefix}-body`]: true,
        [`${dateprefix}-body-${this.view}`]: true
      };
    },
    weeks() {
      let weeks = [
        this.t("h.date.weeks.monday"),
        this.t("h.date.weeks.tuesday"),
        this.t("h.date.weeks.wednesday"),
        this.t("h.date.weeks.thursday"),
        this.t("h.date.weeks.friday"),
        this.t("h.date.weeks.saturday"),
        this.t("h.date.weeks.sunday")
      ];
      let days = weeks.splice(0, this.startWeek - 1);
      weeks.push(...days);
      return weeks;
    },
    months() {
      return [
        this.t("h.date.months.january"),
        this.t("h.date.months.february"),
        this.t("h.date.months.march"),
        this.t("h.date.months.april"),
        this.t("h.date.months.may"),
        this.t("h.date.months.june"),
        this.t("h.date.months.july"),
        this.t("h.date.months.august"),
        this.t("h.date.months.september"),
        this.t("h.date.months.october"),
        this.t("h.date.months.november"),
        this.t("h.date.months.december")
      ];
    },
    dates() {
      let nowDate = this.nowView;
      if (this.view == "date") {
        let lastdayofmonth = nowDate.endOf(mm.MONTH);
        let firstdayofmonth = nowDate.startOf(mm.MONTH);
        let startDay = firstdayofmonth.day();
        if (startDay == this.startWeek) {
          startDay = -1;
        } else if (this.startWeek > startDay) {
          startDay = 7 - (this.startWeek - startDay) - 1;
        } else {
          startDay = startDay - this.startWeek - 1;
        }
        let lastdayoflastmonth = firstdayofmonth.add(-1, mm.DAY);
        let dates = [];
        let lastMonthDays = lastdayoflastmonth.date() - startDay;
        for (let i = lastMonthDays; i <= lastdayoflastmonth.date(); i++) {
          dates.push(
            genData({
              date: mm([
                lastdayoflastmonth.year(),
                lastdayoflastmonth.month(),
                i
              ]),
              type: mm.DAY,
              show: i,
              vm: this,
              isNowDays: false
            })
          );
        }
        for (let i = 1; i <= lastdayofmonth.date(); i++) {
          dates.push(
            genData({
              date: mm([lastdayofmonth.year(), lastdayofmonth.month(), i]),
              type: mm.DAY,
              show: i,
              vm: this,
              isNowDays: true
            })
          );
        }
        let nextMonth = lastdayofmonth.add(1, mm.DAY);
        let nextMonthDays = 7 * 6 - dates.length;
        for (let i = 1; i <= nextMonthDays; i++) {
          dates.push(
            genData({
              date: mm([nextMonth.year(), nextMonth.month(), i]),
              type: mm.DAY,
              show: i,
              vm: this,
              isNowDays: false
            })
          );
        }
        return dates;
      } else if (this.view == "month") {
        let dates = [];
        for (let i = 1; i <= 12; i++) {
          dates.push(
            genData({
              date: mm([nowDate.year(), i, 1]),
              type: mm.MONTH,
              show: this.months[i - 1],
              vm: this,
              isNowDays: true
            })
          );
        }
        return dates;
      } else if (this.view == "year") {
        let dates = [];
        let nowYear = nowDate.year();
        for (let i = nowYear - 6; i <= nowYear + 5; i++) {
          dates.push(
            genData({
              date: mm([i, 1, 1]),
              type: mm.YEAR,
              show: i,
              vm: this,
              isNowDays: true
            })
          );
        }
        return dates;
      } else if (this.view == "hour") {
        let dates = [];
        let list = [];
        if (utils.isFunction(this.options.hours)) {
          list = this.options.hours.call(null);
        } else {
          list = utils.numList(0, 24, 1);
        }
        for (let i of list) {
          dates.push(
            genData({
              date: mm(nowDate.time())
                .hours(i)
                .minutes(0),
              type: mm.HOUR,
              show: utils.padLeft(i, 2) + ":00",
              vm: this,
              isNowDays: true
            })
          );
        }
        return dates;
      } else if (this.view == "minute") {
        let dates = [];
        let hour = nowDate.hours();
        let list = [];
        if (utils.isFunction(this.options.minutes)) {
          list = this.options.minutes.call(null, hour);
        } else {
          list = utils.numList(0, 60, this.options.minuteStep);
        }
        for (let i of list) {
          dates.push(
            genData({
              date: mm(nowDate.time()).minutes(i),
              type: mm.MINUTE,
              show: utils.padLeft(hour, 2) + ":" + utils.padLeft(i, 2),
              vm: this,
              isNowDays: true
            })
          );
        }
        return dates;
      } else if (this.view == "week") {
        let dates = [];
        let date = mm(nowDate)
          .add(-1, mm.MONTH)
          .endOf(mm.MONTH)
          .endOf(mm.WEEK, this.startWeek);
        let monthSpace = 0;
        if (date.month() == nowDate.month()) {
          date = date.startOf(mm.WEEK, this.startWeek);
          monthSpace = 1;
        } else {
          date = date.add(7, mm.DATE).startOf(mm.WEEK, this.startWeek);
        }
        let month = date.month();
        let nextMonth = monthSpace + month;
        nextMonth = nextMonth > 12 ? 1 : nextMonth;
        while (date.month() == month || date.month() == nextMonth) {
          dates.push(
            genData({
              date: mm(date.time()),
              type: mm.WEEK,
              show: this.t("h.date.show.week", {
                year: date.year(),
                weeknum: date.getWeekOfYear(this.startWeek),
                daystart: date.format("MM-DD"),
                dayend: mm(date)
                  .add(6)
                  .format("MM-DD")
              }),
              vm: this,
              isNowDays: true
            })
          );
          date = date.add(7);
        }
        return dates;
      } else if (this.view == "quarter") {
        let dates = [];
        let date = nowDate.startOf(mm.YEAR);
        for (let index = 1; index < 5; index++) {
          dates.push(
            genData({
              date: mm(date.time()),
              type: mm.MONTH,
              show: this.t("h.date.show.quarter", {
                year: date.year(),
                quarter: index
              }),
              vm: this,
              isNowDays: true,
              view: this.view
            })
          );
          date = date.add(3, mm.MONTH);
        }
        return dates;
      }
      return [];
    }
  }
};
</script>
