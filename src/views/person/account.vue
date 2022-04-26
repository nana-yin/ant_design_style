<template>
  <div class="permission">
    <div class="from">
      <div class="fromItem">
        <div class="itemLeft">
          <p>账号密码</p>
          <p class="tip">当前密码强度：强</p>
        </div>
        <div class="itemRight">
          <div @click="modalPass=true">修改</div>
        </div>
        <div class="clear" />
      </div>
      <div class="fromItem">
        <div class="itemLeft">
          <p>绑定手机</p>
          <p class="tip"><span>已绑定手机：</span><span class="input">{{ phone }}</span></p>
        </div>
        <div class="itemRight">
          <div @click="changeModalPhone">修改</div>
        </div>
        <div class="clear" />
      </div>
      <div class="fromItem">
        <div class="itemLeft">
          <p>绑定邮箱</p>
          <p class="tip"><span>已绑定邮箱：</span><span class="input">{{ email }}</span></p>
        </div>
        <div class="itemRight" @click="changeModalEmail">
          <div>修改</div>
        </div>
        <div class="clear" />
      </div>
    </div>
    <a-modal
      v-model="modalPass"
      title="修改密码"
      :footer="null"
    >
      <p class="modelText">
        <a-input v-model="password.oldPassword" type="password" class="inputPass" style="height: 40px;" placeholder="请输入原密码" />
      </p>
      <p class="modelText">
        <a-input v-model="password.newPassword" type="password" class="inputPass" placeholder="请输入新密码" />
      </p>
      <p class="modelText">
        <a-input v-model="password.nextPassword" type="password" class="inputPass" placeholder="确认密码" />
      </p>
      <div class="footer">
        <a-button class="btn" size="large" @click="modalPass=false">取消</a-button>
        <a-button class="btn" size="large" type="primary" @click="sublime">保存</a-button>
      </div>
    </a-modal>
    <a-modal
      v-model="modalPhone"
      title="修改手机号"
      :footer="null"
      width="520px"
    >
      <p class="modelText">
        <a-input v-model="phoneMess.phone" class="inputPass" style="height: 40px;" placeholder="请输入手机号" />
      </p>
      <p class="modelText">
        <a-input v-model="phoneMess.code" class="inputPass" placeholder="请输入验证码" style="width:293px" />
        <a-button class="code" size="large" :disabled="phoneMess.codeState" @click="phoneSend">{{ phoneMess.codeValue }}</a-button>
      </p>
      <p class="modelText">
        <a-input v-model="phoneMess.password" type="password" class="inputPass" placeholder="请输入密码" />
      </p>
      <div class="footer">
        <a-button class="btn" size="large" @click="modalPhone=false">取消</a-button>
        <a-button class="btn" size="large" type="primary" @click="sublimePhone">保存</a-button>
      </div>
    </a-modal>
    <a-modal
      v-model="modalEmail"
      title="修改邮箱"
      :footer="null"
      width="520px"
    >
      <p class="modelText">
        <a-input v-model="emailMess.email" class="inputPass" style="height: 40px;" placeholder="请输入邮箱" />
      </p>
      <p class="modelText">
        <a-input v-model="emailMess.code" class="inputPass" placeholder="请输入验证码" style="width:293px" />
        <a-button class="code" size="large" :disabled="emailMess.codeState" @click="emailSend">{{ emailMess.codeValue }}</a-button>
      </p>
      <p class="modelText">
        <a-input v-model="emailMess.password" type="password" class="inputPass" placeholder="请输入密码" />
      </p>
      <div class="footer">
        <a-button class="btn" size="large" @click="modalEmail=false">取消</a-button>
        <a-button class="btn" size="large" type="primary" @click="sublimeEmail">保存</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import request from '../../model/personActions/index'
import axios from '../../model/loginActions/index' //验证码接口
import { getCookie, storage } from '@/assets/js/util' //cookie 操作方法
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      modalPass: false,
      password: {
        oldPassword: '',
        newPassword: '',
        nextPassword: ''
      },
      modalPhone: false,
      phoneMess: {
        phone: '',
        code: '',
        password: '',
        codeValue: '获取验证码',
        codeState: false
      },
      modalEmail: false,
      emailMess: {
        email: '',
        code: '',
        password: '',
        codeValue: '获取验证码',
        codeState: false
      },
      email: '',
      phone: '',
      phoneTime: null,
      emailTime: null
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  watch: {
    userInfo: {
      handler(newVal) {
        this.phone = newVal.mobile
        this.email = newVal.email
        this.phoneMess.phone = newVal.mobile
        this.emailMess.email = newVal.email
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    changeModalPhone() {
      this.modalPhone = true
      const timestampPhone = storage.get('timestampPhone')
      const nowTimestamp = new Date().getTime()
      let date = 60 - Math.round((nowTimestamp - timestampPhone) / 1000)
      if (date > 0) {
        this.phoneMess.codeState = true
        clearInterval(this.phoneTime)
        this.phoneTime = setInterval(() => {
          date--
          if (date < 10 && date > 0) {
            this.phoneMess.codeValue = '0' + date + 's'
          } else {
            this.phoneMess.codeValue = date + 's'
          }
          if (date === 0) {
            clearInterval(this.phoneTime)
            this.phoneMess.codeValue = '获取验证码'
            this.phoneMess.codeState = false
          }
        }, 1000)
      }
    },
    phoneSend() {
      if (this.phoneMess.phone === '') {
        this.$message.warning('请输入手机号')
        return false
      }
      axios.queryCaptchaMobile({ mobile: this.phoneMess.phone, type: 2 }).then((res) => {
        this.$message.success('发送成功')
        const timestampPhone = new Date().getTime()
        storage.set('timestampPhone', timestampPhone)
        let data = 60
        this.phoneMess.codeState = true
        clearInterval(this.phoneTime)
        this.phoneTime = setInterval(() => {
          data--
          if (data < 10 && data > 0) {
            this.phoneMess.codeValue = '0' + data + 's'
          } else {
            this.phoneMess.codeValue = data + 's'
          }
          if (data === 0) {
            clearInterval(this.phoneTime)
            this.phoneMess.codeValue = '获取验证码'
            this.phoneMess.codeState = false
          }
        }, 1000)
      })
    },
    //修改手机号
    sublimePhone() {
      if (this.phoneMess.password === '') {
        this.$message.warning('请输入密码')
        return false
      }
      const param = {
        mobile: this.phoneMess.phone,
        captcha: this.phoneMess.code,
        password: this.phoneMess.password,
        userId: this.userInfo.userId
      }
      request.mobileChange(param).then((res) => {
        this.$message.success('修改成功')
        this.modalPhone = false
        this.updateUserInfo(Object.assign(this.userInfo, { mobile: this.phoneMess.phone }))
        this.phoneMess.phone = ''
        this.phoneMess.code = ''
        this.phoneMess.password = ''
      })
    },
    changeModalEmail() {
      this.modalEmail = true
      const timestampEmail = Number(storage.get('timestampEmail'))
      if (!timestampEmail) {
        return false
      }
      const nowTimestamp = new Date().getTime()
      let date = 60 - Math.round((nowTimestamp - timestampEmail) / 1000)
      if (date > 0) {
        this.emailMess.codeState = true
        clearInterval(this.emailTime)
        this.emailTime = setInterval(() => {
          date--
          if (date < 10 && date > 0) {
            this.emailMess.codeValue = '0' + date + 's'
          } else {
            this.emailMess.codeValue = date + 's'
          }
          if (date === 0) {
            clearInterval(this.emailTime)
            this.emailMess.codeValue = '获取验证码'
            this.emailMess.codeState = false
          }
        }, 1000)
      }
    },
    //发送邮箱验证码
    emailSend() {
      if (this.emailMess.email === '') {
        this.$message.warning('请输入邮箱')
        return false
      }
      axios.queryCaptchaEmail({ email: this.emailMess.email, type: 2 }).then((res) => {
        this.$message.success('发送成功')
        const timestampEmail = new Date().getTime()
        storage.set('timestampEmail', timestampEmail)
        let data = 60
        this.emailMess.codeState = true
        clearInterval(this.emailTime)
        this.emailTime = setInterval(() => {
          data--
          if (data < 10 && data > 0) {
            this.emailMess.codeValue = '0' + data + 's'
          } else {
            this.emailMess.codeValue = data + 's'
          }
          if (data === 0) {
            clearInterval(this.emailTime)
            this.emailMess.codeValue = '获取验证码'
            this.emailMess.codeState = false
          }
        }, 1000)
      })
    },
    //修改邮箱
    sublimeEmail() {
      if (this.emailMess.password === '') {
        this.$message.warning('请输入密码')
        return false
      }
      const param = {
        email: this.emailMess.email,
        captcha: this.emailMess.code,
        password: this.emailMess.password,
        type: 1,
        userId: this.userInfo.userId
      }
      request.emailChange(param).then((res) => {
        this.$message.success('修改成功')
        this.modalEmail = false
        this.updateUserInfo(Object.assign(this.userInfo, { email: this.emailMess.email }))
        this.emailMess = ''
        this.emailMess.code = ''
        this.emailMess.password = ''
      })
    },
    sublime() {
      if (this.password.oldPassword === '' || this.password.oldPassword === null) {
        this.$message.warning('请输入旧密码')
        return false
      }
      if (this.password.newPassword === '' || this.password.newPassword === null) {
        this.$message.warning('请输入新密码')
        return false
      }
      if (this.password.newPassword.length < 8) {
        this.$message.warning('密码长度要大于8位')
        return false
      }
      if (this.password.nextPassword === '' || this.password.nextPassword === null) {
        this.$message.warning('请输入确认密码')
        return false
      }
      if (this.password.newPassword !== this.password.nextPassword) {
        this.$message.warning('两次密码输入不相同')
        return false
      }
      const param = {
        password: this.password.oldPassword,
        newPassword: this.password.newPassword,
        newPasswordRepeat: this.password.newPassword,
        userId: this.userInfo.userId
      }
      request.passwordChange(param).then((res) => {
        this.$message.success('修改成功')
        this.modalPass = false
        this.password = {
          oldPassword: '',
          newPassword: '',
          nextPassword: ''
        }
      })
    },
    init() {
      const data = JSON.parse(getCookie('userInfo'))
      this.phone = data.mobile
      this.email = data.email
    }
  }
}
</script>
<style lang="css"  scoped>
   .permission{
		padding: 12px 0 24px 2px;
	}
    .permission .from .fromItem{
		padding: 12px 0;
		border-bottom: 1px solid #e8e8e8;
	}
	.fromItem .itemLeft{
		float: left;
	}
	.itemLeft p{
		color: rgba(0,0,0,.65);
		margin-bottom: 4px;
		font-size: 14px;
		line-height: 22px;
		font-weight: 500;
	}
	.itemLeft p:nth-of-type(2){
        color: rgba(0,0,0,.45);
		font-size: 14px;
		line-height: 22px;
	}
	.itemLeft .tip .input{
		display: inline-block;
		width: 230px;
		height: 25px;
		font-size: 14px;
		line-height: 14px;
		margin-top: 8px;
		border: 1px solid #e8e8e8;
		padding: 4px 11px;
		border-radius: 4px;
	}
	.itemLeft .tip span{
		display: inline-block;
		vertical-align: top;
		line-height: 40px;
	}
	.fromItem .itemRight{
		float: right;
		cursor: pointer;
		padding: 0 8px;
		font-size: 14px;
		line-height: 53px;
		text-align: center;
		color: #1890ff;
		background-color: transparent;
		text-decoration: none;
	}
	.clear{
		clear: both;
	}
	.modelText{
		width: 96%;
		margin: auto;
	}
	.modelText:nth-of-type(1){
		margin-top: 0px;
	}
	.modelText .inputPass{
		height: 40px;
		font-size: 16px;
		margin-bottom: 24px;
		padding-left: 4px;
        padding-right: 4px;
	}
	.modelText .code{
		width: 150px;
		font-size: 16px;
		display: inline-block;
		vertical-align: top;
		margin-left: 5px;
		height: 40px;
	}
	.footer{
		text-align: center;
		margin-top: 15px;
		width: 100%;
	}
	.footer .btn{
		margin-left: 50px;
	}
	.footer .btn:nth-of-type(1){
		margin-left: 0px;
	}
</style>
<style>
  .ivu-table th{
    background-color: white;
  }
  .ivu-page-item-active a, .ivu-page-item-active:hover a {
    color: white;
  }
  .v-transfer-dom>.ivu-modal-wrap {
    z-index: 9999 !important;
  }
  .modelText .ivu-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
  }
.footer .ivu-btn-primary{
  color: #fff !important;
}
.modelText .inputPass .ivu-input{
  width: 100%;
  height: 40px;
  font-size: 16px;
}
.ivu-modal-header-inner{
  font-size: 16px;
      font-weight: 500;
}
.footer>.ivu-btn-default:hover{
  color: #515a6e !important;
}
</style>

