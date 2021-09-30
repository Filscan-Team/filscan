import tansferRanking from "./src/index"

tansferRanking.install = function(Vue) {
    Vue.component(tansferRanking.name, tansferRanking)
}

export default tansferRanking