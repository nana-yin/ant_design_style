<template>
  <div class="findPwdStep">
    <div class="find-box">
      <div class="find-box__title">找回密码</div>
      <div class="find-box__content">
        <div class="small-title">请选择找回方式</div>
        <div class="check-radio">
          <a-radio-group v-model="radioValue">
            <a-radio :value="1">
              通过手机号找回
            </a-radio>
            <a-radio :value="2">
              通过邮箱找回
            </a-radio>
          </a-radio-group>
        </div>
      </div>
      <a-button type="primary" block @click="nextStep">下一步</a-button>
    </div>
    <div class="cancel-login" @click="cancelLogin">返回登录</div>
  </div>
</template>
<script>
export default {
  name: 'FindPwdStep',
  props: {

  },
  data() {
    return {
      radioValue: 1
    }
  },
  methods: {
    cancelLogin() {
      this.$router.push('/login')
    },
    nextStep() {
      this.$router.push('/login?findWay=' + this.radioValue)
    }
  }
}
</script>
<style lang="stylus" scoped>
.findPwdStep
    padding 28px 30px 83px 61px
    display flex
    align-items flex-start
    .find-box
        flex 1
        &__title
            color #000000
            font-size 30px
            margin-top 46px
        &__content
            .small-title
                color #333333
                margin-top 20px
                margin-bottom 20px
            .check-radio
                margin-top 23px
                margin-bottom 60px
    .cancel-login
        color #1d76f1
        cursor pointer
</style>
