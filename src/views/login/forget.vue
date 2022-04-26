<template>
  <div class="forget fillcontain">
    <div class="forgetStep">
      <a-steps :current="stepIndex-1">
        <a-step>
          <template slot="title">
            账号验证
          </template>
          <!-- <span slot="description">账号验证</span> -->
        </a-step>
        <a-step>
          <template slot="title">
            修改密码
          </template>
          <!-- <span slot="description">修改密码</span> -->
        </a-step>
      </a-steps>
      <div v-if="stepShow == 1" class="forgetStep1">
        <a-input v-model="account" class="input" placeholder="请输入邮箱或手机号" />
        <a-button class="sendBtn" :disabled="disabled=!show" @click="send">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{ count }} s</span>
        </a-button>
        <a-input v-model="verificationCode" class="input" placeholder="请输入验证码" />
        <a-button class="forgetStep1Next button buttonPipaluk buttonInverted  buttonRounds buttonTextThick" @click="stepAdd">下一步</a-button>
      </div>
      <div v-if="stepShow == 2" class="forgetStep2">
        <a-input v-model="password" class="input" placeholder="请输入新密码" type="password" />
        <a-input v-model="newPassword" class="pwd input" placeholder="确认新密码" type="password" />
        <a-button class="forgetStep1Next button buttonPipaluk buttonInverted  buttonRounds buttonTextThick" @click="sumlite">确认修改</a-button>
      </div>
      <div class="return">
        <router-link tag="a" :to="{name:'login'}">返回</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../model/loginActions/index'

const TIME_COUNT = 60 //更改倒计时时间
export default {
  components: {
    // canvasBg
  },
  data() {
    return {
      account: '', //邮箱或手机号
      stepIndex: 1, //当前步骤
      stepShow: 1, //当前步骤
      password: '', //密码
      newPassword: '', //新密码
      verificationCode: '', //验证码
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null
    }
  },
  computed: {
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    //下一步
    stepAdd() {
      if (this.verificationCode === '') {
        this.$notify({ title: '警告', message: '请输入验证码', type: 'warning' })
        return false
      }
      this.stepIndex++
      this.stepShow++
    },
    //发送信息
    send() {
      if (this.account !== '') {
        //判断用户输入的是手机号还是邮箱
        var regEmail = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
        var regPhone = /^1[3|4|5|7|8|9][0-9]{9}$/
        if (regEmail.test(this.account)) {
          axios.queryCaptchaEmail({ email: this.account, type: 1 }).then((res) => {
            if (res.respCode === 200) {
              this.$notification.success({
                message: '提示',
                description: `发送成功`,
                duration: 5
              })
              //倒计时
              if (!this.timer) {
                this.count = TIME_COUNT
                this.show = false
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--
                  } else {
                    this.show = true
                    clearInterval(this.timer) // 清除定时器
                    this.timer = null
                  }
                }, 1000)
              }
            } else {
              this.$message.error(res.data.respMsg)
            }
          })
        } else if (regPhone.test(this.account)) {
          axios.queryCaptchaMobile({ mobile: this.account, type: 1 }).then((res) => {
            if (res.respCode === 200) {
              this.$notification.success({
                message: '提示',
                description: `发送成功`,
                duration: 5
              })
              //倒计时
              if (!this.timer) {
                this.count = TIME_COUNT
                this.show = false
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--
                  } else {
                    this.show = true
                    clearInterval(this.timer) // 清除定时器
                    this.timer = null
                  }
                }, 1000)
              }
            } else {
              this.$message.error(res.data.respMsg)
            }
          })
        } else {
          this.$notification.warning({ message: '警告',
            description: '无效的账号'
          })
        }
      } else {
        this.$notification.warning({ message: '警告',
          description: '账号不能为空'
        })
      }
    },
    //确认修改密码 验证 两次密码输入是否为空
    sumlite() {
      var regEmail = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
      var regPhone = /^1[3|4|5|7|8|9][0-9]{9}$/
      if (this.password === '') {
        this.$notification.warning({ message: '警告',
          description: '密码不能为空'
        })
        return false
      } else if (this.password.length < 8) {
        this.$notification.warning({ message: '警告',
          description: '密码长度大于8'
        })
        return false
      } else if (this.newPassword === '') {
        this.$notification.warning({ message: '警告',
          description: '确认密码不能为空'
        })
        return false
      } else if (this.newPassword.length < 8) {
        this.$notification.warning({ message: '警告',
          description: '确认密码长度大于8'
        })
        return false
      } else if (this.newPassword !== this.password) {
        this.$notification.warning({ message: '警告',
          description: '两次输入密码不相同'
        })
        return false
      }
      if (regEmail.test(this.account)) {
        const param = {
          email: this.account,
          captcha: this.verificationCode,
          password: this.password,
          type: 1
        }
        axios.queryForgetEmail(param).then((res) => {
          if (res.respCode === 200) {
            this.$message.success('修改成功')
            this.$router.push('/login')
          } else {
            this.$message.error(res.data.respMsg)
          }
        })
      } else if (regPhone.test(this.account)) {
        const param = {
          captcha: this.verificationCode,
          mobile: this.account,
          password: this.password,
          type: 1
        }
        axios.queryForgetMobile(param).then((res) => {
          if (res.respCode === 200) {
            this.$message.success('修改成功')
            this.$router.push('/login')
          } else {
            this.$message.error(res.data.respMsg)
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.fillcontain
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  background: url(../../assets/svg/auroraBg.svg);
  z-index:0;
  zoom: 1;
  background-color: #f0f2f5;
  background-repeat: no-repeat;
  background-size: 100%;
  -webkit-background-size: 100%;
  -o-background-size: 100%;
  background-position: center 0;
 .forget {
    .forgetStep {
        position: absolute;
        z-index: 1111;
        opacity: 1;
        top: 20px;
        transition-property: transform, opacity, box-shadow, top, left;
        transition-duration: 0.5s;
        transform-origin: 161px 100%;
        transform: rotateX(0deg);
        width: 440px;
        height: 300px;
        @media (max-width: 600px) {
          width:90vw;
        }
        right: 0;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 0px 20px 0 20px;
        .forgetStep1,.forgetStep2,.forgetStep3,.forgetStep4 {
            margin-top: 10px;
            text-align: center;
            .forgetStep1Next {
                width: 368px;
                float: none;
                font-size: 14px;
                height 40px
                padding: 10px 0;
                border-radius: 5px;
                margin: 20px auto 35px;
                cursor: pointer;
                background: #1890ff;
                color: white;
                @media (max-width: 600px) {
                    width:90vw;
                    margin-left:0px;
                }
            }
        }
        .forgetStep3 {
            font-size: 0;
            .input:nth-child(1) {
              box-sizing: border-box;
              padding-right: 10px;
            }
            .input:nth-child(2) {
              box-sizing: border-box;
              padding-left: 10px;
            }
            .forgetStep3UpImg {
              margin-top: 30px;
              text-align: left;
              h5 {
                height: 52px;
                line-height: 52px;
                float: left;
                font-size: 12px;
                color: #C0C4CC;
                padding-left: 15px;
                margin-right: 10px;
              }
            }
        }
        .forgetStep1 {
            margin-top: 10px;
            .sendBtn {
                display: block;
                height: 40px;
                width: 368px;
                line-height: 30px;
                padding: 0;
                margin: 24px auto;
                border: none !important;
                border-radius: 0;
                @media (max-width: 600px) {
                  width:90vw;
                }
                span:nth-child(1) {
                }
            }
        }
    }
    .el-step {
        .el-step__title {
            font-size: 12px;
        }
        .el-step__title.is-process {
            color: rgba(0,0,0,.65);
        }
        .el-step__icon.is-text {
            border-color: #c3c3c3;
            color: grey;
        }
    }
    .input {
        margin-bottom: 0px;
        background: transparent;
        border-radius: 5px;
        width: 368px;
        height 40px
        color: rgba(0,0,0,.65);
        background: white;
        @media (max-width: 600px) {
          width:90vw;
        }
    }
}
.close-button {
  display: none;
}
.return {
  position: absolute;
  // bottom: -10px;
  right: 20px;
  a {
    font-size: 14px;
    color: #1890ff;
  }
}
.pwd{
  margin-top: 20px;
}
</style>
