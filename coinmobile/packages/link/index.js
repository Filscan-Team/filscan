import Link from "./src/index"

Link.install = function(Vue) {
    Vue.component(Link.name, Link)
}

export default Link