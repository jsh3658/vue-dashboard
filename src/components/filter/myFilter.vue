<template>
    <div class="filter-wrap">
        <h3>Filter
            <img src="../../assets/img/icon_filter.png" class="icon-filter">
            <span>(Filter choose)</span>
        </h3>

        <div class="switch-wrap">
            <input class="checkbox" id="check1" type="checkbox" @change="allOpenClose" v-model="check">
            <label for="check1">
                <span class="switch">
                    <span class="bar"></span>
                    <span class="circle"></span>
                </span>
                <span class="txt">{{ checkText }}</span>
            </label>
        </div>

        <ul>
            <li v-for="(obj, key) in filter" :class="activeTab === key || activeTab === -1 ? 'on' : ''" :key="key">
                <div class="tab-btn">
                    <h4 class="title" @click.stop="tab(key)">{{ obj.title }}</h4>
                    <div class="list-part list">
                        <ul>
                            <li v-for="(list, index) in obj.lists.slice(0, 6)" :key="index">
                                <div class="checkbox-wrap">
                                    <input type="checkbox" :id="'select' + '_' + list + '_' + index" v-model="obj.selected" :value="list" >
                                    <label :for="'select' + '_' + list + '_' + index" ><span class="check"></span>{{ list }}</label>
                                </div>
                            </li>
                            <li v-if="obj.lists.length >= 6">...</li>
                        </ul>
                    </div>
                    <span class="btn-filter" @click.stop="tab(key)">
                        ({{ obj.lists.length }} COUNT)<img src="../../assets/img/icon_list_filter.png">
                    </span>
                </div>
                <div class="filter-content">
                    <div class="header">
                        <div class="all">
                            <button class="btn-all-cancel" @click="allCancel(key)">Deselect All</button>
                            <button class="btn-all-select" @click="allSelect(key)">Select All</button>
                            <button class="btn-default" @click="defaultFilter(key)">Default</button>
                        </div>
                    </div>
                    <div class="list" ref="filter-list">
                        <h5>{{ obj.title }}</h5>
                        <ul>
                            <li v-for="(list, index) in obj.lists" :key="index">
                                <div class="checkbox-wrap" >
                                    <input type="checkbox" :id="'select' + '_' + list + '_' + index" v-model="obj.selected" :value="list" >
                                    <label :for="'select' + '_' + list + '_' + index" ><span class="check"></span>{{ list }}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>

        <div class="btn-area">
            <button class="btn-cancel" @click="cancel">Cancel</button>
            <button class="btn-confirm" @click="confirm">Confirm</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "myFilter",
        data() {
            return {
                activeTab: 0,
                check: false,
                checkText: 'All Filter Close',
            }
        },
        props: ['filter', 'filterActive'],
        mounted() {
            this.$nextTick(() => {
                Object.keys(this.filter).forEach(key => {
                    this.defaultFilter(key);
                })
            });
            this.tab(this.filterActive);
        },
        methods: {
            defaultFilter(target) {
                this.filter[target].selected = [];

                this.filter[target].default.forEach(e => {
                    if(this.filter[target].lists.indexOf(e) > -1) {
                        this.filter[target].selected.push(e);
                    }
                });
            },
            tab(target) {
                if (this.activeTab === target) {
                    this.activeTab = '';
                } else {
                    this.activeTab = target;
                }
                this.check = false;
                this.$refs['filter-list'].forEach(e => {
                    e.scrollTop = 0;
                });
            },
            allOpenClose() {
                if (this.check) {
                    this.activeTab = -1;
                    this.checkText = 'All Filter Open';
                } else {
                    this.activeTab = '';
                    this.checkText = 'All Filter Close';
                }

                this.$refs['filter-list'].forEach(e => {
                    e.scrollTop = 0;
                });
            },
            allSelect(target) {
                this.filter[target].selected = this.filter[target].lists;
            },
            allCancel(target) {
                this.filter[target].selected = [];
            },
            confirm() {
                //API 호출

                Object.keys(this.filter).forEach(key => {
                    this.filter[key].confirm = this.filter[key].selected;
                });
            },
            cancel() {
                Object.keys(this.filter).forEach(key => {
                    this.filter[key].selected = this.filter[key].confirm;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .filter-wrap {
        min-height: 199px;
        padding: 29px 25px 20px;
        margin-bottom: 10px;
        background: #fff;
        @extend .borderBox;
        @include borderRadius(6px);
        @include boxShadow(0 0 1px 0 rgba(65,65,65,.09), 0 2px 2px 0 rgba(65,65,65,.23));
        h3 {
            padding-bottom:6px;
            color: #ed2924;
            font-size: 22px;
            font-family: airMedium;
            .icon-filter {
                display: inline-block;
                width: 13px;
                margin: 3px 0 0 -1px;
            }
            span {
                display: inline-block;
                padding-left: 7px;
                color: #bbb;
                font-size: 12px;
                font-family: airLight;
                font-weight: 400;
            }
        }
        .switch-wrap {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 35px;
            margin-bottom: 6px;
            .checkbox {
                display: none;
                &:checked + label {
                    color: #333;
                    .bar {
                        background: rgba(57, 108, 148, 0.4);
                    }
                    .circle {
                        left: 18px;
                        background: rgba(57, 108, 148, 1);
                    }
                }
            }
            label {
                cursor: pointer;
                span {
                    display: inline-block;
                }
                display: flex;
                font-family: 'airBook';
                font-size: 13px;
                color: #aaa;
                .switch {
                    position: relative;
                    top: 1px;
                    width: 36px;
                    height: 14px;
                    margin-right: 8px;
                    .bar {
                        width: 100%;
                        height: 100%;
                        opacity: 0.6;
                        border-radius: 8px;
                        background: rgba(0, 0, 0, 0.38);
                        transition: all .4s ease-in-out 0s;
                    }
                    .circle {
                        position: absolute;
                        top: 50%;
                        left: -1px;
                        z-index: 1;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background-color: #737373;
                        @include translate(0, -50%);
                        transition: all .3s ease-in-out 0s;
                        &:hover{
                            &::after{
                                opacity: 1;
                                transform: scale(1.7);
                            }
                        }
                        &::after{
                            opacity: 0;
                            position: absolute;
                            top:0;
                            left:0;
                            width:100%;
                            height:100%;
                            content:'';
                            border-radius: 50%;
                            background: rgba(57, 108, 148, 0.4);
                            transition: transform 0.5s;
                        }
                    }
                }
            }
        }

        .btn-area {
            display:flex;
            align-items: center;
            justify-content: center;
            margin:42px 0 9px;
            .btn-cancel {
                background: #fa5b60;
            }
            .btn-confirm {
                background: #5b82cc;
            }
            button {
                min-width: 113px;
                padding: 7px 0;
                margin-left:10px;
                font-family: airBook;
                color: #fff;
                font-size: 12px;
                &:first-child{
                    margin-left:0;
                }
            }
        }

        & > ul {
            & > li {
                position: relative;
                margin-top: -1px;
                &:first-child {
                    border-top: 0;
                    .tab-btn {
                        border-top: 1px solid #ccc;
                    }
                    &.on {
                        margin-top: 0;
                    }
                }
                &.on {
                    margin-top: 3px;
                    .tab-btn {
                        border: 0;
                        background: rgba(57, 108, 148, 0.4);
                        color: #fff;
                        h4{
                            &::after{
                                background: #fff;
                            }
                        }
                        .btn-filter{
                            &::after{
                                background: #fff;
                            }
                        }
                    }
                    .filter-content {
                        display: block;
                    }
                    .list{
                        &.list-part{
                            display:none;
                        }
                    }
                }
                .tab-btn{
                    display: flex;
                    min-height: 34px;
                    border: 1px solid #ccc;
                    align-items: center;
                    font-family: airLight;
                    color: #777;
                    h4 {
                        position: relative;
                        display:flex;
                        align-items: center;
                        width: 150px;
                        min-height: 34px;
                        padding-left: 20px;
                        font-weight: 500;
                        cursor: pointer;
                        &::after{
                            content:'';
                            position: absolute;
                            top:50%;
                            right:0;
                            width:1px;
                            height:62%;
                            background: #ccc;
                            @include translate(0, -50%);
                        }
                    }
                    .btn-filter{
                        position: relative;
                        display:flex;
                        width:120px;
                        min-height: 34px;
                        padding-right:12px;
                        margin-left: auto;
                        align-items: center;
                        justify-content: flex-end;
                        cursor: pointer;
                        &::after{
                            content:'';
                            position: absolute;
                            top:50%;
                            left:0;
                            width:1px;
                            height:62%;
                            background: #ccc;
                            @include translate(0, -50%);
                        }
                        img {
                            display: inline-block;
                            width: 20px;
                            margin-left:11px;
                        }
                    }

                }
                .list {
                    &.list-part{
                        display:flex;
                        width: calc(100% - 150px - 84px);
                        ul{
                            flex:1 1 auto;
                            padding: 0 30px;
                        }
                    }
                    h5 {
                        padding: 0 0 25px 10px;
                        font-size: 14px;
                        color:#444;
                    }
                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 0 10px;
                        @extend .borderBox;
                        li {
                            position: relative;
                            min-width:110px;
                            padding-right: 32px;
                            box-sizing: border-box;
                            .checkbox-wrap {
                                display: flex;
                                align-items: center;
                                input {
                                    display: none;
                                    &:checked{
                                        ~ label {
                                            .check {
                                                box-shadow: 0 0 0 15px #00bbea inset;
                                                border:0;
                                                &::after {
                                                    opacity: 1;
                                                    transform: scale(1);
                                                }
                                            }
                                        }
                                    }
                                }
                                label {
                                    display:flex;
                                    align-items: center;
                                    font-family: airBook;
                                    color: #777;
                                    cursor: pointer;
                                    font-size:13px;
                                    .check {
                                        display: inline-block;
                                        width: 17px;
                                        height: 17px;
                                        margin:0 9px 0 0;
                                        border-radius: 50%;
                                        background: #fff;
                                        transition: all 0.15s cubic-bezier(0, 1.05, 0.72, 1.07);
                                        cursor: pointer;
                                        @include boxShadow(1px 1px 3px #888);
                                        &::after {
                                            display: block;
                                            content: '';
                                            width: 100%;
                                            height: 100%;
                                            opacity: 0;
                                            z-index: 4;
                                            transform: scale(0);
                                            background: url('../../assets/img/icon_check.png') no-repeat center 49%;
                                            background-size: 52%;
                                            transition: all 0.25s cubic-bezier(0, 1.05, 0.72, 1.07);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .filter-content {
                    display: none;
                    border-top: 0;
                    padding: 20px 10px 30px;
                    margin-bottom:25px;
                    @include boxShadow(1px 1px 4px rgba(57, 108, 148, 0.2));
                    .header {
                        display: flex;
                        .all {
                            margin-left: auto;
                            .btn-all-select {
                                background: #0d121b;
                            }
                            .btn-all-cancel {
                                background: #8b91a0;
                            }
                            .btn-default {
                                background: #00a096;
                            }
                        }
                        button {
                            min-width: 88px;
                            padding: 5px 0;
                            margin: 0 5px 5px;
                            font-family: airBook;
                            color: #fff;
                            font-size: 12px;
                        }
                    }
                    .list{
                        max-height: 200px;
                        border-top: 1px solid #ddd;
                        padding-top: 25px;
                        margin-top: 15px;
                        overflow-y: auto;
                        ul{
                            li{
                                margin-bottom:14px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>