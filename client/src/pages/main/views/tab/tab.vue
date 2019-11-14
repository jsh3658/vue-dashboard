<template>
    <div class="content">
        <!-- Tab -->
        <div :class="naviActive ? 'tab-area on' : 'tab-area'">
            <ul>
                <li v-for="(tab, i) in tabs" :key="i"><a href="javascript:" @click="tabButton(i)" :class="activeTab === i ? 'on' : ''">{{ tab }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tab",
        props: ['navi'],
        data() {
            return {
                tabs: ['All', 'Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6', 'Tab7', 'Tab8', 'Tab9', 'Tab10', 'Tab11', 'Tab12', 'Tab13'],
                activeTab: 0,
            }
        },
        computed: {
            naviActive() {
                return this.navi
            },
        },
        methods: {
            tabButton(index) {
                if (this.activeTab !== index) {
                    this.activeTab = index;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        #container {
            .content {
                padding-left: 122px;
                .tab-area {
                    position: fixed;
                    top: 110px;
                    left: 56px;
                    width: 102px;
                    height: 100%;
                    border-right: 1px solid #dee2e6;
                    padding-bottom:10px;
                    text-align: center;
                    z-index: 8;
                    @include transition(left 0.4s);
                    &.on{
                        left:269px;
                    }
                    ul {
                        position: relative;
                        height: 100vh;
                        z-index: 2;
                        li {
                            width: 100%;
                            a {
                                display: block;
                                width: 100%;
                                padding: 10px 0;
                                font-size: 12px;
                                color: #9e9e9e;
                                &.on {
                                    color: #fff;
                                    border:1px solid #fe5d70;
                                    background: #fe5d70;
                                    @extend .borderBox;
                                }
                            }
                        }
                    }
                    &::after{
                        content:'SELECT';
                        position: absolute;
                        display:flex;
                        align-items: center;
                        justify-content: center;
                        top:-44px;
                        left:0;
                        width:0;
                        height:43px;
                        padding-top:4px;
                        font-size: 12px;
                        letter-spacing: 0.3px;
                        background: #278da0;
                        color: #fff;
                        font-family: airMedium;
                        overflow: hidden;
                        @extend .borderBox;
                        @include transition(translate, 1s, ease);
                    }
                    &::before{
                        content:'';
                        position: absolute;
                        top:-50px;
                        left:1px;
                        width:100%;
                        height:50px;
                        border-right:1px solid #dee2e6;
                        z-index: 1;
                    }
                }
            }
        }
    }
</style>