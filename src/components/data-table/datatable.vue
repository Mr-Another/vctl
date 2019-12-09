<template>
  <div style="padding:15px;height:100%;position:relative;">
    <div class="blue-table-top">
      <div class="blue-table-actions">
        <slot name="actions"></slot>
        <blue-button
          v-for="(ac,index) in actions"
          :key="index"
          @click="clickactions(ac)"
          :icon="ac.icon"
          :color="ac.color"
          :name="ac.name"
        >{{ ac.title }}</blue-button>
      </div>
      <div class="blue-table-filters" ref="filters" v-if="showfilters">
        <slot name="filters" :filters="filters"></slot>
        <div v-for="(filter,index) in filters" :key="index" class="blue-table-filters-filter">
          <div v-if="filter.type=='date'">
            <label>{{ filter.title}}</label>
            <blue-datepicker v-model="filter.value"></blue-datepicker>
          </div>
          <div v-else-if="filter.type=='select'">
            <blue-select v-model="filter.value" :datas="filter.datas"></blue-select>
          </div>
          <div v-else>
            <label>{{ filter.title}}</label>
            <input :name="filter.name" v-model="filter.value" class="blue-input" />
          </div>
        </div>
        <div class="blue-btn-group blue-btn-group-circle1 blue-btn-group-s">
          <blue-button class="blue-btn" @click="filtersearch">
            <i class="icon-search"></i>
            <span class="blue-btn-name">搜索</span>
          </blue-button>
          <blue-button class="blue-btn" @click="filterreset">
            <i class="icon-reload"></i>
            <span class="blue-btn-name">重置</span>
          </blue-button>
          <blue-button class="blue-btn" @click="filtershow">
            <i :class="showform ? 'icon-caret-up' : 'icon-caret-down' "></i>
          </blue-button>
        </div>
        <div class="blue-table-advfilters" v-show="showform">
          <div v-for="(filter,idx) in advfilters" :key="idx" class="blue-table-filters-filter">
            <div v-if="filter.type=='date'">
              <label>{{filter.title}}</label>
              <blue-datepicker v-model="filter.value"></blue-datepicker>
            </div>
            <div v-else>
              <label>{{filter.title}}</label>
              <input :name="filter.name" v-model="filter.value" class="blue-input" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="pagtable" class="blue-table-bottom">
      <div v-if="custom">
        <blue-table
          :height="height"
          v-bind="$attrs"
          :loading="loading"
          :datas="datas"
          :columns="tablecolumns"
          :ths="ths"
          v-on="$listeners"
          ref="table"
          class="blue-table-response"
        ></blue-table>
      </div>
      <div v-else>
        <blue-table
          :height="height"
          v-bind="$attrs"
          :loading="loading"
          :datas="datas"
          :columns="tablecolumns"
          v-on="$listeners"
          ref="table"
          class="blue-table-response"
        ></blue-table>
      </div>
    </div>
    <div class="blue-data-table-pagination" v-if="showPagination&&!loading">
      <blue-pagination
        v-model="paginations"
        align="right"
        class="data-table-pager"
        @change="pageChange"
      ></blue-pagination>
    </div>
  </div>
</template>

<script>
import blueDatepicker from "../date-picker/datepicker";
import blueButton from "../button/button";
import blueFrom from "../form/form";
import blueTable from "../table/table";
import bluePagination from "../pagination/pagination";
export default {
  name: "blueDatatable",
  components: { blueButton, blueFrom, blueTable },
  props: {
    showPagination: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Array,
      default: () => []
    },
    tabledatas: {
      type: Array,
      default: () => []
    },
    tablecolumns: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    advfilters: {
      type: Array,
      default: () => []
    },
    ths: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: () => "threecolumn"
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      paginations: {},
      loading: false,
      showform: false,
      filterCollection: {},
      custom: false,
      datas: [],
      showfilters:false,
      height: 1000
    };
  },
  created() {
    this.custom = this.ths.length == 0 ? false : true;
    this.showfilters = this.filters.length == 0 ? false : true;
    this.datas = this.tabledatas;
    this.paginations = this.pagination;
  },
  methods: {
    pageChange(e) {
      this.$emit("pageChange", e);
    },
    clickactions(e) {
      this.$emit("actionclick", e);
    },
    filtersearch(e) {
      const filterCollection = this.filters.concat(this.advfilters);
      this.$emit("filtercolleCtionSearch", filterCollection);
    },
    filtershow() {
      this.showform = !this.showform;
    },
    filterreset() {
      this.filters.forEach((elem, idx) => {
        elem.value = "";
      });
      this.advfilters.forEach((elem, idx) => {
        elem.value = "";
      });
    }
  },
  mounted() {
    this.height = this.$refs.pagtable.offsetHeight - 100;
    window.onresize = () => {
      this.height = this.$refs.pagtable.offsetHeight - 100;
    };
  }
};
</script>
