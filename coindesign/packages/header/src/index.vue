<template>
  <div class="header-con">
    <div class="pc-header flex" :class="{ shadow: scrollTop > 100 }">
      <div class="header-top">
        <div class="logo-con" @click="nuxtTo('/')">
          <img src="@/assets/logo.png" class="logo" />
          <span>{{ $t('header.title') }}</span>
        </div>
        <div class="tool">
          <NetSelect />
          <div class="lang-switch">
            <!--            <span-->
            <!--              v-for="(item, index) in languages"-->
            <!--              :key="item.value"-->
            <!--              :class="{ active: $i18n.locale === item.value }"-->
            <!--              @click="switchLang(item.value)"-->
            <!--            >-->
            <!--              {{ item.labels-->
            <!--              }}<span v-if="index !== languages.length - 1">/</span>-->
            <!--            </span>-->
<!--            <el-select v-model="checkLang" @change="switchLang">-->
<!--              <el-option-->
<!--                v-for="item in languages"-->
<!--                :value="item.value"-->
<!--                :label="item.labels"-->
<!--                :key="item.value"-->
<!--              ></el-option>-->
<!--            </el-select>-->
            <header-select
                    :options="languages"
                    :index.sync="checkLang"
                    @change="switchLang"
            />
          </div>
          <theme-switch />
        </div>
      </div>
    </div>
    <div class="pc-header-btm">
      <div class="header-content">
        <Nav />
        <div class="search-wrap">
          <Search />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from './components/Search'
import ThemeSwitch from './components/Switch'
import NetSelect from './components/NetSelect'
import HeaderSelect from "./components/headerSelect"
import CenterList from "./components/centerList"
import Lang from '@/assets/image/icons/lang.png'
import LangDark from '@/assets/image/icons/lang-dark.png'
import Nav from './components/Nav'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  name: 'CoHeader',
  inject: ['reload'],
  data() {
    return {
      filter: 0,
      key: '',
      loading: false,
      isLight: false,
      scrollTop: 0,
      checkLang: 'zh',
      languages: [
        { index: 'en', label: 'English' },
        { index: 'zh', label: '中文' },
        { index: 'ja', label: '日本語' },
        { index: 'ko', label: '한국어' }
      ],
      centerIndex: 'center',
      userInfo: '',
      flag: true,
      loginFlag: false
    }
  },
  // async fetch({app, store, params}){
  //   console.log(app, store, params)
  //   store.commit('token/isLogin', false)
  // },
  computed: {
    ...mapGetters('token', ['isLogin', 'loginInfo']),
    iconClass() {
      return this.theme === 'dark' ? 'el-icon-sunny' : 'el-icon-moon'
    },
    langSrc() {
      return this.theme === 'dark' ? LangDark : Lang
    }
  },
  watch: {
    isLogin(){
      this.flag = false
      this.$nextTick(()=>{
        this.loginFlag = this.cookieGet('isLogin') === 'true'
        this.flag = true
      })
    },
  },
  beforeMount() {
    if(this.cookieGet('isLogin') === 'false'){
      this.setIsLogin(false)
    }
  },
  mounted() {
    this.loginFlag = this.cookieGet('isLogin') === 'true'
    this.checkLang = this.$i18n.locale
    window.addEventListener('scroll', () => {
      this.scrollTop = window.scrollY
    })
  },
  methods: {
    ...mapMutations('app', ['set_lang']),
    ...mapActions('token', ['Logout', 'setIsLogin']),
    login(type){
      this.goTo('account', {
        query: {
          ['key']: type
        }
      })
    },
    goTarget(name, key) {
      this.goTo(name, {
        query: {
          [key]: this.key
        }
      })
    },
    async handleSearch(e) {
      /* eslint-disable */
      this.key = this.key.replace(/[^0-9a-zA-Z]/g, '')

      if ((e.type === 'keyup' && e.keyCode !== 13) || !this.key) {
        return
      }
      try {
        this.loading = true
        let res = await this.$api.getSearchIndex({
          key: this.key,
          filter: this.filter
        })
        this.loading = false
        const { model_flag } = res
        let target = ''
        let key = ''
        switch (model_flag) {
          case 'block_hash':
            target = 'tipset'
            key = 'hash'
            break
          case 'Height':
            target = 'tipset'
            key = 'height'
            break
          case 'message_ID':
            target = 'messageDetail'
            key = 'cid'
            break
          case 'actor':
            target = 'addressDetail'
            key = 'address'
            break
          case 'peer_id':
            target = 'peer'
            key = 'peer_id'
            break
          default:
            target = 'noResult'
            key = 'key'
        }
        this.goTarget(target, key)
      } catch (e) {
        this.loading = false
      }
    },
    switchLang(lang) {
      this.set_lang(lang)
      this.$i18n.locale = lang
      localStorage.setItem('filscanLang', lang)
      document.cookie = 'locale=' + lang
      this.reload()
    },
    centerChange(val){
      if(val==='LogOut'){
        this.Logout(this.loginInfo.session_id)
        this.cookieSet('isLogin', false)
        setTimeout(()=>{
          this.$router.push('/')
        },1000)
      } else if(val==='center'){
        this.$router.push('/forcepool/center?type=0')
      }else{
        this.$router.push('/forcepool/center?type=1')
      }
    }
  },
  components: {
    Search,
    ThemeSwitch,
    NetSelect,
    HeaderSelect,
    CenterList,
    Nav
  }
}
</script>
<style lang="scss">
  .el-input .el-input__inner{
    color: #606266!important;
  }
  </style>
<style lang="scss" scoped>
.header-con {
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 125px;
  position: relative;
  background: var(--board-bg-color);
  flex-direction: column;
  .pc-header {
    display: flex;
    color: var(--main-text-color);
    flex-direction: column;
    background-color: #122639;
    .header-top {
      padding: 9px 20px;
      box-sizing: border-box;
      height: 62px;
      width: var(--main-width);
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .tool {
        display: flex;
        flex-direction: row;
      }
    }
    .theme-switch {
      font-size: 30px;
      color: var(--main-text-color);
    }

    .lang-switch {
      color: var(--force-mark-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        margin-right: 5px;
      }

      span {
        display: flex;
        align-items: center;

        span {
          margin: 0 5px;
        }
      }

      span:not(.active) {
        //color: var(--main-text-color);
        opacity: 0.5;
        color: #7c7c7c;
      }

      span:nth-child(2) {
        margin: 0 5px;
      }
    }
  }
  .pc-header-btm {
    background-color: var(--content-bg-color);
    .header-content {
      height: 63px;
      width: var(--main-width);
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &.shadow {
    box-shadow: 0px 1px 4px 5px rgba(0, 0, 0, 0.3);
  }

  .logo-con,
  .search-wrap {
    display: flex;
    align-items: center;
    justify-content: left;
    .margin-l-20{
      margin-left: 20px;
    }
    .icon {
      margin-left: auto;
      width: 40px;
    }

    .login-btns{
      height: 22px;
      background: #f3921b;
      border-radius: 4px;
      color: #ffffff;
      display: flex;
      flex-direction: row;
      padding: 6px 15px;
      font-size: var(--font-16);
      .login-btn{
          cursor: pointer;
      }
      .split-line{
          padding: 0 10px;
      }
    }
  }

  .logo-con {
    cursor: pointer;
    font-size: 32px;
    font-weight: 600;
  }

  .search-wrap {
    width: 660px;
  }

  .logo {
    width: 47px;
    margin-right: 20px;

    & + span {
      font-size: 30px;
      color: #0090ff;
    }
  }
}
</style>
