<template>
  <div class="CoTagMiner" :class="border ? 'border-outline' : ''">
    <div class="name">{{ isEn ? names.tag_en : names.tag_cn }}</div>
    <div class="miner-icon" v-if="names.is_valid === 3"></div>
  </div>
</template>

<script>
export default {
  name: 'CoTagMiner',
  props: {
    name: {
      type: Object,
      default() {
        return {
          tag_cn: '--',
          tag_en: '--',
          is_valid: 1
        }
      }
    },
    border: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    names() {
      const { tag_en, tag_cn, is_valid } = this.name
      let tag_cns = tag_cn === '' ? '--' : tag_cn
      let tag_ens = tag_en === '' ? '--' : tag_en
      return {
        tag_en: tag_ens,
        tag_cn: tag_cns,
        is_valid
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.CoTagMiner {
  display: flex;
  flex-direction: row;
  height: 20px;
  margin-left: 10px;
  border-radius: 10px;
  padding: 0 10px;
  .name {
    height: 20px;
    font-size: var(--font-16);
    color: #777777;
    line-height: 20px;
    font-weight: 400;
    text-align: center;
    color: var(--main-text-color);
  }
  .miner-icon {
    height: 14px;
    width: 14px;
    background: url('../../../../assets/image/mobile/auth.png');
    background-size: 100% 100%;
    margin: 3px 0 3px 5px;
  }
}
</style>
