import request from '@/utils/request'
// import Qs from 'qs'
const baseUrl = '/emailRule'

const baseApi = {
  queryEmailRuleInfo: baseUrl + '/queryEmailRuleInfo', // 查询的邮件规则列表
  queryDealerInfo: baseUrl + '/queryDealerInfo', // 查询所有的券商信息
  queryEmailRuleById: baseUrl + '/queryEmailRuleById', // 修改的回显查询(根据id查询)
  saveEmailRuleAndValuationTime: baseUrl + '/saveEmailRuleAndValuationTime', // 新增或修改数据（邮件规则及估值批次）
  updateEmailRuleStatus: baseUrl + '/updateEmailRuleStatus', // 修改邮箱规则是否可用状态
  queryFaccountInfo: baseUrl + '/queryFaccountInfo' // 根据账套号和业务code调用接口获取相关信息
}

// const getData = data => ('?' + Qs.stringify(data))

// 菜单入口类型: 如下
// 托管的code：groupCode：tg，
// 外包的code：groupCode：wb；
// 交易的code：bizCode：01，
// 对账单的code：bizCode：02
// const assignData = data => ({ ...data, groupCode: data.gcFlag === 'tg' ? 'tg' : 'wb', bizCode: data.bcFlag === '01' ? '01' : '02' })
const assignData = data => ({ ...data, groupCode: 'tg' })

export const queryEmailRuleInfo = data => request({ url: baseApi.queryEmailRuleInfo, method: 'post', data: assignData(data) })
export const queryDealerInfo = params => request({ url: baseApi.queryDealerInfo, method: 'get', params: assignData(params) })
export const queryEmailRuleById = params => request({ url: baseApi.queryEmailRuleById, method: 'get', params: assignData(params) })
export const saveEmailRuleAndValuationTime = data => request({ url: baseApi.saveEmailRuleAndValuationTime, method: 'post', data: assignData(data) })
export const updateEmailRuleStatus = data => request({ url: baseApi.updateEmailRuleStatus, method: 'post', data: assignData(data) })
// export const queryFaccountInfo = data => request({ url: baseApi.queryFaccountInfo, method: 'post', data: assignData(data) })
export const queryFaccountInfo = data => new Promise((resolve, reject) => {
  const resObj = {
    faccountCode: '99999',
    fundCode: 'fundCode999',
    productName: '产品名称999',
    valBatchName: 'T+999'
  }
  resolve(resObj)
})

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
