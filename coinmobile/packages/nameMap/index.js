import NameMap from "./src/index"

NameMap.install = function(Vue) {
    Vue.component(NameMap.name, NameMap)
}

export default NameMap