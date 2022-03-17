<template>
  <a-modal
    :title="model && model.id > 0 ? '修改规则' : '新建规则'"
    :width="'calc(100vw - 700px)'"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="账套号">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="基金代码">
              <a-input :disabled="false" v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="产品名称">
              <a-input :disabled="false" v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="估值批次">
              <a-input :disabled="false" v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="券商\期货商">
              <a-input :disabled="false" v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="标题">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="发件人">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="附件个数">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="密码文件名">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="密码">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="是否启用">
              <a-switch default-checked @change="handleOnChange" />
            </a-form-item>
          </a-col>
          <!-- <a-col :md="12" :sm="24">
            <a-form-item label="密码">
              <a-input v-decorator="['description', {rules: [{required: false, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
            </a-form-item>
          </a-col> -->
        </a-row>
        <a-row>
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
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

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
  },
  methods: {
    handleOnChange (checked) {
      console.log(`a-switch to ${checked}`);
    }
  }
}
</script>
