import Page from "./src/index"

Page.install = function(Vue) {
    Vue.component(Page.name, Page)
}

export default Page