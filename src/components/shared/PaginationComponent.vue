<template>
    <div class="pagination_global" v-if="pagination">
        <ul>
            <li :disabled="pageData.current_page === 1"
                        @click.prevent="changePage(1)">
                <i class="lni lni-chevron-left"></i>
                <i class="lni lni-chevron-left"></i>
            </li>
            <li :class="{'disabled': pageData.current_page == 1}">
                <template v-if="pageData.current_page == 1">
                    <i class="lni lni-chevron-left"></i>
                </template>
                <a href="javascript:void(0)" v-else @click="changePage(Number(pageData.current_page) - 1)">
                    <i class="lni lni-chevron-left"></i>
                </a>
            </li>
            <li class="disabled" v-if="pageData.last_page > 3 && pageData.current_page > 2 && pageData.current_page <= pageData.last_page">...</li>

            <li v-for="page in pagesNumber" :class="{'active' : (page == pageData.current_page) || (pagesNumber.length == 1)}" :key="'pagination-' + page">
                <a v-if="(page == pageData.current_page) || (pagesNumber.length == 1)">
                    {{ page }}
                </a>
                <a href="javascript:void(0)" v-else @click="changePage(page)">
                    {{ page }}
                </a>
            </li>
            
            <li class="disabled" v-if="pageData.last_page > 3 && pageData.current_page <= pageData.last_page-2">...</li>

            <li :class="{'disabled': pageData.current_page == pageData.last_page}">
                <template v-if="pageData.current_page == pageData.last_page">
                    <i class="lni lni-chevron-right"></i>
                </template>
                <a href="javascript:void(0)" v-else  @click="changePage(Number(pageData.current_page) + 1)">
                    <i class="lni lni-chevron-right"></i>
                </a>
            </li>
            <li :disabled="pageData.current_page === pageData.last_page"
                        @click.prevent="changePage(pageData.last_page)">
                <i class="lni lni-chevron-right"></i>
                <i class="lni lni-chevron-right"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: false,
        }
    },
    computed: {
        pagesNumber() {
            var pagesArray = [];
            
            var start = Math.max(1, this.pageData.current_page - 1);
            var end = Math.min(this.pageData.current_page + 1, this.pageData.last_page);            

            if (this.pageData.current_page == 1) {
                start = 1;
                end = Math.min(3, this.pageData.last_page);
            }
            if (this.pageData.current_page == 2) {
                start = 1;
                end = Math.min(3, this.pageData.last_page);
            }
            if (this.pageData.current_page >= 2  && this.pageData.current_page <= this.pageData.last_page-1) {
                start = Number(this.pageData.current_page) - 1;
                end = Number(this.pageData.current_page) + 1;
            }
            if (this.pageData.current_page == this.pageData.last_page - 1) {
                start = Math.max((this.pageData.last_page - 2), 1);
                end = this.pageData.last_page;
            }
            if (this.pageData.current_page >= this.pageData.last_page) {
                start = Math.max((this.pageData.last_page - 2), 1);
                end = this.pageData.last_page;
            }
            for (var i = start; i <= end; i++) {
                pagesArray.push(i);
            }
            return pagesArray;
        },
    },
    data() {
        return {
            pageData: {...this.pagination},
            page: this.pagination ? this.pagination.current_page : 0
        }
    },
    watch: {
        pagination: {
            deep: true,
            handler() {
                this.pageData = {...this.pagination};
                this.page = this.pagination.current_page;
            }
        }
    },
    methods: {
        changePage(page) {
            this.pageData.current_page = page;
            this.page = page;
            this.$emit('changePage', page);
        }
    }
}
</script>