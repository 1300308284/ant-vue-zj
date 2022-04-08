<template>
  <a-modal
    :title="'查看详情'"
    :width="'calc(100vw - 700px)'"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok', model) }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <s-table
        ref="table"
        size="default"
        :rowKey="(record) => record.faccountCode + record.id + record.valBatchName"
        :columns="columns"
        :data="loadData"
        :alert="false"
        showPagination="auto"
      >
        <!-- :rowSelection="rowSelection" -->
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="record">
          <template>
            <a-switch
              size="small"
              :loading="recordId === record.id"
              :defaultChecked="record.status === '0' ? true : false"
              @change="handleOnChange($event, record)"/>
          </template>
        </span>
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span> -->

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">查看</a>
            <!-- <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a> -->
          </template>
        </span>
      </s-table>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import debounce from 'lodash.debounce'
import {
  queryFaccountInfo
  } from '@/api/zjApis/tgemailRuleConfig/dealFileRule'

import {
  queryRepeatEmailDetail
  // queryRepeatEmailRuleCount
  } from '@/api/zjApis/repeatEmail/index'
const columns = [
  {
    title: '序号',
    width: '60px',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '产品名称',
    ellipsis: true,
    dataIndex: 'productName'
  },
  {
    title: '邮箱',
    ellipsis: true,
    dataIndex: 'account'
  },
  {
    title: '标题',
    ellipsis: true,
    dataIndex: 'subject'
  },
  {
    title: '发件人',
    ellipsis: true,
    dataIndex: 'sender'
  },
  {
    title: '收件人',
    ellipsis: true,
    dataIndex: 'recipients'
  },
  {
    title: '抄送',
    ellipsis: true,
    dataIndex: 'cc'
  },
  {
    title: '密送',
    ellipsis: true,
    dataIndex: 'bcc'
  },
  {
    title: '收件时间',
    ellipsis: true,
    dataIndex: 'receivedTime'
  },
  {
    title: '附件文件名',
    ellipsis: true,
    dataIndex: 'fileName'
  }
  // {
  //   title: '启用',
  //   width: '60px',
  //   scopedSlots: { customRender: 'status' }
  // },
  // {
  //   title: '操作',
  //   dataIndex: 'action',
  //   width: '60px',
  //   scopedSlots: { customRender: 'action' }
  // }
]
// 表单字段
const fields = [
  'faccountCode',
  'fundCode',
  'productName',
  'valBatchName',
  'dealerName',
  'title',
  'senders',
  'attachCount',
  'ciperFileName',
  'ciper',
  'status'
]

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      columns,
      form: this.$form.createForm(this),
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData 请求参数555>:', requestParameters)
        return queryRepeatEmailDetail(requestParameters)
          .then(res => {
          this.localLoading = false
            console.log('>queryRepeatEmailDetail>成功>:', res)
            return res.dataValue
          }).catch(err => {
          this.localLoading = false
            console.log('queryRepeatEmailDetail 请求失败>err>>:', err)
          })
      }
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    }, {
  deep: true
})
  },
  methods: {
    handleOnChange (checked) {
      console.log(`a-switch to ${checked}`);
    },
    handleFaccountCodeChange: debounce(function (item, val) {
      console.log('>val>账套号:111>:', item.target.value)
      const faccountCode = item.target.value
      queryFaccountInfo({ faccountCode }).then(res => {
        console.log('>res>待此帐套号item.target.value查相关信息>:', res)
        // TODO 待后端调其他查询接口, 返真实数据
        // this.model && this.form.setFieldsValue({
          const timer = setTimeout(_ => {
              clearTimeout(timer)
            this.form.setFieldsValue({
              fundCode: 'fundCode999',
              productName: '产品名称999',
              valBatchName: 'T+999'
            })
          }, 100)
      }).catch(err => {
        console.log('>err>待此帐套号item.target.value查相关信息>:', err)
      })
    }, 1000)
  }
}
</script>
