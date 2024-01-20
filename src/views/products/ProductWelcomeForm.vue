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
                <div :class="['form-group', {'has_error': errorFor('title')}]">
                  <label>Title</label>
                  <input type="text" class="form_global" v-model="form.title">
                  <v-errors :errors="errorFor('title')" />
                </div>
              </div>

              <!-- <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('product_id')}]">
                  <label>Product Name</label>
                  <select v-model="form.product_id" class="form_global">
                    <option value="">--Select Package Name--</option>
                    <option :value="salesOrder.id" v-for="(salesOrder, index) in salesOrders" :key="index"></option>
                  </select>
                  <v-errors :errors="errorFor('product_id')" />
                </div>
              </div> -->

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('note')}]">
                  <label>Note</label>
                  <input type="text" class="form_global" v-model="form.note">
                  <v-errors :errors="errorFor('note')" />
                </div>
              </div>
              <div class="col_6">
                <div class="form-group">
                  <label>Page Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="page_image"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('page_image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhoto || form.page_image">
                  <div class="inner">
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" width="150">
                    <img v-else :src="form.page_image" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>
              <div class="col_12">
                <div class="form-group ">
                    <label>Description</label>
                    <text-editor-component 
                      :id="'description'" 
                      :existingData="form.description ? form.description : ''" 
                      @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('description')"></v-errors>
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
import TextEditorComponent from "@/components/TextEditorComponent";
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  components: {TextEditorComponent},
  data() {
    return {
      title: 'Add Product Welcome',
      form: {
        title: '',
        description: '',
        note: '',
        page_image: '',
      },
      tempPhoto: '',
    }
  },
  created() {
    this.axios.get('/product-welcome-data', this.form)
          .then((response) => {
            console.log(response);
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
      this.form.page_image = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
      this.tempPhoto = '';
      this.form.page_image = '';
      this.$refs.page_image.value = null;
    },
    submit() {
        this.allErrors = null;
        this.loading = true;
        let formData = new FormData();

        Object.keys(this.form).forEach((key) => {
          formData.append(key, this.form[key] ? this.form[key] : '');
        });

        this.axios.post('/product-welcome', formData, {
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
