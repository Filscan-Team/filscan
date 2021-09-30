import ChartContainer from "./src/index"

ChartContainer.install = function(Vue) {
    Vue.component(ChartContainer.name, ChartContainer)
}

export default ChartContainer