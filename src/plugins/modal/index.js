import Notify from "@/src/plugins/notify";
import utils from "@/src/utils/utils";
import config from "@/src/utils/config";

const prefixCls = "blue-modal";
const hasDivider = config.getOption("modal", "hasDivider");

let Vue = null;

let Default = {
  middle: false,
  hasDivider,
  fullScreen: false,
  className: ""
};

function Modal(originalParam) {
  let cls = prefixCls;
  let param = utils.extend(
    { hasMask: true, closeOnMask: true, buttons: ["cancel"] },
    Default,
    originalParam,
    true
  );

  if (originalParam.hasDivider || Default.hasDivider) {
    param.className += ` blue-modal-has-divider`;
  }

  if (param.fullScreen) {
    param.className += ` blue-modal-full-screen`;
  }

  if (param.middle) {
    param.className += ` blue-modal-container-center`;
  }

  if (param.transparent) {
    param.className += ` blue-modal-transparent`;
  }
  if (param.type) {
    param.className += ` blue-modal-type-${param.type}`;
  } else {
    param.className += " blue-modal-type-default";
  }
  param.type = cls;

  param.Vue = Vue;
  return Notify(param);
}

function modal(param) {
  if (this) {
    if (this.$router) {
      param.$router = this.$router;
    }
    if (this.$i18n) {
      param.$i18n = this.$i18n;
    }
  }
  return new Modal(param);
}

modal.config = options => {
  if (options.middle) {
    Default.middle = options.middle;
  }
};

export default modal;
