<template>
  <div>
    <div class="row">
      <div class="col_12">
          <div class="card no_border">
            <div class="card-header">
                <div class="card-title">{{ $t('sidebar.orderManagement.orderManagement') }}</div>
            </div>
            <div class="card-body pl_0 pr_0">
              <div class="row">
                <div class="col_2">
                  <div class="form-group ">
                    <label></label>
                    <div class="d_flex_start">
                      <div class="dropdown custom_dropdown mr_10">
                          <button class="btn">
                            <span>{{ filter2.is_Active }}</span>
                          </button>
                          <div class="dropdown_menu">
                            <ul>
                              <li @click="changeStatusFilter('all')"><a role="button">{{ $t('common.all') }}</a></li>
                              <li @click="changeStatusFilter(1)"><a role="button">Active</a></li>
                              <li @click="changeStatusFilter(0)"><a role="button">Inactive</a></li>
                            </ul>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col_10">
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
                                      <li @click="changeFilter(10)"><a role="button">10</a></li>
                                      <li @click="changeFilter(20)"><a role="button">20</a></li>
                                      <li @click="changeFilter(50)"><a role="button">50</a></li>
                                      <li @click="changeFilter(100)"><a role="button">100</a></li>
                                      <li @click="changeFilter(200)"><a role="button">200</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <table-component 
                  :columns="columns"
                  :rows="orders"
                  :pagination="pagination"
                  @sorting="sorting"
                  :sortable="sortable"
                  @pageChanged="pageChanged">
                  <template #amount_formated="{ row }">
                    {{ row.amount_formated }}
                  </template>
                  <template #action="{ row }">
                    <div class="d_flex_center table_action_btn">
                      <router-link :to="{name: 'order_details', params:{id: row.id}}" :title="$t('common.edit')" class="btn btn_blue ml_10">
                        <img :src="`${baseUrl}assets/media/images/icon/8.png`" alt="">
                      </router-link>
                      <button class="btn btn_danger ml_10" :title="$t('common.delete')" @click.prevent="deleteRecord(row)">
                        <img :src="`${baseUrl}assets/media/images/icon/9.png`" alt="">
                      </button>
                    </div>
                  </template>
              </table-component>
            </div>
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
      orders: [],
      filter: {
        is_Active: '',
        per_page: 20
      },
      filter2: {
        is_Active: this.$t('common.all'),
        per_page: 20
      },
      queryParams: {
        page: 1,
        search: '',
        search_columns: 'created_at,next_billing_date,user.name,package.name',
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
          label: 'Agent name',
          field: "user.name",
          sortable: true
        },
        {
          label: 'Package name',
          field: "package.name",
          sortable: true
        },
        {
          label: this.$t('sidebar.orderManagement.order_status'),
          field: "formatted_order_status",
          sortable: false
        },
        {
          label: this.$t('sidebar.orderManagement.ordered_at'),
          field: "created_at",
          sortable: true,
        },
        {
          label: 'Next billing',
          field: "next_billing_date",
          sortable: true,
        },
        {
          label: this.$t('sidebar.orderManagement.amount'),
          field: "amount_formated",
          sortable: false,
          slot:true
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
        is_Active: query.is_Active,
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
        is_Active: '',
        per_page: 20
      }
      this.filter2 = {
        is_Active: this.$t('common.all'),
        per_page: 20
      }

      this.queryParams = {
          page: 1,
          search: '',
          search_columns: 'created_at,next_billing_date,user.name,package.name',
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
    changeStatusFilter(status){
      if(status == 'all'){
        this.filter.is_Active = ''
        this.filter2.is_Active = this.$t('common.all')
      }else{
        let statusName = '';

        if(status == 1){
          statusName = 'Active'
        }else {
          statusName = 'Inactive'
        }
        this.filter.is_Active = status
        this.filter2.is_Active = statusName
      }
      this.changeRoute();
    },
    changeFilter(per_page){
      this.filter.per_page = per_page
      this.changeRoute();
    },
    changeRoute() {
      this.$router.push({name: this.$route.name, query: {...this.queryParams, ...this.filter}})
    },
    loadData() {
      this.axios.get('/orders', {
            params: {...this.queryParams, ...this.filter}
        }).then((response) => {
            this.orders = response.data.data;
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
          this.axios.delete('/orders/'+row.id).then(() => {
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