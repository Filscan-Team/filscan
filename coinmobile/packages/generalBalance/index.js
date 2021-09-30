import GeneralBalance from "./src/index"

GeneralBalance.install = function(Vue) {
    Vue.component(GeneralBalance.name, GeneralBalance)
}

export default GeneralBalance