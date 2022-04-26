<template>
  <div class="step">
    <div class="step-info">
      <span class="step-info__num">01</span>
      <span class="step-info__tip active">{{ stepValue === 1 ? '验证手机号' : '验证邮箱号' }}</span>
    </div>
    <div class="step-line" />
    <div class="step-info">
      <span class="step-info__num">02</span>
      <span :class="isReset ? 'step-info__tip active' : 'step-info__tip'">重置密码</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Step',
  props: {
    stepValue: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {

    }
  },
  computed: {
    isReset() {
      const value = this.$route.query.isReset
      return value === 'true'
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.step
    display flex
    justify-content space-between
    align-items baseline
    margin-top 28px
    margin-bottom 50px
    .step-info
        display flex
        flex-direction column
        align-items center
        &__num
            color #1d76f1
            font-size 26px
        &__tip
            color #999999
            &.active
                color #333333
    .step-line
        height 1px
        flex 1
        background #e5e5e5
</style>
