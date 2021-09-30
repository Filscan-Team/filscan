import MetaList from "./src/index"

MetaList.install = function(Vue) {
    Vue.component(MetaList.name, MetaList)
}

export default MetaList