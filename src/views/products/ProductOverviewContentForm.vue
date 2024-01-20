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
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" width="150">
                    <img v-else :src="form.image" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>

              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('short_description')}]">
                  <label>Short Description</label>
                  <input type="text" class="form_global" v-model="form.short_description">
                  <v-errors :errors="errorFor('short_description')" />
                </div>
              </div>

              
              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('long_description')}]">
                  <label>Long Description</label>
                    <text-editor-component 
                    :id="'long_description'" 
                      :existingData="form.long_description ? form.long_description : ''" 
                      @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('long_description')"></v-errors>
                </div>
              </div>
            </div>
            <div class="d_flex_end form_action_btn">
              <router-link class="btn btn_danger ml_10" :to="{name: cancelRouteName}">{{ $t('common.cancel') }}</router-link>
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
      title: 'Add Product Overview Content',
      cancelRouteName: 'product_overview_content_list',
      form: {
        product_overview_id: '',
        title: '',
        short_description: "",
        long_description: '',
        image: '',
      },
      tempPhoto: '',
    }
  },
  created() {

  if (this.$route.name === 'product_overview_content_edit') {
    this.axios.get('/product-content-overview/'+this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.form = response.data.data;
        })
    this.title = 'Edit Product Content';
  }
  },
  watch:{

  },
  methods: {
    changeEditorValue(editorId, data){
      this.form[editorId] = data
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
    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      if (this.$route.name === 'product_overview_content_edit') {
          formData.append('_method','PATCH')
          this.axios.post('/product-content-overview/'+this.$route.params.id, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(() => {
              this.$router.push({name: 'product_overview_content_list'});
              this.showSuccessMsg(this.$t('common.updateSuccess'))
            })
            .catch((err) => {
              this.allErrors = err.response.data.errors;
            })
            .finally(() => {
              this.loading = false;
            });
      } else {
        this.axios.post('/product-content-overview', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            this.$router.push({name: 'product_overview_content_list'});
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
}
</script>
<style scoped>
  
</style>
