import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// URL API
Vue.prototype.$APIURL= 'https://zzkr1nkz5b.execute-api.eu-west-1.amazonaws.com/latest';

new Vue({
  render: h => h(App),
}).$mount('#app')
