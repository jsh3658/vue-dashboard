<template>
    <div class="content">
        <!-- Chart -->
        <div class="row" v-for="(list, i) in chartLists" :key="i">
            <Error v-if="error"/>
            <Loading v-else-if="list.loading" :text="'Chart Loading'"/>
            <Chart v-else :chartData="list.data.contents" :id="list.id + i" :dataEnum="dataEnum"/>
        </div>
    </div>
</template>

<script>
    import * as domain from '@/common/domain.js';
    import getAsyncCall from '@/common/api';
    import Chart from '@/components/chart/line.vue';
    import Loading from '@/components/loading/loading.vue';
    import Error from '@/components/error/error.vue';
    import {mapState} from 'vuex';

    export default {
        name: "chartLine",
        data() {
            return {
                chartLists: [
                    {name: 'Chart1', id: 'chart', loading: true, data: []},
                    {name: 'Chart2', id: 'chart', loading: true, data: []},
                    {name: 'Chart3', id: 'chart', loading: true, data: []},
                ],
                dataEnum: {},
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
                this.chartLists.map(obj => {
                    let args = {
                        TYPE: 'GET',
                    };

                    obj.loading = false;
                    args.URL = domain.url + '';
                    getAsyncCall(args.TYPE, args.URL).then(res => {
                        const data = res.data.result;

                        obj.data = data;
                        obj.loading = false;
                    });
                });
            }
        },
    }
</script>
