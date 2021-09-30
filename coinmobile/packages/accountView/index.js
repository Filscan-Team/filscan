import AccountView from "./src/index"

AccountView.install = function(Vue) {
    Vue.component(AccountView.name, AccountView)
}

export default AccountView