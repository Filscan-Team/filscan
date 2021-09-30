import { BigNumber } from 'bignumber.js'
import crypto from 'crypto'
import NodeRSA  from 'node-rsa'
const publicKey = ''
const privateKey = ''
export function encrypt(data) {
    const nodesra = new NodeRSA(publicKey, 'pkcs8-public')
  nodesra.setOptions({encryptionScheme: 'pkcs1'})
    const encrypted = nodesra.encrypt(data, 'base64')
   return encrypted
}

export function decrypt(data){
    const nodersa = new NodeRSA(privateKey);
    nodersa.setOptions({encryptionScheme: 'pkcs1'})
    const decrypted = nodersa.decrypt(data, 'utf8');
    return decrypted;
}

export function getRadomNum(capacity){
  var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var res = "";
  for(var i = 0; i < capacity ; i ++) {
    var id = Math.ceil(Math.random()*chars.length);
    res += chars[id];
  }
  return res;
}

export function md5(str) {
  return crypto.createHash('md5').update(String(str)).digest('hex')
}

export function hmac(timestamp, encodeStr) {
  // prd
  const signSec = 'lpMcSWvdiJsgUW20wkem34F9VgiNxanX'
  const signKey = 'SO1MPieEbo9WnQoKcb4fZtxf2OgoccOY'
  // test uat
  // const signSec = 'wbMsiWlDRBrs8Q3z0KpPD1F2JQoN3Yhl'
  // const signKey = '80J4rguHU3mFK0diqmKOYS5qoNAvROok'
  let sign = `${signKey}${timestamp}${encodeStr}`
  return crypto.createHmac('sha256', signSec).update(String(md5(sign))).digest('hex')
}

function parseE(str) {
  if (!/[eE][+-]\d+$/.test(str)) {
    return str
  }
  str = String(str).toLowerCase()
  let [n, p] = str.split('e')
  let sign = p[0]
  let len = Number(p.slice(1))
  let r = ''
  if (sign === '+') {
    r = '1'
    for (let i = 0; i < len; i++) {
      r += '0'
    }
    n = n.replace('.', '')
    r = n + r.slice(n.length)
  } else {
    r = '0.'
    for (let i = 0; i < len; i++) {
      r += '0'
    }
    n = n.replace(/^0/, '')
    n = n.replace('.', '')
    r = r.slice(0, r.length - 1) + n
  }
  return r
}
export function formatFile(num,len=2) {
  num = parseE(new BigNumber(num).dividedBy(Math.pow(10, 18)).toString())
  return Number(num).toFixed(len) + "FIL"
}
export function formatFilNum(num, atto = false, pure = false) {
  if (atto) {
    num = parseE(new BigNumber(num).dividedBy(Math.pow(10, 18)).toString())
  }
  let dot = String(num).split('.')[1]
  let zero = 1
  let res = num
  let unit = ''
  if (dot) {
    for (let v of dot) {
      if (Number(v) !== 0) {
        break
      } else {
        zero++
      }
    }
    if (zero <= 5) {
      unit = ' FIL'
      //return num + " FIL";
    } else if (zero > 5 && zero <= 13) {
      res = new BigNumber(Number(num)).multipliedBy(Math.pow(10, 9)).toString()
      unit = ' nanoFIL'
      //   return (
      //     new BigNumber(Number(num)).multipliedBy(Math.pow(10, 9)).toString() +
      //     " nanoFIL"
      //   );
    } else {
      res = new BigNumber(Number(num)).multipliedBy(Math.pow(10, 18)).toString()
      unit = ' attoFIL'
      //   return (
      //     new BigNumber(Number(num)).multipliedBy(Math.pow(10, 18)).toString() +
      //     " attoFIL"
      //   );
    }
  } else {
    unit = ' FIL'
    //return num + " FIL";
  }
  return res + (pure ? '' : unit)
}

export function filterList(options, dataList, LabelList) {
  let info = dataList.filter((ele) => options.includes(ele.key))
  info.sort((a, b) => options.indexOf(a.key) - options.indexOf(b.key))
  return info.map((item, index) => {
    return {
      ...item,
      title: LabelList[index]
    }
  })
}

export function isChinese(str) {
  var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
  return !patrn.exec(str) ? false : true
}

export function containSpecial(str) {
  var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\.)(\/)(\<)(\>)(\?)(\)]+/)
  return containSpecial.test(str)
}

export function isValidAddress(address) {
  let r = /^[tf][1-9][0-9a-z]{30,40}$/i
  return r.test(address)
}

export function isValidPhone(str) {
  return /^1[3-9][0-9]\d{8}$/.test(String(str))
}


export function isValidPassword(str = '') {
  // 8-20位字符，至少包含字母和数字（区分大小写）//
  if (str.length < 8) {
    return false
  }
  if (str.length > 20) {
    return false
  }
  if (/^\d+$/.test(str)) {
    return false
  }
  if (/^[^0-9]+$/.test(str)) {
    return false
  }
  return true
}

export function isValidEmail(email){
  // eslint-disable-next-line
  return /^[a-zA-Z0-9\+\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)
}

export function setCookie(c_name,c_pwd, exdays){
  var exdate = new Date() //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
  //字符串拼接cookie
  window.document.cookie =
      "username" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString()
  //expires是设置cookie的过期时间，toGMTString是将日期转为GMT的字符串进行拼接
  window.document.cookie =
      "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString()
}

export function getCookie() {
  let username=''
  let password=''
  if (document.cookie.length > 0) {
    var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("="); //再次切割
      //判断查找相对应的值
      if (arr2[0] == "username") {
        username = arr2[1]; //保存到保存数据的地方 （data中）
      } else if (arr2[0] == "password") {
        password = arr2[1];
      }
    }
    return {
      username,
      password,
    }
  }
}

export function clearCookie() {
  this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
}

export function cookieSet(name,value) {
  var Days = 30;
  var exp = new Date()
  exp.setTime(exp.getTime() + Days*24*60*60*1000)
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()
}

export function cookieGet(name) {
  let reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)")
  let arr=document.cookie.match(reg)
  return arr?unescape(arr[2]):null
}

export function  cookieDelete() {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1);
  let cval=getCookie(name)
  if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString()
}

export function fontSize() {
   let width = window.innerWidth
   let arr =['--font-14','--font-16','--font-18', '--font-20', '--font-22', '--font-24']
   let size= ['12','14','16','18', '20','22']
  if(width>1920){
    arr.map((item,index)=>{
      let s = Number(size[index])/192 + "rem"
      document.documentElement.style.setProperty(item, s)
    })
  }
}
