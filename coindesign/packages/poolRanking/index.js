import PoolRanking from "./src/index"

PoolRanking.install = function(Vue) {
    Vue.component(PoolRanking.name, PoolRanking)
}

export default PoolRanking