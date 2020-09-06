import Vue from 'vue'
import App from './App.vue'
import create from './utils/create';
import router from './myRouter/index';
// import store from './store'
import store from './myStore'

Vue.config.productionTip = false
Vue.use(create);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
