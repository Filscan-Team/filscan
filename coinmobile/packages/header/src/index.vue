<template>
  <div class="cm-header">
    <div class="header-main bg-board relative" v-if="!showSearch">
      <!--            <div-->
      <!--                    class="el-icon-arrow-left arrow-back"-->
      <!--                    v-if="!atIndex"-->
      <!--                    @click="$router.go(-1)"-->
      <!--            ></div>-->
      <div class="logo">
        <img src="@/assets/logo.png" class="tool-img" />
      </div>
      <div class="search flex align-center jus-between bg-board ">
        <div class="bg-item">
          <span
            class="iconfont icon-sosu tool-img"
            @click="handleSearch"
          ></span>
          <input
            :placeholder="$t('header.placeholder')"
            v-model="key"
            type="search"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
      <div class="route-name">
        {{ routeName }}
      </div>
      <div class="tools">
        <!--                <img-->
        <!--                        :src="imgUrl.search"-->
        <!--                        alt=""-->
        <!--                        @click="-->
        <!--            showSearch = true-->
        <!--            showNav = false-->
        <!--          "-->
        <!--                        class="tool-img search-icon"-->
        <!--                />-->
        <img
          :src="imgUrl.more"
          @click="showNav = true"
          v-if="!showNav"
          class="tool-img more"
        />
        <img
          :src="imgUrl.close"
          alt=""
          class="tool-img close"
          @click="hide"
          v-else
        />
      </div>
    </div>
    <div class="search flex align-center jus-between bg-board " v-else>
      <div class="bg-item">
        <span class="iconfont icon-sosu tool-img" @click="handleSearch"></span>

        <input
          :placeholder="$t(header.placeholder)"
          v-model="key"
          type="search"
          @keyup.enter="handleSearch"
        />
      </div>
      <span @click="showSearch = false">{{ $t('header.cancel') }}</span>
    </div>
    <div v-if="showNav" class="nav-bar">
      <div class="mask" @touchmove.prevent @touchstart="hide"></div>
      <div class="main">
        <div
          v-for="(value, key) in mbnav"
          :key="key"
          class="nav-item"
          :class="{
            active: currentIndex == value.index,
            positive: isMobile && !['home', 'mining'].includes(currentIndex)
          }"
        >
          <div class="title" @click="go(value)">
            <div class="title-label">
              <div :class="{'hot-color':value.hot}">{{ value.label }}</div>
              <div class="new" v-if="value.new"></div>
              <div class="hot" v-if="value.hot"></div>
            </div>
            <div
              class="right_icon"
              v-if="'isSubShow' in value"
              @click="toggle(key, value)"
            >
              <div :class="value.close"></div>
            </div>
          </div>
          <div v-if="value.isSubShow">
            <div
              v-for="item in value.items"
              :key="item.index"
              class="sub-item"
              :class="{
                active: subIndex == item.index
              }"
              @click="go(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="nav-item positive">
        <div class="title">
          {{langs[$i18n.locale]}}
        </div>
          <div v-for="item in languages"
               :key="item.value"
          class="sub-item"
               :class="{
               active: $i18n.locale === item.value
               }"
               @click="switchLang(item.value)"
          >
            {{item.labels}}
          </div>
<!--          <span-->
<!--            :class="{-->
<!--              active: $i18n.locale === 'en'-->
<!--            }"-->
<!--            @click="switchLang('en')"-->
<!--            >EN</span-->
<!--          >-->
<!--          <span>/</span>-->
<!--          <span-->
<!--            :class="{-->
<!--              active: $i18n.locale === 'zh'-->
<!--            }"-->
<!--            @click="switchLang('zh')"-->
<!--            >中文</span-->
<!--          >-->
        </div>
        <!--        <div class="theme-switch bg-board">-->
        <!--           <theme-switch />-->
        <!--        </div>-->
      </div>
    </div>
    <div class="search-mask" v-if="showSearch" @touchstart.prevent></div>
  </div>
</template>

<script>
import mixin from '@/mixins/headerMixin'
import searchMixin from '@/mixins/searchMixin'
import { mapMutations, mapGetters } from 'vuex'
import jscookie from 'js-cookie'
// import ThemeSwitch from "./components/Switch"
export default {
  name: 'CmHeader',
  data(vm) {
    return {
      showNav: false,
      showSearch: false,
      currentIndex: 'home',
      filter: 0,
      key: '',
      subIndex: '',
      imgUrl: {
        search: '',
        more: '',
        close: ''
      },
      langs: {
        en: 'English',
        zh: '中文',
        ja: '日本語',
        ko: '한국어'
      },
      languages: [
        { value: 'en', labels: 'English' },
        { value: 'zh', labels: '中文' },
        { value: 'ja', labels: '日本語' },
        { value: 'ko', labels: '한국어' }
      ],
      mbnav: vm.$t('header.mbnav'),
      darkUrl: {
        search: require('@/assets/image/icons/search-dark.png'),
        more: require('@/assets/image/icons/more-dark.png'),
        close: require('@/assets/image/icons/close.png')
      },
      whiteUrl: {
        search: require('@/assets/image/icons/search-white.png'),
        more: require('@/assets/image/mobile/menudown.png'),
        close: require('@/assets/image/mobile/menuup@2x.png')
      }
    }
  },
  // created() {
  //   if(jscookie.get('theme') === 'light'){
  //     this.imgUrl = this.whiteUrl
  //   } else {
  //     this.imgUrl = this.darkUrl
  //   }
  // },
  mounted() {
    if (jscookie.get('theme') === 'light') {
      this.imgUrl = this.whiteUrl
    } else {
      this.imgUrl = this.whiteUrl
    }
  },
  computed: {
    ...mapGetters('app', ['theme'])
  },
  methods: {
    ...mapMutations('app', ['set_lang']),
    go(nav) {
      if (nav.close) {
        return
      }
      this.showNav = false
      this.handleClick(nav)
    },
    toggle(ind, item) {
      for (let i in this.mbnav) {
        if (this.mbnav[i]['index'] === item['index']) {
          this.mbnav[ind].isSubShow = !this.mbnav[ind].isSubShow
          if (this.mbnav[ind].isSubShow == true) {
            this.mbnav[ind].close = 'icon-up'
          } else {
            this.mbnav[ind].close = 'icon-down'
          }
        } else {
          if (this.mbnav[i].hasOwnProperty('close')) {
            this.mbnav[i].isSubShow = false
            this.mbnav[i].close = 'icon-down'
          }
        }
      }

      // const menuData = Object.values(this.mbnav)
      // for (let i of menuData) {
      //   i.isSubShow = !i.isSubShow
      //   // if (i.isSubShow) {
      //   //   i.isSubShow = false
      //   // }
      // }
    },
    hide() {
      this.showNav = false
      this.showSearch = false
    },
    switchLang(lang) {
      const currentLang = localStorage.getItem('filscanLang')
      if (currentLang === lang) {
        return
      }
      this.set_lang(lang)
      this.$i18n.locale = lang
      localStorage.setItem('filscanLang', lang)
      document.cookie = 'locale=' + lang
      location.reload()
    }
  },
  // components: {
  //   ThemeSwitch
  // },
  mixins: [mixin, searchMixin]
}
</script>
<style lang="scss" scoped>
.cm-header {
  z-index: 10000;
  background: var(--main-bg-color);
  top: 0;
  width: 100%;
  position: fixed;
  font-size: 30px;
  .header-main {
    z-index: 10000;
    padding: 0 22px;
    display: flex !important;
    height: 88px;
    box-sizing: border-box;
    justify-content: space-between;
    & > div:first-child,
    .route-name {
      color: var(--main-text-color);
    }
    .route-name {
      position: absolute;
      transform: translateX(-50%) translateY(-50%);
      top: 50%;
      left: 50%;
    }
    .logo {
      height: 100%;
      display: flex;
      align-items: center;
      line-height: 100px;
      color: var(--logo-text-color);
      span {
        font-size: 32px;
        margin-left: 10px;
        color: var(--logo-text-color);
        font-weight: 600;
      }
    }
    .tool-img {
      width: 42px;
      height: 42px;
      &.search-icon {
        width: 60px;
        height: 60px;
      }
      &.more {
        height: 32px;
        margin-left: 22px;
      }
      &.close {
        height: 32px;
        margin-left: 22px;
      }
    }
    .tools {
      display: flex;
      align-items: center;
      span {
        color: var(--main-text-color);
        margin-right: 20px;
        font-size: 40px;
      }
    }
  }
  .nav-bar {
    position: fixed;
    top: 88px;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    z-index: 10000;
    font-size: 32px !important;

    .main {
      position: absolute;
      right: 0;
      top: 0;
      width: 350px;
    }
    .nav-item {
			&:first-child {
				border-top: none;
			}
      font-size: 30px;
      background: var(--board-bg-color);
      color: var(--main-text-color);
      border-top: 1px solid var(--border-color);
      .title {
        height: 40px;
        line-height: 40px;
        font-weight: 400;
        font-size: 28px;
        padding: 15px 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .right_icon {
          height: 33px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          div.icon-down {
            background: url('../../../../assets/image/mobile/arrawdown.png');
            background-size: 100% 100%;
            width: 21px;
            height: 12px;
          }
          div.icon-up {
            background: url('../../../../assets/image/mobile/arrawup.png');
            background-size: 100% 100%;
            width: 21px;
            height: 12px;
          }
        }
        .title-label {
          display: flex;
          flex-direction: row;
          .hot-color{
            color: #F44C30;
          }
          .new {
            width: 29px;
            height: 20px;
            margin-left: 10px;
            margin-top: -8px;
            background: url('../../../../assets/image/new.png');
            background-size: 100% 100%;
          }
          .hot{
            width: 46px;
            height: 24px;
            margin-left: 6px;
            background: url('../../../../assets/image/hot@2x.png');
            background-size: 100% 100%;
          }
        }
      }
      .sub-item {
        height: 33px;
        padding: 16px 10px 16px 65px;
        line-height: 33px;
        white-space: nowrap;
        font-size: 26px;
        color: #666666;
        &.active {
          color: var(--force-mark-color);
          font-size: 24px;
          font-weight: 500;
        }
      }
    }
    .active {
      .title {
        color: var(--force-mark-color) !important;
      }
      .positive .title {
        color: var(--main-text-color);
      }
    }
  }
  .search {
    width: 600px;
    height: 88px;
    padding-left: 20px;
    color: var(--main-text-color);
    div {
      flex: 1;
      display: flex;
      border-radius: 12px;
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      input {
        background: transparent;
        flex: 1;
        border: none;
        font-size: 22px;
        margin-left: 10px;
        color: var(--main-text-color);
        &:focus {
          outline: none;
        }
      }
      span {
        font-size: 32px;
      }
    }
    & > span {
      font-size: 28px;
      color: var(--text-gray-color);
    }
  }
  .close {
    display: flex;
    align-items: center;
    background: var(--board-bg-color);
    text-align: right;
    height: 100px;
    line-height: 100px;
    color: var(--main-text-color);
    &::before {
      font-size: 60px;
      margin-right: 30px;
    }
    img {
      width: 48px;
    }
    span {
      font-size: 60px;
    }
  }
  .arrow-back {
    display: flex !important;
    align-items: center !important;
    font-size: 50px;
  }
  .route-name {
    display: flex;
    align-items: center;
  }
  .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
  .search-mask {
    position: fixed;
    width: 100%;
    height: calc(100vh - 88px);
    background: rgba(0, 0, 0, 0.7);
  }
  .lang-switch {
    color: var(--main-text-color);
    height: 104px;
    line-height: 104px;
    padding-left: 70px;
    font-size: 28px;
		color: var(--force-mark-color);
    //border-top: 1px solid var(--border-color);
    span:not(.active) {
      font-size: 24px;
      color: var(--main-text-color);
    }
    span:nth-child(2) {
      margin: 0 20px;
    }
  }
  .theme-switch {
    height: 104px;
    line-height: 104px;
    padding-left: 18px;
    font-size: 32px;
    border-top: 1px solid var(--border-color);
    .theme {
      line-height: 104px;
      height: 90px;
    }
  }
}
</style>
