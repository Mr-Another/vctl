<template>
  <div :class="uploaderCls">
    <template v-if="type=='image'">
    <input
        @change="fileChange($event)"
        type="file"
        id="blue-upload-file"
        name="f1"
        multiple
        style="display: none"
      />
      <div class="blue-uploader-image" v-if="file">
        <div class="blue-uploader-image-background" :style="getBackgroundImage(file)"></div>
        <div class="blue-uploader-progress" v-if="file.status==2||file.status==1">
          <Progress :percent="file.percent" :stroke-width="5"></Progress>
        </div>
        <div class="blue-uploader-image-operate blue-uploader-browse-button" v-else>
          <div>{{showReUploadWord}}</div>
        </div>
      </div>
      <div class="blue-uploader-image-empty blue-uploader-browse-button" @click="fileClick" v-else>
        <i class="icon-plus"></i>
      </div>
    </template>
    <template v-if="type=='images'">
    <input
        @change="fileChange($event)"
        type="file"
        id="blue-upload-file"
        name="f1"
        multiple
        style="display: none"
      />
      <div class="blue-uploader-image-empty blue-uploader-browse-button" @click="fileClick" v-if="!readonly">
        <i class="icon-plus"></i>
      </div>
      <div v-for="(file, index) in fileList" :key="file.id" class="blue-uploader-image">
        <div class="blue-uploader-image-background" :style="getBackgroundImage(file)"></div>
        <div class="blue-uploader-progress" v-if="file.status==2||file.status==1">
          <Progress :percent="file.percent" :stroke-width="5"></Progress>
        </div>
        <div
          class="blue-uploader-image-operate"
          v-else
          @click="clickImage(index, file)"
          :class="{'blue-uploader-image-operate-pointer': readonly}"
        >
          <div v-if="!readonly">
            <span class="blue-uploader-operate" @click="previewImage(index)">
              <i class="icon-fullscreen"></i>
            </span>
            <i class="blue-split" style="width: 3px;"></i>
            <span class="blue-uploader-operate" @click="deleteFile(index)">
              <i class="icon-trash"></i>
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type=='file'||type=='files'">
      <div
        v-if="$slots.dragdrop"
        class="blue-uploader-browse-button blue-uploader-drop-element"
        :class="{'blue-uploader-dragging': isdragging}"
        @dragover="isdragging=true"
        @dragleave="isdragging=false"
        @drop="isdragging=false"
      >
        <slot name="dragdrop"></slot>
      </div>
      <div v-else>
        <button
          icon="icon-upload"
          class="blue-btn blue-uploader-browse-button"
          v-show="showUploadButton"
          @click="fileClick"
        >{{showUploadWord}}</button>
      </div>

      

      <div class="blue-uploader-files">
        <div v-for="(file, index) in fileList" :key="file.id" class="blue-uploader-file">
          <div class="blue-uploader-file-progress" v-if="file.status==2">
            <Progress :percent="file.percent" :stroke-width="5">
              <span slot="title">{{file[param.fileName]}}</span>
            </Progress>
          </div>
          <div class="blue-uploader-file-info" v-else>
            <span class="link" @click="clickfile(file, index)">{{file.name}}</span>
            <i class="icon-trash middle-right link" v-if="!readonly" @click="deleteFile(index)"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import utils from "@/src/utils/utils";
import config from "@/src/utils/config";
import Locale from "@/src/mixins/locale";
import ImagePreview from "@/src/plugins/image-preview";

const prefix = "blue-uploader";

const parse = function(value, param) {
  if (utils.isString(value)) {
    return { url: value, original: { [param.urlName]: value } };
  } else if (utils.isObject(value)) {
    return {
      url: value[param.urlName],
      name: value[param.fileName],
      thumbUrl: value.thumbUrl || param.thumbUrl.call(value),
      original: value
    };
  }
};
const dispose = function(value, type, param) {
  if (type == "url") {
    return value.url;
  } else if (utils.isObject(value)) {
    if (value.original) {
      return value.original;
    }
    return {
      [param.urlName]: value.url,
      [param.fileName]: value.name,
      thumbUrl: value.thumbUrl,
      file: value
    };
  }
};

export default {
  name: "blueUploader",
  mixins: [Locale],
  props: {
    type: {
      type: String,
      default: "file" // files, image, images
    },
    dataType: {
      type: String,
      default: "file" // url
    },
    uploadList: {
      type: Array,
      default: () => []
    },
    files: {
      type: [Array, Object, String],
      default: () => []
    },
    limit: Number,
    className: String,
    readonly: {
      type: Boolean,
      default: false
    },
    headers:Object,
    action:{
      type:String,
      // required:true
    },
    data:Object,
    onBeforeSend:Function,
    onSuccess:Function,
    onError:Function,
    httpRequest:{
      type:Function,
      default:null
    }
  },
  data() {
    let param = {};
    if (this.config) {
      param = utils.extend({}, config.getOption("uploader"), this.option);
    } else {
      param = utils.extend({}, config.getOption("uploader"), this.option);
    }
    return {
      param,
      preview: false,
      previewIndex: -1,
      isdragging: false
    };
  },
  methods: {
    fileClick() {
      document.getElementById("blue-upload-file").click();
    },
    fileChange(el) {
      const uploadFile = el.target.files
      let postFiles = Array.prototype.slice.call(el.target.files);
      if (!el.target.files[0].size) return;
      console.log(this.param)
      postFiles.forEach(rawFile => {
        this.upload(rawFile)
      })
    },
    upload(rawFile){
      const { uid } = rawFile;
      console.log(rawFile)
      const options = {
        headers:this.headers,
        file:rawFile,
        action:this.action,
      }
      console.log(options)
    },
    clickfile(file, index) {
      this.$emit("fileclick", file, index);
    },
    clickImage(index, file) {
      if (this.readonly) {
        ImagePreview(this.fileList, index);
      } else {
        this.$emit("imageclick", file);
      }
    },
    previewImage(index) {
      ImagePreview(this.fileList, index);
    },
    getBrowseButton() {
      return this.$el.querySelector(".blue-uploader-browse-button");
    },
    getDropElement() {
      return this.$el.querySelector(".blue-uploader-drop-element");
    },
    getBackgroundImage(file) {
      let param = {};
      if (file.thumbUrl || file.url) {
        param["background-image"] = `url(${file.thumbUrl || file.url})`;
      }
      return param;
    },
    getFileList() {
      if (this.isSingle) {
        return this.file ? dispose(this.file, this.dataType, this.param) : null;
      }

      let list = [];
      for (let f of this.fileList) {
        list.push(dispose(f, this.dataType, this.param));
      }
      return list;
    },
    deleteFile(index) {
      this.$emit("deletefile", index);
    }
  },
  computed: {
    showUploadButton() {
      if (this.readonly) return false;
      return (
        (!this.isSingle && (!this.limit || this.limit > this.files.length)) ||
        (this.isSingle && !this.files)
      );
    },
    showReUploadWord() {
      return this.t("h.uploader.reUpload");
    },
    showUploadWord() {
      return this.t("h.uploader.upload");
    },
    isSingle() {
      return this.type == "image" || this.type == "file";
    },
    uploaderCls() {
      return {
        [prefix]: true,
        [`${prefix}-${this.type}-container`]: true,
        [this.className]: this.className
      };
    },
    fileList() {
      let list = [];
      if (utils.isArray(this.files)) {
        for (let v of this.files) {
          list.push(parse(v, this.param));
        }
      } else if (this.files) {
        list.push(parse(this.files, this.param));
      }

      if (this.uploadList.length > 0) {
        if (this.isSingle) {
          list = [this.uploadList[0]];
        } else {
          list.push(...this.uploadList);
        }
      }
      return list;
    },
    file() {
      return this.fileList.length ? this.fileList[0] : null;
    }
  },
  mounted() {
    console.log(this.file)
    console.log(this.showUploadWord);
  },
};
</script>
