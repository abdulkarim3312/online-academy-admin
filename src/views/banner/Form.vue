<template>
  <div>
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header d_flex_btwn">
            <div class="card-title">{{ title }} </div>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <div class="col_6">
                <div class="form-group ">
                  <label>{{ $t('sidebar.home_banner.top_title') }}</label>
                  <input type="text" class="form_global" v-model="form.top_title">
                  <v-errors :errors="errorFor('top_title')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div class="form-group ">
                  <label>{{ $t('sidebar.home_banner.main_title') }}</label>
                  <input type="text" class="form_global" v-model="form.main_title">
                  <v-errors :errors="errorFor('main_title')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div class="form-group ">
                  <label>{{ $t('sidebar.home_banner.bottom_top_title') }}</label>
                  <input type="text" class="form_global" v-model="form.bottom_top_title">
                  <v-errors :errors="errorFor('bottom_top_title')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div class="form-group ">
                  <label>{{ $t('sidebar.home_banner.bottom_lower_title') }}</label>
                  <input type="text" class="form_global" v-model="form.bottom_lower_title">
                  <v-errors :errors="errorFor('bottom_lower_title')"></v-errors>
                </div>
              </div>
              <div class="col_6">
                <div class="form-group ">
                  <label>{{ $t('sidebar.home_banner.banner_image') }}</label>
                  <input type="file" ref="banner_image" class="form_global" @input="homeBannerUpload($event)">
                  <v-errors :errors="errorFor('banner_image')"></v-errors>
                </div>
                <div v-if="tempHomeBanner || form.banner_image">
                  <div class="inner mb_10">
                    <img v-if="tempHomeBanner" :src="tempHomeBanner" alt="" width="150">
                    <img v-else :src="form.banner_image" alt=""  width="150">
                    <span class="close_icon" @click="removeTempHomeBanner"></span>
                  </div>
                </div>
              </div>
              <div class="col_6">
                <div :class="['form-group', {'has_error': errorFor('status')}]">
                  <label>Device</label>
                  <div class="form_inline">
                    <div class="form_radio">
                      <input type="radio" id="active" value="2" v-model="form.type">
                      <label for="active">Desktop</label>
                    </div>
                    <div class="form_radio">
                      <input type="radio" id="inactive" value="1" v-model="form.type">
                      <label for="inactive">Mobile</label>
                    </div>
                  </div>
                  <v-errors :errors="errorFor('status')" />
                </div>
              </div>
            </div>
            <div class="d_flex_btwn form_action_btn">
              <router-link class="btn btn_blue ml_10" :to="{name:'home_banner'}">{{ $t('common.back') }}</router-link>
              <button class="btn btn_blue ml_10" @click.prevent="submitForm">{{ $t('common.save') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'form',
  mixins: [],
  data(){
    return {
      title: this.$route.name === 'home_banner_add' ? this.$t('sidebar.home_banner.home_banner_add') : this.$t('sidebar.home_banner.home_banner_edit'),
      form: {
        top_title:'',
        type: '2',
        main_title:'',
        bottom_top_title:'',
        bottom_lower_title:'',
        banner_image: '',
      },
      tempHomeBanner:'',
    }
  },
  created() {
    if(this.$route.name === 'home_banner_edit')
      this.loadData()
  },
  methods: {
    homeBannerUpload(e) {
      this.form.banner_image = e.target.files[0]
      this.tempHomeBanner = URL.createObjectURL(e.target.files[0]);
    },
    removeTempHomeBanner(){
      this.tempHomeBanner = ''
      this.form.banner_image = ''
      this.$refs.banner_image.value = null;
    },
    loadData(){
      this.loading = true
      this.axios.get('home-banner/'+this.$route.params.id)
          .then((response) => {
            if(response.data.data){
              this.form.top_title = response.data.data.top_title;
              this.form.type = response.data.data.type;
              this.form.main_title = response.data.data.main_title;
              this.form.bottom_top_title = response.data.data.bottom_top_title;
              this.form.bottom_lower_title = response.data.data.bottom_lower_title;
              this.form.banner_image = '';
              this.tempHomeBanner = response.data.data.banner_image
            }
          })
          .finally(() => this.loading = false);
    },
    submitForm(){
      this.allErrors = null;
      this.loading = true;

      let formData = new FormData()

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      })

      if(this.$route.name === 'home_banner_add') {

        this.axios.post('home-banner-post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
            .then(() => {
              this.showSuccessMsg(this.$t('common.updateSuccess'))
              this.$router.push({name:'home_banner'})
            })
            .catch((err) => this.allErrors = err.response.data.errors)
            .finally(() => this.loading = false);
      } else {
        this.axios.post('home-banner-edit-post/'+this.$route.params.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
            .then(() => {
              this.showSuccessMsg(this.$t('common.updateSuccess'))
              this.$router.push({name:'home_banner'})
            })
            .catch((err) => this.allErrors = err.response.data.errors)
            .finally(() => this.loading = false);
      }

    }
  },
}
</script>

