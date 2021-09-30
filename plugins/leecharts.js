import Vue from 'vue'
import leecharts from "leecharts"
import fns from "~/api"
export default ({ app }) => {
    // Vue.use(leecharts)
    Vue.prototype.$leecharts = leecharts
    app.$leecharts = leecharts
    app.$api= fns
}
