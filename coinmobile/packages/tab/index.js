import Tab from "./src/index"

Tab.install = function(Vue) {
    Vue.component(Tab.name, Tab)
}

export default Tab