<template>
  <div class="platform">
    <div class="personContent">
      <div class="pContent">
        <div class="pLeft">
          <a-menu
            style="width: 223px"
            :default-selected-keys="['1']"
            class="el-menu-vertical"
          >
            <a-menu-item key="1" @click="choose(0)">
              <span>基本设置</span>
            </a-menu-item>
            <a-menu-item key="2" @click="choose(1)">
              <span>安全设置</span>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="pRight">
          <div class="title">{{ title[categoryActive] }}</div>
          <Mess v-if="categoryActive===0" />
          <Account v-if="categoryActive===1" />
        </div>
        <div class="clear" />
      </div>
    </div>
  </div>
</template>
<script>
import Mess from './mess.vue'
import Account from './account'
// import { getCookie } from '@/assets/js/util'
export default {
  components: {
    Mess,
    Account
  },
  data() {
    return {
      userMess: {},
      userInfo: {
        avatar: '',
        nickName: ''
      },
      title: ['基本设置', '安全设置'],
      categoryActive: 0,
      station: ''
    }
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    person() {
      this.$router.push({
        path: '/person'
      })
    },
    choose(index) {
      this.categoryActive = index
    },
    loginOut() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="css" scoped>
   .platform{
        width:100%;
        height:100%;
        background-image: url(../../assets/svg/auroraBg.svg);
        height: 100vh;
        overflow: hidden;
        flex-grow: 1;
        background-color: #f0f0f0;
   }
   .platform .header{
        height: 70px;
        width: 100vw;
        background-color: #293042;
   }
   .platform .header img{
       width: 260px;
       height: 50px;
       margin-top: 10px;
       margin-left: 80px;
       cursor: pointer;
   }
   .platform .header .right{
       min-width: 20%;
       height: 70px;
       float: right;
       text-align: left
   }
   .header .right .avatar{
       width: 30px;
       height: 30px;
       border-radius: 50%;
       margin-top: 20px;
       cursor: auto;
   }
   .header .right .num{
       display: inline-block;
       vertical-align: top;
       color: white;
       font-size: 14px;
       line-height: 70px;
       margin-left: 3px;
       cursor: auto;
   }
   .right .station{
       color: #1890ff;
       display: inline-block;
       vertical-align: top;
       line-height: 70px;
       margin-left: 20px;
       cursor: pointer;
       font-weight: 500;

   }
   .while{
       color: white;
       font-weight: 500;
   }
   .header .clear{
       clear:both;
   }
   .icon{
       width: 16px;
       height: 16px;
       display: inline-block;
       vertical-align: top;
       margin-top: 12px;
   }
   .loginout{
       display: inline-block;
       vertical-align: top;
   }
   .personContent{
       font-family: PingFang-SC-Medium;
       width: 100%;
       height: 100%;
       margin-top: 30px;
   }
   .personContent .pContent{
       width: 70%;
       height: 610px;
       margin: auto;
       background-color: white;
   }
   .pContent .pLeft{
       width: 223px;
       float: left;
       height: 100%;
       border-right: 1px solid #f0f0f0;
   }
   .pLeft .el-menu-vertical{
       width: 100%;
   }
   .pContent .pRight{
       width: calc(100% - 255px);
       float: right;
       height: 100%;
       margin-left: 10px;
       padding-right:10px;
   }
   .pRight .title{
		font-size: 20px;
		line-height: 28px;
		font-weight: 500;
        margin-top: 5px;
	}
   .pContent .clear{
       clear: both;
   }
</style>
<style>
 .pLeft .el-menu-item.is-active{
      color: #1890ff;
      background-color: #e6f7ff;
      border-right: 2px solid #1890ff;
  }
  .pLeft .el-menu-item{
      height: 40px;
      line-height: 40px;
  }
</style>

