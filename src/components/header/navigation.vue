<template>
    <div :class="menu() ? 'hover sidebar-menu' : 'sidebar-menu'" @mouseenter="open">
        <div class="sidebar-header">
            <h2 class="title">{{ subTitle }}</h2>
        </div>
        <div class="sidebar-content">
            <ul ref="list">
                <li v-for="(dpOne, one) in items" :key="one">
                    <div :class="gnbActive[0].index === one ? 'depth active' : 'depth'"
                         @click.capture="handle($event, dpOne, one, 0)">
                        <router-link :to="dpOne.path">{{ dpOne.label }}</router-link>
                        <span :class="gnbActive[0].index === one ? 'icon-thumbnail active' : 'icon-thumbnail'">
                            <img :src="require('@/assets/img/' + dpOne.img + '.svg')">
                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" :viewBox="dpOne.viewBox" style="enable-background:new 0 0 57.938 57.938;" >
                            <path :style="{fill: gnbActive[0].index === one ? '#fff' : '#455a64'}" :d=dpOne.svg />
                        </svg>
                        </span>
                    </div>

                    <transition name="slide-fade">
                        <div class="depth2" v-if="gnbActive[0].active && one === gnbActive[0].index">
                            <ul>
                                <li v-for="(dpTwo, two) in dpOne.child" :key="two">
                                    <div class="depth" @click.capture="handle($event, dpTwo, two, 1)">
                                        <router-link :to="dpTwo.path">{{ dpTwo.label }}</router-link>
                                        <span :class="gnbActive[1].index === two ? 'icon-thumbnail active two' : 'icon-thumbnail'"><i>i</i></span>
                                    </div>

                                    <transition name="slide-fade">
                                        <div class="depth3" v-if="gnbActive[1].active && two === gnbActive[1].index">
                                            <ul>
                                                <li v-for="(dpThree, three) in dpTwo.child" :key="three">
                                                    <div class="depth"
                                                         @click.capture="handle($event, dpThree, three, 2)">
                                                        <router-link :to="dpThree.path">{{ dpThree.label }}
                                                        </router-link>
                                                        <span :class="gnbActive[2].index === three ? 'icon-thumbnail active three' : 'icon-thumbnail'"><i>I</i></span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </transition>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import GNB from '@/common/naviScope.js';

    export default {
        name: "navigation",
        data() {
            return {
                subTitle: 'DASHBOARD',
                hover: false,
                gnbActive: [
                    {active: false, index: -1},
                    {active: false, index: -1},
                    {active: false, index: -1},
                ],
                toggle: false
            }
        },
        props: ['navi'],
        watch: {
            $route(path) {
                this.findNavigation(path);
            }
        },
        computed: {
            items() {
                return GNB();
            }
        },
        created() {
            this.findNavigation(this.$route.path);
        },
        methods: {
            menu() {
                this.toggle = this.navi;

                return this.toggle;
            },
            findNavigation (path) {
                let nowPath = path;
                let nav = this.items;
                let breadcrumbs = [];

                nav.forEach((child, index) => {
                    child.child.forEach((p, idx) => {
                        if (p.path !== '') {
                            if (p.path === nowPath) {
                                this.gnbActive[0].active = true;
                                this.gnbActive[0].index = index;
                                this.gnbActive[1].index = idx;
                                this.gnbActive[2].index = -1;

                                if (p.child !== undefined) {
                                    this.gnbActive[1].active = true;
                                }
                            }
                        } else {
                            p.child.forEach((e, i) => {
                                if (e.path === nowPath) {
                                    this.gnbActive[0].active = true;
                                    this.gnbActive[0].index = index;
                                    this.gnbActive[1].index = idx;
                                    this.gnbActive[2].index = i;

                                    if (p.child !== undefined) {
                                        this.gnbActive[1].active = true;
                                    }
                                }
                            })
                        }
                    });
                });


                if (this.gnbActive[0].index >= 0) {
                    breadcrumbs.push(nav[this.gnbActive[0].index].label);
                }
                if (this.gnbActive[1].index >= 0) {
                    breadcrumbs.push(nav[this.gnbActive[0].index].child[this.gnbActive[1].index].label);
                }
                if (this.gnbActive[2].index >= 0) {
                    breadcrumbs.push(nav[this.gnbActive[0].index].child[this.gnbActive[1].index].child[this.gnbActive[2].index].label);
                }

                this.$emit('breadcrumbs', breadcrumbs);
            },
            handle(e, menu, index, num) {
                if (menu.child !== undefined) {
                    e.preventDefault();

                    if (this.gnbActive[num].index !== index) {
                        this.gnbActive[num].active = true;
                        this.gnbActive[num].index = index;
                    } else {
                        this.gnbActive[num].active = !this.gnbActive[num].active;
                    }
                } else {
                    this.gnbActive[num].active = false;
                    this.gnbActive[num].index = index;
                }

                if (num === 0) {
                    this.gnbActive[1].index = -1;
                    this.gnbActive[2].index = -1;
                } else if(num === 1) {
                    this.gnbActive[2].index = -1;
                }
            },
            open() {
                this.toggle ? this.toggle : this.toggle = !this.toggle;
                this.$emit('openMenu', this.toggle);
            }
        }
    }
</script>

<style lang="scss" scoped>
    ::-webkit-scrollbar {
        display: none;
    }

    .sidebar-menu {
        position: fixed;
        top: 0;
        left: -224px;
        bottom: 0;
        right: 0;
        width: 280px;
        padding-bottom: 100px;
        overflow-y: auto;
        background: #2b303b;
        z-index: 11;
        @include transition(transform 0.4s);
        &.hover {
            @include translate(213px, 0);
        }
        .sidebar-header {
            display: flex;
            align-items: center;
            width: 100%;
            height: 60px;
            padding: 0 20px 0 32px;
            border-bottom: 1px solid #232730;
            background: #272b35;
            color: #fff;
            .title {
                font-size: 26px;
            }
        }
        .sidebar-content {
            margin-top: 30px;
            ul {
                li {
                    margin-top: 11px;

                    .icon-thumbnail{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto;
                        text-align: center;
                        color: #fff;
                        font-weight: bold;
                        &.active{
                            i{
                                color:#2a93ff;
                            }
                        }
                        i{
                            display:block;
                            width:100%;
                            height:100%;
                            color:#545058;
                        }
                    }
                    .depth {
                        display: flex;
                        align-items: center;
                        &.active {
                            a {
                                color: #fff;
                            }
                        }
                        a {
                            display: flex;
                            flex:1 1 auto;
                            align-items: center;
                            min-height: 38px;
                            padding-left: 32px;
                            font-size: 14px;
                            color: #788195;
                            &.active {
                                color: #fff;
                            }
                            &:hover {
                                color: #fff;
                            }
                        }
                        .icon-thumbnail {
                            width: 24px;
                            height: 24px;
                            line-height: 24px;
                            margin-right:19px;
                            img{
                                width:100%;
                            }
                            &.active {
                                &.two {
                                    /*border:1px solid red;*/
                                }
                                &.three {
                                    background: #f35958;
                                }
                            }
                        }
                    }
                    &:first-child {
                        margin-top: 0;
                    }
                    .depth2 {
                        background: #21252d;
                        padding: 13px 0 18px;
                        margin-top:7px;
                        ul {
                            li {
                                min-height: 30px;
                                a {
                                    font-size: 13px;
                                    padding: 0 34px;
                                    &.active {
                                        color: #fff;
                                    }
                                }
                                .icon-thumbnail {
                                    width: 31px;
                                    height: 31px;
                                    margin-right:13px;
                                    line-height: 31px;
                                    background: #343235;
                                }
                                .depth3 {
                                    padding: 15px 0;
                                    margin-top: 10px;
                                    background: #0d111b;
                                    ul {
                                        li {
                                            a {
                                                min-height: 34px;
                                                padding: 0 39px;
                                                font-size: 12px;
                                                color: #788195;
                                                &.active {
                                                    color: #fff;
                                                }
                                                &:hover {
                                                    color: #fff;
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
        }

        .slide-fade-enter-active {
            @include transition(all 0.3s ease);
        }
        .slide-fade-leave-to {
            opacity: 0;
        }
        .slide-fade-enter {
            opacity: 0;
            @include translate(-10px);
        }
    }
</style>