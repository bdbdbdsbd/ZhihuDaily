import Vue from 'vue'
import App from './App.vue'
import './config/rem'
import router from './router';
import store from './store'
import { infiniteScroll} from 'element-ui';
// import Vue from 'vue'
// import infiniteScroll from "vue-infinite-scroll"
Vue.use(infiniteScroll)
Vue.config.productionTip = true
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
