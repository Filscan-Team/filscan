import NodeAdd from "./src/index"

NodeAdd.install = function(Vue) {
    Vue.component(NodeAdd.name, NodeAdd)
}

export default NodeAdd