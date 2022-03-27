import request from '@/utils/request'
// import Qs from 'qs'
const baseUrl = '/repeatEmail'

const baseApi = {
  queryRepeatEmailRule: baseUrl + '/queryRepeatEmailRule', // 查询托管或者外包的重复的交易或者对账单配置规则
  queryRepeatEmailDetail: baseUrl + '/queryRepeatEmailDetail', // 查询的重复的交易或者对账单的邮件 查看（超链接）
  queryRepeatEmailRuleCount: baseUrl + '/queryRepeatEmailRuleCount' // 查询托管或者外包的重复的交易或者对账单配置规则的个数(未读个数右上角红点)
}
export const queryRepeatEmailRule = params => request({ url: baseApi.queryRepeatEmailRule, method: 'get', params })
export const queryRepeatEmailDetail = params => request({ url: baseApi.queryRepeatEmailDetail, method: 'get', params })
export const queryRepeatEmailRuleCount = params => request({ url: baseApi.queryRepeatEmailRuleCount, method: 'get', params })
