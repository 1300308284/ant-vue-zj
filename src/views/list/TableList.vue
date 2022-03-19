<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="账套号">
                <a-input v-model.trim="queryParam.faccountCode" placeholder="请输入账套号"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="券商\期货商">
                <a-select
                  show-search
                  v-model.trim="queryParam.dealerCode"
                  placeholder="请选择"
                  default-value="0"
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="handleSearch"
                  @change="handleChange" >
                  <!-- <a-select-option value="0">券商期货商1</a-select-option>
                  <a-select-option value="1">券商期货商2</a-select-option>
                  <a-select-option value="2">券商期货商3</a-select-option> -->
                  <a-select-option
                    v-for="(item,index) in dealerData"
                    :key="item.dealerCode + index"
                    :value="item.dealerCode">
                    {{ item.dealerName }}
                  </a-select-option>
                </a-select>
                <!-- <a-select
                  show-search
                  :value="value"
                  placeholder="input search text"
                  style="width: 200px"
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
                  @search="handleSearch"
                  @change="handleChange"
                >
                  <a-select-option v-for="d in data" :key="d.value">
                    {{ d.text }}
                  </a-select-option>
                </a-select> -->
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="产品名称">
                <a-input v-model.trim="queryParam.productName" placeholder="请输入产品名称" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <!-- <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="产品名称">
                  <a-input v-model="queryParam.callNo" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template> -->
            <a-col :md="!advanced && 6 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <!-- <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a> -->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <!-- <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown> -->
      </div>

      <s-table
        ref="table"
        size="default"
        :rowKey="(record) => { console.log('>rowKey是啥>>:', record); record.data.faccountCode }"
        :columns="columns"
        :data="loadData"
        :alert="false"
        showPagination="auto"
      >
        <!-- :rowSelection="rowSelection" -->
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span> -->

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a>
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {
  queryDealerInfo,
  queryEmailRuleInfo,
  saveEmailRuleAndValuationTime
  } from '@/api/emailRuleConfig/emailRuleConfig'
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
// import { getRoleList } from '@/api/manage'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '账套号',
    dataIndex: 'faccountCode'
  },
  {
    title: '基金代码',
    dataIndex: 'fundCode'
  },
  {
    title: '产品名称',
    dataIndex: 'productName'
  },
  {
    title: '估值时效',
    dataIndex: 'logTime'
  },
  {
    title: '券商\\期货商',
    dataIndex: 'dealerName'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '发件人',
    dataIndex: 'senders'
  },
  {
    title: '附件个数',
    dataIndex: 'attachCount'
  },
  // {
  //   title: '密码文件名',
  //   dataIndex: 'no'
  // },
  // {
  //   title: '描述',
  //   dataIndex: 'description',
  //   scopedSlots: { customRender: 'description' }
  // },
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   scopedSlots: { customRender: 'status' }
  // },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updatedAt',
  //   sorter: true
  // },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data () {
    this.columns = columns
    return {
      dealerData: [], // 券商/期货商list
      emailRuleList: [], // 规则列表
      value: undefined, // 可以替换
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData 请求参数>:', requestParameters)
        return queryEmailRuleInfo(requestParameters)
          .then(res => {
          this.localLoading = false
            console.log('>queryEmailRuleInfo>成功>:', res)
            return res.result
          }).catch(err => {
          this.localLoading = false
            console.log('queryEmailRuleInfo 请求失败>err>>:', err)
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    // getRoleList({ t: new Date() }) // 暂时没有用户, 看需求
    this.init()
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    init () {
      queryDealerInfo().then(res => {
        console.log('>res>>:', res)
        this.dealerData = res
      }).catch(err => {
        console.log('>err>>:', err)
      })

      // queryEmailRuleInfo(this.queryParam).then(res => {
      //   console.log('>res>>:', res)
      //   this.emailRuleList = res
      // }).catch(err => {
      //   console.log('>err>>:', err)
      // })
    },
    handleSearch (value) { // TODO ?待接口
      // fetch(value, data => (this.data = data))
    },
    handleChange (value) { // TODO ?待接口
      console.log(value)
      this.value = value
      // fetch(value, data => (this.data = data))
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('新增校验, 失败values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            saveEmailRuleAndValuationTime(values).then(res => {
              console.log('>新增>>:', res)
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            }).catch(err => {
              this.visible = false
              this.confirmLoading = false
              console.log('>新增失败>>:', err)
            })
            // new Promise((resolve, reject) => {
            //   setTimeout(() => {
            //     resolve()
            //   }, 1000)
            // }).then(res => {
            //   this.visible = false
            //   this.confirmLoading = false
            //   // 重置表单数据
            //   form.resetFields()
            //   // 刷新表格
            //   this.$refs.table.refresh()

            //   this.$message.info('新增成功')
            // })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
<style scoped lang="less">
  /deep/ .ant-page-header-heading{
    display: none;
  }
</style>
