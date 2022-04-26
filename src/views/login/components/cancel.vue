<template>
  <div class="top">
    <span class="cancel-login" @click="cancelLogin">返回登录</span>
    <span class="by-way" @click="to">{{ way === 1 ? '通过邮箱找回' : '通过手机号找回' }}
      <a-avatar
        class="by-way__go"
        src="http://attractor-1.oss-cn-hangzhou.aliyuncs.com/Aurora/web/Line/glowworm/right.png"
      />
    </span>
  </div>
</template>

<script>
import { storage } from '@/assets/js/util'
export default {
  name: 'Cencel',
  props: {
    // way: {
    //   type: [Number, String],
    //   default: 1
    // }
  },
  data() {
    return {

    }
  },
  computed: {
    way() {
      const findWay = Number(this.$route.query.findWay)
      return findWay
    }
  },
  methods: {
    to() {
      storage.remove('mobile')
      storage.remove('email')
      storage.remove('captcha')
      const findWay = this.way === 1 ? 2 : 1
      this.$router.push('/login?findWay=' + findWay)
    },
    cancelLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
.top
    text-align right
    color #1d76f1
    .cancel-login
        padding 0 10px
        border-right 1px solid #e5e5e5
        cursor pointer
    .by-way
        padding-left 10px
        cursor pointer
        &__go
            display inline-block
            width 16px
            height 16px
</style>
