import TagMiner from "./src/index"

TagMiner.install = function(Vue) {
    Vue.component(TagMiner.name, TagMiner)
}

export default TagMiner