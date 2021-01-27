import Vue from 'vue'
import App from './App'
import api from './api.js'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(VueClipboard)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
