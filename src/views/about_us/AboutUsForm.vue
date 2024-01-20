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
                <div :class="['form-group', {'has_error': errorFor('sub_title')}]">
                  <label>Sub Title</label>
                  <input type="text" class="form_global" v-model="form.sub_title">
                  <v-errors :errors="errorFor('sub_title')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('description')}]">
                  <label>Description</label>
                    <text-editor-component 
                    :id="'description'" 
                    :descriptive="''"
                    :existingData="form.description ? form.description : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('description')"></v-errors>
                </div>
              </div>
             

              <div class="col_6">
                <div class="form-group">
                  <label>Page Image</label>
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
export default {
  components: {TextEditorComponent},
  data() {
    return {
      title: 'Add About Us',
      form: {
        title: '',
        description: '',
        sub_title: '',
        image: '',
      },
      tempPhoto: '',
    }
  },
  created() {
    this.axios.get('/about-us-data', this.form)
      .then((response) => {
        if(response.data){
          this.form = response.data.data;
        }
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
    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      this.axios.post('/about-us', formData, {
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
