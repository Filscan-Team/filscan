<template>
  <div class="latest-message flex column">
    <div
      class="title flex jus-between align-center"
      :class="{ 'mb-top': isMobile }"
    >
      <span>{{ tr("title") }}</span>
      <div class="flex align-center pointer" @click="goTo('messageList')">
        {{ tr("more") }}
        <span class="iconfont icon-you"></span>
      </div>
    </div>
    <div class="message-list">
      <message-item
        v-for="message in messageList"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>
<script>
import MessageItem from "./MessageItem"
export default {
  name: "LatestMessage",
  data() {
    return {
      messageList: [],
      prefix: "home.latest.message",
      timer: null
    }
  },
  methods: {
    async getMessageData() {
      try {
        const data = await this.$api.getLatestMsgs([8])
        const dataSource = data.map(item => {
          const { method, cid, time, from, to, value } = item
          const current = new Date().getTime()
          const realTime = time
          return {
            from,
            to,
            value: this.formatFilNumber(value),
            time: this.formatTime(realTime),
            originTime: realTime,
            current: current,
            id: cid,
            method
          }
        })
        this.messageList = Object.freeze(dataSource)
        return Promise.resolve()
      } catch (e) {
        console.log(e)
      }
    },
    initTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.messageList = this.messageList.map(item => {
          return {
            ...item,
            time: this.formatTime(item.originTime, item.current),
            current: item.current + 1000
          }
        })
      }, 1000)
    }
  },
  mounted() {
    this.getMessageData().then(() => {
      this.initTimer()
    })
  },
  watch: {
    async latestBlockHeight() {
      await this.getMessageData()
      this.initTimer()
    }
  },
  components: {
    MessageItem
  }
}
</script>
<style lang="scss" scoped>
.latest-message {
  color: var(--main-text-color);
  border-radius: 6px;
  margin-left: 20px;
  background: var(--board-bg-color);
  font-size: 16px;
  height: 100%;
  .title {
    background: var(--board-item-bg-color);
    height: 68px;
    padding: 0 20px;
    border-radius: 6px 6px 0 0;
    font-size: 20px;
    div {
      font-size: 14px;
    }
  }
  .message-list {
    overflow-y: scroll;
    flex: 1;
    padding: 4px 14px;
    margin: 20px 14px 20px 0;
    &::v-deep .message-item {
      &:first-child {
        margin-top: 0;
      }
    }
  }
  .label {
    font-weight: bold;
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    height: 73.333vw;
    margin-left: 0 !important;
    .title {
      font-size: 3.733vw;
      .flex {
        font-size: 2.933vw;
      }
    }
    .message-list {
      padding: 2.667vw;
    }
  }
}
</style>
