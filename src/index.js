/*
 * BlueUI JavaScript Library
 * https://BlueUI.top/
 *
 * Copyright © Lan 2017-present
 * Released under the MIT license
 *
 */
import Affix from "@/src/components/affix";
import AutoComplete from "@/src/components/auto-complete";
import Avatar from "@/src/components/avatar";
import BackTop from "@/src/components/back-top";
import Badge from "@/src/components/badge";
import Breadcrumb from "@/src/components/breadcrumb";
import Button from "@/src/components/button";
import ButtonGroup from "@/src/components/button-group";
import Carousel from "@/src/components/carousel";
import Category from "@/src/components/category";
import CategoryPicker from "@/src/components/category-picker";
import Cell from "@/src/components/cell";
import Checkbox from "@/src/components/checkbox";
import Circle from "@/src/components/circle";
import Collapse from "@/src/components/collapse";
import CollapseItem from "@/src/components/collapse-item";
import Content from "@/src/components/content";
import DateFullRangePicker from "@/src/components/date-full-range-picker";
import DatePicker from "@/src/components/date-picker";
import DateRangePicker from "@/src/components/date-range-picker";
import DropdownCustom from "@/src/components/dropdown-custom";
import DropdownMenu from "@/src/components/dropdown-menu";
import Form from "@/src/components/form";
import FormItem from "@/src/components/form-item";
import FormItemList from "@/src/components/form-item-list";
import HFooter from "@/src/components/h-footer";
import HHeader from "@/src/components/h-header";
import fixSwitch from "@/src/components/h-switch";
import ImagePreview from "@/src/components/image-preview";
import Layout from "@/src/components/layout";
import Loading from "@/src/components/loading";
import Menu from "@/src/components/menu";
import Modal from "@/src/components/modal";
import ModalComponent from "@/src/components/modal-component";
import NumberInput from "@/src/components/number-input";
import Pagination from "@/src/components/pagination";
import Poptip from "@/src/components/poptip";
import Progress from "@/src/components/progress";
import Radio from "@/src/components/radio";
import Rate from "@/src/components/rate";
import Row from "@/src/components/row";
import Search from "@/src/components/search";
import Select from "@/src/components/select";
import Sider from "@/src/components/sider";
import Skeleton from "@/src/components/skeleton";
import Slider from "@/src/components/slider";
import Steps from "@/src/components/steps";
import SwitchList from "@/src/components/switch-list";
import Table from "@/src/components/table";
import TableItem from "@/src/components/table-item";
import Tabs from "@/src/components/tabs";
import TagInput from "@/src/components/tag-input";
import TextEllipsis from "@/src/components/text-ellipsis";
import Timeline from "@/src/components/timeline";
import TimelineItem from "@/src/components/timeline-item";
import Tooltip from "@/src/components/tooltip";
import Transfer from "@/src/components/transfer";
import Tree from "@/src/components/tree";
import TreePicker from "@/src/components/tree-picker";
import Uploader from "@/src/components/uploader";
import autosize from "@/src/directives/autosize";
import style from "@/src/directives/style";
import tooltip from "@/src/directives/tooltip";
import wordcount from "@/src/directives/wordcount";
import wordlimit from "@/src/directives/wordlimit";
import dictMapping from "@/src/filters/dictmapping";
import hlang from "@/src/filters/hlang";
import locale from "@/src/locale";
import $Clipboard from "@/src/plugins/clipboard";
import $Confirm from "@/src/plugins/confirm";
import $Dropdown from "@/src/plugins/dropdown";
import $ImagePreview from "@/src/plugins/image-preview";
import $Loading from "@/src/plugins/loading";
import $LoadingBar from "@/src/plugins/loading-bar";
import $Message from "@/src/plugins/message";
import $mm from "@/src/plugins/mm";
import $Modal from "@/src/plugins/modal";
import $Notice from "@/src/plugins/notice";
import $nzh from "@/src/plugins/nzh";
import $ScrollIntoView from "@/src/plugins/scroll-into-view";
import config from "@/src/utils/config";






const Col = Cell;

const components = {
  Affix,
  Avatar,
  AutoComplete,
  BackTop,
  Badge,
  Button,
  ButtonGroup,
  Breadcrumb,
  Category,
  CategoryPicker,
  Checkbox,
  fixCircle: Circle,
  DatePicker,
  DateRangePicker,
  DateFullRangePicker,
  DropdownCustom,
  DropdownMenu,
  Form,
  FormItem,
  FormItemList,
  ImagePreview,
  Menu,
  Modal,
  ModalComponent,
  NumberInput,
  Pagination,
  Poptip,
  Progress,
  Radio,
  Rate,
  Row,
  Col,
  Cell,
  Search,
  Select,
  Slider,
  Steps,
  fixSwitch,
  SwitchList,
  Skeleton,
  Timeline,
  TimelineItem,
  Transfer,
  Loading,
  TagInput,
  Table,
  TableItem,
  Tabs,
  Tooltip,
  Tree,
  TreePicker,
  Uploader,
  TextEllipsis,
  Carousel,
  Collapse,
  CollapseItem,
  HHeader,
  HFooter,
  Content,
  Sider,
  Layout
};

const directives = {
  width: style.width,
  color: style.color,
  "bg-color": style.bgColor,
  height: style.height,
  padding: style.padding,
  margin: style.margin,
  font: style.font,
  autosize,
  tooltip,
  wordcount,
  wordlimit
};

const prototypes = {
  $Modal,
  $Notice,
  $Message,
  $Confirm,
  $Loading,
  $LoadingBar,
  $ScrollIntoView,
  $Clipboard,
  $ImagePreview,
  $Dropdown,
  $mm,
  $nzh
};

const filters = { dictMapping, hlang };

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  if (opts.locale) {
    locale.use(opts.locale);
  }
  if (opts.i18n) {
    locale.i18n(opts.i18n);
  }

  Object.keys(components).forEach(key => {
    let component = components[key];
    Vue.component(key, component);
    if (key.startsWith("fix")) {
      Vue.component(
        key.toLocaleLowerCase().replace("fix", "blue-"),
        components[key]
      );
    } else {
      Vue.component(`blue-${key.toLocaleLowerCase()}`, components[key]); //blue-默认名字也能直接使用
    }
  });

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
  });

  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
  });

  Object.keys(prototypes).forEach(key => {
    Vue.prototype[key] = prototypes[key];
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const BlueUI = Object.assign(
  prototypes,
  config,
  { dictMapping },
  { locale: locale.use }
);

BlueUI.install = install;

console.log(
  ` %c
  
██████╗ ██╗     ██╗   ██╗███████╗██╗   ██╗██╗
██╔══██╗██║     ██║   ██║██╔════╝██║   ██║██║
██████╔╝██║     ██║   ██║█████╗  ██║   ██║██║
██╔══██╗██║     ██║   ██║██╔══╝  ██║   ██║██║
██████╔╝███████╗╚██████╔╝███████╗╚██████╔╝██║
╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝

                       一个基于Vue.js的UI组件库
`,
  "color: #3074af"
);

export default BlueUI;
