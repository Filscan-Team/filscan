import HomeChart from "./src/index"

HomeChart.install = function(Vue) {
    Vue.component(HomeChart.name, HomeChart)
}

export default HomeChart