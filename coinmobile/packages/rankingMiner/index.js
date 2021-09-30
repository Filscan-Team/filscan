import RankingMiner from "./src/index"

RankingMiner.install = function(Vue) {
    Vue.component(RankingMiner.name, RankingMiner)
}

export default RankingMiner