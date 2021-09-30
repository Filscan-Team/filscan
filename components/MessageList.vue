<template>
  <client-only>
    <div class="message-list" v-loading="loading" element-loading-background="transparent">
      <div class="total-number radius" slot="header" :class="{ 'has-select': showSelect }">
        <span
          class="statistic"
          v-html="
            $t('component.mesList.total', {
              total: formatNumber(total),
              extra: showPicker
                ? time
                  ? $t('component.mesList.range', {
                      start: dateTime.start,
                      end: dateTime.end
                    })
                  : $t('component.mesList.latest')
                : ''
            })
          "
        ></span>
        <div class="select-btns font-14 pointer" v-if="showSelect && !isMobile">
        </div>

        <div class="flex">
          <el-date-picker
            v-model="time"
            v-if="showPicker && !isMobile"
            type="daterange"
            range-separator="-"
            :start-placeholder="$t('component.blockList.start')"
            :end-placeholder="$t('component.blockList.end')"
            popper-class="block-time-picker"
            @change="handleTimeChange"
            :picker-options="pickerOptions"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
          <co-select :options="messageMethods" :index.sync="index" :minwidth="true" />
        </div>
      </div>
      <div class="table-con border-outline" v-if="!isMobile">
        <co-table
          :dataSource="messageData"
          :columns="returnObj.columns"
          showPagination
          :total="total"
          @size-change="handleSizeChange"
          @page-change="handlePageChange"
          :labels="returnObj.labels"
          :currentPage="currentPage"
        ></co-table>
      </div>

      <div v-else-if="isMobile && $route.name !== 'messageListCon' && $route.name !== 'poolMessageList'">
        <cm-cards v-for="(item, index) in messageData" :key="item.cid + index" :dataSource="item" :columns="mbColumnsWithLabel" />
      </div>
      <div v-else class="message-item-con">
        <message-item v-for="(item, index) in messageData" :key="item.cid + index" :message="item" />
      </div>
      <co-page v-if="isMobile" @page-change="handlePageChange" :total="total" />
    </div>
  </client-only>
</template>
<script>
import MessageItem from '@/bu-components/home/latest/MessageItem'
import { mapActions } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'MessageList',
  data(vm) {
    const type = this.type
    return {
      prefix: 'component.mesList',
      method: [],
      loading: false,
      option: {
        method: '',
        begindex: '0',
        count: '25',
        from_to: '',
        begin: '',
        end: ''
      },
      currentPage: 1,
      total: 0,
      messageData: [],
      mbColumns: [
        {
          key: 'id',
          type: 'link',
          target: 'tipset/message-detail',
          paramKey: 'cid',
          ellipsis: true
        },
        {
          key: 'height',
          type: 'link',
          target: 'tipset/chain',
          paramKey: 'height',
          class: 'text-center'
        },
        {
          key: 'from',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address',
          class: 'text-right'
        },
        {
          key: 'to',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'method',
          class: 'text-center'
        },
        {
          key: 'value',
          class: 'text-right',
          formatter(v) {
            return Number(vm.formatFilNum(v, true, true)).toFixed(3) + ' FIL'
          }
        }
      ],
      columns: [
        {
          key: 'type',
          isComponent: true,
          hideInMobile: true
        },
        {
          key: 'sign_cid',
          type: 'link',
          target: 'tipset/message-detail',
          ellipsis: true
        },
        {
          key: 'height',
          type: 'link',
          target: 'tipset/chain',
          paramKey: 'height'
        },
        {
          key: 'time',
          hideInMobile: true
        },
        {
          key: 'from',
          type: 'link',
          target: '/tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'to',
          type: 'link',
          target: '/tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'value'
        },
        {
          key: 'code',
          hideInMobile: true
        },
        {
          key: 'method'
        }
      ],
      labels: [],
      index: '',
      selectType: '',
      time: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > 1000 * dayjs(dayjs().format('YYYY-MM-DD')).unix() + 86400000
        }
      },
      methodsMsg: []
    }
  },
  props: {
    showSelect: {
      type: Boolean,
      default: false
    },
    withType: {
      type: Boolean,
      default: true
    },
    cid: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'block'
    },
    address: {
      type: String,
      default: ''
    },
    showExtra: {
      type: Boolean,
      default: false
    },
    subAddress: {
      type: String,
      default: ''
    },
    showPicker: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions('app', ['setMethods', 'getMessageMethods', 'setMessageMethods']),
    handleSizeChange(v) {
      this.option.count = v
    },
    handlePageChange(v) {
      this.currentPage = v
      this.option.begindex = (v - 1) * this.option.count
    },
    handleMethodChange(v) {
      this.currentPage = 1
      this.option = {
        from_to: this.option.from_to,
        method: v,
        begindex: 0,
        count: 25
      }
    },
    handleTimeChange(v) {
      if (v && v.length) {
        const [begin, end] = v
        const startUnix = dayjs(begin).unix()
        const endUnix = dayjs(end).unix()
        if (Math.ceil((endUnix - startUnix) / 86400) > 6) {
          //this.time[1] = dayjs(begin).add(6, 'd');
          this.$set(this.time, 1, dayjs(begin).add(6, 'd'))
        }
        this.option.begin = dayjs(begin).unix()
        this.option.end = dayjs(this.time[1]).unix()
      }
      if (v == null) {
        this.option.begin = null
      }
    },
    async getMessage() {
      try {
        this.loading = true
        if (this.cid) {
          this.option.block_cid = this.cid
        }
        if (this.type === 'block') {
          //get messages in a given block, if the block_cid is empty, get all messages
          if (this.isPoolMessage) {
            this.getPoolMessage()
          } else {
            this.getMessageList()
          }
          this.getMessageMethods()
        } else {
          this.getAddressMessage()
        }
      } catch (e) {
        this.loading = false
      }
    },
    async getPoolMessage() {
      const { begindex, count, method } = this.option
      let op = [
        {
          offset_range: { start: Number(begindex), count: Number(count) },
          method
        }
      ]
      try {
        let res = await this.$api.getMpoolMessages(op)
        const { total, data } = res
        let list = []
        if (Array.isArray(data)) {
          list = data.map((item) => {
            const { cid, last_modified, last_modified_unix, from, to, value, gas_limit, gas_premium, method_name } = item
            let methodName = method_name === 'transfer' ? 'Send' : method_name
            return {
              cid,
              last_modified,
              last_modified_unix,
              from,
              to,
              value,
              gas_limit,
              gas_premium,
              method_name: methodName
            }
          })
        }
        this.total = total
        this.messageData = list
        this.loading = false
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },
    async getMessageList() {
      const { block_cid, begindex, count, begin, end, method } = this.option
      let params = {
        blk_cid: block_cid,
        offset_range: { start: Number(begindex), count: Number(count) },
        time_range: { begin, end },
        method
      }
      if (!begin || !end) {
        delete params.time_range
      }
      try {
        let res = await this.$api.getGetMessages([params])
        const { total, data } = res
        let list = []
        if (Array.isArray(data)) {
          list = data.map((item) => {
            const { cid, height, block_time, from, to, value, exit_code, method_name } = item
            let methodName = method_name === 'transfer' ? 'Send' : method_name
            return { cid, height, time: block_time, from, to, value, code: this.methodResMap[exit_code], method_name: methodName }
          })
        }
        this.total = total
        this.messageData = list
        this.loading = false
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },
    async getAddressMessage() {
      const { begindex, count, method, begin, end } = this.option
      let params = {
        method,
        address: this.address,
        from_to: this.selectType,
        offset_range: {
          start: Number(begindex),
          count: Number(count)
        },
        time_range: {
          begin,
          end
        }
      }
      if (!begin || !end) {
        delete params.time_range
      }
      try {
        let res = await this.$api.getMessageByAddress([params])
        const { total, data, ActorMsgCount } = res
        let list = []
        if (Array.isArray(data)) {
          list = data.map((item) => {
            const { cid, signed_cid, height, block_time, from, to, value, exit_code, method_name } = item
            let methodName = method_name === 'transfer' ? 'Send' : method_name
            return {
              cid,
              signed_cid,
              height,
              time: block_time,
              from,
              to,
              value,
              code: this.methodResMap[exit_code],
              method_name: methodName
            }
          })
        }
        this.total = total
        this.messageData = list
        this.loading = false
        if (ActorMsgCount && ActorMsgCount !== null) {
          this.setMessageMethods(ActorMsgCount.MethodMsgCount)
        }
      } catch (e) {
        this.loading = false
      }
    }
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.getMessage()
      }
    },
    cid() {
      this.option = {
        begindex: 0,
        count: 25
      }
    },
    address() {
      if (this.option.from_to) {
        this.option.from_to = ''
      } else {
        this.getMessage()
      }
    },
    index(v) {
      this.handleMethodChange(v)
    },
    selectType(v) {
      this.currentPage = 1
      this.option = {
        ...this.option,
        from_to: v
      }
    },
    isPoolMessage() {
      this.getMessage()
    }
  },
  mounted() {
    // this.labels = [...this.$t('component.mesList.label')];
    // if (!this.withType) {
    // 	this.columns.shift();
    // 	this.labels.shift();
    // }
    this.getMessage()
    /*
    handle search
    if not do this,when you navigate to 'address-detail' page and click the button at the header, it will not request because the 'address'
    does not change
    */
    this.$bus.$on('search', () => {
      this.getMessage()
    })
  },
  computed: {
    mbColumnsWithLabel() {
      return this.mbColumns.map((item, index) => {
        return {
          ...item,
          title: this.$t('component.mesList.mbLabel')[index]
        }
      })
    },
    isPoolMessage() {
      return this.$route.name == 'tipset-pool-message-list'
    },
    returnObj() {
      const vm = this
      const returnObj = {
        columns: [],
        labels: []
      }
      const type = this.type
      const labels = this.$t('component.mesList.label')
      const formatterTime = (v) => dayjs.unix(v).format('YYYY-MM-DD HH:mm')

      const poolColumns = [
        {
          key: 'cid',
          type: 'link',
          target: 'tipset/pool-message-detail',
          ellipsis: true
        },
        {
          key: 'last_modified_unix',
          formatter(v) {
            return vm.formatTime(v)
          }
        },
        {
          key: 'from',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'to',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'value',
          formatter(v) {
            let str = vm.formatFilNum(v, true, false)
            let ArrStr = str.split(' ')
            return Number(ArrStr[0]).toFixed(3) + ' ' + ArrStr[1]
          }
        },
        {
          key: 'gas_limit'
        },
        {
          key: 'gas_premium',
          formatter(v) {
            return v + ' attoFIL'
          }
        },
        {
          key: 'method_name'
        }
      ]
      const columns = [
        {
          key: 'cid',
          type: 'link',
          target: 'tipset/message-detail',
          ellipsis: true
        },
        {
          key: 'height',
          type: 'link',
          target: 'tipset/chain',
          paramKey: 'height'
        },
        {
          key: 'time',
          formatter: formatterTime
        },
        {
          key: 'from',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'to',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true,
          isComponent: type === 'address'
        },
        {
          key: 'value',
          formatter(v) {
            let str = vm.formatFilNum(v, true, false)
            let ArrStr = str.split(' ')
            return Number(ArrStr[0]).toFixed(3) + ' ' + ArrStr[1]
          }
        },
        {
          key: 'code',
          hideInMobile: true
        },
        {
          key: 'method_name'
        }
      ]
      const messageColumns = [
        {
          key: 'signed_cid',
          type: 'link',
          target: 'tipset/message-detail',
          paramKey: 'cid',
          ellipsis: true
        },
        {
          key: 'height',
          type: 'link',
          target: 'tipset/chain',
          paramKey: 'height'
        },
        {
          key: 'time',
          formatter: formatterTime
        },
        {
          key: 'from',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true
        },
        {
          key: 'to',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address',
          ellipsis: true
        },
        {
          key: 'value',
          formatter(v) {
            let str = vm.formatFilNum(v, true, false)
            let ArrStr = str.split(' ')
            return Number(ArrStr[0]).toFixed(3) + ' ' + ArrStr[1]
          }
        },
        {
          key: 'code',
          hideInMobile: true
        },
        {
          key: 'method_name'
        }
      ]

      returnObj.columns = columns
      returnObj.labels = labels
      // // 待打包消息
      if (this.isPoolMessage) {
        returnObj.columns = poolColumns
        returnObj.labels = this.$t('component.mesList.poolLabels')
      }
      if (type == 'address') {
        returnObj.columns = messageColumns
        returnObj.labels = this.$t('component.mesList.label')
      }
      return returnObj
    },
    dateTime() {
      if (!this.time) {
        return {
          start: '',
          end: ''
        }
      } else {
        const [start, end] = this.time
        const format = this.isEn ? 'MM-DD' : 'MM月DD日'
        return {
          start: dayjs(start).format(format),
          end: dayjs(end).format(format)
        }
      }
    }
  },
  components: {
    MessageItem
  }
}
</script>
<style lang="scss" scoped>
.message-list {
  .total-number {
    height: 68px;
    align-items: center;
    display: flex;
    color: var(--main-text-color);
    & ::v-deep .el-date-editor {
      border-color: #999;
      margin-right: 30px;
      background: transparent;
      .el-range-input {
        background: transparent;
      }
      .el-range-separator {
        color: var(--main-text-color);
      }
    }
    & ::v-deep > span {
      height: 30px;
      line-height: 30px;
      i:first-of-type {
        color: var(--force-mark-color);
        font-size: 20px;
        font-weight: 600;
      }
    }
    .select-btns {
      /*border: 1px solid var(--border-color);*/
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      margin-left: -40px;
      span {
        padding: 0 30px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        border-right: 1px solid var(--border-color);
        &:last-child {
          border-right: none;
        }
      }
    }
    .statistic {
      font-size: var(--font-16);
      margin-right: auto;
    }
    &.has-select {
      .select-btns {
        margin-right: auto;
      }
      .statistic {
        margin-right: 60px;
      }
    }
  }
  & ::v-deep .rotate {
    transform: rotateY(180deg) rotateZ(180deg);
  }
  @media (max-width: 768px) {
    background: var(--board-bg-color);
    .total-number {
      margin-bottom: 2.667vw;
      height: 11.733vw;
      padding: 0 2.667vw;
      box-shadow: 0px 0.533vw 1.333vw 0px rgba(0, 0, 0, 0.5);
      & ::v-deep .statistic {
        font-size: 14PX !important;
        i {
          font-size: 3.733vw !important;
        }
      }
      & > span {
        margin-left: 0 !important;
        margin-right: auto !important;
      }
    }
    &.message-list {
      min-height: 53.333vw;
    }
    .message-item-con {
      max-height: calc(100vh - 49.333vw);
      overflow-y: scroll;
      background: var(--board-bg-color);
      padding: 0 2.667vw;
      &::v-deep .message-item {
        .el-link {
          font-size: 3.733vw !important;
        }
        .method {
          div:last-child {
            font-size: 2.133vw;
          }
        }
      }
    }
  }
}
</style>