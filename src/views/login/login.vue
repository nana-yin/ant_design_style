<template>
  <div class="escape-login-wrap">
    <div class="bg-top">
      <div class="bg-top__left" />
      <div class="bg-top__right" />
      <div class="loginBox">
        <!-- 登录 -->
        <LoginForm v-if="isJutstLogin" />

        <!-- 重置密码 -->
        <ResetForm v-if="isResetPwd" />

        <!-- 找回密码方式 -->
        <FindPwdStep v-if="isFindPwd" />

        <!-- 手机号验证 -->
        <FindByMobileForm v-if="isFindByMobile" />

        <!-- 邮箱验证 -->
        <FindByEmailForm v-if="isFindByEmail" />

        <!-- 重置密码 -->
        <FindResetForm v-if="isFindResetPwd" :way="way" />
      </div>
    </div>
  </div>
</template>
<script>
// import https from '../../model/loginActions/index'
// import { addCookie } from '@/assets/js/util'
// import { mapActions } from 'vuex'

import LoginForm from './components/loginForm'
import ResetForm from './components/resetForm'
import FindPwdStep from './components/findPwdStep'
import FindByMobileForm from './components/findByMobileForm'
import FindByEmailForm from './components/findByEmailForm'
import FindResetForm from './components/findResetForm'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}
export default {
  name: 'Login',
  components: {
    LoginForm,
    ResetForm,
    FindPwdStep,
    FindByMobileForm,
    FindByEmailForm,
    FindResetForm
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formPhone: this.$form.createForm(this),
      formItemLayout,
      userEmail: '',
      userPhone: '',
      passWord: '',
      way: 1,
      isJutstLogin: true,
      isFindPwd: false,
      isResetPwd: false,
      isFindByMobile: false,
      isFindByEmail: false,
      isFindResetPwd: false
    }
  },
  watch: {
    $router: {
      handler(newVal) {
        const current = newVal.history.current
        const query = current.query
        this.isJutstLogin = !Object.keys(query).length
        if (Object.keys(query).length) {
          if (query.type) {
            if (query.type === 'forgetPwd') {
              // 忘记密码
              this.isFindPwd = true
            } else if (query.type === 'resetPwd') {
              // 密码重置
              this.isResetPwd = true
            }
          }
          if (query.findWay) {
            if (Number(query.findWay) === 1) {
              // 手机号验证
              if (query.isReset) {
                this.isFindResetPwd = true
              } else {
                this.isFindByMobile = true
              }
            } else if (Number(query.findWay) === 2) {
              // 邮箱验证
              if (query.isReset) {
                this.isFindResetPwd = true
              } else {
                this.isFindByEmail = true
              }
            }
          }
        }
      },
      immediate: true
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="stylus">
.escape-login-wrap
  height 100%
  .bg-top
    height 360px
    background-color #2b6bff
    display flex
    justify-content space-between
    align-items flex-end
    padding 0 22px
    position relative
    &__left
      background-image url(http://attractor-1.oss-cn-hangzhou.aliyuncs.com/Aurora/web/Line/Glowworm/Img/image/login-left.png)
      width 416px
      height 253px
    &__right
      background-image url(http://attractor-1.oss-cn-hangzhou.aliyuncs.com/Aurora/web/Line/Glowworm/Img/image/login-right.png)
      width 416px
      height 253px
  .loginBox
    position absolute
    width 440px
    height 420px
    border 1px solid #dce1e6
    background #ffffff
    left 50%
    top 150px
    transform translateX(-50%)

</style>
