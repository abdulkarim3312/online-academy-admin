<template>
  <div>
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header">
            <div class="card-title">Topic One Content Four</div>
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
                <div :class="['form-group', {'has_error': errorFor('term_one_title')}]">
                  <label>Term One Title</label>
                  <input type="text" class="form_global" v-model="form.term_one_title">
                  <v-errors :errors="errorFor('term_one_title')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('term_two_title')}]">
                  <label>Term Two Title</label>
                  <input type="text" class="form_global" v-model="form.term_two_title">
                  <v-errors :errors="errorFor('term_two_title')" />
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
                <div :class="['form-group', {'has_error': errorFor('term_three_title')}]">
                  <label>Term Three Title</label>
                  <input type="text" class="form_global" v-model="form.term_three_title">
                  <v-errors :errors="errorFor('term_three_title')" />
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
              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('term_five_title')}]">
                  <label>Term Five Title</label>
                  <input type="text" class="form_global" v-model="form.term_five_title">
                  <v-errors :errors="errorFor('term_five_title')" />
                </div>
              </div>
              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('term_five_content')}]">
                  <label>Term Five Content</label>
                  <text-editor-component 
                    :id="'term_five_content'" 
                    :descriptive="''"
                    :existingData="form.term_five_content ? form.term_five_content : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('term_five_content')"></v-errors>
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
      title: 'Topic One Content One',
      cancelRouteName: 'package_list',
      subjects: [],
      connection_services: [],
      form: {
        title: '',
        description: '',
        footer_title: '',
        term_one_title: '',
        term_one_content: '',
        term_two_title: '',
        term_two_content: '',
        term_three_title: '',
        term_three_content: '',
        term_four_title: '',
        term_four_content: '',
        term_five_title: '',
        term_five_content: '',
      },
      tempPhoto: '',
    }
  },
  created() {
    this.axios.get('/topic-one-content-four-data', this.form)
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

    submit() {
      this.allErrors = null;
      this.loading = true;
      this.axios.post('/topic-one-content-four', this.form)
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
