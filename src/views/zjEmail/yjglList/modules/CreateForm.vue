<template>
  <a-modal
    :title="model && model.id > 0 ? '修改邮箱绑定业务' : '新建邮箱绑定业务'"
    :width="'calc(100vw - 500px)'"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok', model) }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="邮箱账号">
              <!-- <a-input v-decorator.trim="['account']" @change="handleFaccountCodeChange"/> -->
              <a-select
                show-search
                v-decorator.trim="['emailAccountId', {rules: [{required: true, message: '请选择'}]}]"
                placeholder="请选择"
                default-value="0"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                :label-in-value="false"
                @search="handleSearch"
                @change="handleChange" >
                <!-- <a-select-option value="0">券商期货商1</a-select-option> -->
                <a-select-option
                  v-for="(item,index) in dealerData"
                  :key="item.id + index"
                  :value="item.id">
                  {{ item.account }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="业务编号">
              <!-- <a-input :disabled="false" type="pwd" v-decorator.trim="['bizCode', {rules: [{required: true, min: 3, message: '请选择'}]}]" /> -->
              <a-select
                show-search
                v-decorator.trim="['groupCode', {rules: [{required: true, message: '请选择'}]}]"
                placeholder="请选择"
                default-value="0"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                :label-in-value="false"
                @search="handleSearch"
                @change="handleChange" >
                <!-- <a-select-option value="0">券商期货商1</a-select-option> -->
                <a-select-option
                  v-for="(item,index) in codeData"
                  :key="item.groupCode + index"
                  :value="item.groupCode">
                  {{ item.groupName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="业务名称">
              <!-- <a-input :disabled="false" v-decorator.trim="['bizName', {rules: [{required: true, min: 3, message: '请选择'}]}]" /> -->
              <a-select
                show-search
                v-decorator.trim="['bizCode', {rules: [{required: true, message: '请选择'}]}]"
                placeholder="请选择"
                default-value="0"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                :label-in-value="false"
                @search="handleSearch"
                @change="handleChange" >
                <!-- <a-select-option value="0">券商期货商1</a-select-option> -->
                <a-select-option
                  v-for="(item,index) in ywNameData"
                  :key="item.bizCode + index"
                  :value="item.bizCode">
                  {{ item.bizName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="收发标志">
              <!-- <a-input :disabled="true" v-decorator.trim="['xferFlg', {rules: [{required: false, min: 3, message: '请按格式T+0填写'}]}]" /> -->
              <a-radio-group @change="onChange" v-decorator.trim="['xferFlg']">
                <a-radio :value="'01'">收邮件</a-radio>
                <a-radio :value="'10'">发邮件用</a-radio>
                <a-radio :value="'11'">收发邮件</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row>
          <a-col>
            <h3>规则说明: </h3>
            <p>  1、账套号：输入账套号回车后，调用接口获取基金代码、产品名称、、估值批次等信息，自动填入相关字段；</p>
            <p>  2、通知时间：为固定时间点，到指定的时间点，将当前规则的检查结果，邮件通知给相关的人员；</p>
            <p>  3、附件个数为邮件附件中压缩文件个数，压缩类型zip,rar,7z,tar，“对账单文件规则”不显示该元素；</p>
            <p>  4、标题进行模糊匹配；</p>
            <p>  5、发件人：可配置多个邮箱，多个邮件之间用“;”分割，其中，支持域名匹配规则，如：%@cicc.com为所有以@cicc.com结尾的邮箱均为匹配对象；</p>
            <p>  6、密码文件名：支持模糊匹配 附件名包含密码文件名即可；</p>
            <p>  7、查询界面，每个业务组只能看到自己配置的规则；</p>
          </a-col>
        </a-row> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import debounce from 'lodash.debounce'
import { queryEmailAccountInfo } from '@/api/zjApis/emailManage/index'
import {
  queryGroupInfo, // 查询所有的业务组编码信息
  queryBizCodeInfo // 查询所有的业务信息
  } from '@/api/zjApis/emailManage/emailBiz'

// 表单字段
const fields = [
  'account',
  'attachSubPath',
  'bizCode',
  'bizName',
  'emailAccountId',
  'groupCode',
  'groupName',
  'id',
  'logTime',
  'status',
  'xferFlg'
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
      queryParam: {},
      value: 1,
      accountTemp: '',
      dealerData: [],
      codeData: [],
      ywNameData: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
    this.init()
  },
  methods: {
    init () {
      queryEmailAccountInfo({}).then(res => {
        console.log('>res>>:', res)
        this.dealerData = res.dataValue
      }).catch(err => {
        console.log('>err>>:', err)
      })

      // 查询所有的业务组编码信息 业务编号
      queryGroupInfo({}).then(res => {
        console.log('>res查询所有的业务组编码信息 业务编号>>:', res)
        this.codeData = res.dataValue
      }).catch(err => {
        console.log('>err>>:', err)
      })

      // 查询所有的业务信息 业务名称
      queryBizCodeInfo({}).then(res => {
        console.log('>res>查询所有的业务信息 业务名称>:', res)
        this.ywNameData = res.dataValue
      }).catch(err => {
        console.log('>err>>:', err)
      })
    },
    onChange (e) {
      console.log('radio checked11111', e.target.value);
      this.queryParam.xferFlg = e.target?.value
    },
    handleSearch (value) { // TODO ?待接口
      console.log('>邮箱绑定业务--11----->:', value)
      // fetch(value, data => (this.data = data))
      // const cloneData = JSON.parse(JSON.stringify(this.dealerData))
      // value && (this.dealerData = cloneData.map((item, index) => {
      //   if (item.dealerName?.indexOf(value) > -1) {
      //     console.log('>匹配查到了>>:', item)
      //     return item
      //   } else {
      //     // console.log('>没有匹配到>>:', item.dealerName)
      //   }
      // }))
    },
    handleChange (value, aa) { // 确认用name不用code
      console.log('邮箱绑定业务', value)
      // console.log('change22', aa)
      // this.queryParam.dealerCode = value?.key
      // this.queryParam.account = value?.key
    },
    handleOnChange (checked) {
      console.log(`a-switch to ${checked}`);
    },
    handleFaccountCodeChange: debounce(function (item, val) {
      // TODO 待此帐套号item.target.value查相关信息
      console.log('>val>账套号:111>:', item.target.value)
    }, 1000)
  }
}
</script>
