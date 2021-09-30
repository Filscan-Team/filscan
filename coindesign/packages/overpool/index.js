import Overpool from "./src/index"

Overpool.install = function(Vue) {
    Vue.component(Overpool.name, Overpool)
}

export default Overpool