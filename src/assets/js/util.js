/* eslint-disable */
export function debounce (fn, wait = 50, immediate = true) {
  let timer
  let result
  return function () {
    let context = this
    let args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) {
        result = fn.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        result = fn.apply(context, args)
      }, wait)
    }
    return result
  }
}

export function accAdd (arg1, arg2) {
  var r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    var cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

export function accSub (arg1, arg2) {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * 调用：accMul(arg1,arg2)
 * 返回值：arg1乘以 arg2的精确结果
*/
export function accMul (arg1, arg2 = 100) {
  let m = 0
  let s1 = arg1.toString()
  let s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

export const storage = {
  get: function (key) {
    return window.sessionStorage.getItem(key)
  },
  set: function (key, value) {
    window.sessionStorage.setItem(key, value)
  },
  remove: function (key) {
    window.sessionStorage.removeItem(key)
  },
  clear: function () {
    window.sessionStorage.clear()
  },
  values: function () {
    return window.sessionStorage
  }
}

/**
 * 判断是否为空
 *
 * @params {} value  需要校验的数据
 *
 * @return {boolean} 是否为空, 默认false
 *  null, '', undefined, [], {} 返回为true
 *  0 返回false
 */
export function isEmpty (value) {
  // null
  if (!value && typeof value === 'object') {
    return true
  }
  // undefined
  if (typeof value === 'undefined') {
    return true
  }
  // ''
  if (typeof value === 'string' && value === '') {
    return true
  }
  // []
  if (Array.isArray(value)) {
    return !value.length
  }
  // {}
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return !Object.keys(value).length
  }
  return false
}

/**
 * 日期格式化
 * @param {*} timestamp
 */
export function dateFormat (timestamp, format = 'yyyy-MM-dd') {
  if (typeof timestamp !== 'number') {
    return timestamp
  }
  let t = new Date(timestamp)
  const tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'mm':
        return tf(t.getMinutes())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

export function isNull (value) {
  if (!value && typeof value === 'object') {
    return true
  }
  return false
}
export function clearProductMess () {
  storage.remove('productCode')
  storage.remove('productName')
  storage.remove('productInfo')
  storage.remove('targetStatus')
  storage.remove('productInfoMess')
  storage.remove('canConfig')

}

// 千分位 支持正负数，number，string
export function thousandComma (num) {
  if (num === undefined || isNull(num)) return num
  var source = String(num).split('.') // 按小数点分成2部分
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), '$1,') // 只将整数部分进行都好分割
  return source.join('.') // 再将小数部分合并进来
}

export const getCookie = function (name) {
  const cookieStr = document.cookie
  const cookie = {}
  if (cookieStr) {
    const cookieArr = cookieStr.split(';')
    cookieArr.forEach(item => {
      const itemMap = item.split('=')
      cookie[itemMap[0].trim()] = itemMap[1]
    })
    return cookie[name]
  }
  return null
}

export const clearCookie = function () {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i =  keys.length; i--;) {
      document.cookie = keys[i]+'=0;expires=' + new Date(0).toUTCString() + ";path=/;";
    }
  }
}

export const getUrlParam = function (name) {
  let query = window.location.search.substring(1)
  let params = query.split('&')
  for (let i = 0; i < params.length; i++) {
    let pair = params[i].split('=')
    if (pair[0] === name) {
      return pair[1]
    }
  }
  return null
}

export const addCookie = function (name, value, time = 86400000) {
  var exp = new Date();
  exp.setTime(exp.getTime() + time * 1);
  document.cookie = name + "=" + value + ";expires="+ exp.toGMTString();
}

//删除数组中指定元素
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
}

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}
/*
接受4个参数
color1: 开始颜色
color2: 结束颜色
value: 数值
type: fmtWinRate-基本面赢率 fmtOdds-基本面赔率  mktWinRate-市场面赢率 mktOdds-市场面赔率
*/
export const getDivColors =  function(value, type){
    const colorArr = [["#ECB892","#F18A42"],["#95B0DF","#4285FB"],["#F0DE9F","#ECC01E"],["#C7E9C0","#115F30"]]
    let startArr
    let endArr
    
    value=parseFloat(value)


    if(isNull(value)){
      return '#fff'
    }
    switch(type) {
        case "fmtWinRate":
            startArr = hexToDec(colorArr[0][0])
            endArr = hexToDec(colorArr[0][1])
            break
        case "fmtOdds":
            startArr = hexToDec(colorArr[1][0])
            endArr = hexToDec(colorArr[1][1])
            break
        case "mktCongestion":
            startArr = hexToDec(colorArr[2][0])
            endArr = hexToDec(colorArr[2][1])
            break
        case "mktTrend":
            startArr = hexToDec(colorArr[3][0])
            endArr = hexToDec(colorArr[3][1])
            break
    }
	let gabVal = []
    let res = []
    let result

	startArr.forEach(function(item, i){
		gabVal.push(endArr[i] - item)
	})

	for(let i=0; i < 11; i++){
		res.push(decToHex(startArr.map(function(item, idx){
			return item + (gabVal[idx]/(11+1))*(i+1);
        })))
    }
    if(type == "fmtWinRate" || type == "mktCongestion") {
        value = value>100?100:value
        value = value<0?0:value
        result = Math.floor(value/10)
    }else if(type == "fmtOdds" || type == "mktTrend") {
        value = value>3?3:value
        value = value<-3?-3:value

        result = Math.floor((value+3)*1.66)
    }
    let color= '#fff'
    if(res[result]){
      color=`#${res[result]}`
    }
    return color
}
// 
function hexToDec(str){
	let hex = str.replace(/[^0-9a-fA-F]/, "")
	hex = hex.length == 3 ? hex.replace(/(\w)/g, "$1$1,") : hex.replace(/(\w{2})/g, "$1,")
	return hex.substr(0, hex.length-1).split(",").map(function(item) {
		return parseInt(item, 16)
	})
}

function decToHex(arr){
	return arr.map(function(item){
		return (parseInt(item, 10)).toString(16)
	}).join("")
}

export const  percentData = [0, 20, 35, 45, 55, 65, 80, 100]
export const  numericalData = [-3, -1.5, -1, -0.5, 0.5, 1, 1.5, 3]
export const standard = ['极低', '较低', '中低', '中性', '中高', '较高', '极高']
// ['极高', '高', '中高', '中', '中低', '低', '极低']

// 把 胜率 盈亏比 市场趋势强度 市场拥挤度 的数字转化为文字 
export const changNunToText= function (type, value) {
  if(isNull(value)){
    return '--'
  }
  let state = ''
  // const percentData = [0, 14, 28, 42, 57, 71, 85, 100]
  // const numericalData = [-3, -2.15, -1.29, -0.5, 0.3, 1.28, 2.14, 3]
  // const percentData = [0, 20, 35, 45, 55, 65, 80, 100]
  // const numericalData = [-3, -1.5, -1, -0.5, 0.5, 1, 1.5, 3]
  // const standard = ['极低', '低', '中低', '中', '中高', '高', '极高']
  let realData = []
  if (type === 'fmtWinRate' || type === 'mktTrend' || type === '胜率' || type === '趋势强度') {
    realData = percentData
    value = accMul(value, 100)
  } else {
    realData = numericalData
  }
  for (let i = 0; i < realData.length; i++) {
    value = Number(value)
    if (value > realData[i] && value <= realData[i + 1]) {
      state = standard[i]
    }
    if (value > realData[realData.length - 1]) {
      state = standard[standard.length - 1]
    }
    if (value <= realData[0]) {
      state = standard[0]
    }
  }
  return state
}


export function SectionToChinese(section){
  var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
  var chnUnitChar = ["","十","百","千","万","亿","万亿","亿亿"];
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  while(section > 0){
      var v = section % 10;
      if(v === 0){
           if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
           }
      }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
   }
   return chnStr;
  }
