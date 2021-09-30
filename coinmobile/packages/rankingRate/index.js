import RankingRate from "./src/index"

RankingRate.install = function(Vue) {
    Vue.component(RankingRate.name, RankingRate)
}

export default RankingRate