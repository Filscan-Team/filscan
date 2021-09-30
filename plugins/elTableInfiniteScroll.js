import Vue from 'vue'
import elTableInfiniteScroll from "el-table-infinite-scroll"



export default ({ app }) => {
  Vue.use(elTableInfiniteScroll)
  app.$elTableInfiniteScroll = elTableInfiniteScroll
}

