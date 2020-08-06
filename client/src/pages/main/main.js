import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "../../store/store.js";
import VueSkycons from "vue-skycons";
import AirbnbStyleDatepicker from "vue-airbnb-style-datepicker";
import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

const datepickerOptions = {
  sundayFirst: true,
  colors: {
    selected: "#fa5b60",
    inRange: "#fb8c8b",
    inRangeBorder: "#e3e6e6",
    text: "#737373",
  },
};

// 이거는 머지를 안할께요

Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.use(VueSkycons, { color: "#fff" });
Vue.use(VueMomentJS, moment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
