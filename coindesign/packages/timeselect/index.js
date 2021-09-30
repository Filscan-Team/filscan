import Timeselect from "./src/index"

Timeselect.install = function(Vue) {
    Vue.component(Timeselect.name, Timeselect)
}

export default Timeselect