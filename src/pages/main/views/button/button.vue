<template>
    <div class="content">
        <div class="radio-box">
            <p class="tit">SELECT ONE <span>(Click the button for contents you want to)</span></p>
            <ul>
                <li v-for="(s, i) in select" :key="i">
                    <label :for="'rdo-' + i" class="btn-radio">
                        <input type="radio" :id="'rdo-' + i" name="radio-grp" :checked="activeRadio === i"
                               @click="tabButton(i)">
                        <svg viewBox="0 0 20 20">
                            <circle cx="10" cy="10" r="9"></circle>
                            <path d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
                                  class="inner"></path>
                            <path d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
                                  class="outer"></path>
                        </svg>
                        <span>{{ s.name }}</span>
                    </label>
                </li>
            </ul>
            <ul>
                <li v-for="(c, i) in checkbox" :key="i">
                    <div class="checkbox">
                        <label :for="'check-channel' + i" class="checkbox-label">{{ c.name }}:
                            <input type="checkbox" class="check-channel" :id="'check-channel' + i" v-model="c.check">
                            <span class="checkbox-spin"></span>
                        </label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "radioBox",
        data() {
            return {
                activeRadio: 0,
                select: [
                    {name: 'Radio01'},
                    {name: 'Radio02'},
                    {name: 'Radio03'},
                    {name: 'Radio04'},
                    {name: 'Radio05'},
                    {name: 'Radio06'}
                ],
                checkbox: [
                    {name: 'Checkbox01', check: true},
                    {name: 'Checkbox02', check: false},
                    {name: 'Checkbox03', check: false},
                    {name: 'Checkbox04', check: true},
                    {name: 'Checkbox05', check: false},
                    {name: 'Checkbox06', check: false}
                ]
            }
        },
        computed:{
        },
        methods: {
            tabButton(index) {
                if (this.activeRadio !== index) {
                    this.activeRadio = index;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $size: 16px;
    $checkBoxPadding: 4px;

    .radio-box{
        padding:26px 20px 22px;
        background: #fff;
        margin-bottom:10px;
        color:#777;
        @include boxShadow(0 0 1px 0 rgba(65,65,65,.09), 0 2px 2px 0 rgba(65,65,65,.23));
        @include borderRadius(6px);
        p.tit{
            font-size: 15px;
            font-family: airBold;
            padding-bottom: 9px;
            margin-bottom: 18px;
            color: #555;
            border-bottom: 1px solid #eee;
            span{
                display: inline-block;
                padding-left:4px;
                font-size:12px;
                color:#bbb;
                font-family: airLight;
            }
        }
        ul{
            margin:0 0 0 2px;
            display:flex;
            li{
                margin-right:20px;
                label{
                    font-size:13px;
                    cursor: pointer;
                    input{
                        display:none;
                        &:checked + svg{
                            path{
                                transition: all .4s ease;
                                &.inner{
                                    stroke-dashoffset: 38;
                                    transition-delay: .3s;
                                }
                                &.outer{
                                    stroke-dashoffset: 0;
                                }
                            }
                        }
                    }
                    span{
                        display: inline-block;
                        margin-left:6px;
                        vertical-align: middle;
                    }
                    svg{
                        width:15px;
                        height:15px;
                        fill:none;
                        vertical-align: middle;
                        margin-top:-1px;
                        circle{
                            stroke-width: 2;
                            stroke: #C8CCD4;
                        }
                        path{
                            stroke: #008FFF;
                            &.inner{
                                stroke-width: 6;
                                stroke-dasharray: 19;
                                stroke-dashoffset: 19;
                            }
                            &.outer{
                                stroke-width: 2;
                                stroke-dasharray: 57;
                                stroke-dashoffset: 57;
                            }
                        }
                    }
                }
            }
        }

    }
    .checkbox {
        padding-top:20px;
        z-index: 4;
        .checkbox-label {
            position: relative;
            padding-right:23px;
            font-size: 13px;
            font-family: 'airBook';
            color:#777;
            cursor: pointer;
        }
        .check-channel {
            visibility: hidden;
            width: $size;
            height: $size;
            &:checked {
                + .checkbox-spin {
                    animation: checkbox-animation 0.7s ease-out alternate both;
                    &:after {
                        animation: checkbox-symbol-animation 0.7s ease-out alternate both;
                    }
                }
            }
        }
        .checkbox-spin {
            position: absolute;
            top: 1px;
            right: 0;
            width: $size;
            height: $size;
            border: 1px solid #ccc;
            @include transition(all 0.2s ease);
            &:after {
                position: absolute;
                top: 50%;
                left: 50%;
                content: '';
                width: $size - $checkBoxPadding;
                height: $size - $checkBoxPadding;
                background: url('../../../../assets/img/checkmark.svg') no-repeat center center;
                background-size: contain;
                opacity: 0;
                @include translate(-50%, -50%);
                @include transition(all 0.2s ease);
            }
        }
    }
</style>