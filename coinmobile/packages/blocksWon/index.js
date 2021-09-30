import BlocksWon from "./src/index"

BlocksWon.install = function(Vue) {
    Vue.component(BlocksWon.name, BlocksWon)
}

export default BlocksWon