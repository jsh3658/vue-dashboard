<template>
    <div class="content">
        <div class="row">
            <button class="btn-excel" @click="download">Excel Download</button>
        </div>

        <!-- DataTable -->
        <div class="row">
            <Error v-if="error"/>
            <Loading v-else-if="loading.table" :text="'Loading'"/>
            <data-table v-else ref="table" :tableData="dataSets" :size="size" :dataEnum="dataEnum" @currentPage="currentPage" @allPage="allPage" @listSize="listSize"/>
        </div>
    </div>
</template>

<script>
    import * as domain from '@/common/domain.js';
    import date from '@/common/dateConfig.js';
    import dashBoard from '@/common/dashboard.js';
    import DataTable from '@/components/table/dataTable.vue';
    import Loading from '@/components/loading/loading.vue';
    import Error from '@/components/error/error.vue';
    import excel from '@/common/excel.js';
    import {mapState} from 'vuex';

    export default {
        name: "excel",
        data() {
            return {
                date: {
                    start: date.AWeekAgo,
                    end: date.Yesterday,
                },
                loading: {
                    table: true
                },
                dataEnum: {}
            }
        },
        components: {DataTable, Loading, Error},
        created() {
            this.dataTable();
        },
        computed: {
            ...mapState(['dataSets', 'error']),
        },
        methods: {
            dataTable() {
                let dashBoardURL = domain.url + '';
                let args = {
                    TYPE: 'GET',
                    URL: dashBoardURL
                };

                dashBoard(args).then(() => {
                    this.loading.table = false;
                })

            },
            download() {
                let options = {
                    fileName: 'Excel.xlsx',
                    table: this.$refs['table'].$refs['table-data'],
                    total: this.size
                };

                excel(options);
            }
        }
    }
</script>
