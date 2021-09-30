<template>
  <div class="quality-power font-14">
    <!--    <div class="flex font-18 panel-title border-btm">-->
    <!--      <div class="left">{{ tr("title") }}</div>-->
    <!--    </div>-->
    <div class="subtitle">{{ tr("subtitle") }}</div>
    <div class="flex powerAdj">
      <div class="left font-20 font-400 text flex align-center">
        <span>{{ unitConversion(info.quality_adjust_power, 2) }}</span>
      </div>
      <div class="left-center">
        <div class="label">{{ tr("rate") + info.pow_ratio }}</div>
      </div>
      <div class="left-right">
        <div class="label">{{ tr("rank") + ": " +info.ranking}}</div>
      </div>

    </div>
    <div class="flex">

      <div class="right">
        <div class="label">{{ tr("raw") }}</div>
        <div class="value">{{ unitConversion(info.power, 2) }}</div>
      </div>
    </div>
    <!--flex end-->
    <div class="flex">
      <div class="left">
        <div class="label">{{ tr("block") }}</div>
        <div class="value">{{ formatNumber(info.block_count) }}</div>
      </div>
      <div class="right">
        <div class="label">{{ tr("reward") }}</div>
        <div class="value">{{ formatNumber(info.rewards, 4) }} FIL</div>
      </div>
    </div>
    <!--flex end-->
    <div class="flex">
      <div class="left">
        <div class="label">{{ tr("win") }}</div>
        <div class="value">{{ formatNumber(info.sigma_win_count) }}</div>
      </div>
      <div class="right" v-if="info.sector_size!==-1">
        <div class="label">{{ tr("size") }}</div>
        <div class="value">{{ unitConversion(info.sector_size, 2) }}</div>
      </div>
    </div>
    <div class="flex">
      <div class="left status">
        <div class="label">{{ tr("status") }}</div>
        <div class="total value">
          <span
          >{{
              formatNumber(info.sector_count)
            }}<span class="nbsp">{{ tr("total") }}</span></span
          >
          <span class="proving"
          >{{
              formatNumber(info.live_sector_count)
            }}<span class="nbsp">{{ tr("proving") }}</span></span
          >
          <span class="fault"
          >{{
              formatNumber(info.fault_sector_count)
            }}<span class="nbsp">{{ tr("fault") }}</span></span
          >
          <span class="pre"
          >{{
              formatNumber(info.recover_sector_count)
            }}<span class="nbsp">{{ tr("pre") }}</span></span
          >
        </div>
      </div>
    </div>
    <!--flex end-->
  </div>
  <!--power end-->
</template>
<script>
import {mapGetters} from "vuex"

export default {
  name: "QualityPower",
  data() {
    return {
      prefix: "address.detail.minerOverview.power"
    }
  },
  computed: {
    ...mapGetters("address", ["powerInfo"]),
    info() {
      return this.powerInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.quality-power {
  justify-content: flex-start;
  min-height: auto !important;

  .panel-title {
    padding: 0 2.667vw;
    font-size: 3.733vw !important;
  }

  div.subtitle {
    font-size: 3.2vw !important;
    padding-bottom: 1.334vw !important;
  }

  .powerAdj {
    display: flex;
    flex-direction: row !important;

    .align-center {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-end;
      span {
        padding-top: 10px;
        font-size: 40px;
        font-weight: 500;
        vertical-align: alphabetic;
      }
    }



    .left-center {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 12px;
    }

    .left-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
      padding-bottom: 12px;
    }
  }

  .flex .left,
  .right {
    dispaly: flex;
    flex-direction: row;
  }

  font-size: 22px;
  padding: 20px;

  & > .power.flex {
    flex-direction: column;
    justify-content: space-between;
    line-height: 33px;
    height: auto;
    margin-bottom: 0 !important;

    .left span {
      line-height: 33px;
      font-size: 24px;
      font-weight: 500;
    }
  }

  & > div {
    display: flex;
    flex-direction: column;

    .left,
    .right,
    .center {
      width: 100%;
      padding-bottom: 20px;
    }

    .right {
      div.total {
        white-space: break-spaces;
      }
    }

    & > div {
      width: 100%;
      display: flex;
      flex-direction: row;

      .label {
        height: 40px;
        line-height: 40px;
      }

      .value {
        max-height: 40px;
        line-height: 40px;
        text-align: right;
        flex: 1;
        white-space: break-spaces;
        word-break: break-all;
      }
    }
  }

  & > div {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      padding: 0;
      justify-content: space-between;
      line-height: 30px;
      margin-bottom: 0 !important;
      /*margin-bottom: 1.333vw;*/
    }

    &:nth-child(5) {
      white-space: pre-line;
      line-height: 30px;
    }
  }

  .sector {
    span:last-child {
      flex: 1;
      text-align: right;
    }
  }

  .proving {
    color: rgb(31,174,50);
  }

  .fault {
    color: #DA272A;
  }

  .pre {
    color: #EEDA4D;
  }
}
</style>
