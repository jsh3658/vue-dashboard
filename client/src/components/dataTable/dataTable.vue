<template>
    <div class="data-table">
        <p class="tit">{{ tableTitle }}</p>
        <p class="sub-tit">{{ tableSubTitle }}</p>
        <div class="table-header">
            <div class="select-area" v-if="selectBox">
                <div class="btn-all" @click="allList" >
                    <p class="txt">리스트 전체보기</p>
                </div>
                <div class="select-box">
                    <select v-model="selected" @change="onChange()">
                        <option disabled value="">리스트 갯수</option>
                        <option v-for="(key, i) in maxSelect" :key="i" :value="key">{{ key }}</option>
                    </select>
                </div>
            </div>
            <div class="search-box">
                <input type="text" placeholder="현재 페이지 결과 내 필터" v-model="query">
                <a href="javascript:" class="btn-search" ><i class="fas fa-search"></i></a>
            </div>
        </div>
        <div class="table-wrap">
            <table ref="table-data">
                <thead>
                <tr v-for="(h, i) in header" :key="i">
                    <th v-for="(head, j) in h" :key="j" :rowspan="head.rowspan" :colspan="head.colspan">
                        <p :style="Object.keys(header).length > 1 ? 'textAlign:center;padding:7px 10px;' : ''">{{ head.text }}</p>
                    </th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in items" :key="i" :data-index="i" :before-enter="beforeEnter" :enter="enter" :leave="leave">
                        <td v-for="(td, j) in Object.values(item)" :key="j">
                            <div class="table-row">{{ td === 'null' ? 0 : td }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination" v-if="items.length !== 0">
            <div class="page-inner">
                <div class="btn-area">
                    <button :class="prevDisabled ? 'prev disabled' : 'prev'" @click="prev()"><i class="fas fa-angle-double-left"></i></button>
                    <button :class="nextDisabled ? 'next disabled' : 'next'" @click="next()"><i class="fas fa-angle-double-right"></i></button>
                </div>
                <ul class="page">
                    <li :class="activePage === index ? 'on' : ''" v-for="(page, index) in pageSetting()" :key="index"><button @click="changePage(page, index)">{{ page }}</button></li>
                </ul>
            </div>
        </div>
        <div class="no-data" v-else>
            <i class="fas fa-dizzy"></i>
            <p class="txt">검색 결과가 없습니다</p>
        </div>
    </div>
</template>

<script>
    import Velocity from 'velocity-animate';
    import comma from '@/common/comma';

    export default {
        name: "dataTable",
        props: [
            'tableData',
            'title',
            'subTitle',
            'size',
            'selectPage',
            'dataEnum',
            'tableExpand'
        ],
        data() {
            return {
                activePage: 0,
                total: 0,
                start: 0,
                end : 0,
                maxPage: 5,
                pageGroup: 0,
                realGroup: 0,
                prevDisabled: true,
                nextDisabled: true,
                once: true,
                maxSelect: ['7개씩', '14개씩', '28개씩', '35개씩', '45개씩'],
                selected: '',
                query: '',
            }
        },
        computed: {
            header() {
                let head = {};

                if(this.items.length !== 0) {
                    if(this.tableExpand === undefined) {
                        head['0'] = Object.keys(this.items[0]).map(e => {
                            return { text: this.dataEnum[e] || e };
                        });
                    } else {
                        head = this.tableExpand;
                    }
                }

                return head;
            },
            items() {
                const lists  = this.tableData.contents;

                // comma
                lists.forEach(el => {
                    Object.keys(el).forEach((v, index) => {
                        if(index !== 0) {
                            if(v !== 'nickname') {
                                el[v] = comma.comma(el[v]);
                            }
                        }
                    });
                });

                // 가독성을 위해서 filter, map 사용
                const result = lists.filter(item => {
                    const arr = Object.values(item).map(value => {
                        return comma.uncomma(value).toLowerCase().indexOf(this.query.toLowerCase()) !== -1 || value.toLowerCase().indexOf(this.query.toLowerCase()) !== -1;
                    });

                    return new Set(arr.filter(t => t)).has(true);
                });

                return result;
            },
            tableTitle() {
                let title = this.title || '';

                return title;
            },
            tableSubTitle() {
                let title = this.subTitle || '';

                return title;
            },
            selectBox() {
                let select = true;
                this.selectPage === undefined ? select = true : select = this.selectPage;

                if(this.items.length !== 0 && select) {
                    return true
                }
                return false
            }
        },
        methods:{
            pageSetting() {
                if(this.tableData.totalSize !== 0 && this.tableData.totalSize !== undefined) {
                    if(this.once) {
                        let Lists = this.size > 0 ? this.size : this.tableData.totalSize;
                        this.prevDisabled = true;
                        this.nextDisabled = true;
                        this.total = this.tableData.totalSize;
                        this.pageGroup = Math.ceil(this.total / Lists);
                        this.realGroup = this.pageGroup;

                        if(this.maxPage < this.pageGroup) {
                            this.nextDisabled = false;
                            this.pageGroup = this.maxPage;
                        }
                        this.end = this.pageGroup;
                    }

                    return this.pageDraw();
                } else {
                    this.end = 1;

                    return this.pageDraw();
                }
            },
            pageDraw() {
                let pages = [];

                this.activePage = 0;
                for (let i = this.start; i < this.end; i++) {
                    pages.push(i + 1);
                }

                return pages;
            },
            changePage(page, idx) {
                if(this.activePage !== idx) {
                    this.activePage = idx;
                    if(this.realGroup > 1) {
                        this.$emit('currentPage', (page - 1));
                    }
                }
            },
            allList () {
                this.$emit('allPage');
            },
            onChange() {
                let num = this.selected.trim().replace(/[^0-9]/g,'');

                this.$emit('listSize', Number(num));
            },
            prev() {
                if(!this.prevDisabled) {
                    this.start -= this.maxPage;
                    this.nextDisabled = false;

                    if(this.start <= 0) {
                        this.prevDisabled = true;
                        this.start = 0;
                    }
                    this.end = this.start + this.maxPage;
                    this.once = false;
                    this.pageSetting();

                    this.$emit('currentPage', this.start);
                }
            },
            next() {
                if(!this.nextDisabled) {
                    this.start = this.end;
                    this.end = this.start + this.maxPage;
                    this.prevDisabled = false;

                    if(this.end >= this.realGroup) {
                        this.nextDisabled = true;
                        this.end = this.realGroup;
                    }
                    this.once = false;
                    this.pageSetting();

                    this.$emit('currentPage', this.start);
                }
            },
            beforeEnter: function (el) {
                el.style.opacity = 0;
                el.style.height = 0;
            },
            enter: function (el, done) {
                let delay = el.dataset.index * 150;
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 1 },
                        { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                let delay = el.dataset.index * 150;
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 0 },
                        { complete: done }
                    )
                }, delay)
            }
        }
    }
</script>

<style lang="scss">
    .data-table{
        position: relative;
        width:100%;
        padding:21px 24px 28px;
        background: #fff;
        @include boxShadow(0 0 1px 0 rgba(65,65,65,.09), 0 2px 2px 0 rgba(65,65,65,.23));
        @include borderRadius(6px);
        .tit{
            margin-top:14px;
            font-size: 17px;
            font-weight: bold;
            color:#444;
            font-family: airBook;
        }
        .sub-tit{
            margin-top:9px;
            font-size:14px;
            color:#888;
        }
        .table-header{
            display:flex;
            align-items: center;
            .btn-all{
                .txt{
                    padding:7px 20px;
                    background: #4291b9;
                    color:#fff;
                    font-size:12px;
                    font-family: airMedium;
                    cursor: pointer;
                    letter-spacing: 0.015em;
                }
            }
            .select-area{
                display:flex;
                margin-top:4px;
            }
            .select-box{
                position: relative;
                height: 30px;
                margin-left:10px;
                select{
                    height:100%;
                    padding:0 51px 0 14px;
                    border:0;
                    border-radius: 0;
                    background: #f5884e;
                    font-size:12px;
                    color:#fff;
                    font-family: airLight;
                    -webkit-appearance: none;  /* 네이티브 외형 감추기 */
                    -moz-appearance: none;
                    appearance: none;
                    text-align: center;
                }
                &::after{
                    content: '▼';
                    position: absolute;
                    top:50%;
                    right:6px;
                    color: #fff;
                    font-weight: bold;
                    font-size:11px;
                    pointer-events: none;
                    z-index: 2;
                    cursor: pointer;
                    @include translate(0, -50%);
                }
            }
            .search-box{
                display:flex;
                width:244px;
                align-items: center;
                height:37px;
                margin:20px 0 18px auto;
                border-bottom:1px solid #ccc;
                input{
                    width:100%;
                    height:100%;
                    padding:0 15px;
                    font-size:13px;
                    color:#676363;
                    line-height:49px;
                    &::placeholder{
                        font-size:13px;
                        color:#ddd;
                        font-family: 'airLight';
                        font-weight: 400;
                    }
                }
                .btn-search{
                    .fa-search{
                        font-size:20px;
                        color:#444;
                    }
                }
            }
        }
        .table-wrap{
            table-layout: fixed;
            overflow-x: auto;
            padding-bottom: 12px;
            margin-top:5px;
            table{
                width:100%;
                tr{
                    th{
                        border:1px solid #f1f0f0;
                        background: #5b6475;
                        p{
                            padding:10px;
                            font-family: airBook;
                            word-break: keep-all;
                            white-space: pre;
                            font-weight: 500;
                            color:#ececec;
                        }
                    }
                    td{
                        border:1px solid #f1f0f0;
                        .table-row{
                            display:flex;
                            align-items: center;
                            justify-content: flex-end;
                            padding:11px 12px;
                            color:#3e4f53;
                            font-size: 13px;
                            word-break: keep-all;
                            font-family: Helvetica;
                        }
                        &:first-child{
                            .table-row{
                                width:160px;
                                justify-content: center;
                                margin: 0 auto;
                            }
                        }
                    }
                }
                tbody{
                    tr{
                        &:hover{
                            background: rgba(162, 162, 162, 0.1);
                        }
                        &:nth-child(2n) {
                            background: #fafafa;
                        }
                    }
                }
            }
        }

        .btn-crud {
            button{
                padding:5px 10px;
                margin:0 2px;
                color:#fff;
                font-family: airBold;
                &.create{
                    background: #62b75b;
                }
                &.read{
                    background: #656565;
                }
                &.update{
                    background: #62bfdd;
                }
                &.delete {
                    background: #d45450;
                }
            }
        }

        .pagination{
            margin-top:30px;
            text-align: center;
            .page-inner{
                position: relative;
                display:inline-block;
                padding:0 42px;
                .page{
                    display:flex;
                    li{
                        width:30px;
                        height:30px;
                        margin:0 2px;
                        button{
                            display:block;
                            width:100%;
                            height:100%;
                            font-size:13px;
                        }
                        &.on{
                            button{
                                background: #fa5b60;
                                color:#fff;
                                cursor: default;
                            }
                        }
                    }
                }
                .btn-area{
                    button{
                        position: absolute;
                        dispaly:block;
                        width:30px;
                        height:30px;
                        &.prev{
                            left:0;
                        }
                        &.next{
                            right:0;
                        }
                        &.disabled{
                            cursor: default;
                            i{
                                color:#ccc;
                                cursor: default;
                            }
                        }
                        i{
                            color: #fa5b60;
                        }
                    }
                }
            }
        }
    }
</style>