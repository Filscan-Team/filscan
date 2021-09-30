import PoolName from "./src/index"

PoolName.install = function(Vue) {
    Vue.component(PoolName.name, PoolName)
}

export default PoolName