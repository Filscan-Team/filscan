<template>
    <div class="transfer">
        <div class="transfer-heading">
            <div class="transfer-logo"></div>
            <div class="transfer-title">全网数据指标</div>
        </div>
        <div class="transfer-list flex align-center bottom-20">
        </div>
    </div>
</template>

<script>
    export default {
        name: "CmBigTransfer",
    }
</script>

<style lang="scss">
    .transfer{
        .transfer-heading{
            display: flex;
            flex-direction: row;
            margin: 20px 30px;
            .meta-logo{
                height: 24px;
                width: 23px;
                background: url("../../../../assets/image/mobile/index@2x.png");
                background-size: 100% 100%;
            }
            .meta-title{
                height: 33px;
                line-height: 33px;
                font-size: 24px;
                font-weight: 400;
                margin-left: 12px;
            }
        }
    }
</style>