<template>
    <div class="content">
        <!-- DatePicker -->
        <div class="row">
            <div class="date-picker">
                <p class="tit">Date Select<span>Sub Title</span></p>
                <DatePicker @updateDate="update" :start="date.start" :end="date.end"/>
            </div>
        </div>

        <!-- Chart -->
        <div class="row">
            <Error v-if="error" class="chart-error" />
            <Loading v-else-if="loading.chart" :text="'Chart Loading'"/>
            <Chart v-else :chartData="charts" :id="'chart'" :dataEnum="dataEnum" :head="'Chart'"/>
            <div class="info-area">
                <div class="info-inner">
                    <Weather/>
                </div>
                <div class="space"><span>FOOTER</span>TEXT</div>
            </div>
        </div>

        <!-- DataTable -->
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
    import getAsyncCall from '@/common/api';
    import dashBoard from '@/common/dashboard.js';
    import Chart from '@/components/chart/line.vue';
    import DataTable from '@/components/table/dataTable.vue';
    import DatePicker from '@/components/datePicker/datePicker.vue';
    import Weather from '@/components/weather/weather.vue';
    import Loading from '@/components/loading/loading.vue';
    import Error from '@/components/error/error.vue';
    import {pagination} from '@/components/mixins/pagination.js';
    import {mapState} from 'vuex';

    export default {
        name: "Main",
        data() {
            return {
                date: {
                    start: date.AWeekAgo,
                    end: date.Yesterday
                },
                charts: [],
                dataEnum: {},
                loading: {
                    table: true,
                    chart: true
                }
            }
        },
        mixins: [pagination],
        components: {Chart, DataTable, DatePicker, Weather, Loading, Error},
        created() {
            this.chart();
            // this.dataTable();
        },
        computed: {
            ...mapState(['dataSets', 'error'])
        },
        methods: {
            chart() {
                // APi
                let current = domain.url + '/api/list';

                this.loading.chart = true;
                getAsyncCall('GET', current)
                    .then(res => {
                        this.charts = res.data.result.contents;
                        this.loading.chart = false;
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            dataTable() {
                // APi
                let dashBoardURL = domain.url + '';
                let args = {
                    TYPE: 'GET',
                    URL: dashBoardURL
                };

                dashBoard(args)
                    .then(() => {
                        this.loading.table = false;
                    });
            },
            update(s, e) {
                this.date.start = s;
                this.date.end = e;
                this.loading.table = true;

                this.chart();
                this.resetPage();
                this.dataTable();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        #container {
            .content {
                .row {
                    .chart-error{
                        width: calc(100% - 210px);
                        height: 430px;
                        margin-right: 10px;
                    }
                    .chart-wrap {
                        width: calc(100% - 210px);
                        height: 430px;
                        margin-right: 10px;
                        .no-data {
                            height: 341px;
                        }
                    }
                    .info-area {
                        display: flex;
                        width: 210px;
                        flex-direction: column;
                        flex: 0 1 auto;
                        .info-inner {
                            display: flex;
                            @include boxShadow(0 0 1px 0 rgba(65, 65, 65, .09), 0 2px 2px 0 rgba(65, 65, 65, .23));
                            @include borderRadius(6px);
                        }
                        .space {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex: 1 1 auto;
                            font-family: airBold;
                            font-size: 15px;
                            color: rgba(0, 0, 0, .28);
                            span {
                                display: inline-block;
                                padding-right: 4px;
                                font-size: 13px;
                                vertical-align: bottom;
                                font-weight: 600;
                            }
                        }
                    }
                    /deep/ .data-table {
                        .table-wrap {
                            table {
                                tr {
                                    th {
                                        &:first-child {
                                            width: 217px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>