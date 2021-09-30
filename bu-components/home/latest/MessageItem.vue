<template>
  <div class="message-item">
    <div class="top flex jus-between">
      <div>
        <span class="label">{{ tr("id") }}</span>
        <co-link
          target="tipset/message-detail"
          :label="isMobile ? ellipsisByLength(message.id, 4) : message.id"
          :param="{ key: 'cid', value: message.id }"
        ></co-link>
      </div>
      <div v-if="message.height != 'NaN'">{{ message.time }}</div>
    </div>
    <div class="bottom flex jus-between align-center">
      <div>
        <span class="label">{{ tr("from") }}</span>
        <co-link
          :label="ellipsisByLength(message.from, isMobile ? 4 : 6)"
          target="tipset/address-detail"
          :param="{ key: 'address', value: message.from }"
        ></co-link>
      </div>
      <div class="method">
        <div>{{ message.value }}</div>
        <img src="../../../assets/image/long-arrow.png" alt="" class="arrow" />
        <div>{{ message.method }}</div>
      </div>
      <div>
        <span class="label">{{ tr("to") }}</span>
        <co-link
          :label="ellipsisByLength(message.to, isMobile ? 4 : 6)"
          target="tipset/address-detail"
          :param="{ key: 'address', value: message.to }"
        ></co-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageItem",
  data() {
    return {
      prefix: "home.latest.message"
    }
  },
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.message-item {
  margin-top: 12px;
  background: var(--board-item-bg-color);
  border-radius: 4px;
  padding: 20px;
  .bottom {
    margin-top: 20px;
    div {
      white-space: nowrap;
    }
    .method {
      text-align: center;
    }
    .arrow {
      width: 250px;
      height: 8px;
      margin: 10px 0;
    }
  }
  .label {
    margin-right: 10px;
  }
}
@media (max-width: 768px) {
  .message-item {
    font-size: 2.933vw;
    height: 21.067vw;
    padding: 0 2.667vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 2.667vw;
    box-shadow: 0px 0.533vw 1.333vw 0px rgba(0, 0, 0, 0.5);
    color: var(--main-text-color);
    .bottom {
      & > div {
        &:nth-child(1) {
          width: 25.733vw;
        }
        &:nth-child(3) {
          margin-left: auto;
        }
      }
      img.arrow {
        width: 100%;
        height: 1.333vw;
        display: block;
      }
      .method {
        font-size: 2.133vw;
        width: 24.4vw;
        margin-left: 6vw;
      }
    }
    .label {
      margin-right: 1.333vw;
    }
  }
}
</style>
