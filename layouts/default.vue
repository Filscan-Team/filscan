<template>
  <div id="app" class="ignore" :theme="theme">
    <co-header v-if="flag" />
    <div class="content-container">
      <div class="content-main">
        <Nuxt v-if="isRouterActive" />
      </div>
    </div>
    <co-footer />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { fontSize } from '@/utils'
export default {
  data() {
    return {
      themes: '',
      isRouterActive: true,
      flag:true,
    }
  },
  provide() {
    const end_time = Math.floor(new Date().getTime() / 1000)
    return {
      time: {
        start_time: end_time - 86400,
        end_time: end_time
      },
      reload: this.reload
    }
  },
  watch:{
    isLogin(){
      this.flag = false
      this.$nextTick(()=>{
         this.flag = true
      })
    }
  },
  computed:{
    ...mapGetters('token', ['isLogin'])
  },
  mounted() {
    // localStorage.clear()
    let width = window.innerWidth
    let baseWidth = width>1680? 1920: 1680
    this.setRate(window.innerWidth / baseWidth)
    fontSize()
    window.addEventListener('orientationchange', () => {
      window.location.reload()
    })
    window.addEventListener('keydown', (event) => {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        (event.which === 61 || event.which === 107 || event.which === 173 || event.which === 109 || event.which === 187 || event.which === 189)
      ) {
        event.preventDefault()
      }
    })
    window.addEventListener(
      'mousewheel DOMMouseScroll',
      function(event) {
        if (event.ctrlKey === true || event.metaKey) {
          event.preventDefault()
        }
      },
      false
    )
    window.addEventListener('resize', () => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const newWidth = window.innerWidth
        if (newWidth != width) {
          width = newWidth
          let baseWid = width>1680? 1920: 1680
          this.setRate(window.innerWidth / baseWid)
          this.$bus.$emit('window-resize')
        }
      }, 500)
    })
  },
  methods: {
    ...mapMutations('app', ['setRate', 'setTheme', 'set_lang']),
    reload() {
      this.isRouterActive = false
      this.$nextTick(() => {
        this.isRouterActive = true
      })
    },
    initMethods(){
      let themes = 'light'
      this.setTheme(themes)
      this.set_lang('zh')
    }
  }
}
</script>
<style lang="scss">
#nprogress .bar {
  background: #2090ff !important;
}
#app {
  //   width: 100%;
  //   height: 100%;
}
html,
body,
#app {
  height: 100%;
  // background: var(--main-bg-color);
  font-size: var(--font-16);
  font-family: PingFang SC;
  color: var(--main-text-color);
  white-space: nowrap;
  // background-color: var(--main-bg-color);
}
#__nuxt,
#__layout {
  height: 100%;
}
#app.ignore {
  min-width: 1200px;
}
.content-container {
  // width: var(--main-width);
  // margin: 0 auto;
  min-height: calc(100% - 360px);
  background-color: var(--main-bg-color);
  box-sizing: border-box;
  overflow: auto;
  .content-main {
    // width: 100%;
    // margin: 16px 0;
    width: var(--main-width);
    margin: 16px auto 0;
    padding-bottom: 16px;
    box-sizing: border-box;
  }
}
a {
  font-size: var(--font-16);
  text-decoration: none;
  color: var(--link-color);
}

// @media screen and (min-width: 1000px) {
//   html {
//     font-size: 180PX !important;
//   }
// }
</style>
