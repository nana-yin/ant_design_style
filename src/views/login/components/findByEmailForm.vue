<template>
  <div class="finfByMobile">
    <Cancel :way="2" />
    <Step :step-value="2" />

    <a-form-model ref="emailForm" :model="emailForm" :rules="emailFormRules">
      <a-form-model-item prop="email">
        <a-input v-model="emailForm.email" placeholder="请输入邮箱" />
      </a-form-model-item>
      <a-form-model-item prop="code">
        <a-input v-model="emailForm.code" placeholder="请输入邮箱验证码">
          <span
            slot="suffix"
            :class="canClick ? 'getcode canclick' : 'getcode'"
            @click="getCode"
          >{{ codeText }}</span>
        </a-input>
      </a-form-model-item>
      <a-button type="primary" block @click="submit">
        找回密码
      </a-button>
    </a-form-model>
  </div>
</template>
<script>
import Cancel from './cancel'
import Step from './step'
import loginApi from '@/model/loginActions'
import { storage } from '@/assets/js/util'
import { isEmail } from '@/utils/validate'

export default {
  name: 'FindByEmailForm',
  components: {
    Cancel,
    Step
  },
  props: {},
  data() {
    const validatorEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!isEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      emailForm: {
        email: storage.get('email') || '',
        code: storage.get('captcha') || ''
      },
      emailFormRules: {
        email: [{ required: true, validator: validatorEmail, trigger: 'blur' }],
        code: [
          { required: true, message: '请输入邮箱验证码', trigger: 'blur' }
        ]
      },
      codeText: '获取验证码',
      time: 60,
      timer: '',
      canClick: true
    }
  },
  methods: {
    getCode() {
      if (!this.canClick) return
      this.$refs.emailForm.validateField('email')
      if (this.emailForm.email === '') return
      if (!isEmail(this.emailForm.email)) return
      loginApi.queryCaptchaEmail({
        email: this.emailForm.email,
        type: 1
      }).then(res => {
        this.timer = setInterval(() => {
          this.canClick = false
          this.time--
          this.codeText = this.time + 's'
          if (this.time === 0) {
            this.canClick = true
            clearTimeout(this.timer)
            this.time = 60
            this.codeText = '获取验证码'
          }
        }, 1000)
      })
    },
    submit() {
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          this.$router.push('/login?findWay=2&isReset=true')
          storage.set('email', this.emailForm.email)
          storage.set('captcha', this.emailForm.code)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.finfByMobile
    margin-top 30px
    margin-right 26px
    margin-left 62px
    .getcode
        color #1d76f1
        &.canclick
            cursor pointer
</style>
