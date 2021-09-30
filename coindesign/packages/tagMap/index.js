import TagMap from "./src/index"

TagMap.install = function(Vue) {
    Vue.component(TagMap.name, TagMap)
}

export default TagMap