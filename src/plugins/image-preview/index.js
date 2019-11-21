import Preview from "@/src/plugins/image-preview/image-preview-modal";
import Modal from "@/src/plugins/modal";

export default function(datas, index) {
  return Modal({
    className: "blue-image-preview-modal",
    component: {
      vue: Preview,
      datas: {
        isShow: true,
        datas,
        index
      }
    }
  });
}
