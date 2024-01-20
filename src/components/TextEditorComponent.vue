<template>
  <div class="ck_font">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :model-value="existingData"
      :config="editorConfig"
      @blur="onEditorBlur"
    >
    </ckeditor>
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import customFontCss from './custom-font-css.css';

export default {
  name: 'text-editor-component',
  props: {
    id: {
      type: String,
      required: true,
    },
    existingData: {
      type: String,
      required: false,
    },
    descriptive: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      contentsCss: customFontCss,
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          UnderlinePlugin,
          LinkPlugin,
          ParagraphPlugin,
          HtmlEmbed,
          Image,
          ImageToolbar,
          ImageCaption,
          ImageStyle,
          ImageResize,
          LinkImage,
          ImageInsert,
          SimpleUploadAdapter,
          FontFamily,
          FontColor,
          FontBackgroundColor,
        ],
        toolbar: {
          items: [
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'bold',
            'italic',
            'underline',
            'link',
            '|',
            'undo',
            'redo',
            'htmlEmbed',
            '|',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'imageStyle:wrapText',
            'toggleImageCaption',
            'linkImage',
            'insertImage',
          ],
        },
        image: {
          toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'imageStyle:wrapText',
            'toggleImageCaption',
          ],
        },
        htmlEmbed: {
          showPreviews: true,
          sanitizeHtml: (inputHtml) => {
            const outputHtml = this.sanitize(inputHtml);

            return {
              html: outputHtml,
              hasChanged: true,
            };
          },
        },
        simpleUpload: {
          uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/upload/editor-image`,
          withCredentials: true,
          headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            type: this.id,
            descriptive: this.descriptive ? this.descriptive : '',
            Authorization:
              `Bearer ` + JSON.parse(localStorage.getItem('admin')).token,
          },
        },
      },
    };
  },
  created() {},
  mounted() {},
  watch: {
    editorData(curVal) {
      this.$emit('change', this.id, curVal);
    },
  },
  methods: {
    sanitize(inputHtml) {
      return inputHtml;
    },
    onEditorBlur() {
      // if (this.editorData == "" || this.editorData == "<p>&nbsp;</p>") {
      //     this.$emit("id", this.index);
      // }
    },
  },
};
</script>
<style>
.ck-editor__editable {
  min-height: 200px !important;
}
.ck_font {
  font-family: auto !important;
}
</style>
