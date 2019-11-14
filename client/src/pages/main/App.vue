<template>
    <div id="app" @scroll="onScroll" :class="scroll ? 'scroll' : ''">
        <!-- header -->
        <header id="header">
            <h1 class="main-title">{{ title }}</h1>
            <div class="menu" @click="naviToggle" v-if="noCookie">
                <a href="javascript:" v-if="!navi"  :class="menuHover ? 'active btn-menu' : 'btn-menu'" @mouseenter="menuHover = true" @mouseleave="menuHover = false"><span></span></a>
                <a href="javascript:" v-else class="btn-close"><img src="../../assets/img/btn_close.png"></a>
            </div>
        </header>

        <!-- navigation -->
        <nav id="gnb" v-if="noCookie">
            <navigation :navi="navi" @openMenu="openMenu" @breadcrumbs="breadcrumbs"/>
        </nav>

        <!-- utilMenu -->
        <sidebar :state="sidebar" @close="close" v-if="noCookie" />

        <!-- content -->
        <div id="container" :class="navi ? 'on': ''">
            <div v-if="noCookie" :class="setting ? 'settings active' : 'settings'" >
                <a href="javascript:" @mouseover="open">
                    <i class="fas fa-cog"></i>
                </a>
            </div>
            <div class="breadcrumbs" v-if="noCookie">
                <img src="../../assets/img/breadcrumbs.png" class="icon-bread">
                <ul>
                    <li v-for="(bread, i) in breads" :key="i"> {{ bread }}</li>
                </ul>
            </div>
            <router-view :navi="navi" />
        </div>
        <div class="content-loading" v-if="excelLoading">
            <div id="loader">
                <div id="box"></div>
                <div id="shadow"></div>
                <p class="tit">Excel Downloading...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from '@/components/header/navigation';
    import sidebar from '@/components/header/sidebar';
    import { root } from '@/common/root.js';
    import { mapState } from 'vuex';

    export default {
        name: 'App',
        components: {
            navigation,
            sidebar
        },
        data() {
            return {
                title: 'DASHBOARD',
                sidebar: false,
                setting: false,
                navi: false,
                menuHover: false,
                breads: [],
                scroll: false
            }
        },
        created() {
            setTimeout(() => {
                this.setting = true;
            }, 1000);

            window.addEventListener('scroll', this.onScroll);
        },
        computed: {
            ...mapState(['excelLoading']),
            noCookie() {
                let cookie = (root[0].redirect === '/noCookies') ? false : true;

                return cookie;
            }
        },
        methods:{
            open() {
                this.sidebar = true;
            },
            close(flag) {
                this.sidebar = flag;
            },
            naviToggle() {
                this.navi = !this.navi;
            },
            openMenu(t) {
                this.navi = t;
            },
            breadcrumbs(n) {
                this.breads = n;
            },
            onScroll() {
                window.scrollY >= 30 ? this.scroll = true : this.scroll = false;
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.onScroll);
        }
    }
</script>

<style lang="scss">
    #app {
        height:100%;
        &.scroll{
            #container {
                .content {
                    .tab-area{
                        top:104px;
                        &::after{
                            animation: easeOutBounce 1s 0s forwards;
                            -webkit-animation: easeOutBounce 1s 0s forwards;
                            @keyframes easeOutBounce {
                                0% {width: 0; -webkit-animation-timing-function: ease-in;}
                                33% {width: 100%; -webkit-animation-timing-function: ease-out;}
                                50% {width: 70%; -webkit-animation-timing-function: ease-in;}
                                66% {width: 100%; -webkit-animation-timing-function: ease-out;}
                                82% {width: 90%; -webkit-animation-timing-function: ease-in;}
                                92% {width: 100%; -webkit-animation-timing-function: ease-out;}
                                97% {width: 95%; -webkit-animation-timing-function: ease-in;}
                                100% { width: 100%;}
                            }
                        }
                    }
                }
            }
        }
        .error{
            width:100%;
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height:300px;
            font-size:15px;
            color:#656565;
            background: #fff;
            @include boxShadow(0 0 1px 0 rgba(65,65,65,.09), 0 2px 2px 0 rgba(65,65,65,.23));
            @include borderRadius(6px);
            p.txt{
                margin-top:7px;
            }
        }
        #header{
            position: fixed;
            display: flex;
            align-items: center;
            top:0;
            left:0;
            width:100%;
            height:60px;
            padding:0 30px;
            border-bottom:1px solid rgba(230, 230, 230, 0.7);
            background: #fff;
            color:#404E67;
            z-index: 10;
            .main-title{
                width:259px;
                text-align: center;
                font-size:23px;
                font-family: 'airBold';
            }
            .user-info{
                display:flex;
                align-items: center;
                margin-left:auto;
                .user-face{
                    display:inline-block;
                    width:40px;
                    height:40px;
                    margin-left:16px;
                    overflow: hidden;
                    @include borderRadius(50%);
                    img{
                        width:100%;
                    }
                }
                .txt{
                    font-size:14px;
                    color:#626262;
                }
            }
            .menu{
                display:block;
                cursor: pointer;
                .btn-menu{
                    position: relative;
                    display:block;
                    width: 30px;
                    height: 23px;
                    overflow: hidden;
                    transition: 0.3s;
                    span{
                        float: right;
                        width: 29px;
                        height: 2px;
                        background-color: #404E67;
                        position: relative;
                        top: 10px;
                        right:0;
                        @include transition(width 0.3s);
                        &:before{
                            content: '';
                            width: 29px;
                            height: 2px;
                            background-color: #404E67;
                            position: absolute;
                            top: -8px;
                            right: 0;
                        }
                        &:after{
                            content: '';
                            width: 29px;
                            height: 2px;
                            background-color: #404E67;
                            position: absolute;
                            bottom: -8px;
                            right: 0;
                            @include transition(width 0.3s);
                        }
                    }
                    &.active{
                        span{
                            width:19px;
                            &:after{
                                width:14px;
                            }
                        }
                    }
                }
                .btn-close{
                    display:block;
                    width:30px;
                    @include transition(all 0.3s ease-in-out);
                    &:hover {
                        transform: rotate(180deg);
                    }
                    img{
                        width:100%;
                    }
                }
            }
        }
        #container{
            position: relative;
            width:100%;
            max-width:100%;
            height:100%;
            padding:60px 0 0 56px;
            background:#f5f5f5;
            @include transition(padding 0.4s);
            &.on{
                padding-left:269px;
            }
            .breadcrumbs{
                position: relative;
                display:flex;
                width:100%;
                height:50px;
                padding-left:25px;
                align-items: center;
                font-family: 'airLight';
                font-size:13px;
                background: #f5f5f5;
                z-index: 9;
                .icon-bread{
                    height:11px;
                }
                ul{
                    display:flex;
                    margin-left:9px;
                    li{
                        position: relative;
                        padding-left:14px;
                        margin-left:10px;
                        color:#656565;
                        &::after{
                            position: absolute;
                            top:0;
                            left:0;
                            display:block;
                            content:'/';
                            color:#656565;
                            font-weight: 100;
                        }
                        &:first-child{
                            padding-left:0;
                            margin-left:0;
                            &::after{
                                display:none;
                            }
                        }
                        &:last-child {
                            color:#007bff;
                            font-family: 'airMedium';
                        }
                    }
                }
            }
            .settings{
                position: fixed;
                top: 40px;
                right:-60px;
                width: 55px;
                height: 55px;
                background: #2683a0;
                color: #fff;
                z-index: 10;
                @include boxShadow(0 1px 4px 0 rgba(0,0,0,0.2));
                @include borderRadius(50% 0 0 50%);
                @include transition(right, 0.4s, ease);
                &.active{
                    right:0;
                }
                a{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    width:90%;
                    height:100%;
                    margin-left:auto;
                    font-size:22px;
                    color:#fff;
                    animation: myRotate 10s infinite linear;
                    @include keyframes(myRotate) {
                        from {
                            @include transformRotate(0deg);
                        }
                        to {
                            @include transformRotate(360deg);
                        }
                    }
                }
            }
            .btn-excel{
                position: relative;
                width:359px;
                padding:10px 0;
                margin-top:8px;
                background:rgb(10, 166, 153);
                font-family: airMedium;
                color:#fff;
                z-index: 2;
            }
            .content{
                position: relative;
                width: 100%;
                padding:0 21px 25px 21px;
                background: #f5f5f5;
                .row{
                    position: relative;
                    display: flex;
                    margin-bottom:10px;
                    .chart-wrap{
                        position: relative;
                        display:flex;
                        flex-direction: column;
                        width:100%;
                        background: #fff;
                        @include boxShadow(0 0 1px 0 rgba(65,65,65,.09), 0 2px 2px 0 rgba(65,65,65,.23));
                        @include borderRadius(6px);
                        .header{
                            padding:35px 0 0 30px;
                            .tit{
                                color: #444;
                                font-size: 17px;
                                font-weight: 700;
                                font-family: 'airBook';
                            }
                        }
                        .chart-box{
                            display:flex;
                            flex:1 1;
                        }
                    }
                    .date-picker {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        width: 100%;
                        min-height: 199px;
                        padding: 29px 25px 24px;
                        margin-bottom:10px;
                        background: url('../../assets/img/bg_date.jpg') no-repeat 0 68%;
                        background-size: 100%;
                        @include boxShadow(0 0 1px 0 rgba(65,65,65,.09), 0 2px 2px 0 rgba(65,65,65,.23));
                        @include borderRadius(6px);
                        &::after{
                            content:'';
                            position: absolute;
                            top:0;
                            left:0;
                            width:100%;
                            height:100%;
                            background:rgba(34, 38, 46, 0.7);
                            @include borderRadius(6px);
                        }
                        .tit {
                            position: relative;
                            color: #fff;
                            font-size: 22px;
                            font-family: 'airMedium';
                            z-index: 2;
                            span {
                                display: block;
                                margin-top: 7px;
                                font-size: 12px;
                                opacity: 0.8;
                            }
                        }
                        .select-wrap{
                            position: relative;
                            margin-top:5px;
                            z-index: 2;
                            ul{
                                display:flex;
                                li{
                                    display:flex;
                                    align-items: center;
                                    margin-right:17px;
                                    p.tit{
                                        font-size:13px;
                                        font-family: 'airBook';
                                        margin-right: 7px;
                                    }
                                    .time-zone{
                                        display:flex;
                                        align-items: center;
                                        .wave{
                                            display:inline-block;
                                            padding:0 4px;
                                            color:#fff;
                                            font-size:13px;
                                        }
                                        input{
                                            border: 1px solid rgba(255, 255, 255, 0.3);
                                            font-family: airBook;
                                            font-size:13px;
                                        }
                                    }
                                    input{
                                        width: 137px;
                                        height: 30px;
                                        padding:0 8px;
                                        @extend .input-style;
                                        &.check-box{
                                            width:inherit;
                                        }
                                    }
                                    .select-box{
                                        position: relative;
                                        display:flex;
                                        align-items: center;
                                        justify-content: center;
                                        height:100%;
                                        margin-left:14px;
                                        select {
                                            width:122px;
                                            height:29px;
                                            padding:0 0.8em;
                                            line-height: 29px;
                                            border:0;
                                            border-radius: 0;
                                            background: rgba(255, 255, 255, 0.3);
                                            color:#fff;
                                            font-size:13px;
                                            -webkit-appearance: none;  /* 네이티브 외형 감추기 */
                                            -moz-appearance: none;
                                            appearance: none;
                                            text-align: center;
                                            option {
                                                color:#000;
                                            }
                                        }
                                        &::after{
                                            content: '▼';
                                            position: absolute;
                                            top:50%;
                                            right:6px;
                                            color: #fff;
                                            font-weight: bold;
                                            font-size:12px;
                                            pointer-events: none;
                                            z-index: 2;
                                            cursor: pointer;
                                            @include translate(0, -50%);
                                        }
                                    }
                                }
                            }
                            ::placeholder {
                                color: #fff;
                                opacity: 1;
                            }
                            :-ms-input-placeholder {
                                color: #fff;
                            }
                            ::-ms-input-placeholder {
                                color: #fff;
                            }
                        }
                    }
                    .no-data{
                        display:flex;
                        min-height:270px;
                        flex:1 1;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        font-size:13px;
                        font-family: 'airLight';
                        color:#cecece;
                        padding:20px 0 30px;
                        i{
                            font-size:50px;
                        }
                        p.txt{
                            margin-top:11px;
                        }
                    }
                    .table-wrap{
                        width:100%;
                    }
                }
            }
        }
    }
</style>
