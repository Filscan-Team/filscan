import Board from "./src/index"

Board.install = function(Vue) {
    Vue.component(Board.name, Board)
}

export default Board