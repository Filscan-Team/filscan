import Empty from "./src/index"

Empty.install = function(Vue) {
    Vue.component(Empty.name, Empty)
}

export default Empty