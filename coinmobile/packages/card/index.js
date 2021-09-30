import Card from "./src/index"

Card.install = function(Vue) {
    Vue.component(Card.name, Card)
}

export default Card