<template>
  <div class="userMess">
    <div class="messLeft">
      <p>用户名</p>
      <p class="tip" style="margin-top: 4px;margin-bottom:0px">{{ userBasicInfo.userName }}</p>
      <p>真实姓名</p>
      <a-input v-model="userBasicInfo.realName" style="width: 224px" />
      <p>昵称</p>
      <a-input v-model="userBasicInfo.nickName" style="width: 224px" />
      <p>性别</p>
      <a-radio-group v-model="userBasicInfo.gender">
        <a-radio :value="0">男</a-radio>
        <a-radio :value="1">女</a-radio>
      </a-radio-group>
      <p>个人简介</p>
      <div>
        <a-input
          v-model="userBasicInfo.profile"
          class="textarea"
          type="textarea"
          :rows="4"
          placeholder="个人简介"
        />
      </div>
      <a-button type="primary" class="btn" @click="info">更新基本信息</a-button>
    </div>
    <div class="avatar">
      <!-- <img class="avatarImg" :src="avatar"> -->
      <a-upload
        class="upload-demo"
        name="image"
        list-type="picture-card"
        :show-upload-list="false"
        :action="url"
        :data="imgData"
        :headers="headers"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="avatar" width="100px" :src="avatar" alt="avatar">
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            头像上传
          </div>
        </div>
      </a-upload>
    </div>
    <div class="clear" />
  </div>
</template>
<script>
import request from '../../model/personActions/index'
// import https from '../../model/loginActions/index'
// import api from '../../model/const'
import { mapActions, mapState, mapMutations } from 'vuex'

// addCookie
import { getCookie } from '@/assets/js/util'

export default {
  data() {
    return {
      sex: '1',
      value: null,
      desc: null,
      file: '',
      avatar: '',
      realName: '',
      fileList: [],
      loading: false,
      headers: {
        'Token': ''
      },
      url: process.env.VUE_APP_BASE_API_URL + '/user/user/avatar/upload',
      userBasicInfo: {
        userId: null,
        nickName: '',
        realName: '',
        gender: null,
        avatar: '',
        profile: '',
        mobile: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => JSON.parse(JSON.stringify(state.user.userInfo))
    })
  },
  watch: {
    userInfo: {
      handler(newVal) {
        this.userBasicInfo = newVal
        this.avatar = newVal.avatar
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.headers['Token'] = getCookie('Token')
    // this.init();
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    ...mapActions(['fetchUserMess']),
    info() {
      const param = {
        userId: this.userBasicInfo.userId,
        realName: this.userBasicInfo.realName,
        gender: this.userBasicInfo.gender,
        profile: this.userBasicInfo.profile,
        nickName: this.userBasicInfo.nickName
      }
      request.userUpdate(param).then((res) => {
        this.updateUserInfo(this.userBasicInfo)
        this.$message.success('修改成功')
      })
    },
    // init() {
    //   https.queryUserInfo().then((res) => {
    //     if (res.respCode === '00') {
    //       // const userInfo = {
    //       //   email: res.result.email,
    //       //   mobile: res.result.mobile,
    //       //   avatar: res.result.userInfo.avatar,
    //       //   nickName: res.result.userInfo.nickName
    //       // }
    //       addCookie('userInfo', JSON.stringify(res.result))
    //       const data = res.result.userInfo
    //       this.sex = data.gender
    //       this.value = data.nickName
    //       this.desc = data.profile
    //       this.realName = data.realName
    //       if (this.avatar === 0) {
    //         this.avatar = ''
    //         return false
    //       }
    //       this.avatar = data.avatar
    //     } else {
    //       this.$message.error(res.data.respMsg)
    //     }
    //   })
    // },
    handleChange(info) {
      if (info.file.status === 'done') {
        this.$message.success('上传成功')
        this.fetchUserMess({})
        setTimeout(() => {
          this.fileList = []
        }, 1000)
      }
    },
    imgData(file) {
      // return { userId: JSON.parse(getCookie('userInfo')).userId }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
    // uploadSuccess(response, file, fileList) {
    //   this.$message.success('上传成功')
    //   this.fetchUserMess({})
    //   setTimeout(() => {
    //     this.fileList = []
    //   }, 1000)
    // }
  }
}
</script>
<style scoped>
.messLeft p {
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 24px;
}
.btn {
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  height: 32px;
  margin-top: 50px;
}
.textarea {
  width: 224px;
}
.messLeft {
  float: left;
  width: 224px;
}
.avatar {
  float: left;
  margin-left: 70px;
  margin-top: 40px;
  text-align: center;
}
.avatar .btn {
  padding: 0 15px;
  height: 32px;
  border-radius: 4px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  font-size: 0px;
  margin-top: 0px;
}
.avatar .btn .up {
  width: 24px;
  height: 20px;
  margin-top: 5px;
}
.avatar .btn span {
  height: 32px;
  line-height: 32px;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  margin-left: 4px;
}
.avatar .upload {
  margin-top: 20px;
}
.avatar .avatarImg {
  width: 144px;
  height: 144px;
  border-radius: 50%;
  margin: 12px auto;
  overflow: hidden;
}
.clear {
  clear: both;
}
</style>
