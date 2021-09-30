import NullData from "./src/index"

NullData.install = function(Vue) {
    Vue.component(NullData.name, NullData)
}

export default NullData