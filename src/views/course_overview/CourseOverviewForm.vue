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
                  <label>Course Overview Title</label>
                  <input type="text" class="form_global" v-model="form.title">
                  <v-errors :errors="errorFor('title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('sub_title')}]">
                  <label>Course Overview Sub Title</label>
                  <input type="text" class="form_global" v-model="form.sub_title">
                  <v-errors :errors="errorFor('sub_title')" />
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
export default {
  name: 'overview-form',
  components: {},
  data() {
    return {
      title: 'Course Overview Add',
      cancelRouteName: 'course_overview_list',
      form: {
        title: '',
        sub_title: '',
      },
    }
  },
  created() {

    if (this.$route.name === 'course_overview_edit') {
      this.axios.get('/overviews/'+this.$route.params.id)
          .then((response) => {
            console.log(response);
            this.form = response.data.data;
          })
      this.title = 'Edit Overview';
    }
  },
  watch:{
    
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'course_overview_edit') {
        this.axios.patch('/overviews/'+this.$route.params.id, this.form)
            .then(() => {
              this.$router.push({name: 'course_overview_list'});
              this.showSuccessMsg(this.$t('common.updateSuccess'))
            })
            .catch((err) => {
              this.allErrors = err.response.data.errors;
            })
            .finally(() => {
              this.loading = false;
            });
      } else {
        this.axios.post('/overviews', this.form)
            .then(() => {
              this.$router.push({name: 'course_overview_list'});
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
