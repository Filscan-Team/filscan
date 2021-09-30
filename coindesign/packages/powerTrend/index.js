import PowerTrend from "./src/index"

PowerTrend.install = function(Vue) {
    Vue.component(PowerTrend.name, PowerTrend)
}

export default PowerTrend