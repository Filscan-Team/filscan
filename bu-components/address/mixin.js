import dayjs from "dayjs"
const mixin = {
  data(vm){
    const formatter = v => this.unitConversion(v, 2)
    const formatterTime = v => dayjs.unix(v).format("YYYY-MM-DD HH:mm")
    return {
      prefix: "address.detail",
      accountRows: [
        {
          key: "address",
          type: 'link',
          target: "tipset/address-detail",
          ellipsis: true
        },
        {
          key: "actor",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "type"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "message_count"
        },
        {
          key: "nonce"
        },
        {
          key: "code"
        },
        {
          key: "create_time",
          formatter: formatterTime
        },
        {
          key: "last_timestamp",
          formatter: formatterTime
        },
        {
          key: "signer_addr",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        }
      ],
      ownerRows: [
        {
          key: "address",
          type: 'link',
          target: "tipset/address-detail",
          tags: true,
          ellipsis: true,
        },
        {
          key: "actor"
        },
        {
          key: "type"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "message_count"
        },
        {
          key: "nonce"
        },
        {
          key: "code"
        },
        {
          key: "create_time",
          formatter: formatterTime
        },
        {
          key: "last_timestamp",
          formatter: formatterTime
        },
        {
          key: "miners",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "active_miners",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "signer_addr",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        }
      ],
      minerRows: [
        {
          key: "actor"
        },
        {
          key: "type"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "owner",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "peer_id",
          class: "no-border",
          type: 'link',
          target: "more/peer"
        },
        {
          key: "power",
          formatter,
          class: "top-20"
        },
        {
          key: "quality_adjust_power",
          formatter
        },
        {
          key: "sector_size",
          formatter
        },
        {
          key: "sector_count"
        },
        {
          key: "proving_sector_count"
        },
        {
          key: "fault_sector_count",
          class: "no-border"
        },
        {
          key: "code",
          class: "top-20"
        },
        {
          key: "nonce"
        }
      ],
      multisigRows:[
        {
          key: "actor",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "type"
        },
        {
          key: "address",
          type: 'link',
          target: "tipset/address-detail"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "available_balance",
          unit: "FIL"
        },
        {
          key: "initial_balance",
          unit: "FIL"
        },
        {
          key: "unlock",
          formatter(v){
            return formatterTime(v[0]) + " to " + formatterTime(v[1])
          }
        },
        {
          key: "locking_balance",
        },
        {
          key: "singers",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address",
          ellipsis: true,
        },
        {
          key: "approvals_threshold",
        },
        {
          key: "message_count"
        },
        {
          key: "nonce"
        },
        {
          key: "code"
        },
        {
          key: "create_time",
          formatter: formatterTime
        },
        {
          key: "last_timestamp",
          formatter: formatterTime
        }
      ],
      ownerToMultisigRows:[
        {
          key: "actor",
          type: 'link',
          target: "tipset/address-detail"
        },
        {
          key: "type"
        },
        {
          key: "address",
          type: 'link',
          target: "tipset/address-detail"
        },
        {
          key: "balance",
          unit: "FIL"
        },
        {
          key: "available_balance",
          unit: "FIL"
        },
        {
          key: "initial_balance",
          unit: "FIL"
        },
        {
          key: "unlock",
          formatter(v){
            return formatterTime(v[0]) + " to " + formatterTime(v[1])
          }
        },
        {
          key: "locking_balance",
        },
        {
          key: "singers",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address",
          ellipsis: true,
        },
        {
          key: "approvals_threshold",
        },
        {
          key: "message_count"
        },
        {
          key: "nonce"
        },
        {
          key: "code"
        },
        {
          key: "create_time",
          formatter: formatterTime
        },
        {
          key: "last_timestamp",
          formatter: formatterTime
        },
        {
          key: "miners",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        },
        {
          key: "active_miners",
          type: 'link',
          target: "tipset/address-detail",
          paramKey: "address"
        }
      ],
    }
  },
  methods: {
    getActorLabelByType(type) {
      const types = this.$t("address.type")
      let typeKey = {
        0: "verifiedRegister",
        1: "account",
        2: "owner",
        3: "miner",
        4: "system",
        5: "init",
        6: "cron",
        7: "power",
        8: "market",
        9: "payment",
        10: "multisig",
        11: "reward",
        210: 'multisig'
      }[type]
      return types[typeKey]
    },
    getActorRowsByType(type){
      const rows = {
        0: this.accountRows,
        1: this.accountRows,
        2: this.ownerRows,
        3: this.minerRows,
        4: this.accountRows,
        5: this.accountRows,
        6: this.accountRows,
        7: this.accountRows,
        8: this.accountRows,
        9: this.accountRows,
        10: this.multisigRows,
        11: this.accountRows,
        210: this.ownerToMultisigRows
      }
      return rows[type]
    },
    getRowLabelsByType(type){
      const dataLabel = {
        0: this.tr("overview"),
        1: this.tr("overview"),
        2: this.tr("owner"),
        3: this.tr("storageMiner"),
        4: this.tr("overview"),
        5: this.tr("overview"),
        6: this.tr("overview"),
        7: this.tr("overview"),
        8: this.tr("overview"),
        9: this.tr("overview"),
        10: this.tr("multisig"),
        11: this.tr("overview"),
        210: this.tr('OwnerToMultisig'),
      }
      return dataLabel[type || 1]
    }
    
  }
}
export default mixin
