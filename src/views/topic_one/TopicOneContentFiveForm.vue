<template>
  <div>
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header">
            <div class="card-title">Topic One Content Five</div>
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
                <div :class="['form-group', {'has_error': errorFor('footer_title')}]">
                  <label>Footer Title</label>
                  <input type="text" class="form_global" v-model="form.footer_title">
                  <v-errors :errors="errorFor('footer_title')" />
                </div>
              </div>

              <div class="col_12">
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
                <div :class="['form-group', {'has_error': errorFor('point_one_content')}]">
                  <label>Point One Content</label>
                  <text-editor-component 
                    :id="'point_one_content'" 
                    :descriptive="''"
                    :existingData="form.point_one_content ? form.point_one_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_one_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_two_content')}]">
                  <label>Point Two Content</label>
                  <text-editor-component 
                    :id="'point_two_content'" 
                    :descriptive="''"
                    :existingData="form.point_two_content ? form.point_two_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_two_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_three_content')}]">
                  <label>Point Three Content</label>
                  <text-editor-component 
                    :id="'point_three_content'" 
                    :descriptive="''"
                    :existingData="form.point_three_content ? form.point_three_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_three_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_four_content')}]">
                  <label>Point Four Content</label>
                  <text-editor-component 
                    :id="'point_four_content'" 
                    :descriptive="''"
                    :existingData="form.point_four_content ? form.point_four_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_four_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_five_content')}]">
                  <label>Point Five Content</label>
                  <text-editor-component 
                    :id="'point_five_content'" 
                    :descriptive="''"
                    :existingData="form.point_five_content ? form.point_five_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_five_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_six_content')}]">
                  <label>Point Six Content</label>
                  <text-editor-component 
                    :id="'point_six_content'" 
                    :descriptive="''"
                    :existingData="form.point_six_content ? form.point_six_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_six_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_seven_content')}]">
                  <label>Point Seven Content</label>
                  <text-editor-component 
                    :id="'point_seven_content'" 
                    :descriptive="''"
                    :existingData="form.point_seven_content ? form.point_seven_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_seven_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_eight_content')}]">
                  <label>Point Eight Content</label>
                  <text-editor-component 
                    :id="'point_eight_content'" 
                    :descriptive="''"
                    :existingData="form.point_eight_content ? form.point_eight_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_eight_content')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('point_nine_content')}]">
                  <label>Point nine content</label>
                  <text-editor-component 
                    :id="'point_nine_content'" 
                    :descriptive="''"
                    :existingData="form.point_nine_content ? form.point_nine_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('point_nine_content')"></v-errors>
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
      title: 'Topic One Content Five',
      form: {
        title: '',
        description: '',
        footer_title: '',
        point_one_content: '',
        point_two_content: '',
        point_three_content: '',
        point_four_content: '',
        point_five_content: '',
        point_six_content: '',
        point_seven_content: '',
        point_eight_content: '',
        point_nine_content: '',
        image: '',
      },
      tempPhoto: '',
    }
  },
  created() {
    this.axios.get('/topic-one-content-five-data', this.form,)
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

      this.axios.post('/topic-one-content-five', formData, {
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
