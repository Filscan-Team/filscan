import MinerList from "./src/index"

MinerList.install = function(Vue) {
    Vue.component(MinerList.name, MinerList)
}

export default MinerList