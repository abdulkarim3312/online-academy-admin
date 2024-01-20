<template>
  <div>
      <div class="table_responsive">
          <table class="table table_center">
              <thead>
                  <tr>
                      <th v-for="(col, index) in columns"
                          :key="index"
                          @click="sorting(col)"
                          :class="[{'sorting_asc': col.sortable && sortColumn === col.field && sortOrder === 'asc'}, {'sorting_desc': col.sortable && sortColumn === col.field && sortOrder === 'desc'}]"
                          :style="[{ width: col.width ? col.width : 'auto' }, { 'max-width': col.max_width ? col.max_width : 'auto' }]">
                          <div v-if="col.headerSlot">
                              <slot :name="col.headerSlotName"></slot>
                          </div>
                          <div v-else>
                              {{ col.label }}
                              <span v-if="col.sortable">
                                  <i class="fas fa-sort-amount-down-alt"
                                  aria-hidden="true"
                                  v-if="sortColumn === col.field && sortOrder === 'asc'"></i>


                            <i class="fas fa-sort-amount-down"
                            aria-hidden="true"
                            v-if="sortColumn === col.field && sortOrder === 'desc'"></i>
                        </span>
                    </div>
                </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="rows.length > 0">
                    <tr v-for="(row, i) in rows" :key="i">
                        <td v-for="(col, j) in columns" :key="j" @click.prevent="col.click ? col.click(row) : false">
                            <div v-if="col.display" v-html="col.display(row)"></div>
                            <div v-else-if="col.slot">
                                <slot :row="row" :index="i" :name="col.field"></slot>
                            </div>
                            <template v-else>
                                <span>{{ col.field.split('.').length > 1 ? (row[col.field.split('.')[0]] !== null ? row[col.field.split('.')[0]][col.field.split('.')[1]] : '') : row[col.field] }}</span>
                            </template>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td :colspan="columns.length" class="text_center">
                            <span class="font_italic color_grey_type2">You currently have 0 items.</span>
                        </td>
                    </tr>
                </template>

                <slot :name="'footer'"></slot>
            </tbody>
        </table>
    </div>
    <pagination-component :pagination="pagination" @changePage="changePage"></pagination-component>
  </div>
</template>

<script>
import PaginationComponent from "./PaginationComponent";

export default {
  name: "TableComponent",
  components: {PaginationComponent},
  emits: ['pageChanged', 'sorting'],
  props: {
      isLoading: {
          type: Boolean,
          require: true,
      },
      pagination: {
          type: Object,
          required: false,
      },
      columns: {
          type: Array,
          default: () => {
              return [];
          },
      },
      footer: {
          type: Array,
          default: () => {
              return [];
          },
      },
      rows: {
          type: Array,
          default: () => {
              return [];
          },
      },
      sortable: {
          type: Object,
          default: () => {
              return {
                  order: "id",
                  sort: "asc",
              };
          },
      },
  },
  data() {
      return {
          sortColumn: this.sortable.order,
          sortOrder: this.sortable.sort
      }
  },
  methods: {
      sorting(column) {
          if (column.sortable) {
              if (column.field === this.sortColumn)
                  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
              else {
                  this.sortOrder = 'asc';
              }

              this.sortColumn = column.field;
              this.$emit('sorting', {column: this.sortColumn, order: this.sortOrder});
          }
      },
      changePage(page) {
          this.$emit('pageChanged', page);
      }
  }
}
</script>