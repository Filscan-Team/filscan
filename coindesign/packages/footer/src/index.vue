<template>
    <div class="footer">
        <div class="footer-content">
            <div class="title">
                <img src="../../../../assets/logo.png" alt />
                <span>Filscan</span>
            </div>
            <div class="contact gray font-14">
                <div class="detail">{{$t('footer.detail')}}</div>
                <div class="email">
                    <span>{{ $t("footer.contact") }}</span>
                    <span class="iconfont icon-youxiang "></span>
                    <a href="mailto:filscan@ipfsforce.com">filscan@163.com</a>
                </div>
            </div>
        </div>
        <div class="footer-btm">
            <div class="copyright" v-html="$t('footer.copyright')"></div>
        </div>
    </div>
</template>
<script>
    import Map from "./map.vue"
    export default {
        name: "CoFooter",
        components: {
            Map
        }
    }
</script>
<style lang="scss">
    .qr-code {
        padding: 0 !important;
    }
</style>
<style lang="scss" scoped>
.footer {
    color: #ffffff;
    overflow: hidden;
    background: #122639;
    width: 100%;
    .footer-content{
        width: var(--main-width);
        margin: 0 auto;
        .title {
            font-size: 40px;
            margin: 33px 0 20px 0;
            display: flex;
            align-items: center;
            span{
                height: 45px;
                line-height: 45px;
                color: #0090FF;
                font-family: PingFangSC, PingFangSC-Semibold;
                font-weight: 600;
            }
        }
        .contact {
            height: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 30px;
            color: #ffffff;
            font-size: var(--font-16);
            span {
                margin-right: 5px;
            }
            .detail{
                width: 80%;
                white-space: normal;
            }
            .email{
                a{
                    color: #ffffff;
                }
            }
        }
    }
    .footer-btm{
        display: flex;
        width: 100%;
        .copyright {
            width: 100%;
            font-size: var(--font-16);
            height: 68px;
            line-height: 68px;
            color: #ffffff;
            border-top: 1px solid #ffffff;
            text-align: center;
            & ::v-deep a {
                color: var(--link-color);
            }
        }
    }
    img {
        width: 50px;
        margin-right: 20px;
    }
    .links-con {
        display: flex;
        position: relative;
        padding-bottom: 20px;
        .left {
            flex: 1;
            display: flex;
            z-index: 2;
            & > div {
                margin-right: 100px;
                .link-title {
                    font-size: 22px;
                }
                span {
                    font-size: var(--font-16);
                }
                span:nth-child(2) {
                    margin-left: 10px;
                    color: var(--text-gray-color);
                }
            }
            .qrCode{
                img{
                    width: 100px;
                    height: 100px;
                }
            }
            .link-label {
                color: #ffffff;
                display: flex;
                align-items: center;
                a {
                    color: var(--text-gray-color);
                    cursor: pointer;
                }
                & > span:first-child {
                    font-size: var(--font-16);
                }
            }
            & > div:nth-child(1) {
                a {
                    margin-left: 10px;
                }
            }
        }
        .right {
            position: absolute;
            top: -100px;
            right: 0;
            width: 800px;
            height: 300px;
            background: var(--board-bg-color);
        }
    }

    .node-map ::v-deep .chart-con {
        height: 100%;
    }
}
</style>
