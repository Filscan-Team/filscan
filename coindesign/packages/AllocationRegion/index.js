import AllocationRegion from "./src/index"

AllocationRegion.install = function(Vue) {
    Vue.component(AllocationRegion.name, AllocationRegion)
}

export default AllocationRegion