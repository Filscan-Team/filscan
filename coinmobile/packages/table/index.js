import Table from "./src/index"

Table.install = function(Vue) {
  Vue.component(Table.name, Table)
}

export default Table
