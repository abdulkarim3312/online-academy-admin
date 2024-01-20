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
                <div :class="['form-group', {'has_error': errorFor('name')}]">
                  <label>Package Name</label>
                  <input type="text" class="form_global" v-model="form.name" :disabled="$route.name === 'package_edit'">
                  <v-errors :errors="errorFor('name')" />
                </div>
              </div>
              <div class="col_6">
                  <div :class="['form-group', {'has_error': errorFor('status')}]">
                      <label>Status</label>
                      <div class="form_inline">
                          <div class="form_radio">
                              <input type="radio" id="active" value="1" v-model="form.status">
                              <label for="active">{{ $t('common.active') }}</label>
                          </div>
                          <div class="form_radio">
                              <input type="radio" id="inactive" value="0" v-model="form.status">
                              <label for="inactive">{{ $t('common.inactive') }}</label>
                          </div>
                      </div>
                      <v-errors :errors="errorFor('status')" />
                  </div>
              </div>
              <div class="col_4">
                <div :class="['form-group', {'has_error': errorFor('user_capacity')}]">
                  <label>User Capacity</label>
                  <input type="text" class="form_global" v-model="form.user_capacity">
                  <v-errors :errors="errorFor('user_capacity')" />
                </div>
              </div> 
              <div class="col_4">
                <div :class="['form-group', {'has_error': errorFor('unit_amount')}]">
                  <label>Unit Amount</label>
                  <input type="text" class="form_global" v-model="form.unit_amount" :disabled="$route.name === 'package_edit'">
                  <v-errors :errors="errorFor('unit_amount')" />
                </div>
              </div>
              <div class="col_4">
                  <div class="form-group">
                      <label>Interval</label>
                      <select class="form_global" id="interval" v-model="form.interval" :disabled="$route.name === 'package_edit'">
                          <option value="">--Select Interval--</option>
                          <option value="day">Daily</option>
                          <option value="week">Weekly</option>
                          <option value="month">Monthly</option>
                          <option value="year">Yearly</option>
                      </select>
                      <v-errors :errors="errorFor('interval')"></v-errors>
                  </div>
              </div>
            </div>

            <div class="row">
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('feature_one')}]">
                  <label>Feature One</label>
                  <input type="text" class="form_global" v-model="form.feature_one">
                  <v-errors :errors="errorFor('feature_one')" />
                </div>
              </div>              
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('feature_two')}]">
                  <label>Feature Two</label>
                  <input type="text" class="form_global" v-model="form.feature_two">
                  <v-errors :errors="errorFor('feature_two')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('feature_three')}]">
                  <label>Feature Three</label>
                  <input type="text" class="form_global" v-model="form.feature_three">
                  <v-errors :errors="errorFor('feature_three')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('feature_four')}]">
                  <label>Feature Four</label>
                  <input type="text" class="form_global" v-model="form.feature_four">
                  <v-errors :errors="errorFor('feature_four')" />
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('feature_five')}]">
                  <label>Feature Five</label>
                  <input type="text" class="form_global" v-model="form.feature_five">
                  <v-errors :errors="errorFor('feature_five')" />
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
  name: 'package-form',
  components: {
  },
  data() {
    return {
      title: this.$t('sidebar.packageManagement.addPackage'),
      cancelRouteName: 'package_list',
      form: {
        name: '',
        status: 1,
        user_capacity: '',
        unit_amount: '',
        interval: 'month',
        feature_one: '',
        feature_two: '',
        feature_three: '',
        feature_four: '',
        feature_five: '',
      }
    }
  },
  created() {

    if (this.$route.name === 'package_edit') {
      this.axios.get('/packages/'+this.$route.params.id)
          .then((response) => {
            this.form = response.data.data;
          })
      this.title = 'Edit Package';
    }
  },
  watch:{
    
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      if (this.$route.name === 'package_edit') {
        this.axios.patch('/packages/'+this.$route.params.id, this.form)
            .then(() => {
              this.$router.push({name: 'package_list'});
              this.showSuccessMsg(this.$t('common.updateSuccess'))
            })
            .catch((err) => {
              this.allErrors = err.response.data.errors;
            })
            .finally(() => {
              this.loading = false;
            });
      } else {
        this.axios.post('/packages', this.form)
            .then(() => {
              this.$router.push({name: 'package_list'});
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
