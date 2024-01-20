<template>
  <div>
   
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header">
            <div class="card-title">Topic Three Content Two</div>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_one_title')}]">
                  <label>Term One Title</label>
                  <input type="text" class="form_global" v-model="form.term_one_title">
                  <v-errors :errors="errorFor('term_one_title')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_one_topic')}]">
                  <label>Term One Topic</label>
                  <input type="text" class="form_global" v-model="form.term_one_topic">
                  <v-errors :errors="errorFor('term_one_topic')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_one_content')}]">
                  <label>Term One Content</label>
                  <text-editor-component 
                    :id="'term_one_content'" 
                    :descriptive="''"
                    :existingData="form.term_one_content ? form.term_one_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_one_content')"></v-errors>
                </div>
              </div>
              
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_one_topic_desc')}]">
                  <label>Term One Topic Description</label>
                    <text-editor-component 
                    :id="'term_one_topic_desc'" 
                    :descriptive="''"
                    :existingData="form.term_one_topic_desc ? form.term_one_topic_desc : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_one_topic_desc')"></v-errors>
                </div>
              </div>

              <!-- <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_one_topic_desc')}]">
                  <label>Term One Topic Description</label>
                  <input type="text" class="form_global" v-model="form.term_one_topic_desc">
                  <v-errors :errors="errorFor('term_one_topic_desc')" />
                </div>
              </div> -->

              <div class="col_6">
                <div class="form-group">
                  <label>Term One Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="term_one_image"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('term_one_image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhotoOne || form.term_one_image">
                  <div class="inner">
                    <img v-if="tempPhotoOne" :src="tempPhotoOne" alt="" width="150">
                    <img v-else :src="form.term_one_image" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_two_title')}]">
                  <label>Term Two Title </label>
                  <input type="text" class="form_global" v-model="form.term_two_title">
                  <v-errors :errors="errorFor('term_two_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_two_topic')}]">
                  <label>Term Two Topic</label>
                  <input type="text" class="form_global" v-model="form.term_two_topic">
                  <v-errors :errors="errorFor('term_two_topic')" />
                </div>
              </div>


              <div class="col_6">
                <div class="form-group">
                  <label>Term Two Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="term_two_image"
                    @input="onFileChangeTwo($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('term_two_image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhotoTwo || form.term_two_image">
                  <div class="inner">
                    <img v-if="tempPhotoTwo" :src="tempPhotoTwo" alt="" width="150">
                    <img v-else :src="form.term_two_image" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoTwo"></span>
                  </div>
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_two_content')}]">
                  <label>Term Two Content</label>
                  <text-editor-component 
                    :id="'term_two_content'" 
                    :descriptive="''"
                    :existingData="form.term_two_content ? form.term_two_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_two_content')"></v-errors>
                </div>
              </div>


              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_two_topic_desc')}]">
                  <label>Term Two Topic Description</label>
                    <text-editor-component 
                    :id="'term_two_topic_desc'" 
                    :descriptive="''"
                    :existingData="form.term_two_topic_desc ? form.term_two_topic_desc : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_two_topic_desc')"></v-errors>
                </div>
              </div>

             

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_three_title')}]">
                  <label>Term Three Title</label>
                  <input type="text" class="form_global" v-model="form.term_three_title">
                  <v-errors :errors="errorFor('term_three_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_three_topic')}]">
                  <label>Term Three Topic</label>
                  <input type="text" class="form_global" v-model="form.term_three_topic">
                  <v-errors :errors="errorFor('term_three_topic')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_three_content')}]">
                  <label>Term Three Content</label>
                  <text-editor-component 
                    :id="'term_three_content'" 
                    :descriptive="''"
                    :existingData="form.term_three_content ? form.term_three_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_three_content')"></v-errors>
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_three_topic_desc')}]">
                  <label>Term Three Topic Description</label>
                    <text-editor-component 
                    :id="'term_three_topic_desc'" 
                    :descriptive="''"
                    :existingData="form.term_three_topic_desc ? form.term_three_topic_desc : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_three_topic_desc')"></v-errors>
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <label>Term Three Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="term_three_image"
                    @input="onFileChangeThree($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('term_three_image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhotoThree || form.term_three_image">
                  <div class="inner">
                    <img v-if="tempPhotoThree" :src="tempPhotoThree" alt="" width="150">
                    <img v-else :src="form.term_three_image" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoThree"></span>
                  </div>
                </div>
              </div>


              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_four_title')}]">
                  <label>Term Four Title</label>
                  <input type="text" class="form_global" v-model="form.term_four_title">
                  <v-errors :errors="errorFor('term_four_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_four_topic')}]">
                  <label>Term Four Topic</label>
                  <input type="text" class="form_global" v-model="form.term_four_topic">
                  <v-errors :errors="errorFor('term_four_topic')" />
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <label>Term Four Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="term_four_image"
                    @input="onFileChangeFour($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('term_four_image')"></v-errors>
                </div>
                <div class="thumbnail_img" v-if="tempPhotoFour || form.term_four_image">
                  <div class="inner">
                    <img v-if="tempPhotoFour" :src="tempPhotoFour" alt="" width="150">
                    <img v-else :src="form.term_four_image" alt="" width="150">
                    <span class="close_icon" @click="removeTempPhotoFour"></span>
                  </div>
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_four_content')}]">
                  <label>Term Four Content</label>
                  <text-editor-component 
                    :id="'term_four_content'" 
                    :descriptive="''"
                    :existingData="form.term_four_content ? form.term_four_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_four_content')"></v-errors>
                </div>
              </div>
             
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_four_topic_desc')}]">
                  <label>Term Four Topic Description</label>
                    <text-editor-component 
                    :id="'term_four_topic_desc'" 
                    :descriptive="''"
                    :existingData="form.term_four_topic_desc ? form.term_four_topic_desc : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_four_topic_desc')"></v-errors>
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
      title: 'Topic Three Content One',
      form: {
        term_one_title: '',
        term_one_content: '',
        term_one_topic: '',
        term_one_topic_desc: '',
        term_one_image: '',
        term_two_title: '',
        term_two_content: '',
        term_two_topic: '',
        term_two_topic_desc: '',
        term_two_image: '',
        term_three_title: '',
        term_three_content: '',
        term_three_topic: '',
        term_three_topic_desc: '',
        term_three_image: '',
        term_four_title: '',
        term_four_content: '',
        term_four_topic: '',
        term_four_topic_desc: '',
        term_four_image: '',
      },
      tempPhotoOne: '',
      tempPhotoTwo: '',
      tempPhotoThree: '',
      tempPhotoFour: '',
    }
  },
  created() {
    this.axios.get('/topic-three-content-two-data', this.form)
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
      this.form.term_one_image = e.target.files[0];
      this.tempPhotoOne = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
      this.tempPhotoOne = '';
      this.form.term_one_image = '';
      this.$refs.term_one_image.value = null;
    },
    onFileChangeTwo(e) {
      this.form.term_two_image = e.target.files[0];
      this.tempPhotoTwo = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoTwo() {
      this.tempPhotoTwo = '';
      this.form.term_two_image = '';
      this.$refs.term_two_image.value = null;
    },
    onFileChangeThree(e) {
      this.form.term_three_image = e.target.files[0];
      this.tempPhotoThree = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoThree() {
      this.tempPhotoThree = '';
      this.form.term_three_image = '';
      this.$refs.term_three_image.value = null;
    },
    onFileChangeFour(e) {
      this.form.term_four_image = e.target.files[0];
      this.tempPhotoFour = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoFour() {
      this.tempPhotoFour = '';
      this.form.term_four_image = '';
      this.$refs.term_four_image.value = null;
    },

    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      this.axios.post('/topic-three-content-two', formData, {
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
