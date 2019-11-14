<template>
    <div class="content">
        <div class="row">
            <Error v-if="error"/>
            <Loading v-else-if="loading.table" :text="'Loading'"/>
            <table-comp v-else ref="table" :title="'DataTable'" :tableData="dataSets" :size="size" :dataEnum="dataEnum" @currentPage="currentPage" @allPage="allPage" @listSize="listSize"/>
        </div>
    </div>
</template>

<script>
    import * as domain from '@/common/domain.js';
    import date from '@/common/dateConfig.js';
    import dashBoard from '@/common/dashboard.js';
    import TableComp from '@/components/table/dataTable.vue';
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
                loading: {
                    table: true
                },
                dataEnum: {
                    date: '날짜',
                    name: '이름',
                    score: '점수',
                    country: '국가'
                }
            }
        },
        mixins: [pagination],
        components: {TableComp, Loading, Error},
        created() {
            this.dataTable();
        },
        computed: {
            ...mapState(['dataSets', 'error']),
        },
        methods: {
            dataTable() {
                let dashBoardURL = domain.url + '/api/list';

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