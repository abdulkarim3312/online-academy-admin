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
                <div :class="['form-group', {'has_error': errorFor('title')}]">
                  <label>Title</label>
                  <input type="text" class="form_global" v-model="form.title">
                  <v-errors :errors="errorFor('title')" />
                </div>
              </div>

              <!-- <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('product_id')}]">
                  <label>Product Name</label>
                  <select v-model="form.product_id" class="form_global">
                    <option value="">--Select Package Name--</option>
                    <option :value="salesOrder.id" v-for="(salesOrder, index) in salesOrders" :key="index"></option>
                  </select>
                  <v-errors :errors="errorFor('product_id')" />
                </div>
              </div> -->

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('sub_title')}]">
                  <label>Sub Title</label>
                  <input type="text" class="form_global" v-model="form.sub_title">
                  <v-errors :errors="errorFor('sub_title')" />
                </div>
              </div>

              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('footer')}]">
                  <label>Footer</label>
                  <input type="text" class="form_global" v-model="form.footer">
                  <v-errors :errors="errorFor('footer')" />
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
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  components: {},
  data() {
    return {
      title: 'Add Product Overview',
      form: {
        title: '',
        product_id: 1,
        sub_title: '',
        footer: '',
      }
    }
  },
  created() {
      this.axios.get('/product-overview-data', this.form)
      .then((response) => {
        if(response.data){
          this.form = response.data.data;
        }
      })
  },
  watch:{
    
  },
  methods: {
    submit() {
      this.allErrors = null;
      this.loading = true;

      this.axios.post('/product-overview', this.form)
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
