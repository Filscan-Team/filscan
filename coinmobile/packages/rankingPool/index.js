import RankingPool from "./src/index"

RankingPool.install = function(Vue) {
    Vue.component(RankingPool.name, RankingPool)
}

export default RankingPool