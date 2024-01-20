<template>
  <div class="row">
    <div class="col_12">
      <div class="card no_border">
        <div class="card-header">
          <div class="card-title">Packages List</div>
        </div>
        <div class="card-body pl_0 pr_0">
          <div class="row">
            <div class="col_2">
              <div class="form-group ">
                <label></label>
                <div class="d_flex_start">
                  <div class="dropdown custom_dropdown mr_10">
                    <button class="btn">
                      <span>{{ filter2.package_type }}</span>
                    </button>
                    <div class="dropdown_menu">
                      <ul>
                        <li @click="changePackageTypeFilter('all')"><a role="button">{{ $t('common.all') }}</a></li>
                        <li @click="changePackageTypeFilter('one-time')"><a role="button">{{ $t('sidebar.packageManagement.one_time_package') }}</a></li>
                        <li @click="changePackageTypeFilter('subscription')"><a role="button">{{ $t('sidebar.packageManagement.subscription_package') }}</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col_2">
              <div class="form-group ">
                <label></label>
                <div class="d_flex_start">
                  <!-- <div class="dropdown custom_dropdown mr_10">
                    <button class="btn">
                      <span>{{ filter2.classification }}</span>
                    </button>
                    <div class="dropdown_menu">
                      <ul>
                        <li @click="changeClassificationFilter('all')"><a role="button">{{ $t('common.all') }}</a></li>
                        <li @click="changeClassificationFilter('general-product')"><a role="button">{{ $t('sidebar.packageManagement.general_product') }}</a></li>
                        <li @click="changeClassificationFilter('limited-time-product')"><a role="button">{{ $t('sidebar.packageManagement.limited_time_product') }}</a></li>
                      </ul>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="col_2">
              <div class="form-group ">
                  <label></label>
                  <div class="d_flex_start">
                    <!-- <div class="dropdown custom_dropdown mr_10">
                        <button class="btn">
                          <span>{{ filter2.status }}</span>
                        </button>
                        <div class="dropdown_menu">
                          <ul>
                            <li @click="changeStatusFilter('all')"><a role="button">{{ $t('common.all') }}</a></li>
                            <li @click="changeStatusFilter('active')"><a role="button">{{ $t('common.active') }}</a></li>
                            <li @click="changeStatusFilter('inactive')"><a role="button">{{ $t('common.inactive') }}</a></li>
                          </ul>
                        </div>
                    </div> -->
                  </div>
              </div>
            </div>
            <div class="col_6">
              <div class="form-group ">
                <label></label>
                <div class="d_flex_end">
                  <div class="form_row_inline ml_10">
                    <input type="text" class="form_global" :placeholder="$t('common.search')" v-model="queryParams.search">
                  </div>
                  <div class="form_row_inline ml_10">
                    <div class="btn btn_common_type_2 width_150p" @click="queryParams.page = 1 ; searchQuery()">{{ $t('common.search') }}</div>
                  </div>
                  <div class="form_row_inline ml_10">
                    <div class="btn btn_common_type_2 width_150p" @click="resetAll()">{{ $t('common.reset') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col_12 ">
              <div class="separator pl_0 pr_0">
                <span></span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col_12">
              <div class="d_flex_btwn pt_20 pb_20">
                <div class="d_flex_start col_2 pl_0">
                  <div class="dropdown custom_dropdown mr_10">
                      <button class="btn">
                          <span>{{ filter.per_page }}</span>
                      </button>
                      <div class="dropdown_menu">
                          <ul>
                            <li @click="changePerPageFilter(10)"><a role="button">10</a></li>
                            <li @click="changePerPageFilter(20)"><a role="button">20</a></li>
                            <li @click="changePerPageFilter(50)"><a role="button">50</a></li>
                            <li @click="changePerPageFilter(100)"><a role="button">100</a></li>
                            <li @click="changePerPageFilter(200)"><a role="button">200</a></li>
                          </ul>
                      </div>
                  </div>
                </div>
                <div class="d_flex_end col_6 pr_0">
                  <router-link :to="{ name: 'package_add'}" class="btn btn_transparent">{{ $t('sidebar.packageManagement.addPackage') }}</router-link>
                </div>
              </div>
            </div>
          </div>

          <table-component 
            :columns="columns"
            :rows="packages"
            :pagination="pagination"
            @sorting="sorting"
            :sortable="sortable"
            @pageChanged="pageChanged">
            <template #unit_amount="{ row }">
              <td>£ {{ row.unit_amount }}</td>
            </template>
            <template #action="{ row }">
              <div class="d_flex_center table_action_btn">
                <router-link :to="{name: 'package_edit', params:{id: row.id}}" :title="$t('common.edit')" class="btn btn_blue ml_10">
                  <img :src="`${baseUrl}assets/media/images/icon/8.png`" alt="">
                </router-link>
                <!-- <button class="btn btn_danger ml_10" :title="$t('common.delete')" @click.prevent="deleteRecord(row)">
                  <img :src="`${baseUrl}assets/media/images/icon/9.png`" alt="">
                </button> -->
              </div>
            </template>
          </table-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/shared/TableComponent";

export default {
  components: {TableComponent},
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
      packages: [],
      filter: {
        package_type: 'all',
        classification: 'all',
        status: 'all',
        per_page: 20
      },
      filter2: {
        package_type: this.$t('common.all'),
        classification: this.$t('common.all'),
        status: this.$t('common.all'),
        per_page: 20
      },
      queryParams: {
        page: 1,
        search: '',
        search_columns: 'package_name,package_code',
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 20
      },
      pagination: null,
      sortable: {
        order: 'created_at',
        sort: 'desc'
      },
      columns: [
        {
          label: 'Package Name',
          field: "name",
          sortable: true
        },
        {
          label: 'Unit Amount',
          field: "unit_amount",
          sortable: false,
          slot: true
        },
        {
          label: 'Interval',
          field: "formatted_interval",
          sortable: false
        },
        {
          label: 'User Capacity',
          field: "user_capacity",
          slot: false
        },
        {
          label: 'Status',
          field: "formatted_status",
          sortable: false,
        },
        {
          label: this.$t('common.action'),
          field: 'action',
          sortable: false,
          slot: true,
        }
      ],
    }
  },
  watch: {
    $route(to, from) {
        if(to.name == from.name && !window._.isEqual(to, from)){
          this.setQueryData(this.getAllQueryParams())
          this.loadData()
        }
      },
  },
  created() {
    const query = this.getAllQueryParams()
    if(query.page){
      this.setQueryData(query)
    }

    this.loadData();
  },
  methods: {
    setQueryData(query){
      this.queryParams = {
        page: query.page,
        search: query.search,
        search_columns: query.search_columns,
        sort: query.sort,
        sort_order: query.sort_order,
        per_page: query.per_page
      }

      this.filter = {
        classification: query.classification,
        package_type: query.package_type,
        status: query.status,
        per_page: query.per_page
      }
      this.sortable = {
        order:  query.sort,
        sort: query.sort_order
      }
    },
    resetAll(){
      this.sortable = {
        order: 'created_at',
        sort: 'desc'
      }
      this.filter = {
        package_type: 'all',
        classification: 'all',
        status: 'all',
        per_page: 20
      }
      this.filter2 = {
        package_type: this.$t('common.all'),
        classification: this.$t('common.all'),
        status: this.$t('common.all'),
        per_page: 20
      }

      this.queryParams = {
        page: 1,
        search: '',
        search_columns: 'package_name,package_code',
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 20
      }

      this.changeRoute();
      this.loadData();
    },
    searchQuery(){
        this.changeRoute();
    },
    sorting({column, order}) {
        this.queryParams.sort = column;
        this.queryParams.sort_order = order;
        this.queryParams.page = 1;
        this.changeRoute()
    },
    pageChanged(page) {
        this.queryParams.page = page;
        this.changeRoute()
    },
    changePerPageFilter(per_page){
      this.filter.per_page = per_page
      this.changeRoute();
    },
    changeClassificationFilter(classification){
      this.filter.classification = classification
      if(classification == 'general-product'){
        this.filter2.classification = this.$t('sidebar.packageManagement.general_product')
      }
      if(classification == 'limited-time-product'){
        this.filter2.classification = this.$t('sidebar.packageManagement.limited_time_product')
      }
      
      this.changeRoute();
    },
    changePackageTypeFilter(package_type){
      this.filter.package_type = package_type
      if(package_type == 'one-time'){
        this.filter2.package_type = this.$t('sidebar.packageManagement.one_time_package')
      }
      if(package_type == 'subscription'){
        this.filter2.package_type = this.$t('sidebar.packageManagement.subscription_package')
      }
      
      this.changeRoute();
    },
    changeStatusFilter(status){
      this.filter.status = status
      this.filter2.status = this.$t(status)
      this.changeRoute();
    },
    changeRoute() {
      this.$router.push({name: this.$route.name, query: {...this.queryParams, ...this.filter}})
    },
    loadData() {
      this.axios.get('/packages', {
            params: {...this.queryParams, ...this.filter}
        }).then((response) => {
            this.packages = response.data.data;
            this.pagination = response.data.meta;
        })
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
          this.axios.delete('/packages/'+row.id).then(() => {
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
  }
}
</script>