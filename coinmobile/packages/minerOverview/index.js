import MinerOverview from "./src/index"

MinerOverview.install = function(Vue) {
    Vue.component(MinerOverview.name, MinerOverview)
}

export default MinerOverview