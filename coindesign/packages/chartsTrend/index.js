import ChartsTrend from "./src/index"

ChartsTrend.install = function(Vue) {
    Vue.component(ChartsTrend.name, ChartsTrend)
}

export default ChartsTrend