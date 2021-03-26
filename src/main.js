import Vue from 'vue'
import App from './App.vue'
if (process.env.VUE_APP_MOCK && process.env.NODE_ENV === 'development') {
  require("./mock");
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
