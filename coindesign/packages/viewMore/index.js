import viewMore from "./src/index"

viewMore.install = function(Vue) {
    Vue.component(viewMore.name, viewMore)
}

export default viewMore