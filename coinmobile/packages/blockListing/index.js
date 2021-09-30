import BlocksListing from "./src/index"

BlocksListing.install = function(Vue) {
    Vue.component(BlocksListing.name, BlocksListing)
}

export default BlocksListing