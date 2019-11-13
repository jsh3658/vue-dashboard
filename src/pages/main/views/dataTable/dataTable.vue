<template>
    <div class="content">
        <div class="row">
            <Error v-if="error"/>
            <Loading v-else-if="loading.table" :text="'Loading'"/>
            <data-table v-else ref="table" :title="'DataTable'" :tableData="dataSets" :size="size" :dataEnum="dataEnum" @currentPage="currentPage" @allPage="allPage" @listSize="listSize"/>
        </div>
    </div>
</template>

<script>
    import * as domain from '@/common/domain.js';
    import date from '@/common/dateConfig.js';
    import dashBoard from '@/common/dashboard.js';
    import DataTable from '@/components/table/dataTable.vue';
    import {pagination} from '@/components/mixins/pagination.js';
    import Loading from '@/components/loading/loading.vue';
    import Error from '@/components/error/error.vue';
    import {mapState} from 'vuex';

    export default {
        name: "dataTable",
        data() {
            return {
                date: {
                    start: date.AWeekAgo,
                    end: date.Yesterday,
                },
                activeTab: 0,
                size: 6,
                prev: 6,
                active: 0,
                loading: {
                    table: true
                }
            }
        },
        mixins: [pagination],
        components: {DataTable, Loading, Error},
        created() {
            this.dataTable();
        },
        computed: {
            ...mapState(['dataSets', 'error']),
        },
        methods: {
            resetPage() {
                this.active = 0;
                this.size = 6;
                this.prev = 6;
            },
            dataTable() {
                let dashBoardURL = domain.url + '';
                let args = {
                    TYPE: 'GET',
                    URL: dashBoardURL
                };

                dashBoard(args).then(() => {
                    this.loading.table = false;
                });
            }
        }
    }
</script>