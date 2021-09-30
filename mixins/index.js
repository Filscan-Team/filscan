import dayjs from 'dayjs'
import light from '../chart/theme/light'
import dark from '../chart/theme/dark'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import {formatFilNum, formatFile, getRadomNum, md5, hmac, encrypt, decrypt,
    setCookie, getCookie, clearCookie, cookieSet, cookieGet, cookieDelete } from '../utils'
import {mapGetters} from 'vuex'

dayjs.extend(advancedFormat)
const mixin = {
    computed: {
        ...mapGetters('app', ['defaultHeight', 'rate', 'minerNameMap', 'loadCount', 'theme', 'messageMethods']),
        atIndex() {
            let boolean = ['/', '/home'].includes(this.$route.path)
            return boolean
        },
        latestBlockHeight() {
            return this.$store.state.app.loadCount
        },
        isMobile() {
            if (process.browser) {
                return window.innerWidth < 768
            }
        },
        isMac(){
            if (process.browser) {
                return window.innerWidth <= 1680
            }
        },
        fontSize(){
           return  (window.innerWidth <= 1680? 12:12)* this.rate
        },
        routeName() {
            return this.$t('routeName')[this.$route.name]
        },
        chartTheme() {
            return this.theme === 'dark' ? dark : light
        },
        now() {
            return dayjs().unix()
        },
        rate() {
            return this.isMobile ? 1 : this.$store.state.app.rate
        },
        formatString() {
            return this.$i18n.locale === 'en' ? 'MMM Do YYYY HH:mm' : 'YYYY-MM-DD HH:mm'
        },
        isEn() {
            return this.$i18n.locale === 'en'
        },
        methodResMap() {
            return {
                '-1': this.isEn ? 'flying' : '打包中',
                0: 'Ok',
                1: 'SysErrSenderInvalid',
                2: 'SysErrSenderStateInvalid',
                3: 'SysErrInvalidMethod',
                4: 'SysErrInvalidParameters',
                5: 'SysErrInvalidReceiver',
                6: 'SysErrInsufficientFunds',
                7: 'SysErrOutOfGas',
                8: 'SysErrForbidden',
                9: 'SysErrorIllegalActor',
                10: 'SysErrorIllegalArgument',
                11: 'SysErrSerialization',
                12: 'SysErrorReserved3',
                13: 'SysErrorReserved4',
                14: 'SysErrorReserved5',
                15: 'SysErrorReserved6',
                16: 'ErrIllegalArgument',
                17: 'ErrIllegalArgument',
                18: 'ErrNotFound',
                19: 'ErrForbidden',
                20: 'ErrInsufficientFunds',
                21: 'ErrIllegalState',
                22: 'ErrSerialization',
                32: 'FirstActorSpecificExitCode'
            }
        }
    },
    methods: {
        md5,
        hmac,
        getRadomNum,
        encrypt,
        decrypt,
        setCookie,
        getCookie,
        clearCookie,
        cookieSet,
        cookieGet,
        cookieDelete,
        getError(key) {
            return this.$t(`account.error.${key}`)
        },
        getErrorStatus(code) {
            let message = code<16? this.$t('apiStatus')[code].message: ''
            this.$message({
                showClose: true,
                message: message,
                type: "error"
            });
            return
        },
        formatFile,
        formatFilNum,
        goTo(name = '/', {params, query} = {}) {
            this.$router.push({
                name,
                params,
                query
            })
        },
        nuxtTo(url) {
            this.$router.push(url)
        },
        formatNumber(v, len = 5) {
            return Number(v).toLocaleString('en', {maximumFractionDigits: len})
        },
        formatFilUnit(str, leng=2){
            if(str==="0") return "0"
            let arr = this.formatFilNum(str, true).split(" ")
            let res = Number(arr[0]).toFixed(leng) + " " + arr[1]
            return  res
        },
        parseFormatNumber(v) {
            return typeof v === 'number' ? v : Number(v.replace(/,/g, ''))
        },
        formatDateTime(time, str) {
            return dayjs(time * 1000).format(str || 'YYYY-MM-DD HH:mm:ss')
        },
        formatTime(from, to, ago = true) {
            const current = new Date(to || new Date()).getTime()
            let interval = Math.abs(current / 1000 - from)
            const isEn = this.$i18n.locale === 'en'
            const secUnit = 1
            const minUnit = 60
            const hrUnit = 60 * 60
            const dayUnit = 24 * hrUnit
            const arr = []
            const unit = [dayUnit, hrUnit, minUnit, secUnit]
            const suffix = this.$t('mixin.formatTime.suffix')
            let n = 0
            while (n < 4) {
                arr.push(Math.floor(interval / unit[n]))
                interval = interval - unit[n] * arr[n]
                n++
            }
            const strMap = arr
                .map((item, index) => {
                    return `${item}${suffix[index]}${item > 1 && index !== 3 ? (isEn ? 's' : '') : ''}`
                })
                .filter((item) => {
                    return item[0] !== '0'
                })
                .slice(0, 2)
            return strMap.join(' ') + (ago ? (this.$t('mixin.formatTime.before')) : '')
        },
        remainTime(num){
            const suffix = this.$t('mixin.formatTime.suffix')
            let hourNum = 0
            let dayNum = 0
            let minNum = 0
            let str = ''
            let hour = num/60
            if(num===0 || hour<1){
                minNum = num
                str = num===0? 0: num + suffix[2]
            }else if(hour>1&&hour<24){
                hourNum = Math.floor(num/60)
                minNum = num - hourNum*60
                str = hourNum + suffix[1] + minNum + suffix[2]
            }else {
                dayNum = Math.floor(num/60/24)
                hourNum =  Math.floor(num/60 - dayNum*24)
                minNum = num - dayNum*60*24 - hourNum*60
                str = dayNum + suffix[0] +hourNum + suffix[1] + minNum + suffix[2]
            }
            return str
        },
        formatHours(h) {
            const day = Math.floor(h / 24)
            const hours = h % 24
            return day == 0 ? `${hours}${['小时', 'hours'][Number(this.isEn)]}` : `${day}${['天', 'day'][Number(this.isEn)]} ${hours}${['小时', 'hours'][Number(this.isEn)]}`
        },
        formatFloat(v, l = 9) {
            const [int, dot] = Number(v)
                .toString()
                .split('.')
            let length
            if (dot) {
                length = Math.max(0, l - int.length)
            }
            return Number(`${int}.${dot.slice(0, length)}`).toLocaleString()
        },
        ellipsisByLength(str = '', length = 6, flag = true) {
            let val = "";
            if (str instanceof Array) {
                if (str.length > 1) {
                    val = str[0].length > 2 * length && flag ? `${str[0].slice(0, length)}...${str[0].slice(-(length))}` : str[0]
                } else {
                    val = ""
                }
            } else {
                val = str.length > 2 * length && flag ? `${str.slice(0, length)}...${str.slice(-length)}` : str
            }
            return val
        },
        getFormatTime(time) {
            const formatStr = this.isEn ? 'MMM Do YYYY, HH:mm:ss (UTCZ)' : 'YYYY年MM月DD日 HH:mm:ss (UTCZ)'
            return dayjs(time * 1000).format(formatStr)
        },
        getTimeBySelectorType(type) {
            return [
                ['YYYY-MM-DD HH:mm (UTCZ)', 'YYYY-MM-DD HH:mm (UTCZ)'],
                ['YYYY-MM-DD, HH:mm (UTCZ)', 'YYYY-MM-DD, HH:mm (UTCZ)']
            ][Number(this.isEn)][Number(type == '24h')]
        },
        formatTimeByStr(time, str) {
            return dayjs(time).format(str || 'MMM Do YYYY')
        },
        formatFil(value, num = 3) {
            let len = typeof value == 'undefined' ? 0 : value.length
            value = Number(value)
            if (value === 0) {
                return '0'
            } else {
                return len < 15 ? `${value.toFixed(3)} FIL` : `${(value / Math.pow(10, 18)).toFixed(num).toLocaleString()} FIL`
            }
        },
        formatFilToNumber(value, num){
            if (Number(value) === 0) {
                return '0'
            }
            let res = this.formatFil(value, num)
            let arr = res.split(' ')
            return this.formatNumber(arr[0]) + ' ' + arr[1]
        },
        formatFilNumber(value) {
            value = Number(value)
            if (value === 0) {
                return '0'
            } else {
                return value >= 0.00001 ? `${value.toFixed(3)} FIL` : `${(value * Math.pow(10, 18)).toLocaleString()} AttoFIL`
            }
        },
        unitConversion(item, len) {
            let positive = true
            if (item == 0) {
                return '0 Bytes'
            }
            if (item < 0) {
                positive = false
                item = Math.abs(item)
            }
            let k = 1024
            let sizes = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
            let c = Math.floor(Math.log(item) / Math.log(k))
            if (c < 0) {
                item = 0
            } else {
                item = (item / Math.pow(k, c)).toFixed(len) + ' ' + sizes[c]
            }

            return positive ? item : `-${item}`
        },
        sureunitConversion(item, len, c) {
            let sizes = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
            let positive = true
            if (item == 0) {
                return '0 Bytes'
            }
            if (item < 0) {
                positive = false
                item = Math.abs(item)
            }
            let k = 1024
            // let c = Math.floor(Math.log(item) / Math.log(k))
            if (c < 0) {
                item = 0
            } else {
                let tmp = item / Math.pow(k, c)
                len = tmp > 1 ? 0: 2
                item = (item / Math.pow(k, c)).toFixed(len) + ' ' + sizes[c]
            }
            return positive ? item : `-${item}`
        },
        numberConversion(num, len) {
            if (num < 1) {
                return num
            }
            let k = 1000
            let units = ['', 'K', 'M', 'B']
            let c = Math.floor(Math.log(num) / Math.log(k))
            num = (num / Math.pow(k, c)).toFixed(len) + ' ' + units[c]
            return num
        },
        tr(str, data) {
            let res = this.$t(`${this.prefix}.${str}`, data)
            return res
        },
        pxTovw(px) {
            return (100 * px) / 1920 + 'vw'
        },
        getTimeFromSelector(v) {
            let time_diff, repeate_time, time_start, format
            const now = dayjs()
            const isEn = this.isEn
            switch (v) {
                case '24h':
                    time_diff = 3600
                    repeate_time = 24
                    time_start = now.subtract(24, 'hour')
                    format = isEn ? 'MMM Do HH:mm' : 'MM-DD HH:mm'
                    break
                case '1w':
                    time_diff = 3600 * 24
                    repeate_time = 7
                    time_start = now.subtract(7, 'day')
                    format = isEn ? 'MMM Do' : 'MM-DD'
                    break
                case '1m':
                    time_diff = 3600 * 24
                    repeate_time = 30
                    time_start = now.subtract(30, 'day')
                    format = isEn ? 'MMM Do YYYY' : 'YYYY-MM-DD'
                    break
                case '6m':
                    time_diff = 3600 * 24
                    repeate_time = 182
                    time_start = now.subtract(6, 'mon')
                    format = isEn ? 'MMM Do YYYY' : 'YYYY-MM-DD'
                    break
                case '1y':
                    time_diff = 3600 * 24
                    repeate_time = 365
                    time_start = now.subtract(1, 'year')
                    format = isEn ? 'MMM Do YYYY' : 'YYYY-MM-DD'
                    break

                case 'all':
                    time_diff = 3600 * 24
                    repeate_time = 365
                    time_start = 0
                    format = isEn ? 'MMM Do YYYY' : 'YYYY-MM-DD'
                    break
            }
            return {
                time_start: time_start === 0 ? 0 : dayjs(time_start).unix(),
                time_diff,
                repeate_time,
                format,
                type: v
            }
        },
        formatMinerName(v) {
            const len = this.isEn ? 18 : 18
            return v.length > len ? v.slice(0, len) + '...' : v
        },
        getChartInterval(type = '24h') {
            return this.$t('chartIntervalMap')[type]
        },
        sizes(pc, mb) {
            return (this.isMobile ? mb : pc) * this.rate
        }
    },
    filters: {
        formatNumber(v) {
            return this.formatNumber(v)
        },
        formatFil(v) {
            return v / Math.pow(10, 18)
        }
    }
}
export default mixin