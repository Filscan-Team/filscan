export function minnerMap(obj) {
  if (obj === undefined) {
    return ""
  }
  return isEn ? obj.tag_en : obj.tag
}

function isEn() {
  return this.$i18n.locale === "en"
}
