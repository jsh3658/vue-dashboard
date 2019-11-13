<template>
    <div class="chart-wrap">
        <div class="header">
            <p class="tit">{{ head }}</p>
        </div>
        <div :id="id" class="chart" v-if="charts"></div>
        <div class="no-data" v-else>
            <i class="fas fa-dizzy"></i>
            <p class="txt">검색 결과가 없습니다.</p>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts/dist/echarts.js';
    import comma from '@/common/comma';

    export default {
        name: "lineChart",
        props: ['chartData' , 'id', 'dataEnum', 'head'],
        data() {
            return {
                Chart: {}
            }
        },
        computed: {
            charts() {
                return this.chartData.length !== 0 ? true : false;
            }
        },
        mounted() {
            this.$nextTick(() => {
                if(this.charts) {
                    this.canvasCall();
                }
            });
        },
        methods: {
            canvasCall() {
                this.Chart = echarts.init(document.getElementById(this.id));

                let data = [];
                let content = this.chartData;
                let reverseData = content.reverse();
                let option = {
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        data: [],
                        top: 10,
                        right: 10,
                        bottom: 25,
                        itemHeight: 17,
                        itemGap: 15,
                        padding: 20,
                        formatter: (value) => {
                            let text = this.dataEnum[value] || value;

                            return text;
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        },
                        position: (point) => {
                            return [point[0], '10%'];
                        },
                        padding: [10, 17, 10, 17],
                        formatter: (args) => {
                            let result = '';
                            let time = '<p class="tooltip-tit">' + args[0].axisValue + '</p>';

                            result += time;
                            args.forEach(obj => {
                                let name = this.dataEnum[obj.seriesName] || obj.seriesName;

                                result += '<p class="tooltip-txt">' + obj.marker + name + ' : ' + comma.comma(obj.value) + '</p>';
                            });


                            return result;
                        },
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLabel: {
                            fontSize: 11,
                        }
                    },
                    yAxis: [
                        {
                            splitLine: { show: false },
                            axisLabel: {
                                fontSize: 11,
                            }
                        },
                        {
                            splitLine: { show: false },
                            axisLabel: {
                                fontSize: 11
                            }
                        }
                    ],
                    series: [],
                    grid: {
                        x: '5%',
                        width: '80%'
                    }
                };

                // forEach문을 쓴 이유: 가독성이 좋다.
                Object.keys(content[0]).forEach(key => {
                    data.push({
                        [key] : []
                    });
                });

                Object.keys(reverseData).forEach(i => {
                    data.map(e => {
                        let name = Object.keys(e)[0];

                        e[name].push(reverseData[i][name]);
                    });
                });

                // 성능 최적화를 위해 forEach, map, filter를 사용하지 않고 for문 사용
                for(let i = 0 ; i < data.length; i++) {
                    for(let key in data[i]) {
                        if(i === 0) {
                            option.xAxis.data = data[i][key];
                        } else {
                            option.legend.data.push(key);

                            if(key === 'revenue') {
                                option.series.push({
                                    name: key,
                                    type: 'line',
                                    smooth: true,
                                    data: data[i][key],
                                    yAxisIndex:1,
                                    lineStyle: {
                                        width: 2
                                    }
                                });
                            } else {
                                option.series.push({
                                    name: key,
                                    type: 'line',
                                    smooth: true,
                                    data: data[i][key]
                                });
                            }
                        }
                    }
                }

                this.Chart.setOption(option);
            }
        },
        destroyed() {
            echarts.dispose(this.Chart);
        }
    }
</script>

<style lang="scss" scoped>
    .chart{
        width:100%;
        height:370px;
        font-family: airBook;
        .tooltip-tit{
            padding-bottom:10px;
            font-family: 'airBook';
            font-size:14px;
        }
        .tooltip-txt{
            font-family: 'airLight';
            font-size:13px;
        }
    }
</style>