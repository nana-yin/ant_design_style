/* eslint-disable vue/order-in-components */
<template>
  <div :class="header">
    <div :class="layoutHeader">
      <div class="header-nav">
        <div
          v-for="(item, index) in roleList"
          :key="mainMenu[index].name"
          :class="{ 'nav-active': index === routeState }"
        >
          <router-link
            v-if="item"
            :class="index === routeState ? 'nav-active link' : 'link'"
            :to="mainMenu[index].path"
          >{{ mainMenu[index].title }}</router-link>
          <span v-else @click="handleRoute(mainMenu[index].path, index)">
            {{ mainMenu[index].title }}</span>
        </div>
      </div>
      <div class="user-wrap">
        <div v-if="!userId" :class="userLogin" @click="goLogin">登录</div>
        <div v-if="userId" class="user-icon" @click="handleUserCenter">
          <img :src="avator" :onerror="defaultImg" alt="">
        </div>
        <div v-if="userId" :class="userNameClass" @click="handleUserCenter">{{ userName }}</div>
        <div v-if="userId" :class="logOut" @click="handleSignout">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
import { clearCookie, storage } from '@/assets/js/util'

import { mapMutations, mapGetters } from 'vuex'
// import config from '../../model/const'

const mainMenu = [
  {
    name: 'home',
    title: '机会发现',
    path: '/'
  },
  {
    name: 'assetsCompass',
    title: '资产罗盘',
    path: '/assetsCompass'
  },
  {
    name: 'assetStrategy',
    title: '资产策略中心',
    path: '/assetStrategy'
  }

]

export default {
  name: 'LayoutHeader',
  components: {

  },
  data() {
    return {
      mainMenu,
      userId: '',
      defaultImg: 'this.src="' + 'http://imagetest.attractorcap.com/image/2018/10/16/0d5c0d968cb75e3905e414e210f6eea9.jpeg"',
      userName: '',
      roleList: [true, true, true],
      routeState: 0,
      avator: '',
      headerLogo: 'header-logo',
      layoutHeader: 'layout-header layout-header-other',
      header: 'header',
      userLogin: 'user-login colorBlack',
      userNameClass: 'user-name colorBlack',
      logOut: 'log-out colorBlack'
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  watch: {
    $route: {
      handler(newVal) {
        this.mainMenu.map((item, index) => {
          if (this.$route.fullPath.indexOf(item.path) !== -1) {
            this.routeState = index
          }
        })
      },
      immediate: true
    },
    getUserInfo: {
      handler(newVal) {
        if (Object.keys(newVal).length > 0) {
          this.userName = newVal.userName
          this.userId = newVal.userId
          this.avator = newVal.avatar
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    goto() {
      this.$router.push({
        path: '/'
      })
    },
    goLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    handleRoute(route) {
      this.$router.push(route)
    },
    // 用户点击头像时，跳转到个人中心
    handleUserCenter() {
      this.$router.push('/person')
    },
    handleSignout() {
      clearCookie()
      storage.clear()
      this.$router.push('/login')
      var expTowDay = new Date()
      expTowDay.setTime(expTowDay.getTime() - 172800000)
      document.cookie = 'Token=' + '' + ';expires=' + expTowDay.toGMTString() + ';path=/;domain=.jiaao.ltd'
      // document.cookie = 'Account=' + '' + ';expires=' + expTowDay.toGMTString() + ';path=/;domain=.jiaao.ltd'
      // document.cookie = 'Password=' + '' + ';expires=' + expTowDay.toGMTString() + ';path=/;domain=.jiaao.ltd'
      // document.cookie = 'isRemember=' + '' + ';expires=' + expTowDay.toGMTString() + ';path=/;domain=.jiaao.ltd'
      this.updateUserInfo({})
    },
    deleteCookieDomain(name) {
      var myDate = new Date()
      myDate.setTime(-100000) // 设置时间
      let domain = window.location.href.split('//')[1].split('/')[0]
      domain
        .split('.')
        .splice(0, 1)
        .join('.')
      const arr = domain.split('.')
      arr.splice(0, 1)
      domain = arr.join('.')
      document.cookie =
        name +
        "=''; expires=" +
        myDate.toGMTString() +
        ';path=/;max-age=0;domain=' +
        domain
    }
  }
}
</script>

<style lang="stylus" chareset="utf-8">
.header
  display flex
  justify-content center
  align-items center
  width 100%
  height 67px
  background #fff
  box-shadow 0 2px 9px 0 rgba(0, 0, 0, 0.09)
  z-index 100
  .layout-header
    height 67px
    // width 1200px
    color rgb(234, 204, 92)
    margin 0 auto
    position relative
    z-index 2
    display flex
    justify-content space-between
    align-items center
    @media (min-width 1200px) {
      width 1200px
    }
    @media (max-width 1200px) {
      min-width 90%
    }
    @media (max-width: 980px) {
      //  min-width 980px
    }
    .user-wrap
      width 200px
      height 60px
      float right
      display inline-block
      position relative
      overflow hidden
      cursor auto
      @media (max-width: 980px) {
        width 150px
      }
      .user-login
        position absolute
        display inline-block
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        width 40px
        height 40px
        top 24px
        right 40px
        cursor pointer
      .user-icon
        position absolute
        display inline-block
        width 30px
        height 60px
        // background  no-repeat url(../../assets/images/avatar.png)
        background-size 30px
        background-position-y 15px
        cursor pointer
        top 20px
        img
          width 30px
          height 30px
          border-radius 50%;
      .user-name
        position absolute
        display inline-block
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        width 100px
        height 40px
        right 40px
        top 22px
        cursor pointer
      .log-out
        position absolute
        font-size 12px
        display inline-block
        width 30px
        height 30px
        left 170px
        top 25px
        cursor pointer
        color rgb(234, 204, 92)
        @media (max-width: 980px) {
          left 100px
        }
      .colorBlack
        color: #666 !important;
    .header-logo
      cursor pointer
      float left
      z-index 2
      width 259px
      height 50px
      background url(https://attractor-1.oss-cn-hangzhou.aliyuncs.com/Aurora/web/robot/img/logo1.png) no-repeat center
      background-size 90%
      position relative
      @media (max-width: 980px) {
        width 240px
      }
      @media (max-width: 600px) {
         width 200px
      }
      @media (max-width: 375px) {
       width 180px
      }
      @media (max-width: 320px) {
        width 150px
      }
      &.header-logo-o
        background url(https://attractor-1.oss-cn-hangzhou.aliyuncs.com/Aurora/web/robot/img/logo-o.png) no-repeat center
      .cover
        position absolute;
        left 0
        top 0
        opacity 0
        z-index 3
        width 100%
        height 50px
    .header-nav
      display flex
      align-items center
      text-align center
      margin auto
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
      font-size 16px
      > div
        display inline-block
        cursor pointer
        box-sizing border-box
        margin  0 25px
        &:first-child
          margin-left 0
        &:last-child
          margin-right 0
        .link
          text-decoration none
          font-size 16px
          color #fff
          padding-bottom 15px
        &.nav-active
          .link
            color #1850fd !important
            border-bottom 2px solid #1850fd

.layout-header-other
  background-color #ffffff
  .header-nav
    .link
      color #666 !important

.header-home
   background rgba(0,0,0,0.15)

.modify-modal-grant
   .ant-modal-body
     padding 0px !important
.ant-tooltip-inner{
   font-size 16px
  }
.router-link-active:visited {text-decoration:none;}
.router-link-active:active {text-decoration:none;}
.router-link-active:hover {text-decoration:none;}
.router-link-active:link {text-decoration:none;}
</style>
<style lang="stylus">
.ant-popover-title{
  display: none
}
a:visited{
  text-decoration:none;
}
a:active{
  text-decoration:none;
}
a:hover{
  text-decoration:none;
}
a:link{
  text-decoration:none;
}
</style>
