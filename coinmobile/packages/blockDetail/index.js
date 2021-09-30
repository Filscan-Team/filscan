import BlockDetail from "./src/index"

BlockDetail.install = function(Vue) {
    Vue.component(BlockDetail.name, BlockDetail)
}

export default BlockDetail