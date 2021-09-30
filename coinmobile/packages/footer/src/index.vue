<template>
    <div class="cm-footer">
        <div class="logo">
            <img src="@/assets/logo.png" class="tool-img" />
            <span>{{ $t("header.title") }}</span>
        </div>
        <div class="detail">{{$t('footer.detail')}}</div>
        <div class="ipfs">
            <div class="img"></div>
            <div class="title">{{$t('footer.ipfs')}}</div>
        </div>
<!--        <div class="bottom">-->
<!--            <p>版权所有 &#169 Filecoin开发补助计划</p>-->
<!--            <p>遵循 <a href="https://www.mit-license.org/" target="_blank"> MIT</a> 和 <a href="https://www.apache.org/licenses/LICENSE-2.0.html" target="_blank">Apache 2.0</a> 版权协议. <a href="https://ipfser.org" target="_blank"> 原力区</a> 技术支持</p>-->
<!--        </div>-->
        <div class="copyright" v-html="$t('footer.copyright')"></div>
    </div>
</template>

<script >
export default {
    name: "CmFooter",
}
</script>
<style lang="scss">
.cm-footer{
   display: flex;
   flex-direction: column;
   //height: 486px;
   background: var(--white);
	padding-top: 16px;
	border-top: 16px solid #f8f8f8;
    .logo {
        height: 100%;
        display: flex;
        align-items: center;
        //line-height: 100px;
        color: #0090FF; // 颜色harding code，因为pc与手机端相反
        padding: 0 30px;
        .tool-img {
            width: 42px;
            height: 42px;
            &.search-icon {
                width: 60px;
                height: 60px;
            }
            &.more {
                height: 32px;
                margin-left: 22px;
            }
            &.close {
                margin-left: 22px;
            }
        }
        span {
            font-size: 32px;
            margin-left: 10px;
            color: #0090FF; // 颜色harding code，因为pc与手机端相反
            font-weight: 600;
        }
    }
    .detail{
        padding: 20px 30px 15px 30px;
        font-size: 20px;
        line-height: 28px;
        white-space:pre-wrap;
    }
    .ipfs{
        .img{
            width: 144px;
            height: 144px;
            background: url("../../../../assets/image/ipfs.png");
            background-size: 100% 100%;
            margin: 5px auto;
        }
        .title {
          font-size: 18px;
          font-weight: 400;
        }
        div{
            text-align: center;
        }
    }
    .copyright{
        padding: 0px 20px 20px;
        text-align: center;
        white-space: pre-wrap;
        word-break: break-all;
      font-size: 18px;
    }
}
</style>
