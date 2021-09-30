<template>
  <div class="top-con">
    <div class="miner-top flex align-center font-18 font-500">
      <span>{{ tr('account') }} {{ actorInfo.actor }}</span>
      <co-tag-map :name="actorInfo.tag" />
      <div class="updateSign" @click="updateName">{{ $t('address.detail.dialog.updateNames')[actorInfo.tag.is_valid ? 0 : 1] }}</div>
    </div>
    <miner-overview />
    <chart-container />
    <account-overview />
    <client-only>
      <div class="block-list-con top-16">
        <co-tab :labels="$t('address.radio')" @click="changeRadio" />
        <message-list v-if="activeRadio === 0" :address="$route.query.address" :subAddress="subAddress" showExtra showSelect type="address" :withType="false" />
        <co-block-list v-else-if="activeRadio === 1" />
        <co-transfer-list v-else />
      </div>
    </client-only>

    <el-dialog :title="$t('address.detail.dialog.title')" :visible.sync="nameVisible" width="80%" :before-close="handleClose">
      <div class="subtitle">{{ $t('address.detail.dialog.subtitle') }}</div>
      <el-form ref="form" :rules="rules" :model="form" label-width="320px">
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
import { mapGetters } from 'vuex'
import MinerOverview from '@/bu-components/address/miner-overview/index'
import ChartContainer from '@/bu-components/address/chart/index'
import AccountOverview from '@/bu-components/address/account/index'
export default {
  name: 'MinerDetail',
  components: {
    MinerOverview,
    ChartContainer,
    AccountOverview
  },
  data(vm) {
    const labels = vm.$root.$t('address.detail.dialog.labels')
    const validate = vm.$i18n.locale === 'en' ? ' can not be null' : '不能为空'
    let labelsArr = labels.map((item) => {
      return item + validate
    })
    return {
      prefix: 'address.detail',
      type: 1,
      routerAddress: '',
      activeRadio: 0, // 列表激活项
      address: '',
      subAddress: '',
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
  computed: {
    ...mapGetters('address', ['basic']),
    actorInfo() {
      return this.basic
    }
  },
  methods: {
    changeRadio(e) {
      this.activeRadio = e
    },
    updateName() {
      const { owner_address, actor } = this.actorInfo
      this.form.address_to_sign = owner_address
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
<style lang="scss">
.top-con {
  .miner-top {
    padding: 20px;
    font-size: 16px;
    font-weight: 400;
    background-color: var(--content-bg-color);
    .updateSign {
      font-size: var(--font-16);
      padding-left: 8px;
      color: orange;
      cursor: pointer;
    }
  }
}
</style>
