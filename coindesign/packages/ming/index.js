import Ming from "./src/index"

Ming.install = function(Vue) {
    Vue.component(Ming.name, Ming)
}

export default Ming