import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'


Vue.config.productionTip = false

Vue.use(VueTextareaAutosize);
import { utils } from './mixins/utils'

Vue.mixin(utils);

Vue.prototype.$http = axios;
Vue.prototype._ = lodash;

const EventBus = new Vue({
  data() {
    return {
      isAdmin : false
    }
  },
  
  methods: {
  }
})

Vue.prototype.EventBus = EventBus;
// 서버 HOST 정보
Vue.prototype.APIURL = "http://localhost:3000";
Vue.use(vuetify)

Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    //20200402  초기 작업시 진행 하지 않아야 함.
    // 로그인 시도시 진행하도록 해야함.
    //this.$store.dispatch("getEmpInfo")
  },
  render: h => h(App)
}).$mount('#app')
