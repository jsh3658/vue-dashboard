<template>
    <div class="content">
        <!-- Chart -->
        <div class="row">
            <Error v-if="error"/>
            <Loading v-else-if="loading.chart" :text="'Chart Loading'"/>
            <chart-line-bar v-else :chartData="charts" :id="'chart'" :dataEnum="dataEnum"/>
        </div>
    </div>
</template>

<script>
    import * as domain from '@/common/domain.js';
    import date from '@/common/dateConfig.js';
    import getAsyncCall from '@/common/api';
    import ChartLineBar from '@/components/chart/lineBar.vue';
    import Loading from '@/components/loading/loading.vue';
    import Error from '@/components/error/error.vue';
    import {mapState} from 'vuex';

    export default {
        name: "bar",
        data() {
            return {
                date: {
                    start: date.AWeekAgo,
                    end: date.Yesterday,
                },
                activeTab: 0,
                loading: {
                    table: true,
                    chart: true
                },
                charts: [],
                dataEnum: {}
            }
        },
        components: {ChartLineBar, Loading, Error},
        created() {
            this.chart();
        },
        computed: {
            ...mapState(['dataSets', 'error']),
        },
        methods: {
            chart() {
                let current = domain.url + '';

                this.loading.chart = false;
                getAsyncCall('GET', current)
                    .then(res => {
                        this.charts = res.data.result.contents;
                        this.loading.chart = false;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>