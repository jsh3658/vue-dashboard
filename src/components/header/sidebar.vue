<template>
    <div class="sidebar" :class="sidebar ? 'active' : ''" @mouseleave="close">
        <div class="side-header">
            <p class="tit">{{ title }}<span>{{ subTitle }}</span></p>
            <a href="javascript:" class="btn-close" @click="close"><img src="../../assets/img/btn_close.png"></a>
        </div>
        <div class="side-content">
            <ul>
                <li v-for="(list, i) in lists" :key="i" >
                    <a href="javascript:" @click="sideBarClick(list)">{{ list }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: "sidebar",
        props: [ 'state' ],
        computed: {
            sidebar() {
                return this.state;
            }
        },
        data() {
            return {
                title: 'Sidebar',
                subTitle: 'Menu Lists',
                lists : ['sign out']
            }
        },
        methods:{
            sideBarClick() {},
            close() {
                this.$emit('close', false);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar{
        position: fixed;
        top:0;
        right:-300px;
        bottom:0;
        width: 280px;
        background: #fff;
        box-shadow:0 0 9px rgba(191, 191, 191, 0.36);
        z-index: 11;
        transition: transform 0.4s;
        transform: translate(0, 0);
        &.active{
            transform: translate(-300px, 0);
        }
        .side-header{
            position: relative;
            display:flex;
            width:100%;
            height:60px;
            align-items: center;
            justify-content: center;
            border-bottom:1px solid #e7e7e7;
            .tit{
                margin-top:3px;
                font-size:15px;
                text-align: center;
                font-family: 'airLight';
                span{
                    display:block;
                    margin-top:-1px;
                    font-size:12px;
                }
            }
            .btn-close{
                position: absolute;
                top:50%;
                right:10px;
                transform: translate(0, -50%);
                img{
                    width:22px;
                }
            }
        }
        .side-content{
            ul{
                margin-top:20px;
                text-align: center;
                li{
                    width:100%;
                    padding:0 15px;
                    a{
                        display:block;
                        width:100%;
                        padding:11px 0;
                        border-bottom:1px solid rgba(0, 0, 0, 0.07);
                        color:#626262;
                    }
                    &:hover{
                        background: #daeffd;
                        a {
                            color:#000;
                        }
                    }
                }
            }
        }
    }
</style>