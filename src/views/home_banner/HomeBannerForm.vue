<template>
  <div>
    <div class="row">
      <div :class="['col_12', { loading_overlay: loading }]">
        <div class="card no_border">
          <div class="card-header">
            <div class="card-title">{{ title }}</div>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <div class="col_6">
                <div
                  :class="['form-group', { has_error: errorFor('top_title') }]"
                >
                  <label>Title</label>
                  <input
                    type="text"
                    class="form_global"
                    v-model="form.top_title"
                  />
                  <v-errors :errors="errorFor('top_title')" />
                </div>
              </div>

              <div class="col_6">
                <div
                  :class="['form-group', { has_error: errorFor('sub_title') }]"
                >
                  <label>Sub Title</label>
                  <input
                    type="text"
                    class="form_global"
                    v-model="form.sub_title"
                  />
                  <v-errors :errors="errorFor('sub_title')" />
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <label>Banner Image</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="banner_image"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('banner_image')"></v-errors>
                </div>
                <div
                  class="thumbnail_img"
                  v-if="tempPhoto || form.banner_image"
                >
                  <div class="inner">
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" width="150" />
                    <img v-else :src="form.banner_image" alt="" width="150" />
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>

              <div class="col_6">
                <div class="form-group">
                  <div
                    :class="[
                      'form-group',
                      { has_error: errorFor('background_color') },
                    ]"
                  >
                    <label>Background Color</label>
                    <input
                      type="color"
                      class="form-control"
                      v-model="form.background_color"
                      style="width: 100%; height: 36px"
                    />
                    <v-errors :errors="errorFor('background_color')" />
                  </div>
                </div>
              </div>
            </div>
            <div class="d_flex_end form_action_btn">
              <!-- <router-link class="btn btn_danger ml_10" :to="{name: cancelRouteName}">{{ $t('common.cancel') }}</router-link> -->
              <button
                class="btn btn_blue ml_10"
                :disabled="loading"
                @click.prevent="submit"
              >
                {{ $t('common.save') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: 'Add Home Banner',
      form: {
        background_color: '',
        banner_image: '',
        top_title: '',
        sub_title: '',
      },
      tempPhoto: '',
    };
  },
  created() {
    this.axios.get('/home-banner').then((response) => {
      this.form = response.data.data;
    });
  },
  watch: {},
  methods: {
    onFileChangeOne(e) {
      this.form.banner_image = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
      this.tempPhoto = '';
      this.form.banner_image = '';
      this.$refs.product_logo.value = null;
    },

    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      this.axios
        .post('/home-banner', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          // this.$router.push({name: 'package_list'});
          this.showSuccessMsg(this.$t('common.addSuccess'));
        })
        .catch((err) => {
          this.allErrors = err.response.data.errors;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.dp__menu {
  top: 196px;
}
</style>
