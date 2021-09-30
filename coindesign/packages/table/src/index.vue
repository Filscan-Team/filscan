<template>
    <div class="base-table">
        <slot name="header"></slot>
        <el-table
                :data="dataSource"
                :stripe="false"
                @sort-change="handleSortChange"
                @header-click="handleHeaderClick"
                v-bind="$attrs"
                v-loading="showLoading"
                :span-method="spanMethod"
                header-row-class-name="header-row"
                element-loading-background="transparent"
                :class="{ radius: radius, mini: atIndex }"
                :size="atIndex ? 'mini' : ''"
                :row-class-name="getRowClass"
                :cell-class-name="getCellClass"
                :default-sort="defaultSort"
                @cell-mouse-enter="handleHover"
                @cell-mouse-leave="handleMouseOut"
                :empty-text="emptyText"
        >
            <el-table-column v-if="expand" type="expand">
                <template slot-scope="props">
                    <overview :dataList="props.row.dataList" :dataLabel="props.row.dataLabel" :stripe="false" />
                </template>
            </el-table-column>
            <el-table-column
                    :label="item.label"
                    v-for="(item, index) in columnsWithLabel"
                    :key="item.key"
                    :sortable="item.sortable ? 'custom' : false"
                    :prop="item.key"
                    :align="item.align || 'center'"
                    :fixed="isMobile && index === 0"
                    :width="item.width"
            >
                <template slot-scope="scope">
                    <span v-if="item.type === 'link' && scope.row[item.key] == 'N/A'">{{ scope.row[item.key] }}</span>
                    <co-link
                            :target="scope.row.target || item.target"
                            :param="{
              key: item.paramKey || item.key,
              value: scope.row[item.key]
            }"
                            :underline="item.underline"
                            v-else-if="item.type === 'link' && scope.row[item.key] !== 'N/A'"
                            :label="`${ellipsisByLength(scope.row[item.key], 6, item.ellipsis)} ${item.unit || ''}`"
                    >
                    </co-link>
                    <span class="till" v-else-if="item.key === 'till'">
            <div class="till-img"></div>
          </span>
                    <div v-else-if="item.key === 'tag'" class="tags">
                        <co-name-map :id="scope.row[item.id]"></co-name-map>
                    </div>
                    <div v-else-if="item.key === 'tags'" class="tag">
                        <co-tag-miner :name="scope.row['tag']"></co-tag-miner>
                    </div>
                    <div v-else-if="item.key === 'pool_tag'" class="pool_tag">
                        <co-pool-name
                                :name="scope.row['tag']"
                                :columns="{
                target: 'tipset/pool-detail',
                key: 'address',
                id: scope.row[item.id]
              }"
                        >
                        </co-pool-name>
                    </div>
                    <div v-else-if="item.key === 'pool_name'" class="pool_tag"  @click="poolClick(scope.row)">
                        <!--            <div>{{scope.row}}</div>-->
                        <co-link
                                target="forcepool/force-list"
                                :param="{
                   key: 'id',
                   value: scope.row['id']
                }"
                                :label="scope.row['name']"
                        >
                        </co-link>
                    </div>
                    <div v-else-if="item.key === 'notice'" class="notice" @click="noticeClick(scope.row)"></div>
                    <div class="rank" v-else-if="item.key === 'rank'">
            <div v-if="scope.row[item.key] == 1" class="champion"></div>
            <div v-else-if="scope.row[item.key] == 2" class="runup"></div>
            <div v-else-if="scope.row[item.key] == 3" class="thirdrun"></div>
            <div v-else>{{ scope.row[item.key] }}</div>
          </div>
                    <component :is="scope.row[item.key]" v-else-if="item.type == 'component'" />
                    <span v-else class="other">
            <span class="progress" v-if="item.progress">
              <span class="mask" :style="{ left: scope.row.progress || 0 }"></span>
            </span>
            <span class="other-value" :class="item.key==='estimated_time'&&Number(scope.row[item.key])<121?'red':''">{{ `${item.formatter ? item.formatter(scope.row[item.key], scope.row) : scope.row[item.key]} ${item.unit || ''}` }}</span>
          </span>
                    <el-popover trigger="hover" placement="top" v-if="item.popover && scope.row['flag']">
                        <p>{{ item.popover }}</p>
                        <span slot="reference" class="name-wrapper" style="padding-left: 8px">
              <img src="../../../../assets/image/dsn/select.png" style="width: 12px;height: 12px;" />
            </span>
                    </el-popover>
                    <span v-if="item.rateKey" class="rate"> /{{ Number(scope.row[item.rateKey] * 100).toFixed(2) + '%' }} </span>
                </template>
                <template slot="header" slot-scope="scope">
                    <div style="display:flex;align-items: center">
                        <span class="thead-title"> {{ item.label }}</span>
                        <span v-if="item.showSort" @click="handleSortChange(item.key, scope)" class="iconfont icon-xia sort-icon" :class="[sortKey == item.key ? 'active' : '']"></span>
                        <el-tooltip class="item" effect="light" :content="item.tips" placement="top" v-if="item.tips">
                            <i class="el-icon-warning-outline"></i>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
            <!--            <el-table-column width="20"></el-table-column>-->
            <div slot="append" v-if="showAppend" class="cloumn-append" @click="$emit('click-append')">
                {{ $t('component.more') }}
            </div>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                hide-on-single-page
                :page-sizes="pageSizes"
                :page-size="pageSize"
                :layout="layout"
                :total="total"
                v-if="showPagination"
        ></el-pagination>
        <slot name="footer"></slot>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'CoTable',
        inheritAttrs: false,
        props: {
            dataSource: {
                type: Array,
                default() {
                    return []
                }
            },
            tips: {
                type: Boolean,
                default() {
                    return true
                }
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            stripe: {
                type: Boolean,
                default: true
            },
            labels: {
                type: Array,
                default() {
                    return []
                }
            },
            emptyText: {
                type: String,
                default(){
                    return "No Data"
                }
            },
            showPagination: {
                type: Boolean,
                default: false
            },
            total: {
                type: Number,
                default: 0
            },
            pageSizes: {
                type: Array,
                default() {
                    return [25, 50, 100, 200]
                }
            },
            pageSize: {
                type: Number,
                default: 25
            },
            currentPage: {
                type: Number,
                default: 1
            },
            loadMore: {
                type: Boolean,
                default: false
            },
            showAppend: {
                type: Boolean,
                default: false
            },
            showLoading: {
                type: Boolean,
                default: false
            },
            span: {
                type: Boolean,
                default: false
            },
            spanMap: {
                type: Object,
                default() {
                    return {}
                }
            },
            expand: {
                type: Boolean,
                default: false
            },
            radius: {
                type: Boolean,
                default: false
            },
            height: {
                type: Number,
                default: 0
            },
            defaultSort: {
                type: Object,
                default() {
                    return {}
                }
            },
            sortKey: {
                type: String,
                default: ''
            },
            handleHover: {
                type: Function,
                default: () => {}
            },
            handleMouseOut: {
                type: Function,
                default: () => {}
            }
        },
        computed: {
            columnsWithLabel() {
                if(this.tips) {
                    return this.columns.map((item, index) => {
                        return {
                            ...item,
                            label: this.labels[index],
                        }
                    })
                } else {
                    return this.columns.map((item, index) => {
                        return {
                            ...item,
                            ...this.labels[index]
                        }
                    })
                }
            },
            layout() {
                return this.isMobile ? 'prev, next, jumper' : 'prev, pager, next, jumper'
            },
            ...mapState('app', ['rate'])
        },
        methods: {
            ...mapActions('notice', ['setForcePoolName']),
            // renderHeaderMethods(h, { column }, item) {
            //   if (item.tips) {
            //     return h('div', [
            //       h('span', column.label),
            //       h(
            //         'el-tooltip',
            //         {
            //           props: {
            //             effect: 'light',
            //             content: item.tips,
            //             placement: 'top'
            //           }
            //         },
            //         [
            //           h('i', {
            //             class: 'el-icon-warning-outline'
            //           })
            //         ]
            //       )
            //     ])
            //   }
            //   return h('div', [h('span', column.label)])
            // },
            handleSizeChange(size) {
                this.$emit('size-change', size)
            },
            handleCurrentChange(num) {
                this.$emit('page-change', num)
            },
            handleSortChange(v) {
                this.$emit('sort-change', v)
            },
            poolClick(row){
                console.log(row)
                this.setForcePoolName(row.name)
                this.cookieSet('poolName', row.name)
                this.$emit('poolClick', row)
            },
            noticeClick(row){
                console.log(row)
                this.$emit('notice-click', row)
            },
            load() {
                if (!this.loadMore) {
                    return
                } else {
                    this.$emit('load')
                }
            },
            spanMethod({ rowIndex, columnIndex }) {
                if (!this.span) {
                    return
                }
                if (columnIndex === 0) {
                    if (Object.keys(this.spanMap).includes(rowIndex.toString())) {
                        return {
                            rowspan: this.spanMap[rowIndex],
                            colspan: 1
                        }
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            handleHeaderClick(column) {
                this.$emit('header-click', column)
            },
            getRowClass({ rowIndex }) {
                if (this.stripe) {
                    return ''
                }
                rowIndex++
                if (!this.spanMap['0']) {
                    return
                }
                let res = Object.entries(this.spanMap)
                    .sort((pre, next) => {
                        return pre[0] - next[0]
                    })
                    .map((item) => {
                        return [Number(item[0]) + 1, Number(item[0]) + item[1] + 1]
                    })
                let className = ''
                for (let i = 0; i < res.length; i++) {
                    const [left, right] = res[i]
                    if (rowIndex >= left && rowIndex < right) {
                        className = i % 2 === 0 ? 'even' : 'odd'
                        break
                    }
                }
                return className
            },
            getCellClass({ columnIndex }) {
                return columnIndex === 0 && !this.stripe ? 'column-first' : ''
            }
        }
    }
</script>
<style lang="scss" scoped>
.red{
    color: #FC3A1A;
}
.base-table {
  box-sizing: border-box;
  background: var(--content-bg-color);
  & ::v-deep .el-table.radius {
    border-radius: 8px;
  }
  & ::v-deep .el-table__header-wrapper {
    tr {
      height: 51px;
    }
  }
  & ::v-deep .el-table__body-wrapper {
    height: auto !important;
    //overflow-x: auto !important;
    tr {
      height: 51px;
    }
    .is-flex-start {
      .cell {
        justify-content: flex-start;
      }
    }
  }
  & ::v-deep .el-table {
    //padding-bottom: 20px;
    box-sizing: border-box;
    background: var(--content-bg-color) !important;
    &::before {
      height: 0 !important;
    }
    .header-row th {
      padding: 0 !important;
      background: var(--content-bg-color);
      color: var(--main-text-color);
      border-bottom-color: var(--table-header-border-color) !important;
    }
    tr {
      background: var(--content-bg-color) !important;
      &:not(.even):hover td {
        background: var(--board-item-color);
      }
      &:hover td:not(.column-first) {
        background: var(--table-row-hover-bg-color) !important;
        color: var(--table-row-hover-text-color);
        a {
          color: var(--table-row-hover-text-color);
        }
      }

                &.el-table__row--striped:hover td {
                    background: var(--table-row-hover-bg-color);
                }
                &.el-table__row--striped td {
                    background: var(--table-row-striped-bg-color) !important;
                }
                &.even {
                    background: var(--table-row-striped-bg-color) !important;
                    &:hover .column-first {
                        background: var(--table-row-striped-bg-color);
                    }
                }
                &.odd {
                    background: var(--table-row-bg-color) !important;
                    &:hover .column-first {
                        background: var(--table-row-bg-color);
                    }
                }
                /*&:hover td:last-child {*/
                /*    background: var(--table-row-bg-color) !important;*/
                /*}*/
            }
            td {
                border-bottom: 1px solid var(--table-header-border-color) !important;
                /*&:last-child {*/
                /*    border-bottom: none !important;*/
                /*}*/
                padding: 15px 0 !important;
                &.el-table__expanded-cell {
                    background: var(--board-item-color);
                }
                .cell {
                    padding: 0;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    color: var(--main-text-color);
                    font-size: var(--font-16);
                }
            }
            th {
                .cell {
                    display: flex;
                    padding: 0;
                    justify-content: center;
                    flex-direction: row;
                    div {
                        display: flex;
                        height: 40px;
                        line-height: 40px;
                        i {
                            display: flex;
                            margin-left: 4px;
                            height: 40px;
                            line-height: 40px;
                        }
                    }
                    .caret-wrapper {
                        margin-top: 4px;
                    }
                }
            }
            &.mini th,
            &.mini tr {
                height: 20px;
            }
            .sort-icon.active {
                color: var(--force-mark-color);
            }
            .el-table__body-wrapper .el-table__row {
                &:last-child {
                    td {
                        border-bottom: none !important;
                    }
                }
            }
        }
        & ::v-deep .tag {
            display: flex;
            justify-content: center;
        }
        & ::v-deep .till {
            .till-img {
                width: 14px;
                height: 14px;
                background: url('../../../../assets/image/mobile/themeright.@2x.png');
                background-size: 100% 100%;
            }
        }
        & ::v-deep .notice{
            width: 17px;
            height: 19px;
            background: url('../../../../assets/image/forcepool/monitor/marshalling@2x.png');
            background-size: 100% 100%;
        }
        & ::v-deep .rank {
            display: flex;
            justify-content: center;
            height: 22px;
            .champion {
                width: 24px;
                height: 20px;
                background-image: url('../../../../assets/image/mobile/champion.png');
                background-size: 100% 100%;
            }
            .runup {
                width: 24px;
                height: 20px;
                background-image: url('../../../../assets/image/mobile/runnerup@2x.png');
                background-size: 100% 100%;
            }
            .thirdrun {
                width: 24px;
                height: 20px;
                background-image: url('../../../../assets/image/mobile/thridrunner@2x.png');
                background-size: 100% 100%;
            }
        }
        & ::v-deep .other {
            font-size: var(--font-16);
            display: flex;
            flex-direction: row;
            justify-content: center;
            .progress {
                display: inline-block;
                background-image: url('../../../../assets/image/progress.png');
                height: 18px;
                width: 74px;
                background-size: 100% 100%;
                vertical-align: bottom;
                margin-right: 10px;
                margin-top: 3px;
                overflow: hidden;
                position: relative;
                .mask {
                    display: inline-block;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background: var(--mark-opacity);
                    opacity: 0.7;
                }
            }
            .other-value {
                display: inline-block;
                white-space: nowrap;
            }
        }
        & ::v-deep .rate {
            font-size: var(--font-16);
            display: inline-block;
            white-space: nowrap;
        }
        & ::v-deep .thead-title{
          font-size: 14px;
          font-weight: 500;
        }
        & ::v-deep .el-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 51px;
            background: var(--board-item-color);
            & * {
                color: var(--main-text-color) !important;
                &.active {
                    color: var(--force-mark-color) !important;
                }
            }
            & .el-select .el-input {
                width: 120px;
            }
            .el-pager li {
                background: var(--board-item-color);
            }
            button {
                background: var(--board-item-color) !important;
            }
            input {
                background: var(--board-item-color) !important;
            }
            .el-pagination__jump input {
                line-height: 24px;
            }
        }
        & ::v-deep .el-link.underline {
            text-decoration: underline;
        }
        .cloumn-append {
            text-align: center;
            height: 48px;
            line-height: 2;
            background: var(--board-item-color);
            color: var(--main-text-color);
            cursor: pointer;
            @media (max-width: 768px) {
                height: 30px;
                line-height: 30px;
            }
        }
    }
</style>
