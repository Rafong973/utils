export const isNullStr = (value) => {
  if (value === null || value === undefined) return true
  const val = value.toString()
  return val === '' || val.length <= 0
}

// 验证手机号码
export const checkPhone = (value, callback) => {
  let reg = /^1\d{10}$/g
  return !reg.test(value)
}

//检查域名
export const checkWebsiteUrl = (value) => {
  if (isNullStr(value)) return false
  let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
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
