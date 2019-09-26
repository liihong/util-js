/**
 * desc：重写Number对象为其增加一些数字处理函数
 * author: lihong
 */
export default class Numbers extends Number {
    // 构造
    constructor() {
      super()
    }
  
    /**
     * 判断当前值是否为不为空的数字
     * @param {数字} num
     */
    static isNumber(num) {
      if (isNaN(num) && parseFloat(num).toString() !== "NaN") {
        return false
      }
      else {
        return true
      }
    }
  
    /**
     * 为一个数字增加千分位
     * @param {*} num
     */
    static thousandsForamt(num) {
      if (!this.isNumber(num)) return
      var res = num.toString().replace(/\d+/, function(n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) {
          return $1 + ','
        })
      })
      return res
    }
  
    /**
     * 为所有传进来的值小数补零
     * @param {需要补0的数字} num
     * @param {补零的个数，如果不传则默认为两位} digitNum
     */
    static fillNumber(num, digitNum) {
      if (isNaN(num) || (!num && num != 0)) {
        return num
      }
      var digit = ''
      var round = ''
      if (num === null || num === undefined || num === '') {
        num = 0.00
      }
      var numStr = num.toString()
      if (numStr.indexOf('.') != -1) {
        round = numStr.split('.')[0]
        digit = numStr.split('.')[1]
      }
      else {
        round = numStr
      }
      for (var i = digitNum - digit.length; i > 0; i--) {
        digit = digit + '0'
      }
      return round + '.' + digit
    }
  
    /**
     * 将数字转换为人民币并返回单位
     * @param {*} num
     */
    static formatNumber(num) {
      var ret = {}
  
      if (num >= 100000000) {
        ret.num = Math.round((num / 100000000) * 100) / 100
        ret.unit = '亿元'
      }
      else if (num >= 10000) {
        ret.num = Math.round((num / 10000) * 100) / 100
        ret.unit = '万元'
      }
      else if (num > 0) {
        ret.num = num
        ret.unit = '元'
      }
      else if (num < 0) {
        //  负数
        var num2 = 0 - num
        if (num2 >= 100000000) {
          ret.num = 0 - Math.round((num2 / 100000000) * 100) / 100
          ret.unit = '亿元'
        }
        else if (num2 >= 10000) {
          ret.num = 0 - Math.round((num2 / 10000) * 100) / 100
          ret.unit = '万元'
        }
        else if (num2 >= 0) {
          ret.num = 0 - num
          ret.unit = '元'
        }
      }
      else {
        ret.num = '0'
        ret.unit = '元'
      }
      ret.num = Math.round(ret.num * 100) / 100
      return ret
    }
    /**
     * 取出数组中的最大值
     */
    static getMaxNum (arr) {
      const arr2 = []
      for (let i in arr) {
        if (arr[i] == undefined) {
          arr[i] = 0
        }
        arr2.push(Math.abs(arr[i]))
      }
      var index = arr2.indexOf(Math.max.apply(null, arr2))
      return arr2[index]
    }
  
    /**
     * 将数字转换为人民币并返回单位
     */
    static getFormatMoney (num, unit) {
      var ret = {}
      // console.log(unit);
      if (num == '') {
        ret.num = 0
        ret.unit = 1
        ret.unitName = '元'
        return ret
      }
      var computenum = num
      if (num <= 0) { computenum = 0 - num }
      if (!unit || unit === 0) {
        if (computenum >= 100000000) { unit = 100000000 } else if (computenum >= 10000) { unit = 10000 } else { unit = 1 }
        // unit = 10000; // 默认取万元
      }
      switch (unit) {
        case 10000:
          ret.num = Math.round((num / 10000) * 100) / 100
          ret.unitName = '万元'
          ret.unit = unit
          break
        case 100000000:
          ret.num = Math.round((num / 100000000) * 100) / 100
          ret.unitName = '亿元'
          ret.unit = unit
          break
        default:
          ret.num = num
          ret.unitName = '元'
          ret.unit = 1
          break
      }
      return ret
    }
    /*
  *   封装一个数字每三位加逗号的方法
  * */
  static format (num) {
    if (num === undefined) return
    var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ','
      })
    })
    return res
  }
  }
  // Object.assign(Number.prototype,{
  //     getWidth(){
  //         console.log('12')
  //     },
  //     getHeight(){
  //         console.log('24')
  //     }
  // })
  