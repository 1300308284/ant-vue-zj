import request from '@/utils/request'
// import Qs from 'qs'
const baseUrl = '/emailAccount'

const baseApi = {
  queryEmailAccountInfo: baseUrl + '/queryEmailAccountInfo', // 查询的邮箱账号列表
  queryEmailAccountById: baseUrl + '/queryEmailAccountById', // 修改的回显查询(根据id查询)
  saveEmailAccount: baseUrl + '/saveEmailAccount', // 新增或修改数据
  updateEmailStatus: baseUrl + '/updateEmailStatus', // 修改邮箱是否可用状态
  updateEmailPushFlg: baseUrl + '/updateEmailPushFlg' // 修改邮箱是否推送成功
}

export const queryEmailAccountInfo = params => request({ url: baseApi.queryEmailAccountInfo, method: 'get', params })
export const queryEmailAccountById = params => request({ url: baseApi.queryEmailAccountById, method: 'get', params })
export const saveEmailAccount = data => request({ url: baseApi.saveEmailAccount, method: 'post', data })
export const updateEmailStatus = data => request({ url: baseApi.updateEmailStatus, method: 'post', data })
export const updateEmailPushFlg = data => request({ url: baseApi.updateEmailPushFlg, method: 'post', data })
