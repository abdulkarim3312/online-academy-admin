<template>
  <div class="row">
    <div class="col_12">
      <div class="card no_border">
        <div class="card-header">
          <div class="card-title">
            {{ $t('sidebar.parentMember.parentMember') }}
          </div>
        </div>
        <div class="card-body pl_0 pr_0">
          <div class="row">
            <div class="col_2">
              <div class="form-group">
                <label></label>
                <div class="d_flex_start">
                  <div class="dropdown custom_dropdown mr_10">
                    <button class="btn">
                      <span>{{ filter2.situation }}</span>
                    </button>
                    <div class="dropdown_menu">
                      <ul>
                        <li>
                          <a
                            role="button"
                            @click="changeSituationFilter('all')"
                            >{{ $t('common.all') }}</a
                          >
                        </li>
                        <li @click="changeSituationFilter('approval')">
                          <a role="button">{{ $t('common.approval') }}</a>
                        </li>
                        <li @click="changeSituationFilter('stop')">
                          <a role="button">{{ $t('common.stop') }}</a>
                        </li>
                        <li @click="changeSituationFilter('dormancy')">
                          <a role="button">{{ $t('common.dormancy') }}</a>
                        </li>
                        <li @click="changeSituationFilter('secession')">
                          <a role="button">{{ $t('common.secession') }}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col_10">
              <div class="form-group">
                <label></label>
                <div class="d_flex_end">
                  <div class="form_row_inline ml_10">
                    <input
                      type="text"
                      class="form_global"
                      :placeholder="$t('common.search')"
                      v-model="queryParams.search"
                    />
                  </div>
                  <div class="form_row_inline ml_10">
                    <div
                      class="btn btn_common_type_2 width_150p"
                      @click="
                        queryParams.page = 1;
                        searchQuery();
                      "
                    >
                      {{ $t('common.search') }}
                    </div>
                  </div>
                  <div class="form_row_inline ml_10">
                    <div
                      class="btn btn_common_type_2 width_150p"
                      @click="resetAll()"
                    >
                      {{ $t('common.reset') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col_12">
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
                        <li @click="changePerPageFilter(10)">
                          <a role="button">10</a>
                        </li>
                        <li @click="changePerPageFilter(20)">
                          <a role="button">20</a>
                        </li>
                        <li @click="changePerPageFilter(50)">
                          <a role="button">50</a>
                        </li>
                        <li @click="changePerPageFilter(100)">
                          <a role="button">100</a>
                        </li>
                        <li @click="changePerPageFilter(200)">
                          <a role="button">200</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="d_flex_end col_6 pr_0">
                  <router-link
                    :to="{ name: 'parent_add' }"
                    class="btn btn_transparent"
                    >{{ $t('common.add_new') }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>

          <table-component
            :columns="columns"
            :rows="parents"
            :pagination="pagination"
            @sorting="sorting"
            :sortable="sortable"
            @pageChanged="pageChanged"
          >
            <template #action="{ row }">
              <div class="d_flex_center table_action_btn">
                <router-link
                  :to="{ name: 'parent_edit', params: { id: row.id } }"
                  :title="$t('common.edit')"
                  class="btn btn_blue ml_10"
                >
                  <img
                    :src="`${baseUrl}assets/media/images/icon/8.png`"
                    alt=""
                  />
                </router-link>
                <button
                  class="btn btn_danger ml_10"
                  :title="$t('common.delete')"
                  @click.prevent="deleteRecord(row)"
                >
                  <img
                    :src="`${baseUrl}assets/media/images/icon/9.png`"
                    alt=""
                  />
                </button>
              </div>
            </template>
          </table-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/shared/TableComponent';

export default {
  components: { TableComponent },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE,
      parents: [],
      filter: {
        situation: '',
        per_page: 20,
      },
      filter2: {
        situation: this.$t('common.all'),
        per_page: 20,
      },
      queryParams: {
        page: 1,
        search: '',
        search_columns: 'parent_id,name,phone,email',
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 20,
      },
      pagination: null,
      update: {
        situation: '',
      },
      sortable: {
        order: 'created_at',
        sort: 'desc',
      },
      columns: [
        {
          label: this.$t('sidebar.parentMember.parent_id'),
          field: 'parent_id',
          sortable: true,
        },
        {
          label: this.$t('sidebar.parentMember.parent_name'),
          field: 'name',
          sortable: true,
        },
        {
          label: this.$t('common.phone'),
          field: 'phone',
          sortable: true,
        },
        {
          label: this.$t('common.email'),
          field: 'email',
          sortable: false,
        },
        {
          label: this.$t('common.last_login'),
          field: 'last_login',
          sortable: true,
        },
        {
          label: this.$t('sidebar.parentMember.registration_date'),
          field: 'registered_at',
          sortable: true,
        },
        {
          label: this.$t('common.situation'),
          field: 'formatted_situation',
          sortable: false,
        },
        {
          label: this.$t('sidebar.parentMember.enrolled_student'),
          field: 'enrolled_student',
          sortable: false,
        },
        {
          label: this.$t('common.action'),
          field: 'action',
          sortable: false,
          slot: true,
        },
      ],
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == from.name && !window._.isEqual(to, from)) {
        this.setQueryData(this.getAllQueryParams());
        this.loadData();
      }
    },
  },
  created() {
    const query = this.getAllQueryParams();
    if (query.page) {
      this.setQueryData(query);
    }

    this.loadData();
  },
  methods: {
    setQueryData(query) {
      this.queryParams = {
        page: query.page,
        search: query.search,
        search_columns: query.search_columns,
        sort: query.sort,
        sort_order: query.sort_order,
        per_page: query.per_page,
      };

      this.filter = {
        situation: query.situation,
        per_page: query.per_page,
      };
      this.sortable = {
        order: query.sort,
        sort: query.sort_order,
      };
    },
    resetAll() {
      this.sortable = {
        order: 'created_at',
        sort: 'desc',
      };

      this.filter = {
        situation: '',
        per_page: 20,
      };

      this.filter2 = {
        situation: this.$t('common.all'),
        per_page: 20,
      };

      this.queryParams = {
        page: 1,
        search: '',
        search_columns: 'parent_id,name,phone,email',
        sort: 'created_at',
        sort_order: 'desc',
        per_page: 20,
      };

      this.changeRoute();
      this.loadData();
    },
    searchQuery() {
      this.changeRoute();
    },
    searchCustomer() {
      this.changeRoute();
    },
    sorting({ column, order }) {
      this.queryParams.sort = column;
      this.queryParams.sort_order = order;
      this.queryParams.page = 1;
      this.changeRoute();
    },
    pageChanged(page) {
      this.queryParams.page = page;
      this.changeRoute();
    },
    changePerPageFilter(per_page) {
      this.filter.per_page = per_page;
      this.changeRoute();
    },
    changeSituationFilter(situation) {
      if (situation == 'all') {
        this.filter.situation = '';
        this.filter2.situation = this.$t('common.all');
      } else {
        let situationName = '';
        if (situation == 'approval') {
          situationName = this.$t('common.approval');
        } else if (situation == 'stop') {
          situationName = this.$t('common.stop');
        } else if (situation == 'dormancy') {
          situationName = this.$t('common.dormancy');
        } else {
          situationName = this.$t('common.secession');
        }
        this.filter.situation = situation;
        this.filter2.situation = situationName;
      }
      this.changeRoute();
    },
    changeRoute() {
      this.$router.push({
        name: this.$route.name,
        query: { ...this.queryParams, ...this.filter },
      });
    },
    loadData() {
      this.axios
        .get('/parents', {
          params: { ...this.queryParams, ...this.filter },
        })
        .then((response) => {
          this.parents = response.data.data;
          this.pagination = response.data.meta;
        });
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
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('/parents/' + row.id).then(() => {
            this.loadData();
            this.$swal.fire(
              this.$t('common.deleted'),
              this.$t('common.deleteMessage'),
              'success'
            );
          });
        }
      });
    },
  },
};
</script>
