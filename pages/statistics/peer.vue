<template>
  <div class="peer-id bottom-10">
    <client-only>
      <co-overview
        :dataList="dataList"
        class="bottom-40"
        :dataLabel="$t('stats.peer.label')"
        v-if="emptyData!==null"
      />
      <co-empty  :flagImg="false" v-else />
    </client-only>
  </div>
</template>
<script>
export default {
  name: "PeerId",
  data() {
    return {
      emptyData: null,
      dataList: [
        {
          key: "peer_id"
        },
        {
          key: "miner",
          isLink: true,
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "ip"
        },
        {
          key: "location"
        }
      ]
    }
  },
  methods: {
    async getPeerById(peer) {
      try {
        let res = await this.$api.getPeerById([peer])
        this.emptyData = res!==null? res: null
        this.dataList = this.dataList.map(item => {
          let linkList, value
          const { location_en: en, location_cn: cn } = res
          if (item.key === "miner") {
            linkList = [res[item.key]]
          }
          if (item.key == "location") {
            value = this.isEn ? en : cn || en
          } else {
            value = res[item.key]
          }
          return {
            ...item,
            value,
            linkList
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    "$route.query.peer_id": {
      immediate: true,
      handler(v) {
        if (!v) {
          return
        } else {
          this.getPeerById(v)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .peer-id{
    background-color: var(--content-bg-color);
    div{
      min-height: auto!important;
    }
  }
</style>