import Vue from "vue"
import "@/components/index"
import 'babel-polyfill';
import 'core-js'
import echarts from "@/chart"
import VueClipboard from "vue-clipboard2"
import fns from "@/api"
import "@/assets/style/main.scss"
import "@/plugins/bus"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "@/filters"
import to from 'await-to-js'
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
Vue.config.productionTip = false
Vue.prototype.$chart = echarts
Vue.prototype.$api = fns
Vue.prototype.to = to
Vue.use(VueClipboard)
import mixin from "@/mixins/index"
Vue.mixin(mixin)
