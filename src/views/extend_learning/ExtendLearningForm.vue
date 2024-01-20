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
                <div :class="['form-group', {'has_error': errorFor('sub_sub_title')}]">
                  <label>Sub Sub Title</label>
                  <input type="text" class="form_global" v-model="form.sub_sub_title">
                  <v-errors :errors="errorFor('sub_sub_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('footer')}]">
                  <label>Footer</label>
                  <input type="text" class="form_global" v-model="form.footer">
                  <v-errors :errors="errorFor('footer')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('do_more_title')}]">
                  <label>More Title</label>
                  <input type="text" class="form_global" v-model="form.do_more_title">
                  <v-errors :errors="errorFor('do_more_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('learn_more_title')}]">
                  <label>Learn More Title</label>
                  <input type="text" class="form_global" v-model="form.learn_more_title">
                  <v-errors :errors="errorFor('learn_more_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('do_more_description')}]">
                  <label>More Description</label>
                    <text-editor-component 
                    :id="'do_more_description'" 
                    :descriptive="''"
                    :existingData="form.do_more_description ? form.do_more_description : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('do_more_description')"></v-errors>
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('learn_more_description')}]">
                  <label>Learn More Description</label>
                    <text-editor-component 
                    :id="'learn_more_description'" 
                    :descriptive="''"
                    :existingData="form.learn_more_description ? form.learn_more_description : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('learn_more_description')"></v-errors>
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
      title: 'Extend Learning',
      form: {
        title: '',
        sub_title: '',
        sub_sub_title: '',
        footer: '',
        do_more_title: '',
        do_more_description: '',
        learn_more_title: '',
        learn_more_description: ''
      },
      tempPhoto: '',
    }
  },
  created() {
    this.axios.get('/extend-learning-data', this.form,)
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

      this.axios.post('/extend-learning', this.form)
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
