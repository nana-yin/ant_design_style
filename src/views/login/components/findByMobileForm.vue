<template>
  <div class="finfByMobile">
    <Cancel :way="1" />
    <Step :step-value="1" />

    <a-form-model ref="mobileForm" :model="mobileForm" :rules="mobileFormRules">
      <a-form-model-item prop="mobile">
        <a-input v-model="mobileForm.mobile" placeholder="请输入手机号" />
      </a-form-model-item>
      <a-form-model-item prop="code">
        <a-input v-model="mobileForm.code" placeholder="请输入短信验证码">
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
import { isMobile } from '@/utils/validate'

export default {
  name: 'FindByMobileForm',
  components: {
    Cancel,
    Step
  },
  props: {},
  data() {
    const validatorMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!isMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      mobileForm: {
        mobile: storage.get('mobile') || '',
        code: storage.get('captcha') || ''
      },
      mobileFormRules: {
        mobile: [{ required: true, validator: validatorMobile, trigger: 'blur' }],
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
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
      this.$refs.mobileForm.validateField('mobile')
      if (this.mobileForm.mobile === '') return
      if (!isMobile(this.mobileForm.mobile)) return
      loginApi.queryCaptchaMobile({
        mobile: this.mobileForm.mobile,
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
      this.$refs.mobileForm.validate((valid) => {
        if (valid) {
          this.$router.push('/login?findWay=1&isReset=true')
          storage.set('mobile', this.mobileForm.mobile)
          storage.set('captcha', this.mobileForm.code)
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
