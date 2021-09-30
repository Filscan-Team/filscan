import AccountAdd from "./src/index"

AccountAdd.install = function(Vue) {
    Vue.component(AccountAdd.name, AccountAdd)
}

export default AccountAdd