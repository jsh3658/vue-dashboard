<h1 align="center">Dashboard UI component for Vue</h1>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/framework-vue2.6.6-brightgreen.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/style-sass-yellowgreen.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/datePicker-airbnbDatepicker-red.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/API-Nodejs-blue.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/Chart-echarts-yellow.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/github/languages/code-size/beygee/survive.svg" ></span>

## Main
- Material Design
- DataTable, Chart, datePicker, filter, Excel 등의 탬플릿 화면입니다
- Node js를 이용하여 Restful API개발


## Development
```
npm install
client : npm run client
server(node) : npm run serve
client + server : npm run dev
```

## 사용법
> Chart
- chartData : Data
- id : 차트 ID(고유한 값)
- dataEnum : Name변경 `type: Object`

```
  import Chart from 'line.vue';
  
  <Chart :chartData="" :id="" :dataEnum=""/>
```

> DataTable
- title : 제목
- tableData : Data
- size : 테이블 사이즈
- dataEnum : Name변경 `type: Object`
- currentPage : 현재 활성화된 페이지 번호
- allPage : 모든 페이지
- listSize : 현재 보여지고 있는 리스트 갯수
```
import DataTable from 'dataTable.vue';

<data-table :title="" :tableData="" :size="" :dataEnum="" @currentPage="" @allPage="" @listSize=""/>

```

> DatePicker
- start, end 날짜를 꼭 넣어주어야 한다
```
import DatePicker from 'datePicker.vue';

<date-picker @updateDate="" :start="" :end=""/>

```

> Filter
- filter `type: Object`
- filterActive : 활성화 될 key값을 사용한다 `type: String`
```
import filter from 'myFilter.vue';

<filter :filter="filter" :filterActive="'ONE'" />


filter: {
    ONE: {
        title: 'Title1',
        default: ['Filter02', 'Filter05', 'Filter07', 'Filter08', 'Filter12'],
        lists: ['Filter01', 'Filter02', 'Filter03', 'Filter04', 'Filter05', 'Filter06', 'Filter07', 'Filter08', 'Filter08', 'Filter10', 'Filter11', 'Filter12', 'Filter13'],
        selected: [],
        confirm: []
    },
    TWO: {
        title: 'Title2',
        default: ['A', 'D'],
        lists: ['A', 'B', 'C', 'D'],
        selected: [],
        confirm: []
    }
}

```
    
        



