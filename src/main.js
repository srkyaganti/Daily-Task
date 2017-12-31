import Vue from 'vue'
import App from './App'

// Buefy
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
