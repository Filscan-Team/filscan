import List from "./src/index"

List.install = function(Vue) {
    Vue.component(List.name, List)
}

export default List