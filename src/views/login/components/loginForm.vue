<template>
  <a-form-model
    ref="loginForm"
    class="loginForm"
    :model="loginForm"
    :rules="loginFormRules"
  >
    <div class="greetings">
      <span class="greetings-zh">{{ greetings.zh }}，</span>
      <span class="greetings-en">{{ greetings.en }}</span>
    </div>
    <a-form-model-item prop="account">
      <a-input
        v-model="loginForm.account"
        placeholder="请输入用户名/手机号/邮箱"
      />
    </a-form-model-item>
    <a-form-model-item prop="password">
      <a-input-password
        v-model="loginForm.password"
        placeholder="请输入密码"
      />
    </a-form-model-item>
    <a-button :loading="loading" type="primary" block @click="login">登录</a-button>
    <div class="login-oprator">
      <a-checkbox v-model="isRemember" class="remember">记住密码</a-checkbox>
      <span @click="forgetPwd">忘记密码</span>
    </div>
  </a-form-model>
</template>
<script>

import loginApi from '@/model/loginActions'
import { mapMutations } from 'vuex'
import { addCookie, getCookie } from '@/assets/js/util'
// import constData from '@/model/const'

import { encrypt, decrypt } from '@/utils/crypto'
export default {
  name: 'LoginForm',
  props: {},
  data() {
    return {
      greetings: {
        zh: '',
        en: ''
      },
      loginForm: {
        account: '',
        password: ''
      },
      loginFormRules: {
        account: [
          {
            required: true,
            message: '请输入用户名/手机号/邮箱',
            trigger: 'blur'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      isRemember: false
    }
  },
  computed: {
  },
  created() {
    this.isRemember = getCookie('isRemember') === 'true' || false
    if (this.isRemember) {
      this.loginForm.account = getCookie('Account') || ''
      this.loginForm.password = decrypt(getCookie('Password')) || ''
    }
    this.init()
  },
  mounted() {
    // var expTowDay = new Date()
    // expTowDay.setTime(expTowDay.getTime() - 172800000)
    // document.cookie = 'Token=""' + ';expires=' + expTowDay.toGMTString() + ';path=/;domain=' + constData.domain
    this.$nextTick(() => {
      this.isRemember = getCookie('isRemember') === 'true' || false
      if (this.isRemember) {
        this.loginForm.account = getCookie('Account') || ''
        this.loginForm.password = decrypt(getCookie('Password')) || ''
      }
    })
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    init() {
      const date = new Date()
      const h = date.getHours()
      console.log(h)
      if (h > 4 && h < 12) {
        this.greetings = {
          zh: '早安',
          en: 'Good morning！'
        }
      } else if (h >= 12 && h < 18) {
        this.greetings = {
          zh: '下午好',
          en: 'Good afternoon!'
        }
      } else {
        this.greetings = {
          zh: '晚上好',
          en: 'Good evening!'
        }
      }
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.loading) return
          this.loading = true
          // 首次登录重置密码需要传参数
          addCookie('accountLogin', this.loginForm.account, 172800000)
          addCookie('passwordLogin', encrypt(this.loginForm.password), 172800000)
          loginApi.login({
            account: this.loginForm.account,
            password: this.loginForm.password
          }).then(res => {
            var expTowDay = new Date()
            const a = expTowDay.getTime() - 1
            const overdueTime = new Date(a)
            expTowDay.setTime(expTowDay.getTime() + 172800000)
            // document.cookie = 'Token=' + res.result['token'] + ';expires=' + expTowDay.toGMTString() + ';path=/;domain=.jiaao.ltd'
            document.cookie = 'Token=' + res.result['token'] + ';expires=' + expTowDay.toGMTString() + ';path=/;'

            // this.updateUserInfo(res.result.userInfo)
            // 记住密码
            if (this.isRemember) {
              document.cookie = 'isRemember=' + this.isRemember + ';expires=' + expTowDay.toGMTString()
              document.cookie = 'Account=' + this.loginForm.account + ';expires=' + expTowDay.toGMTString()
              document.cookie = 'Password=' + encrypt(this.loginForm.password) + ';expires=' + expTowDay.toGMTString()
            } else {
              document.cookie = 'isRemember=' + '' + ';expires=' + overdueTime.toGMTString()
              document.cookie = 'Account=' + '' + ';expires=' + overdueTime.toGMTString()
              document.cookie = 'Password=' + '' + ';expires=' + overdueTime.toGMTString()
            }
            // 埋点调用
            loginApi.buiredPoint()
            this.$router.push('/')
          }).finally(() => {
            addCookie('accountLogin', this.loginForm.account, -172800000)
            addCookie('passwordLogin', encrypt(this.loginForm.password), -172800000)
            this.loading = false
          })
        } else {
          addCookie('accountLogin', this.loginForm.account, -172800000)
          addCookie('passwordLogin', encrypt(this.loginForm.password), -172800000)
        }
      })
    },
    forgetPwd() {
      this.$router.push('/login?type=forgetPwd')
    }
  }
}
</script>
<style lang="stylus" scoped>
.loginForm
    margin 70px
    .ant-form-item
    margin-bottom 14px
    &-with-help
        margin-bottom 5px
    .greetings
      display flex
      flex-direction column
      margin-bottom 20px
      &-zh
        color #000000
        font-size 30px
        letter-spacing 0px
      &-en
        color #333333
        font-size 16px
    .login-oprator
      display flex
      justify-content space-between
      align-items center
      margin-top 12px
      color #999999
      .remember
        color #999
      span
        cursor pointer
</style>
