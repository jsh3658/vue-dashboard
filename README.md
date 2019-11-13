<h1 align="center">Dashboard UI component for Vue</h1>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/framework-vue2.6.6-brightgreen.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/style-sass-yellowgreen.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/datePicker-airbnbDatepicker-red.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/github/languages/code-size/beygee/survive.svg" ></span>
<span style="margin:0 2px"><img src="https://img.shields.io/badge/API-Nodejs-blue.svg" ></span>

## Main
- Material Design
- DataTable, Chart, datePicker, filter, Excel 등의 탬플릿 화면입니다
- Node js를 이용하여 Restful API개발


## 사용법
###Chart
- chartData : Data
- id : 차트 ID(고유한 값)
- dataEnum : Name변경 `type: Object`

```
  import Chart from 'line.vue';
  
  <Chart :chartData="" :id="" :dataEnum=""/>
```

###DataTable
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
    
        


## Development
```
npm install
npm serve start
```
