const mixin = {
  methods: {
    handleClick(nav) {
      if (nav.items) {
        return
      } else {
        if(nav.href){
          window.open(nav.href,"_blank")
        } else {
          this.$router.push({
            path: nav.path
          })
        }
        //this.currentIndex=nav.index
      }
    },
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler(v) {
        const index = v.split("/")[1]
        const subIndex = v.split("/")[2]
        this.currentIndex = index
        if (subIndex) {
          this.subIndex = subIndex
        } else {
          this.subIndex = ""
        }
      }
    }
  }
}
export default mixin
