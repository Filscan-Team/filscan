import Heading from "./src/index"

Heading.install = function(Vue) {
    Vue.component(Heading.name, Heading)
}

export default Heading