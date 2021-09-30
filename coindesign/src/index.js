import Card from "../packages/card/index.js"
import "../lib/theme-chalk/card.css"
const components = [Card]
const install = function(Vue) {
  components.forEach(component => {
    alert(component.name)
    Vue.component(component.name, component)
  })
}
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default {
  version: "1.0.0",
  Card
}
