import Pop from "@/src/plugins/pop";
import utils from "@/src/utils/utils";

class Tooltip extends Pop {
  constructor(el, param) {
    param.template = `<div class="blue-tooltip" role="tooltip"><div class="blue-tooltip-arrow"></div><div class="blue-tooltip-inner"></div></div>`;
    param.arrowSelector = ".blue-tooltip-arrow";
    param.innerSelector = ".blue-tooltip-inner";
    let classes = [];
    if (param.theme) {
      classes.push(`blue-tooltip-${param.theme}`);
    }
    if (param.editable) {
      classes.push(`blue-tooltip-editable`);
    }
    param.class = classes.join(" ");
    param.closeOnClickBody = true;
    param.type = "tooltip";
    param.trigger = param.trigger || "hover focus";
    super(el, param);
  }

  updateTemplate(content, html) {
    utils.extend(this.options, { content, html });
    this.updateContent(content, html);
  }
}

export default Tooltip;
