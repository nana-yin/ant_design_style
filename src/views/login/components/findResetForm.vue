<template>
  <div class="FindResetForm">
    <Cancel :way="way" />
    <Step :step-value="way" />

    <a-form-model ref="resetForm" :model="resetForm" :rules="resetFormRules">
      <a-form-model-item prop="password">
        <a-input-password
          v-model="resetForm.password"
          type="password"
          placeholder="请输入新密码"
        />
      </a-form-model-item>
      <a-form-model-item prop="newPassword">
        <a-input-password
          v-model="resetForm.newPassword"
          placeholder="请再次输入密码"
        />
      </a-form-model-item>
      <a-button :loading="loading" type="primary" block @click="sure">确定</a-button>
    </a-form-model>
  </div>
</template>

<script>
import Cancel from './cancel'
import Step from './step'
import { storage } from '@/assets/js/util'
import loginApi from '@/model/loginActions'
export default {
  name: 'FindResetForm',
  components: {
    Cancel,
    Step
  },
  props: {
  },
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
      loading: false,
      resetForm: {
        password: '',
        newPassword: ''
      },
      resetFormRules: {
        password: [{ required: true, validator: validatorPwd1, trigger: 'blur' }],
        newPassword: [{ validator: validatorPwd2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    way() {
      const findWay = Number(this.$route.query.findWay)
      return findWay
    }
  },
  methods: {
    sure() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          if (this.loading) return
          this.loading = true
          const api = this.way === 1 ? loginApi.queryForgetMobile : loginApi.queryForgetEmail
          const postData = this.way === 1 ? {
            captcha: storage.get('captcha'),
            mobile: storage.get('mobile'),
            type: 1,
            password: this.resetForm.password
          } : {
            captcha: storage.get('captcha'),
            email: storage.get('email'),
            type: 1,
            password: this.resetForm.password
          }

          api(postData).then(res => {
            this.$router.push('/login')
            storage.remove('mobile')
            storage.remove('email')
            storage.remove('captcha')
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
.FindResetForm
    margin-top 30px
    margin-right 26px
    margin-left 62px
    .getcode
        color #1d76f1
        &.canclick
            cursor pointer
</style>
