import Vue from 'vue'
import * as filter from './filters'

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))

Vue.prototype.$minnerMap = Vue.filter('minnerMap')