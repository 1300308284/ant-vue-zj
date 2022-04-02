<template>
  <a-modal
    :title="'查看详情'"
    :width="'calc(100vw - 200px)'"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('cancel') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <s-table
        ref="table"
        size="default"
        :rowKey="(record) => record.id"
        :columns="columns"
        :data="loadData"
        :alert="false"
        :showPagination="loadData.length > 9 ? 'auto' : ''"
      >
        <!-- :rowSelection="rowSelection" -->
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- <span slot="status" slot-scope="record">
          <template>
            <a-switch
              size="small"
              :loading="recordId === record.id"
              :defaultChecked="record.status === '0' ? true : false"
              @change="handleOnChange($event, record)"/>
          </template>
        </span> -->
        <span slot="receivedTime" slot-scope="text, record">
          {{ moment(record.receivedTime).format('YYYY-MM-DD HH:mm') }}
        </span>
        <!-- <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span> -->

        <!-- <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">查看</a>
          </template>
        </span> -->
      </s-table>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import debounce from 'lodash.debounce'
import moment from 'moment'
import { STable } from '@/components'
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
    dataIndex: 'productName'
  },
  {
    title: '邮箱',
    dataIndex: 'account'
  },
  {
    title: '标题',
    dataIndex: 'subject'
  },
  {
    title: '发件人',
    dataIndex: 'sender'
  },
  {
    title: '收件人',
    dataIndex: 'recipients'
  },
  {
    title: '抄送',
    dataIndex: 'cc'
  },
  {
    title: '密送',
    dataIndex: 'bcc'
  },
  {
    title: '收件时间',
    // dataIndex: 'receivedTime'
    scopedSlots: { customRender: 'receivedTime' }
  },
  {
    title: '附件文件名',
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
  'id',
  'bizDate',
  'senders',
  'attachCount',
  'ciperFileName',
  'ciper',
  'status'
]

export default {
  components: {
    STable
  },
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
      default: () => null
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
      moment,
      columns,
      form: this.$form.createForm(this),
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign(this.model, parameter, this.queryParam)
        console.log('loadData 请求参数577777755>:', requestParameters)
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
