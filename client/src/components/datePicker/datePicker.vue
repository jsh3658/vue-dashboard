<template>
    <div class="date-range">
        <div class="calendar">
            <input type="text" placeholder="When is the date you want?" :class="inputActive ? 'on' : ''"
                   :value="formatDates(dateOne, dateTwo)" id="datepicker-trigger" autocomplete=off>
            <button id="datepicker" @click="apply">{{ buttonText }}</button>
        </div>
        <ul class="day-list" v-if="this.showListDate">
            <li v-for="(btn, i) in lists" :key="i">
                <a href="javascript:;" @click="dateUpdate(i)" :class="defaultDate() === i ? 'on' : ''">
                    <span class="txt">{{ btn.name }}</span>
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        </ul>
        <AirbnbStyleDatepicker
                class="datepicker"
                :trigger-element-id="'datepicker-trigger'"
                :mode=this.dateMode
                :months-to-show=this.dateMonthToShow
                :fullscreen-mobile="false"
                :date-one="dateOne"
                :date-two="dateTwo"
                showMonthYearSelect
                @date-one-selected="dateOneSelected"
                @date-two-selected="val => { dateTwo = val }"
                @apply="apply"
                :minDate="minDateConfig"
                :endDate="MaxDate"
        />
    </div>
</template>

<script>
    import format from 'date-fns/format';
    import date from '@/common/dateConfig.js';

    export default {
        name: "datePicker",
        props: ['start', 'end', 'datepicker', 'minDate'],
        data() {
            return {
                dateFormat: 'YYYY.MM.DD',
                dateOne: this.start,
                dateTwo: this.end,
                dateToday: date.Today,
                dateYesterday: date.Yesterday,
                dateThreeMonth: date.ThreeMonthsAgo,
                MaxDate: date.Today,
                lists: [
                    {name: '세달 전', date: date.ThreeMonthsAgo},
                    {name: '두달 전', date: date.TwoMonthsAgo},
                    {name: '한달 전', date: date.AMonthAgo},
                    {name: '일주일 전', date: date.AWeekAgo},
                    {name: '하루 전', date: date.Yesterday},
                ],
                buttonText: 'Searh',
                inputActive: false,
                prevIdx: -1
            }
        },
        computed: {
            showListDate() {
                let show = true;
                this.datepicker === undefined ? show : show = this.datepicker.showDate;

                return show
            },
            dateMode() {
                let mode = '';
                this.datepicker === undefined ? mode = 'range' : mode = this.datepicker.mode;

                return mode
            },
            dateMonthToShow() {
                let show = '';
                let defaultMonth = 2;
                this.datepicker === undefined ? show = defaultMonth : show = this.datepicker.monthToShow;

                return show;
            },
            minDateConfig() {
                let min = this.minDate === undefined ? '' : this.minDate;

                return min;
            },
        },
        methods: {
            formatDates(dateOne, dateTwo) {
                let formattedDates = '';
                if (dateOne) {
                    formattedDates = format(dateOne, this.dateFormat)
                }
                if (dateTwo) {
                    formattedDates += ' - ' + format(dateTwo, this.dateFormat)
                }
                return formattedDates
            },
            defaultDate() {
                let [startYear, startMonth, startDay] = this.dateOne.split('-');
                let [endYear, endMonth, endDay] = this.dateToday.split('-');
                let start = new Date(startYear, startMonth - 1, startDay);
                let end = new Date(endYear, endMonth - 1, endDay);
                let diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;

                if (diff >= 91) {
                    this.prevIdx = -1;
                } else if (diff === 90) { // 세달전
                    this.prevIdx = 0;
                } else if (diff >= 59) { // 두달전
                    this.prevIdx = 1;
                } else if (diff >= 29) { // 한달전
                    this.prevIdx = 2;
                } else if (diff >= 6) { // 일주일전
                    this.prevIdx = 3;
                } else { // 하루전
                    this.prevIdx = 4;
                }

                if (this.dateTwo !== undefined && (this.dateToday !== this.dateTwo && this.dateYesterday !== this.dateTwo)) {
                    this.prevIdx = -1;
                }

                return this.prevIdx;
            },
            dateUpdate(idx) {
                if (this.prevIdx !== idx) {
                    this.dateOne = this.lists[idx].date;
                    this.end === this.dateToday ? this.dateTwo = this.dateToday : this.dateTwo = this.dateYesterday;

                    this.prevIdx = idx;
                    this.inputActive = true;
                    setTimeout(() => {
                        this.inputActive = false;
                    }, 1000);

                    this.apply();
                }
            },
            dateOneSelected(val) {
                this.dateOne = val;
            },
            apply() {
                let end = this.dateTwo || this.dateOne;

                this.inputActive = true;
                setTimeout(() => {
                    this.inputActive = false;
                }, 1000);

                this.$emit('updateDate', this.dateOne, end);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .date-range {
        position: relative;
        display: flex;
        padding-top: 12px;
        margin-top: 11px;
        z-index: 3;
        .calendar {
            display: flex;
            height: 37px;
            input {
                width: 240px;
                height: 100%;
                cursor: pointer;
                @extend .input-style;
                &.on {
                    animation: borderFlicker 1s ease-out;
                    @keyframes borderFlicker {
                        from {
                            border: 0;
                        }
                        25% {
                            border: 1px solid #fa5b60;
                        }
                        50% {
                            border: 0;
                        }
                        75% {
                            border: 1px solid #fa5b60;
                        }
                        to {
                            border: 0;
                        }
                    }
                }
            }
            button {
                width: 119px;
                padding: 0 8px;
                text-align: center;
                background: #fa5b60;
                color: #fff;
                font-size: 14px;
                letter-spacing: 0.7px;
            }
        }
        ul.day-list {
            display: flex;
            margin-left: 30px;
            li {
                display: flex;
                position: relative;
                width: 96px;
                height: 32px;
                margin: auto 2px 0;
                line-height: 35px;
                text-align: center;
                a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #fff;
                    font-size: 12px;
                    &::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 85%;
                        border-top: 30px solid rgba(255, 255, 255, 0.3);
                        border-left: 0px solid transparent;
                        border-right: 29px solid transparent;
                    }
                    &:hover {
                        &::after {
                            border-top-color: #546e7a;
                        }
                        i {
                            &::after {
                                border-bottom-color: #546e7a;
                            }
                        }
                    }
                    &.on {
                        color: #fff;
                        i {
                            &::after {
                                border-bottom-color: #f9be53;
                            }
                            &::before {
                                color: #f9be53;
                            }
                        }
                    }
                    .txt {
                        position: relative;
                        width: 79px;
                        height: 100%;
                        padding-right: 8px;
                        z-index: 2;
                    }
                    i {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 29px;
                        height: 100%;
                        margin-left: -23px;
                        &.fa-chevron-right:before {
                            position: relative;
                            top: 3px;
                            padding-left: 17px;
                            font-size: 11px;
                            z-index: 2;
                        }
                        &::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            border-bottom: 30px solid rgba(255, 255, 255, 0.3);
                            border-left: 29px solid transparent;
                            border-right: 0px solid transparent;
                        }
                    }
                }
            }
        }

        /deep/ .asd__month-year-select {
            color: #f5595d;
        }

        /deep/ .asd__keyboard-shortcuts-trigger {
            display: none;
        }

    }
</style>