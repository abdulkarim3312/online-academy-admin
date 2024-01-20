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
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('product_title')}]">
                  <label>Product Title</label>
                  <input type="text" class="form_global" v-model="form.product_title">
                  <v-errors :errors="errorFor('product_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('product_sub_title')}]">
                  <label>Product Sub Title</label>
                  <input type="text" class="form_global" v-model="form.product_sub_title">
                  <v-errors :errors="errorFor('product_sub_title')" />
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <label>Product Logo</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="product_logo"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('product_logo')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhoto || form.product_logo">
                  <div class="inner">
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" />
                    <img v-else :src="form.product_logo" alt="" />
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <label>Product Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="product_image"
                    @input="onFileChangeTwo($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('product_image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhotoTwo || form.product_image">
                  <div class="inner">
                    <img v-if="tempPhotoTwo" :src="tempPhotoTwo" alt="" />
                    <img v-else :src="form.product_image" alt="" />
                    <span class="close_icon" @click="removeTempPhotoTwo"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d_flex_end form_action_btn">
              <!-- <router-link class="btn btn_danger ml_10" :to="{name: cancelRouteName}">{{ $t('common.cancel') }}</router-link> -->
              <button class="btn btn_blue ml_10" :disabled="loading" @click.prevent="submit">{{ $t('common.save') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TextEditorComponent from "@/components/TextEditorComponent";
// import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  components: {},
  data() {
    return {
      title: 'Add Product',
      form: {
        product_title: '',
        product_sub_title: '',
        product_logo: "",
        product_image: '',
      },
      tempPhoto: '',
      tempPhotoTwo: ''
    }
  },
  created() {
    this.axios.get('/product-data', this.form)
          .then((response) => {
            this.form = response.data.data;
          })
  },
  watch:{
    
  },
  methods: {
    changeEditorValue(editorId, data){
      this.form[editorId] = data
    },

    onFileChangeOne(e) {
      this.form.product_logo = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
      this.tempPhoto = '';
      this.form.product_logo = '';
      this.$refs.product_logo.value = null;
    },

    onFileChangeTwo(e) {
      this.form.product_image = e.target.files[0];
      this.tempPhotoTwo = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoTwo() {
      this.tempPhotoTwo = '';
      this.form.product_image = '';
      this.$refs.product_image.value = null;
    },
    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      this.axios.post('/product', formData, {
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
