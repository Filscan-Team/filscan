import BlockList from "./src/index"

BlockList.install = function(Vue) {
    Vue.component(BlockList.name, BlockList)
}

export default BlockList