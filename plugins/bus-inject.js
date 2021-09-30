import Vue from 'vue'

const bus = {}

bus.install = ()=>{
    Vue.prototype.$bus = new Vue()
}

Vue.use(bus)