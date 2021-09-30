import Cards from "./src/index"

Cards.install = function(Vue) {
    Vue.component(Cards.name, Cards)
}

export default Cards