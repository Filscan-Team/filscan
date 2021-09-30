<template>
  <el-dialog
    :visible="show"
    @close="handleClose"
    width="64vw"
    :title="tr('title')"
    center
    :show-close="false"
    custom-class="claim-account"
  >
    <div class="font-16 font-500 bottom-20">{{ tr("subTitle") }}</div>
    <el-form
      :model="tagForm"
      :rules="rules"
      ref="tagForm"
      :label-width="pxTovw(isEn ? 200 : 120)"
    >
      <el-form-item :label="tr('owner.label')" prop="owner">
        <el-input
          v-model="tagForm.owner"
          :placeholder="tr('owner.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('en.label')" prop="en">
        <el-input
          v-model="tagForm.en"
          :placeholder="tr('en.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('nameEn.label')" prop="nameEn">
        <el-input
          v-model="tagForm.nameEn"
          :placeholder="tr('nameEn.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('zh.label')" prop="zh">
        <el-input
          v-model="tagForm.zh"
          :placeholder="tr('zh.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('nameZh.label')" prop="nameZh">
        <el-input
          v-model="tagForm.nameZh"
          :placeholder="tr('nameZh.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('contact.label')" prop="contact">
        <el-input
          v-model="tagForm.contact"
          :placeholder="tr('contact.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('message.label')" prop="message">
        <el-input
          v-model="tagForm.message"
          type="text-area"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item :label="tr('signcode.label')" prop="signcode">
        <div class="flex sign-code">
          <el-input
            v-model="tagForm.signcode"
            :placeholder="tr('owner.placeholder')"
            disabled
          ></el-input>
          <span
            class="iconfont icon-copy left-20 bg-board pointer copy"
            @click="handleCopy"
          ></span>
        </div>
      </el-form-item>
      <el-form-item :label="tr('signature.label')" prop="signature">
        <el-input
          v-model="tagForm.signature"
          :placeholder="tr('signature.placeholder')"
        ></el-input>
      </el-form-item>
    </el-form>
    <div
      class="submit font-16 font-500 flex jus-center align-center pointer"
      @click="submit"
    >
      {{ tr("submit") }}
    </div>
    <div class="tips font-14 text-center">{{ tr("tips") }}</div>
  </el-dialog>
</template>
<script>
export default {
  name: "",
  data(vm) {
    return {
      prefix: "address.detail.claim",
      tagForm: {
        owner: "",
        en: "",
        nameEn: "",
        zh: "",
        nameZh: "",
        contact: "",
        message: "bxcjwjcbh",
        signcode:
          "lotus wallet sign t3q7b7wvlxs6klqjccmcnvhxvyf3wzylmamkhoisa32mjxpd32q26xaq6n6s3jxz5uii7prq54wbj3tyipaqaq 5369676e617475726520666f722066696c666f780a7430323330330a323032302d30382d32355430383a34343a35332e3432375a",
        signature: ""
      },
      rules: {
        en: [
          {
            required: true,
            message: vm.$t("address.detail.claim.en.error")
          }
        ],
        contact: [
          {
            required: true,
            message: vm.$t("address.detail.claim.contact.error")
          }
        ],
        signature: [
          {
            required: true,
            message: vm.$t("address.detail.claim.signature.error")
          }
        ]
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      this.$emit("hide")
    },
    submit() {
      this.$refs.tagForm.validate(valid => {
        if (valid) {
          console.log("object")
        }
      })
    },
    handleCopy() {
      this.$copyText("xnsnsxjxs").then(
        () => {
          this.$message({
            type: "success",
            message: "copy success"
          })
        },
        () => {
          this.$message({
            type: "error",
            message: "copy failed"
          })
        }
      )
    }
  }
}
</script>
<style lang="scss">
.el-dialog.claim-account {
  & > div {
    background: var(--board-item-bg-color);
    & > span,
    label,
    div {
      color: var(--main-text-color) !important;
    }
    .el-form-item__error {
      color: #f56c6c !important;
    }
  }
  .el-dialog__header {
    padding-top: 25px !important;
  }
  .el-dialog__body {
    .el-form .el-form-item {
      .el-form-item__label {
        padding-right: 20px;
      }
      input {
        background: var(--board-bg-color) !important;
        border: none;
        height: 40px;
        font-size: 14px;
      }
    }
  }
  .sign-code {
    .copy {
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 4px;
      text-align: center;
      line-height: 40px;
      font-size: 24px;
    }
  }
  .tips {
    white-space: pre-line;
    line-height: 20px;
  }
  .submit {
    margin: 30px auto;
    background: var(--force-mark-color);
    width: 135px;
    height: 36px;
    border-radius: 18px;
    &:hover {
      filter: brightness(1.1);
    }
  }
}
</style>
