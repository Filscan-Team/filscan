<template>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            hide-on-single-page
            :layout="layout"
            :total="total"
            class="cm-page"
    ></el-pagination>
</template>
<script>
    export default {
        name: "CmPage",
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            layout: {
                type: String,
                default: "prev, pager, next"
            },
            pageSize: {
                type: Number,
                default: 25
            }
        },
        methods: {
            handleSizeChange(size) {
                this.$emit("size-change", size)
            },
            handleCurrentChange(num) {
                this.$emit("page-change", num)
            }
        }
    }
</script>
<style lang="scss" scoped>

    @mixin share-style($height) {
        height: $height !important;
        line-height: $height !important;
        font-size: 12px !important;
        background: var(--board-bg-color) !important;
        color: var(--main-text-color) !important;
    }
    .cm-page {
        height: 89px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0px !important;
        //background: var(--board-bg-color);
        & ::v-deep .el-pagination__jump,
        & ::v-deep button,
        & ::v-deep .el-pager li {
            @include share-style(30px);
            min-width: 50px !important;
            padding: 0 12px;
            &.number {
              font-size: 21px !important;
              font-weight: lighter !important;
              color: var(--main-text-color) !important;
            }
            &.active {
              color: var(--ticket-block-bg-color) !important;
              font-weight: bold !important;
            }
            &.el-icon {
              font-size: 21px !important;
              font-weight: lighter !important;
              color: var(--main-text-color) !important;
            }
        }
        & ::v-deep button i {
            font-size: 12px !important;
        }
        & ::v-deep input {
            @include share-style(20px);
            height: 33px;
            min-width: 30px !important;
        }
    }
</style>
