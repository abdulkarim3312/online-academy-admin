<template>
  <div>
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header">
            <div class="card-title">Topic Two Content Five</div>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('title')}]">
                  <label>Title</label>
                  <input type="text" class="form_global" v-model="form.title">
                  <v-errors :errors="errorFor('title')" />
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
                <div :class="['form-group', {'has_error': errorFor('right_description')}]">
                  <label>Right Description</label>
                    <text-editor-component 
                    :id="'right_description'" 
                    :descriptive="''"
                    :existingData="form.right_description ? form.right_description : ''" 
                    @change="changeEditorValue"
                    />
                    <v-errors :errors="errorFor('right_description')"></v-errors>
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
      title: 'Topic Two Content Five',
      form: {
        title: '',
        description: '',
        right_description: '',
      },
    }
  },
  created() {
    this.axios.get('/topic-two-content-five-data', this.form)
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

      this.axios.post('/topic-two-content-five', this.form)
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
