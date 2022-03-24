import request from '@/utils/request'
// import Qs from 'qs'
const baseUrl = '/valuationTime'

const baseApi = {
  queryValuationTimeInfo: baseUrl + '/queryValuationTimeInfo', // 查询所有的估值批次
  queryValuationTimeById: baseUrl + '/queryValuationTimeById', // 修改的回显查询(根据id查询)
  saveValuationTime: baseUrl + '/saveValuationTime' // 新增或修改数据（估值表信息）
}
export const queryValuationTimeInfo = params => request({ url: baseApi.queryValuationTimeInfo, method: 'get', params })
export const queryValuationTimeById = params => request({ url: baseApi.queryValuationTimeById, method: 'get', params })
export const saveValuationTime = data => request({ url: baseApi.saveValuationTime, method: 'post', data })
