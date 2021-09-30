<template>
    <div class="coNavTitle">
       {{title}}
        <el-popover
                placement="bottom-start"
                width="200"
                trigger="hover"
                :content="tips"
                v-if="tips!==''"
        >
            <i
                    class="el-icon-warning-outline"
                    slot="reference"
                    style="margin-left:3px"
            ></i>
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: "CoNavTitle",
        props: {
            title: {
                type: String,
                default: ''
            },
            tips: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .coNavTitle{
        height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 20px;
        white-space: nowrap;
        line-height: 22px;
        font-size: var(--font-18);
        font-weight: 400;
    }
</style>