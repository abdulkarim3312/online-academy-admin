<template>
  <div>
    <div class="row">
      <div :class="['col_12', {'loading_overlay': loading}]">
        <div class="card no_border">
          <div class="card-header d_flex_btwn">
            <div class="card-title">{{ this.$t('sidebar.home_banner.home_banner_large') }}</div>
            <router-link class="btn btn_blue ml_10" :to="{name:'home_banner_add'}">{{ this.$t('sidebar.home_banner.add_banner') }}</router-link>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <div class="col_12">
                <div class="table_responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>{{ $t('common.image') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.top_title') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.main_title') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.bottom_top_title') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.bottom_lower_title') }}</th>
                      <th>{{ $t('common.action') }}</th>
                    </tr>
                    </thead>
                    <tbody v-if="desktopBanners.length">
                    <tr v-for="(banner, index) in desktopBanners" :key="'question_'+index">
                      <td class="width_200p">
                        <img :src="banner.banner_image" alt="" width="150">
                      </td>
                      <td class="width_200p">
                        {{ banner.top_title }}
                      </td>
                      <td class="width_200p">
                        {{ banner.main_title }}
                      </td>
                      <td class="width_200p">
                        {{ banner.bottom_top_title }}
                      </td>
                      <td class="width_200p">
                        {{ banner.bottom_lower_title }}
                      </td>

                      <td class="width_50p">
                        <div class="d_flex_center table_action_btn">
                          <router-link :to="{name:'home_banner_edit', params:{id:banner.id}}" class="btn btn_blue mr_10">
                            <img :src="`${baseUrl}assets/media/images/icon/8.png`" alt="">
                          </router-link>
                          <button type="button" class="btn btn_md btn_danger mr_20" @click="deleteRecord(banner)">
                            <img :src="`${baseUrl}assets/media/images/icon/9.png`" alt="">
                          </button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                      <td colspan="6">{{ $t('common.no_data_msg') }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card no_border">
          <div class="card-header d_flex_btwn">
            <div class="card-title">{{ this.$t('sidebar.home_banner.home_banner_mobile') }}</div>
          </div>
          <div class="card-body pl_0 pr_0">
            <div class="row">
              <div class="col_12">
                <div class="table_responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>{{ $t('common.image') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.top_title') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.main_title') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.bottom_top_title') }}</th>
                      <th class="width_200p">{{ $t('sidebar.home_banner.bottom_lower_title') }}</th>
                      <th>{{ $t('common.action') }}</th>
                    </tr>
                    </thead>
                    <tbody v-if="mobileBanners.length">
                    <tr v-for="(banner, index) in mobileBanners" :key="'question_'+index">
                      <td class="width_200p">
                        <img :src="banner.banner_image" alt="" width="150">
                      </td>
                      <td class="width_200p">
                        {{ banner.top_title }}
                      </td>
                      <td class="width_200p">
                        {{ banner.main_title }}
                      </td>
                      <td class="width_200p">
                        {{ banner.bottom_top_title }}
                      </td>
                      <td class="width_200p">
                        {{ banner.bottom_lower_title }}
                      </td>

                      <td class="width_50p">
                        <div class="d_flex_center table_action_btn">
                          <router-link :to="{name:'home_banner_edit', params:{id:banner.id}}" class="btn btn_blue mr_10">
                            <img :src="`${baseUrl}assets/media/images/icon/8.png`" alt="">
                          </router-link>
                          <button type="button" class="btn btn_md btn_danger mr_20" @click="deleteRecord(banner)">
                            <img :src="`${baseUrl}assets/media/images/icon/9.png`" alt="">
                          </button>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                      <td colspan="6">{{ $t('common.no_data_msg') }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'home-banner',
  mixins: [],
  data(){
    return {
      baseUrl: process.env.VUE_APP_BASE,
      banners: [],
      desktopBanners: [],
      mobileBanners: [],
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData(){
      this.loading = true
      this.axios.get('home-banner')
          .then((response) => {
            this.banners = response.data.data
            if(this.banners.length){
              this.mobileBanners = this.banners.filter((item) => item.type === 1)
              this.desktopBanners = this.banners.filter((item) => item.type === 2)
            }
          })
          .finally(() => this.loading = false);
    },
    deleteRecord(row) {
      this.$swal({
        title: this.$t('common.deleteConfirmation'),
        text: this.$t('common.warning'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$t('common.yesDelete'),
        cancelButtonText: this.$t('common.noCancel'),
        confirmButtonColor: '#dd4b39',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('/home-banner/' + row.id).then(() => {
            this.loadData();
            this.$swal.fire(
                this.$t('common.deleted'),
                this.$t('common.deleteMessage'),
                'success'
            )
          });
        }
      });
    },

  },
}
</script>

