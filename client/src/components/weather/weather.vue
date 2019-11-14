<template>
    <div class="weather-area">
        <div class="we-inner">
            <div class="today">
                <p class="tit">요일</p>
                <p class="txt">{{ day }} ({{ today }})</p>
            </div>
            <div class="weather">
                <p class="tit">현재날씨</p>
                <div class="now-weather">
                    <img :src=weatherImg >
                    <p class="txt">{{ description }}</p>
                </div>
            </div>
            <div class="temperatures">
                <p class="txt">{{ temp }}°</p>
                <p class="current">CURRENTLY</p>
            </div>
            <div class="wind">
                <skycon condition="wind" />
                <p class="txt">풍속<span class="num">{{ windSpeed }}m/s</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import getAsyncCall from '@/common/api';

    export default {
        name: "weather",
        data() {
            return {
                windSpeed : 0,
                temp : 0,
                weatherImg: '',
                description: ''
            }
        },
        computed:{
            today() {
                let week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                let dayOfWeek = week[new Date().getDay()].toUpperCase();

                return dayOfWeek;
            },
            day() {
                return this.$moment(new Date()).format('YYYY.MM.DD');
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.weatherData();
            })
        },
        methods:{
            weatherData() {
                let appId = 'c0163386b0d3469b147ef062911620fc';
                let city = 'Seoul';
                let current = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appId;

                getAsyncCall('GET', current)
                    .then((res) => {
                        let resp = res.data;

                        this.windSpeed = resp['wind'].speed;
                        this.temp = parseInt(resp.main.temp- 273.15);
                        this.weatherImg = 'http://openweathermap.org/img/wn/' + resp.weather[0].icon + '@2x.png';
                        this.description = resp.weather[0].description.toUpperCase();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .weather-area{
        display:flex;
        flex:1 0 auto;
        @include borderRadius(4px);
        .we-inner{
            display: flex;
            flex-direction: column;
            flex:1 0 auto;
            .today{
                display: flex;
                flex-direction: column;
                padding:5.7% 7% 6%;
                font-size:13px;
                color:#505458;
                text-align: center;
                @include borderRadius(4px 4px 0 0);
                @include boxShadow(0 3px 13px #a6a5a5);
                .tit{
                    display: flex;
                    justify-content: left;
                    color:rgba(0, 0, 0, 0.5);
                }
                .txt{
                    margin-top:5px;
                    color:#555;
                }
            }
            .weather{
                padding:5.7% 7%;
                background: #f35958;
                color:#fff;
                .tit{
                    color:rgba(255, 255, 255, 1);
                }
                .now-weather{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    img{
                        width:60px;
                        margin-top:-10px;
                    }
                    .txt{
                        width:140px;
                        font-size:13px;
                        font-family: airBook;
                        margin-top:-8px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        text-align: center;
                    }
                }
            }
            .temperatures{
                display:flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height:107px;
                padding-top:9px;
                border-bottom:1px solid #ccc;
                @include boxShadow(0 3px 13px #a6a5a5);
                @extend .borderBox;
                .txt{
                    margin-left:20px;
                    font-size:62px;
                    line-height: 47px;
                    color:#f35958;
                    font-family: 'airExtraBold';
                }
                .current{
                    margin-top:8px;
                    color:#8b91a0;
                    font-family: 'airBook';
                    font-weight: bold;
                }
            }
            .wind{
                display:flex;
                padding:4px 0;
                flex-direction: column;
                align-items:center;
                justify-content:center;
                background:#0090d9;
                @include borderRadius(0 0 4px 4px);
                @include boxShadow(0 3px 13px #a6a5a5);
                .txt{
                    font-size:12px;
                    color:#fff;
                    margin-top:2px;
                    .num{
                        display: inline-block;
                        padding-left:5px;
                        font-size:13px;
                    }
                }
            }
        }
    }
</style>