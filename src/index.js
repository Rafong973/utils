// 获取类型
export function getType(val) {
  if (Number.isNaN(val)) {
    return 'NaN'
  }
  const type = toString.call(val)
  const reg = /\\|\/|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g
  const result = type.replace(reg, '').split(' ')[1]
  return result
}

// 判空方法
export const isNull = (value) => {
  if (value === null || value === undefined) return true
  const types = getType(value)
  if (types === 'Object') {
    const l = Object?.keys(value) || []
    return isNullArray(l)
  }
  if (types === 'Number') {
    return isNullNum(value)
  }
  if (types === 'Date') {
    return value.toString() === 'Invalid Date' || isNullStr(value.toString())
  }
  if (types === 'Symbol') {
    return isNullSymbol(value)
  }
  return isNullStr(value)
}

// 空symbol
export const isNullSymbol = (sym) => {
  return Object.getOwnPropertySymbols(sym).length === 0
}

// 空数组
export const isNullArray = (arr) => {
  if (!arr || arr == [] || arr.length <= 0) return true
  return false
}
// 空数字
export const isNullNum = (num) => {
  if (num === Infinity || num.toString.length <= 0) return true
  return false
}

// 空字符串
export const isNullStr = (value) => {
  if (value === null || value === undefined) return true
  const val = value.toString()
  return val === '' || val.length <= 0
}

/**
 * 获取某URL所有参数，集成一个对象
 * @param {*} url
 */
export const getUrlQuery = (url) => {
  const _url = url || window.location.href
  let params = decodeURI(_url).split('#')[0].split('?')
  const result = {}
  if (params.length > 1) {
    params = params[1].split('&')
    params.forEach((item) => {
      const arr = item.split('=')
      const key = arr[0]
      let value = arr[1]
      if (arr.length > 2) {
        arr.splice(0, 1)
        value = arr.join('=')
      }
      let val = decodeURIComponent(value)
      try {
        if (val === 'false' || val === 'true') {
          val = JSON.parse(val)
        }
      } catch (error) {
        console.log(val)
      }
      result[key] = val
    })
  }
  return result
}

/**
 * 获取某URL所有参数，集成一个对象  hash
 * @param {*} url
 */
export const getUrlHashQuery = () => {
  const value = window.location.hash ? window.location.hash.replace('#', '') : ''
  return getUrlQuery(value)
}

// 拼接链接参数
export const assemblyUrlQuery = (url, param) => {
  const arr = []
  Object.keys(param).forEach((key) => {
    arr.push(`${key}=${param[key]}`)
  })
  return arr && arr.length ? `${url}?${arr.join('&')}&v=${new Date().valueOf()}` : url
}

//检查域名
export const checkWebsiteUrl = (value) => {
  if (isNullStr(value)) return false
  let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
  return !reg.test(value)
}

// 验证手机号码
export const checkPhone = (value, callback) => {
  let reg = /^1\d{10}$/g
  return !reg.test(value)
}

/**
 *@Author:
 *@Description: 手机号脱敏处理
 * @param { String }   手机号 155xxxxx447
 * @return { String }   返回脱敏处理的手机号 155***447
 */
export const phoneDesensitizationTreatment = (phone) => {
  if (isNullStr(phone)) return phone
  return phone.toString().replace(/(\d{3})(\d{4})(\d{4})/, (_str, $1, _$2, $3) => {
    return $1 + '****' + $3
  })
}

/**
 * 异步加载js脚本
 * @param {*} url
 * @returns Promise
 */
export const loadScript = async (url, name) => {
  if (!url) return ''
  let reject = null
  return new Promise((resolve, _reject) => {
    if (name) {
      if (document.querySelector(`#${name}`)) {
        return resolve()
      }
    }
    reject = _reject
    const script = document.createElement('script')
    if (name) {
      script.setAttribute('id', name)
    }
    script.src = url
    script.onload = (event) => {
      resolve(event)
    }
    script.onerror = (error) => {
      reject(error)
    }
    document.body.appendChild(script)
  }, reject)
}

// 延时方法
export const wait = async (time = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// 横线转驼峰
export const toHump = (name) => {
  if (!name) return name
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}
// 首字母转大写
export const captureName = (str) => {
  if (!str) return str
  return str.replace(str[0], str[0].toUpperCase())
}

export const dataURLtoBlob = (dataUrl) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

// 个位数转10位数
export const digitsToTens = (val = 0) => {
  if (getType(val) !== 'Number') return val
  return val <= 9 ? `0${val}` : val
}
