import PoolPanel from "./src/index"

PoolPanel.install = function(Vue) {
    Vue.component(PoolPanel.name, PoolPanel)
}

export default PoolPanel