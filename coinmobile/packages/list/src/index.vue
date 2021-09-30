<template>
    <div class="cm-list" type="flex">
        <div
            v-for="item in realList"
            :key="item.title"
            class="list-item"
        >
            <div class="title">{{ item.title }}</div>
            <div class="label">
                    <span v-if="item.isLink&& item.value=='N/A'">{{item.value}}</span>
                    <co-link
                            :target="item.target"
                            :param="{
                  key: item.paramKey || item.key,
                  value: item.value
                }"
                            :underline="item.underline"
                            v-if="item.isLink && !item.isComponent && item.value!=='N/A'"
                            :label="
                  `${ellipsisByLength(item.value, 8, item.ellipsis)} ${item.unit || ''}`
                "
                    ></co-link>
                    <span v-if="!item.isLink && !item.isComponent">{{
                `${
                  item.formatter ? item.formatter(item.value, item) : item.value || ""
                } ${item.unit ? item.unit : ""}`
              }}</span>
                <el-popover trigger="hover" placement="top" v-if="item.popover && item.flag">
                    <p>{{item.popover}}</p>
                    <span slot="reference" class="name-wrapper">
                  <img src="../../../../assets/image/dsn/select.png" style="width: 12px;height: 12px;"/>
                </span>
                </el-popover>
                <cm-tag-miner :name="dataSource.tag" v-if="item.tag&&dataSource.tag&&dataSource.tag.tag_cn!==''"></cm-tag-miner>
                <component :is="item.value" v-if="item.isComponent" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CmList",
        props: {
            dataSource: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            columns: {
                type: Array,
                default: () => {
                    return []
                }
            },
            span: {
                type: Number,
                default: 0
            }
        },
        computed: {
            realList() {
                const { flag } = this.dataSource
                return this.columns.map(item => {
                    if(item.hasOwnProperty('flag')){
                        item.flag = flag
                    }
                    return {
                        ...item,
                        value: this.dataSource[item.key]
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.cm-list {
    margin: 20px;
    padding: 20px 30px 20px;
    border-radius: 4px;
    border: 1px solid var(--border-line);
    .list-item{
        display: flex;
        flex-direction: row;
        margin-bottom: 15px;
        .title{
            height: 33px;
            line-height: 33px;
            font-size: 24px;
            font-weight: 400;
           width: 40%;
        }
        .label{
            height: 33px;
            display: flex;
            font-size: 24px;
            font-weight: 400;
            width: 60%;
            justify-content: flex-end;
        }
    }
    span {
        word-break: break-all;
        /*color: var(--total-board-bottom-color);*/
    }
}
</style>
