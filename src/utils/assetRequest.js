/**
 * 将一个数组按元素个数切分为多个数组
 * @param rep 切分元素个数
 */
export const splitArray = (array, rep) => {
  if (rep === undefined) {
    // this.$message.error('This is an error message')
    throw new Error('缺少参数 rep')
  }
  const newArray = []
  for (let i = 0; i < array.length; i += rep) {
    newArray.push(array.slice(i, i + rep))
  }
  return newArray
}

/**
  *  休眠一段时间,  异步版  setTimeout
  *  @param  timeout  休眠时间, 毫秒, 1s  =  1000ms
  */
export const sleep = timeout => {
  return new Promise((resolve, reject) => { setTimeout(resolve, timeout) })
}

/**
 * 计算序列的上下边界
 * @param array 元素为数字的数组
 * @param upperLimit 上边界比值, (上边 - 最大值) / (最大值 - 最小值)
 * @param lowerLimit 下边界比值, (最小值 - 下边) / (最大值 - 最小值)
 */
export const calcBoundary = (array, upperLimit = 0.05, lowerLimit = 0.05) => {
  const maxVal = Math.max(...array)
  const minVal = Math.min(...array)
  const height = maxVal - minVal

  const upperVal = parseFloat((maxVal + height * upperLimit).toFixed(4))
  const lowerVal = parseFloat((minVal - height * lowerLimit).toFixed(4))
  return { upperVal, lowerVal }
}

/**
 * 对关系图表的超长文本进行处理
 * @param str 待处理的文本
 * @param maxWidth 文字的最大长度
 * @param fontSize 文字的大小
 */
export const fittingString = (str, maxWidth, fontSize) => {
  let currentWidth = 0
  let res = str
  const pattern = new RegExp('[\u4E00-\u9FA5]+') // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth) return
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize
    } else {
      // get the width of single letter according to the fontSize
      // currentWidth += G6.Util.getLetterWidth(letter, fontSize)
    }
    if (currentWidth > maxWidth) {
      res = `${str.substr(0, i)}\n${str.substr(i)}`
    }
  })
  // console.log('最终的额数据', res)
  return res
}

/**
 * 判断dom元素是否出现在屏幕上
 * @param element dom 元素
 */
export const isAppearOnScreen = element => {
  if (element) {
    const rect = element.getBoundingClientRect()
    if ((rect.top >= 0 && rect.top <= window.innerHeight) ||
        (rect.bottom >= 0 && rect.bottom <= window.innerHeight)) {
      return true
    }
  }
  return false
}
