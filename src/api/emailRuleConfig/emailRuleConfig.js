import request from '@/utils/request'
import Qs from 'qs'
const baseUrl = '/emailRule'

const baseApi = {
  queryEmailRuleInfo: baseUrl + '/queryEmailRuleInfo', // 查询的邮件规则列表
  queryDealerInfo: baseUrl + '/queryDealerInfo', // 查询所有的券商信息
  queryEmailRuleById: baseUrl + '/queryEmailRuleById', // 修改的回显查询(根据id查询)
  saveEmailRuleAndValuationTime: baseUrl + '/saveEmailRuleAndValuationTime', // 新增或修改数据（邮件规则及估值批次）
  updateEmailRuleStatus: baseUrl + '/updateEmailRuleStatus' // 修改邮箱规则是否可用状态
}

const getData = data => ('?' + Qs.stringify(data))

export const queryEmailRuleInfo = data => request({ url: baseApi.queryEmailRuleInfo + '?' + getData(data), method: 'get' })
export const queryDealerInfo = data => request({ url: baseApi.queryDealerInfo + '?' + getData(data), method: 'get' })
export const queryEmailRuleById = data => request({ url: baseApi.queryEmailRuleById + getData(data), method: 'get' })
export const saveEmailRuleAndValuationTime = data => request({ url: baseApi.saveEmailRuleAndValuationTime + getData(data), method: 'get' })
export const updateEmailRuleStatus = data => request({ url: baseApi.queryEmupdateEmailRuleStatusailRuleInfo + getData(data), method: 'get' })

// export function login (parameter) {
//   return request({
//     url: baseApi.Login,
//     method: 'post',
//     data: parameter
//   })
// }

// export function getSmsCaptcha (parameter) {
//   return request({
//     url: baseApi.SendSms,
//     method: 'post',
//     data: parameter
//   })
// }

// export function getInfo () {
//   return request({
//     url: baseApi.UserInfo,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// export function getCurrentUserNav () {
//   return request({
//     url: baseApi.UserMenu,
//     method: 'get'
//   })
// }

// export function logout () {
//   return request({
//     url: baseApi.Logout,
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// /**
//  * get user 2step code open?
//  * @param parameter {*}
//  */
// export function get2step (parameter) {
//   return request({
//     url: baseApi.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
