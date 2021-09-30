import Overview from "./src/index"

Overview.install = function(Vue) {
    Vue.component(Overview.name, Overview)
}

export default Overview