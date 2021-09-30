import Caclulator from "./src/index"

Caclulator.install = function(Vue) {
    Vue.component(Caclulator.name, Caclulator)
}

export default Caclulator