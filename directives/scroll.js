import Vue from 'vue'
import elTableInfiniteScroll from "el-table-infinite-scroll"
const scroll = Vue.directive('scroll', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: elTableInfiniteScroll
})
export default scroll
