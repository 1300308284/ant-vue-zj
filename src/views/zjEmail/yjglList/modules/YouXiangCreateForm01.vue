<template>
  <a-modal
    :title="model && model.id > 0 ? '修改邮箱' : '新建邮箱'"
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
              <a-input v-decorator.trim="['account', {initialValue: model ? model.account : ''}]" @change="handleFaccountCodeChange"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="邮箱密码">
              <a-input :disabled="false" v-decorator.trim="['pwd', {initialValue: model ? model.pwd : ''}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="邮箱服务器">
              <a-input :disabled="false" v-decorator.trim="['emailServer', {initialValue: model ? model.emailServer : ''}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="附件存储根路径">
              <a-input :disabled="false" v-decorator.trim="['attachRootPath', {initialValue: model ? model.attachRootPath : ''}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="推送">
              <!-- <a-input :disabled="false" v-decorator.trim="['emailServer']" /> -->
              <!-- :defaultChecked="record.status === '0' ? true : false" -->
              <!-- :defaultChecked="model && model.pushFlg" -->
              <a-switch
                size="small"
                v-decorator.trim="['pushFlg', {valuePropName: 'checked', initialValue: model ? model.pushFlg: true}]"
                @change="handleOnPushFlg"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="推送URL">
              <a-input :disabled="false" v-decorator.trim="['pushUrls', {initialValue: model ? model.comments : '', rules: [{required: isRequired ? true : false, min: 1, message: '推送URL不能为空'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="描述">
              <a-input :disabled="false" type="textarea" v-decorator.trim="['comments', {initialValue: model ? model.comments : ''}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row>
          <a-col>
            <h3>规则说明: </h3>
            <p>  1、账套号：输入账套号回车后，调用接口获取基金代码、产品名称、、估值批次等信息，自动填入相关字段；</p>
            <p>  2、通知时间：为固定时间(对应估值时效配置页面的数据准备时间)；</p>
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
// import {
//   updateEmailPushFlg
//   } from '@/api/zjApis/emailManage/index.js'

// 表单字段
const fields = [
  'account',
  'attachRootPath',
  'comments',
  'emailName',
  'emailServer',
  'id',
  'logTime',
  'pushFlg',
  'pushUrls',
  'pwd',
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
      value: 1,
      accountTemp: '',
      dealerData: [],
      isRequired: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    // this.$watch('model', () => {
    //   this.$nextTick(_ => {
    //     this.model && this.form.setFieldsValue(pick(this.model, fields))
    //   })
    // })
  },
  watch: {
    // 'model.pushFlg': {
    //   handler (newName, oldName) {
    //      console.log('obj.a changed111', newName);
    //     this.$nextTick(_ => {
    //        this.model.pushFlg = newName
    //       // this.form.setFieldsValue({
    //       //   pushFlg: newName
    //       // })
    //     })
    //     //  console.log('obj.a changed222', oldName);
    //   },
    //   immediate: true
    // },
    model: {
      handler (newName, oldName) {
        console.log('obj.a changed111', newName);
        this.$nextTick(_ => {
          // this.model = Object.assign({}, newName)
          // this.model.pushFlg = newName
          this.form.setFieldsValue(pick(this.model, fields))
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleOnPushFlg (statusChange, record) {
      this.isRequired = statusChange ? 1 : 0 // 是否启用 ：0 可用，1：不可用
      // this.switchLoading = true
      // console.log('>status>>:', statusChange)
      // console.log('>record>>:', record.id)
      // const pushFlg = statusChange ? 0 : 1 // 是否启用 ：0 可用，1：不可用
      // const id = record.id // 此条id
      // 是否推送 不用单独调 推送接口了
      // updateEmailPushFlg({ id, pushFlg }).then(res => {
      //   this.switchLoading = true
      //   console.log(pushFlg ? '>推送成功>>:' : '>禁用推送成功>>:', res)
      //   // this.loadData()
      // }).catch(err => {
      //   this.switchLoading = true
      //   console.log('>推送失败>>:', err)
      // })
    },
    onChange (e) {
      console.log('radio checked', e.target.value);
    },
    handleSearch (value) { // TODO ?待接口
      console.log('>邮箱绑定业务--11----->:', value)
      // fetch(value, data => (this.data = data))
      const cloneData = JSON.parse(JSON.stringify(this.dealerData))
      value && (this.dealerData = cloneData.map((item, index) => {
        if (item.dealerName?.indexOf(value) > -1) {
          console.log('>匹配查到了>>:', item)
          return item
        } else {
          // console.log('>没有匹配到>>:', item.dealerName)
        }
      }))
    },
    handleChange (value, aa) { // 确认用name不用code
      console.log('邮箱绑定业务', value)
      // console.log('change22', aa)
      // this.queryParam.dealerCode = value?.key
      this.queryParam.account = value?.key
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
