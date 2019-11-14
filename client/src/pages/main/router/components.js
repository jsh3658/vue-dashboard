import Main from '../views/main/main.vue';
import ChartLine from '../views/chart/line.vue';
import DataTable from '../views/dataTable/dataTable.vue'
import Filter from '../views/filter/filter.vue'
import DatePicker from '../views/datepicker/datepicker.vue'
import Excel from '../views/excel/excel.vue'
import Tab from '../views/tab/tab.vue'
import Button from '../views/button/button.vue'

const requireAuth = (to, from, next) => {
    let cookies = true;

    if(cookies) {
        next();
    }
};

export const Components = [
    { path: '/main', component: Main, beforeEnter: requireAuth },
    { path: '/chart/line', component: ChartLine, beforeEnter: requireAuth },
    { path: '/dataTable', component: DataTable, beforeEnter: requireAuth },
    { path: '/filter', component: Filter, beforeEnter: requireAuth },
    { path: '/datePicker', component: DatePicker, beforeEnter: requireAuth },
    { path: '/excel', component: Excel, beforeEnter: requireAuth },
    { path: '/tab', component: Tab, beforeEnter: requireAuth },
    { path: '/button', component: Button, beforeEnter: requireAuth },
    { path: '/*', component: Main, beforeEnter: requireAuth },
];