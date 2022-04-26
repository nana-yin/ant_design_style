<template>
  <a-form-model
    ref="resetForm"
    class="resetForm"
    :model="resetForm"
    :rules="resetFormRules"
  >
    <div class="reset-tips">
      <span class="reset-tips__title">重置密码</span>
      <span class="reset-tips__content">首次登录，为保证您账户的安全，请重置密码</span>
    </div>
    <a-form-model-item prop="password">
      <a-input-password
        v-model="resetForm.password"
        placeholder="请输入新密码"
      />
    </a-form-model-item>
    <a-form-model-item prop="newPassword">
      <a-input-password
        v-model="resetForm.newPassword"
        placeholder="请再次输入密码"
      />
    </a-form-model-item>
    <a-button :loading="loading" type="primary" block @click="submit">保存并登录</a-button>
  </a-form-model>
</template>
<script>
import loginApi from '@/model/loginActions'
import { clearCookie, getCookie } from '@/assets/js/util'
import { decrypt } from '@/utils/crypto'

export default {
  name: 'ResetForm',
  props: {},
  data() {
    const validatorPwd1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.resetForm.newPassword !== '') {
          this.$refs.resetForm.validateField('newPassword')
        }
        callback()
      }
    }
    const validatorPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        password: '',
        newPassword: ''
      },
      resetFormRules: {
        password: [
          {
            required: true,
            validator: validatorPwd1,
            trigger: 'blur'
          }
        ],
        newPassword: [{ required: true, validator: validatorPwd2, trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    submit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          if (this.loading) return
          this.loading = true
          loginApi.firstModifyPwd({
            account: getCookie('accountLogin'),
            password: decrypt(getCookie('passwordLogin')),
            newPassword: this.resetForm.password,
            newPasswordRepeat: this.resetForm.newPassword
          }).then(res => {
            clearCookie()
            this.$router.push('/login')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.resetForm
    margin 70px
    .ant-form-item
    margin-bottom 14px
    &-with-help
        margin-bottom 5px
    .reset-tips
      display flex
      flex-direction column
      margin-bottom 20px
      &__title
        font-size 30px
        color #000000
      &__content
        font-size 14px
        color #333333
</style>
