<template>
  <div>
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header">
            <div class="card-title">{{ title }}</div>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <!-- <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('short_description')}]">
                  <label>Short Description</label>
                  <input type="text" class="form_global" v-model="form.short_description">
                  <v-errors :errors="errorFor('short_description')" />
                </div>
              </div> -->
              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('short_description')}]">
                  <label>Short Description</label>
                    <text-editor-component 
                    :id="'short_description'" 
                    :descriptive="''"
                    :existingData="form.short_description ? form.short_description : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('short_description')"></v-errors>
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="image"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhoto || form.image">
                  <div class="inner">
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" />
                    <img v-else :src="form.image" alt="" />
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>
              <div class="col_6">
                <div class="form-group">
                  <label>Video</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="video"
                    @input="onFileChangeTwo($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('video')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhotoTwo || form.video">
                  <div class="inner">
                    <img v-if="tempPhotoTwo" :src="tempPhotoTwo" alt="" />
                    <img v-else :src="form.video" alt="" />
                    <span class="close_icon" @click="removeTempPhotoTwo"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d_flex_end form_action_btn">
              <button class="btn btn_blue ml_10" :disabled="loading" @click.prevent="submit">{{ $t('common.save') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextEditorComponent from "@/components/TextEditorComponent";
export default {
  components: {TextEditorComponent},
  data() {
    return {
      title: 'Topic One Content One',
      form: {
        short_description: '',
        image: '',
        video: '',
      },
      tempPhoto: '',
      tempPhotoTwo: ''
    }
  },
  created() {
    this.axios.get('/topic-one-content-data', this.form)
        .then((response) => {
          this.form = response.data.data;
        })
    },
  watch:{
    
  },
  methods: {
    changeEditorValue(editorId, data) {
      this.form[editorId] = data;
    },
    onFileChangeOne(e) {
      this.form.image = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
      this.tempPhoto = '';
      this.form.image = '';
      this.$refs.image.value = null;
    },

    onFileChangeTwo(e) {
      this.form.video = e.target.files[0];
      this.tempPhotoTwo = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoTwo() {
      this.tempPhotoTwo = '';
      this.form.video = '';
      this.$refs.video.value = null;
    },
    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      this.axios.post('/topic-one-content-one', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        this.showSuccessMsg(this.$t('common.addSuccess'))
      })
      .catch((err) => {
        this.allErrors = err.response.data.errors;
      })
      .finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>
<style scoped>
  .dp__menu{
    top: 196px;
  }
</style>
