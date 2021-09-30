import MesssageList from "./src/index"

MesssageList.install = function(Vue) {
    Vue.component(MesssageList.name, MesssageList)
}

export default MesssageList