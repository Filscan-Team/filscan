import Header from "./src/index"

Header.install = function(Vue) {
    Vue.component(Header.name, Header)
}

export default Header
