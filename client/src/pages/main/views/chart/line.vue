<template>
    <div class="content">
        <!-- Chart -->
        <div class="row" v-for="(list, i) in chartLists" :key="i">
            <Error v-if="error"/>
            <Loading v-else-if="list.loading" :text="'Chart Loading'"/>
            <Chart v-else :chartData="list.data.contents" :head="list.name" :id="list.id + i" :dataEnum="dataEnum" :type="list.type"/>
        </div>
    </div>
</template>

<script>
    import * as domain from '@/common/domain.js';
    import getAsyncCall from '@/common/api';
    import Chart from '@/components/chart/chart.vue';
    import Loading from '@/components/loading/loading.vue';
    import Error from '@/components/error/error.vue';
    import {mapState} from 'vuex';

    export default {
        name: "chartLine",
        data() {
            return {
                chartLists: [
                    {name: 'Chart1', id: 'chart', loading: true, data: [], type: 'line'},
                    {name: 'Chart2', id: 'chart', loading: true, data: [], type: 'bar'},
                    {name: 'Chart3', id: 'chart', loading: true, data: [], type: 'line'},
                ],
                dataEnum: {
                    name: '이름',
                    score: '점수',
                    price: '가격'
                }
            }
        },
        components: {Chart, Loading, Error},
        created() {
            this.chartCall();
        },
        computed: {
            ...mapState(['dataSets', 'error'])
        },
        methods: {
            chartCall() {
                let args = {
                    TYPE: 'GET',
                };
                args.URL = domain.url + '/api/list';

                this.chartLists.map(obj => {
                    getAsyncCall(args.TYPE, args.URL).then(res => {
                        const data = res.data;

                        obj.data = data;
                        obj.loading = false;
                    });
                });
            }
        },
    }
</script>
