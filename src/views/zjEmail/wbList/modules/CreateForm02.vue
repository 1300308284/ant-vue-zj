<template>
  <a-modal
    :title="model && model.id > 0 ? '修改规则' : '新建规则'"
    :width="'calc(100vw - 700px)'"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok', model) }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="账套号">
              <a-input v-decorator.trim="['faccountCode', {initialValue: queryParam.faccountCode}]" @change="handleFaccountCodeChange"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="基金代码">
              <a-input :disabled="true" v-decorator.trim="['fundCode', {initialValue: queryParam.fundCode}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="产品名称">
              <a-input :disabled="true" v-decorator.trim="['productName', {initialValue: queryParam.productName}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="估值批次">
              <a-input :disabled="true" v-decorator.trim="['valBatchName', {initialValue: queryParam.valBatchName}, {rules: [{required: true, min: 3, message: '请按格式T+0填写'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="券商\期货商">
              <a-select
                show-search
                allowClear
                placeholder="请选择"
                option-filter-prop="children"
                v-decorator.trim="['dealerCode', {initialValue: queryParam.dealerCode}]"
                :filter-option="filterOption"
                @change="handleChange"
              >
                <a-select-option
                  v-for="(item,index) in dealerData"
                  :key="item.dealerCode + index"
                  :value="item.dealerCode">
                  {{ item.dealerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="标题">
              <a-input v-decorator.trim="['title']" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="发件人">
              <a-input v-decorator.trim="['senders']" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="附件个数">
              <a-input v-decorator.trim="['attachCount']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="item-style-fulline">
            <a-form-item label="密码文件名">
              <a-input v-decorator.trim="['ciperFileName', {initialValue: queryParam.ciperFileName}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="item-style-fulline">
            <a-form-item label="密码">
              <a-input v-decorator.trim="['ciper', {initialValue: queryParam.ciper}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row style="display: none;">
          <a-col>
            <a-form-item label="id">
              <a-input v-decorator="['id']"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="center">
              <h3 style="font-weight: bold; color: red">规则说明: </h3>
            </a-divider>
            <p>  1、账套号：输入账套号回车后，调用接口获取基金代码、产品名称、、估值批次等信息，自动填入相关字段；</p>
            <p>  2、通知时间：为固定时间(对应估值时效配置页面的数据准备时间)；</p>
            <p>  3、附件个数为邮件附件中压缩文件个数，压缩类型zip,rar,7z,tar，“对账单文件规则”不显示该元素；</p>
            <p>  4、标题进行模糊匹配；</p>
            <p>  5、发件人：可配置多个邮箱，多个邮件之间用“;”分割，其中，支持域名匹配规则，如：%@cicc.com为所有以@cicc.com结尾的邮箱均为匹配对象；</p>
            <p>  6、密码文件名：支持模糊匹配 附件名包含密码文件名即可；</p>
            <p>  7、查询界面，每个业务组只能看到自己配置的规则；</p>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import debounce from 'lodash.debounce'
import {
  queryFaccountInfo,
  queryDealerInfo
  } from '@/api/zjApis/tgemailRuleConfig/dealFileRule'

// 表单字段
const fields = [
  'faccountCode',
  'fundCode',
  'productName',
  'valBatchName',
  'dealerName',
  'dealerCode',
  'id',
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
      dealerData: [],
      dealerNameTemp: '',
      queryParam: {},
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.$nextTick(_ => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    }, {
      deep: true
    })
    this.init()
  },
  methods: {
    init () {
      queryDealerInfo().then(res => {
        console.log('>res>>:', res)
        this.dealerData = res.dataValue || []
      }).catch(err => {
        console.log('>err>>:', err)
      })
    },
    handleSearch (value) { // TODO ?待接口
      console.log('>serach--11----->:', value)
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
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange (value, aa) { // 确认用name不用code
      console.log('change999999', value)
      this.queryParam.dealerCode = value
      // console.log('change22', this.queryParam.dealerName)
    },
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
              valBatchName: 'T+0'
            })
          }, 100)
      }).catch(err => {
        console.log('>err>待此帐套号item.target.value查相关信息>:', err)
      })
    }, 1000)
  }
}
</script>
<style scoped lang="less">
.item-style-fulline{
  width: 144%;
  margin-left: -28%;
}
</style>
