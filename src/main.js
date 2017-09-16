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
  id: process.env.GA_KEY,
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

// Code to intercept link clicks.
document.body.onclick = (e) => {
  e = e || event
  var from = findParent('a', e.target || e.srcElement)
  if (from) {
    let eventLabel = from.getAttribute('ga-event')
    e.preventDefault()
    Vue.$ga.event({
      eventCategory: 'External Link',
      eventAction: 'click',
      eventLabel: eventLabel
    })
    window.location.href = from.href
  }
}
// find first parent with tagName [tagname]
function findParent (tagname, el) {
  while (el) {
    if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
      return el
    }
    el = el.parentNode
  }
  return null
}
