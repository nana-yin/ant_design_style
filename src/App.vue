<template>
  <a-config-provider :locale="locale">
    <a-layout id="app">
      <div class="videoBox" />
      <layout-header v-if="!isLoginPage" />
      <a-layout-content class="main-content">
        <!-- <keep-alive include="Home">
          <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
        </keep-alive> -->
        <router-view :key="$route.fullPath" />
      </a-layout-content>
    </a-layout>

  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import LayoutHeader from '@/components/LayoutHeader/LayoutHeader.vue'

export default {
  components: {
    LayoutHeader
  },
  data() {
    return {
      locale: zhCN,
      isLoginPage: false,
      InternetState: true,
      visible: false,
      saveState: false,
      feedbackState: false,
      // modularTypeList: ['智能投研', '风险配置', '策略库', '数据中心', '吸引子赋', '其他'],
      // modularUrlList: ['intel', 'product', 'library', 'basics', 'xyzCall'],
      // modularIndex: 5,
      anonymous: false,
      userMess: {
        realName: '',
        email: '',
        mobile: ''
      },
      textNum: 0,
      content: '',
      feedbackShow: true,
      // 判断当前页面是不是智能投研首页
      intelState: false,
      tipState: false,
      pageType: '',
      videoIconUrl: 'http://attractor-1.oss-cn-hangzhou.aliyuncs.com/Aurora/web/Line/Peiqi/img/icon/videoDefeat.png'
    }
  },
  computed: {

  },
  watch: {
    '$route'(to, from) {
      if (to.name === 'login') {
        this.isLoginPage = true
      } else {
        this.isLoginPage = false
      }
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="stylus">
#app
  height 100%
  .feedback
    position absolute
    right 18px
    bottom 50px
    z-index 999
    .radius{
      width: 42px;
      height: 42px;
      background-color: #ffffff;
      box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.09);
      margin-top 16px
      border-radius 50%
      text-align: center;
      cursor pointer
      &:hover{
        box-shadow: 0px 2px 9px 0px rgba(29, 118, 241, 0.25);
      }
      .videoIcon{
        width: 18px;
        height: 18px;
        margin-top 12px
        cursor pointer
      }
      .icon{
        width: 12px;
        height: 30px;
        margin-top 6px
        cursor pointer
      }
    }
    .question{
      background-color: #ffffff;
      &:hover{
        background-color: #f5f5f5;
      }
    }
  .main-content
    width 100%
    height 100%
    // min-width 1200px
    overflow scroll
    -ms-overflow-style: none; //IE 10+
    scrollbar-width none //Firefox
    &::-webkit-scrollbar
      display none
.ant-notification-notice-with-icon .ant-notification-notice-description
  word-break break-all
.feedbackTip
  .ant-tooltip-content
    .ant-tooltip-arrow
      background #ffffff
      display none
  .ant-tooltip-inner
    background: #ffffff
    min-width: 0px;
    min-height: 0px;
    // padding: 6px 8px;
    padding: 0px;
    .lableTip
      background: #fff
      padding: 6px 16px;
      width 116px
      display block
      vertical-align top
      font-size 14px
      color: #666
      line-height 22px
      cursor pointer
      text-align center
      .feedbackIcon{
        width 12px
        height 12px
        display inline-block
        vertical-align top
        margin-top 5px
      }
.feedback-modal-wrap{
  .feedbackText{
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 16px;
    color: #999999;
  }
  .feedbackBox{
    font-size 0px
    .feedbackTitle{
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 22px;
      color: #333333;
      margin-top 32px
      margin-bottom 20px
      .tip{
        font-size: 14px;
        line-height: 20px;
        color: #666666;
      }
      .warning{
        color: #f14538;
        height 20px
        line-height 20px
        font-size: 14px;
        display inline-block
        vertical-align bottom
        line-height 18px
        .warningIcon{
          display inline-block
          vertical-align bottom
          font-size: 18px;
          color: #f14538;
          margin-left 0px
        }
      }
    }
    .modularType{
      width: 100%;
      height: 40px;
      .modularBtn{
        width 100px
        height 32px
        text-align center
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #e7e8ea;
        display inline-block
        font-size: 14px;
        line-height: 32px;
        margin-right 35px
        color: #333333;
        cursor pointer
        position relative
        .corner{
          width: 0;
          height: 0;
          position absolute
          right 0
          bottom 0
          z-index 10
          border-bottom: 16px solid #1d76f1;
          border-left: 15px solid transparent;
        }
        .checkImg{
          width: 6px;
          height: 4px;
          position absolute;
          right 1.5px
          bottom 2px
          z-index 20;
        }
      }
      .modularActive{
        border: solid 1px #1d76f1;
      }
    }
    .userMess{
      .userMessItem{
        font-family: Microsoft YaHei;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 19px;
        letter-spacing: 0px;
        color: #333333;
        height: 32px;
        line-height 32px
        margin-bottom 6px
        margin-left 20px
        .border{
          width: 200px;
          height: 32px;
          line-height 32px
          display inline-block
          vertical-align top
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px #e7e8ea;
          padding-left 12px
        }
        .anonymous{
          font-size: 16px;
          line-height: 22px;
          color: #333333;
        }
        .switch{
          margin-left 10px
        }
        .ant-switch-checked{
          background-color: #34c759;
        }
      }
    }
  }
  .position{
    position relative
    .tipTextNum{
      position absolute
      right 0rem
      top 20px
      z-index 10
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 19px;
      letter-spacing: 0px;
      color: #999999;
    }

  }
  .footerBtn{
    text-align center
    padding-top 20px
    .btn{
      margin-right 20px
    }
  }
}
.feedbackSuccussBox{
  min-height 30px
  width 100%
  text-align center
  font-size 14px
  color: #333333;
  .icon{
    font-size:22px;
    color:#07c160;
    margin-top 3px
  }
  .text{
    display inline-block
    vertical-align top
    height 30px
    line-height 30px
    margin-left 8px
    text-align left
  }
}
.saveFooterBtn{
  text-align center
  padding-top 20px
  .btn{
    margin-right 20px
  }
}
.intelFeedback{
  position absolute
  right 0
  bottom 50px
  z-index 999
  width: 12px;
	height: 66px;
	background-color: #f2f2f2;
	border-radius: 2px 0px 0px 2px;
  cursor pointer
  .icon{
    width: 12px;
    height: 66px;
  }
}
@import './assets/style/changeAntd';
</style>
