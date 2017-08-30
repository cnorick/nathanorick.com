// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAnalytics from 'vue-analytics'
import Icon from 'vue-awesome/components/Icon'
import 'bulma'

Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-102148746-1',
  autoTracking: {
    page: false
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
