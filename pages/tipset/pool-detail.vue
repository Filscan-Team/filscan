<template>
  <div class="pool-detail bottom-10">
    <div class="pool-heading">
      <div class="pool-title">
        <div class="label">
          {{ tr('pool.title') }}
          <el-popover placement="bottom-start" width="200" trigger="hover" :content="tr('pool.tips')">
            <i class="el-icon-warning-outline" slot="reference" style="margin-left:3px"></i>
          </el-popover>
        </div>
      </div>
      <div class="pool-panel">
        <div class="item" v-for="(item, index) in poolList" :key="index">
          <div class="label">{{ dataLabel[index] }}：</div>
          <client-only>
          <div class="value">
            <div v-if="item.key === 'tag'" class="tags">
              <div class="ownerID">{{ poolInfo.owner }}</div>
              <co-tag-miner :name="item.tag" :border="true" v-if="item.tag && item.tag.tag_cn !== ''" />
<!--              <div class="updateSign" @click="updateName">{{ $t('address.detail.dialog.updateName') }}</div>-->
            </div>
            <div v-else-if="item.type === 'link'" class="linka">
              <co-link
                :target="item.target"
                :param="{
                  key: item.paramKey || item.key,
                  value: link
                }"
                :underline="item.underline"
                :label="link"
                v-for="link in item.linkList"
                :key="link"
              ></co-link>
            </div>
          </div>
          </client-only>
        </div>
      </div>
    </div>
    <miner-overview />
    <chart-container />

    <el-dialog :title="$t('address.detail.dialog.title')" :visible.sync="nameVisible" width="62%" :before-close="handleClose">
      <div class="subtitle">{{ $t('address.detail.dialog.subtitle') }}</div>
      <el-form ref="form" :rules="rules" :model="form" label-width="160px">
        <el-form-item :label="$t('address.detail.dialog.labels')[0]" prop="address_to_sign">
          <el-input v-model="form.address_to_sign" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.detail.dialog.labels')[1]" prop="tag_en">
          <el-input v-model="form.tag_en" maxLength="18" :placeholder="$t('address.detail.dialog.placeholders')[1]"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.detail.dialog.labels')[2]" prop="tag_cn">
          <el-input v-model="form.tag_cn" maxLength="18" :placeholder="$t('address.detail.dialog.placeholders')[2]"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.detail.dialog.labels')[3]" prop="contact">
          <el-input v-model="form.contact" :placeholder="$t('address.detail.dialog.placeholders')[3]"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.detail.dialog.labels')[4]">
          <el-input v-model="form.message" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.detail.dialog.labels')[5]">
          <el-input v-model="form.sign_msg" disabled>
            <div slot="suffix" style="margin-right: 8px" v-clipboard:copy="form.sign_msg" v-clipboard:success="copySuccess" v-clipboard:error="copyError">
              <i class="el-icon-document-copy" style="font-size: 16px;"></i>
            </div>
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('address.detail.dialog.labels')[6]" prop="signature">
          <el-input v-model="form.signature" :placeholder="$t('address.detail.dialog.placeholders')[6]"></el-input>
        </el-form-item>
      </el-form>
      <div class="tips">{{ $t('address.detail.dialog.tips') }}</div>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <!--          <el-button @click="handleClose">取 消</el-button>-->
        <el-button class="handleSubmit" @click="handleSubmit('form')">{{ $t('address.detail.dialog.btnText') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mixin from '@/bu-components/address/mixin'
import MinerOverview from '@/bu-components/address/miner-overview/index'
import ChartContainer from '@/bu-components/address/chart/index'
import { mapActions, mapGetters } from 'vuex'
let chart
export default {
  name: 'PoolDetail',
  mixins: [mixin],
  data(vm) {
    const labels = vm.$root.$t('address.detail.dialog.labels')
    const validate = vm.$i18n.locale === 'en' ? ' can not be null' : '不能为空'
    let labelsArr = labels.map((item) => {
      return item + validate
    })
    return {
      prefix: 'address.detail',
      dataLabel: vm.$t('address.detail.pool.labels'),
      nameVisible: false,
      form: {
        miner: '',
        tag_cn: '',
        tag_en: '',
        address_to_sign: '',
        message: ' ',
        sign_msg: 'lotus wallet sign',
        sign_data: '',
        signature: '',
        contact: ''
      },
      rules: {
        address_to_sign: [{ required: true, trigger: 'blur' }],
        tag_en: [{ required: true, message: labelsArr[1], trigger: 'blur' }],
        tag_cn: [{ required: true, message: labelsArr[2], trigger: 'blur' }],
        contact: [{ required: true, message: labelsArr[3], trigger: 'blur' }],
        signature: [{ required: true, message: labelsArr[6], trigger: 'blur' }]
      }
    }
  },
  mounted() {
    let address = this.$route.query.address
    this.getAddressInfo(address)
  },
  watch: {
    '$route.query.address': {
      immediate: true,
      handler(v) {
        if (!v) {
          return
        }
        this.address = [v]
        this.getAddressInfo(v)
      }
    }
  },
  components: {
    MinerOverview,
    ChartContainer
  },
  computed: {
    ...mapGetters('address', ['basic', 'poolInfo']),
    name() {
      return this.minerNameMap[this.$route.query.address]
    },
    showMinerType() {
      const { actor_type } = this.basic
      return actor_type
    },
    poolList() {
      let rows = [
        {
          key: 'tag',
          id: 'owner'
        },
        {
          key: 'actor_addr',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        },
        {
          key: 'actor',
          type: 'link',
          target: 'tipset/address-detail',
          paramKey: 'address'
        }
      ]
      let result = rows.map((item, index) => {
        if (index == 0) {
          item.tag = this.poolInfo['tag']
        } else if (index === 1) {
          item.linkList = [this.poolInfo[item.key]]
          item.value = this.poolInfo[item.key]
        } else if (index === 2) {
          item.linkList = this.poolInfo[item.key] !== undefined ? this.poolInfo[item.key].split(',') : []
        } else {
          console.log()
        }
        return {
          ...item
        }
      })
      return result
    }
  },
  methods: {
    ...mapActions('address', ['fetchOwnerInfo']),
    async getAddressInfo(cid) {
      try {
        let result = await this.$api.getOwnerById([cid])
        this.fetchOwnerInfo(result)
      } catch (e) {
        console.log(e)
      }
    },
    updateName() {
      const { owner, actor } = this.poolInfo
      this.form.address_to_sign = owner
      this.form.miner = actor
      let d = new Date().toISOString()
      this.form.message = `Signature for filscan ${actor} ${d}`
      this.form.sign_msg = this.form.sign_msg + ' ' + this.form.address_to_sign + ' ' + this.stringtoHex(this.form.message)
      this.form.sign_data = this.stringtoHex(this.form.message)
      this.nameVisible = true
    },
    stringtoHex(str) {
      var val = ''
      for (var i = 0; i < str.length; i++) {
        if (val == '') val = str.charCodeAt(i).toString(16)
        else val += str.charCodeAt(i).toString(16)
      }
      return val.toLocaleUpperCase()
    },
    handleClose() {
      this.nameVisible = false
      this.resetForm('form')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getSubmitMinerInfo()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getSubmitMinerInfo() {
      let parmas = this.form
      delete parmas.sign_msg
      try {
        let res = await this.$api.getSubmitMinerInfo([parmas])
        if (res.result !== null) {
          this.$message({
            message: res.result,
            type: 'success'
          })
          let that = this
          setTimeout(() => {
            that.nameVisible = false
            that.resetForm('form')
          }, 1000)
        }
      } catch (e) {
        this.$message({
          message: e.error.message,
          type: 'error'
        })
      }
    },
    copy() {
      console.log('copy')
    },
    copySuccess(e) {
      console.log('copy arguments e:', e)
      this.$message({
        message: '复制成功!',
        type: 'success'
      })
    },
    copyError(e) {
      console.log('copy arguments e:', e)
      this.$message({
        message: '复制失败!',
        type: 'error'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.pool-detail {
  .pool-heading {
    background-color: var(--content-bg-color);
    padding: 20px;
    margin-bottom: 16px;
    .pool-title {
      padding-bottom: 20px;
      font-size: var(--font-18);
    }

    .pool-panel {
      border: 1px solid var(--border-line);
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 14px 20px;
        border-bottom: 1px solid var(--border-line);
        font-size: var(--font-16);
        .label {
          font-size: var(--font-16);
          width: 148px;
        }

        .value {
          .tags {
            display: flex;
            flex-direction: row;
            align-items: center;
            .ownerID {
              //padding-top: 4px;
              //padding-left: 8px;
            }
            .updateSign {
              font-size: var(--font-16);
              //padding-top: 4px;
              padding-left: 8px;
              color: orange;
              cursor: pointer;
            }
          }
          .linka {
            a {
              padding-right: 16px;
            }
          }
        }
      }

      .item:last-child {
        border-bottom: none;
      }
    }
  }
  .top-con {
    padding: 20px;
  }
  .account-common {
    .chart-con {
      padding: 20px;
      height: 341px;
      margin-bottom: 26px;

      & > div {
        background: var(--board-item-bg-color);
        height: 341px;
        margin-right: 15px;
        border-radius: 4px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .total-number {
      height: 68px;
      align-items: center;
      padding: 0 20px;
      color: var(--main-text-color);

      & ::v-deep > span {
        margin-right: auto;
        font-size: 16px;
        i {
          color: var(--force-mark-color);
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
  .top {
    padding: 0 20px;
    height: 65px;
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      flex-direction: row;
    }
  }
  .bg-board {
    padding: 20px;
  }
  .switch {
    color: var(--text-gray-color);
  }
  &::v-deep .worker-list {
    flex-wrap: wrap;
    line-height: 20px;
  }
  .block-list-con {
    border-radius: 4px;
    padding: 20px;
    padding-bottom: 0;
  }
  & ::v-deep .el-range-input {
    color: var(--main-text-color) !important;
  }
  @media (max-width: 768px) {
    .type {
      display: flex;
      flex-direction: column;
    }
    .top {
      height: auto;
      padding: 2.667vw 2.667vw 2.667vw 4vw;
      font-size: 3.733vw;
      box-shadow: 0px 0.533vw 2.667vw 0px rgba(0, 0, 0, 0.5);
      .miners {
        word-break: break-all;
        word-wrap: break-word;
        display: flex;
        flex-wrap: wrap;
        span.item {
          display: flex;
          width: 16vw;
          display: inline-block;
        }
        .end {
          margin-left: 2.667vw;
        }
      }
      .name {
        font-size: 3.733vw;
        i {
          margin: 0;
          margin-left: 10px;
        }
      }
    }
    .account-common {
      .chart-con {
        height: 40vw;
        padding: 0 2.667vw;
        margin: 0 2.667vw;
        & > div {
          height: 40vw;
        }
      }
      .total-number {
        margin: 0 2.667vw;
        padding: 2.667vw;
      }
    }
    & > .bg-board {
      padding: 0;
      overflow: hidden;
    }
    & ::v-deep > div:nth-child(2).general-overview {
      margin: 10px 0 !important;
    }
    &::v-deep .worker-list {
      align-self: center;
      margin-left: 1.333vw;
      flex: 1;
      line-height: 5.333vw;
      //max-width: 61.333vw;
      justify-content: flex-end;
    }
    &::v-deep .block-list-con {
      .switch-button {
        position: relative;
        width: 100%;
        margin: 0;
        padding: 2.667vw 0 0 2.667vw;
        border-radius: 0;
        border-bottom: 1px solid var(--border-color);
        background: var(--board-item-bg-color);
      }
      .total-number {
        margin-top: 0;
      }
    }
    & ::v-deep .message-list {
      .mb-board {
        margin: 0 2.667vw 2.667vw;
      }
    }
    & ::v-deep .block-list {
      .mb-board {
        margin: 0 2.667vw 2.667vw;
      }
    }
    .switch {
      margin-bottom: 2.667vw;
    }
  }
}
</style>
