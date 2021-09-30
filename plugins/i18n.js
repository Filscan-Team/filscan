import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from "element-ui/lib/locale/lang/en"
import zhLocale from "element-ui/lib/locale/lang/zh-CN"
import jaLocale from 'element-ui/lib/locale/lang/ja'
import koLocale from 'element-ui/lib/locale/lang/ko'
import ElementLocale from "element-ui/lib/locale"
Vue.use(VueI18n);
export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.app.locale,
    fallbackLocale: store.state.app.locale,
    messages: {
      'zh': {...require('~/lang/zh.js').default, ...zhLocale},
      'en': {...require('~/lang/en.js').default, ...enLocale},
      'ja': {...require('~/lang/ja.js').default, ...jaLocale},
      'ko': {...require('~/lang/ko.js').default, ...koLocale}
    }
  });
  app.i18n.path = (link) => {
    console.log(link)
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }
    return `/${app.i18n.locale}/${link}`;
  }
  ElementLocale.i18n((key, value) => app.i18n.t(key, value))
}
