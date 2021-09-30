import AccountItem from "./src/index"

AccountItem.install = function(Vue) {
    Vue.component(AccountItem.name, AccountItem)
}

export default AccountItem