import BigTransfer from "./src/index"

BigTransfer.install = function(Vue) {
    Vue.component(BigTransfer.name, BigTransfer)
}

export default BigTransfer