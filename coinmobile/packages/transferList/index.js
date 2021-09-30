import TransferList from "./src/index"

TransferList.install = function(Vue) {
    Vue.component(TransferList.name, TransferList)
}

export default TransferList