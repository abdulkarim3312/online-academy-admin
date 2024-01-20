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
                <div class="form-group">
                  <label>Admin Logo</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="admin_logo"
                    @input="onFileChangeOne($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('admin_logo')"></v-errors>
                </div>
                <div
                  class="thumbnail_img"
                  v-if="tempPhoto || form.admin_logo"
                >
                  <div class="inner">
                    <img v-if="tempPhoto" :src="tempPhoto" alt="" width="150" />
                    <img v-else :src="form.admin_logo" alt="" width="150" />
                    <span class="close_icon" @click="removeTempPhotoOne"></span>
                  </div>
                </div>
              </div>
              <div class="col_6">
                <div class="form-group">
                  <label>Site Logo</label>
                  <input
                    type="file"
                    class="form_global"
                    ref="site_logo"
                    @input="onFileChangeTwo($event)"
                    accept="image/png, image/gif, image/jpeg, image/webp"
                  />
                  <v-errors :errors="errorFor('site_logo')"></v-errors>
                </div>
                <div
                  class="thumbnail_img"
                  v-if="tempPhotoTwo || form.site_logo"
                >
                  <div class="inner">
                    <img v-if="tempPhotoTwo" :src="tempPhotoTwo" alt="" width="150" />
                    <img v-else :src="form.site_logo" alt="" width="150" />
                    <span class="close_icon" @click="removeTempPhotoTwo"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d_flex_end form_action_btn">
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
      title: 'Add Logo',
      form: {
        admin_logo: '',
        site_logo: '',
      },
      tempPhoto: '',
      tempPhotoTwo: '',
    };
  },
  created() {
    this.axios.get('/logo-data').then((response) => {
      this.form = response.data.data;
    });
  },
  watch: {},
  methods: {
    onFileChangeOne(e) {
      this.form.admin_logo = e.target.files[0];
      this.tempPhoto = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoOne() {
      this.tempPhoto = '';
      this.form.admin_logo = '';
      this.$refs.admin_logo.value = null;
    },
    onFileChangeTwo(e) {
      this.form.site_logo = e.target.files[0];
      this.tempPhotoTwo = URL.createObjectURL(e.target.files[0]);
    },
    removeTempPhotoTwo() {
      this.tempPhotoTwo = '';
      this.form.site_logo = '';
      this.$refs.site_logo.value = null;
    },

    submit() {
      this.allErrors = null;
      this.loading = true;
      let formData = new FormData();

      Object.keys(this.form).forEach((key) => {
        formData.append(key, this.form[key] ? this.form[key] : '');
      });

      this.axios
        .post('/logo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
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
