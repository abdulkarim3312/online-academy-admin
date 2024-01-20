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
              <div class="col_12">
                <div :class="['form-group', {'has_error': errorFor('requirement_title')}]">
                  <label>Requirement Title</label>
                  <input type="text" class="form_global" v-model="form.requirement_title">
                  <v-errors :errors="errorFor('requirement_title')" />
                </div>
              </div>
            </div>
            <div class="d_flex_end form_action_btn">
              <router-link class="btn btn_danger ml_10" :to="{name: 'course_requirement_list'}">{{ $t('common.cancel') }}</router-link>
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
      title: 'Add Course Requirement',
      form: {
        requirement_title: '',
      }
    }
  },
  created() {
    if (this.$route.name === 'course_requirement_edit') {
      this.axios.get('/requirements/'+this.$route.params.id)
          .then((response) => {
            this.form = response.data.data;
          })
      this.title = 'Edit Requirement';
    }
  },
  watch:{
    
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'course_requirement_edit') {
        this.axios.patch('/requirements/'+this.$route.params.id, this.form)
            .then(() => {
              this.$router.push({name: 'course_requirement_list'});
              this.showSuccessMsg(this.$t('common.updateSuccess'))
            })
            .catch((err) => {
              this.allErrors = err.response.data.errors;
            })
            .finally(() => {
              this.loading = false;
            });
      } else {
        this.axios.post('/requirements', this.form)
            .then(() => {
              this.$router.push({name: 'course_requirement_list'});
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
  /* .dp__menu{
    top: 196px;
  } */
</style>
