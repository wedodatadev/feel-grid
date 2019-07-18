// cf : https://binbytes.com/blog/create-global-event-bus-in-nuxtjs

/* USE :  

// Event emit
this.$bus.$emit('test-event')
or
app.$bus.$emit('test-event')

// Event Listen
this.$bus.$on('test-event', () => {})

*/

import Vue from 'vue'

const eventBus = {}

eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)