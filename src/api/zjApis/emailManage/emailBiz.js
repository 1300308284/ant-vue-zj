import request from '@/utils/request'
// import Qs from 'qs'
const baseUrl = '/emailAccountBiz'

const baseApi = {
  queryEmailAccountBizInfo: baseUrl + '/queryEmailAccountBizInfo', // 查询业务绑定邮箱列表
  queryEmailAccountBizById: baseUrl + '/queryEmailAccountBizById', // 修改的回显查询(根据id查询)
  queryGroupInfo: baseUrl + '/queryGroupInfo', // 查询所有的业务组编码信息
  queryBizCodeInfo: baseUrl + '/queryBizCodeInfo', // 查询所有的业务信息
  saveEmailAccountBiz: baseUrl + '/saveEmailAccountBiz', // 新增或修改数据
  updateStatus: baseUrl + '/updateStatus' // 修改邮箱绑定业务是否可用状态
}

export const queryEmailAccountBizInfo = params => request({ url: baseApi.queryEmailAccountBizInfo, method: 'get', params })
export const queryEmailAccountBizById = params => request({ url: baseApi.queryEmailAccountBizById, method: 'get', params })
export const queryGroupInfo = params => request({ url: baseApi.queryGroupInfo, method: 'get', params })
export const queryBizCodeInfo = params => request({ url: baseApi.queryBizCodeInfo, method: 'get', params })
export const saveEmailAccountBiz = data => request({ url: baseApi.saveEmailAccountBiz, method: 'post', data })
export const updateStatus = data => request({ url: baseApi.updateStatus, method: 'post', data })
