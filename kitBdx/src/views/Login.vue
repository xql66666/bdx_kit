<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
          
            <login-card header-color="green">
              <h4 slot="title" class="card-title">第三方(暂未开通)</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-qq"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-weixin"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-github"></i>
              </md-button>


              <!-- <p slot="description" class="description">密码登录</p> -->
              <md-button id="pslogin" slot="button" :class="logincard?'md-simple md-success md-lg':'md-simple md-error md-lg'" @click="logincard = true">
                密码登录
              </md-button>
              <md-button slot="button" :class="logincard?'md-simple md-error md-lg':'md-simple md-success md-lg'" @click="logincard = false ">
                免密登录
              </md-button>

              
              <md-field class="md-form-group" slot="inputs">
                <md-icon>phone_android</md-icon>
                <label>手机号...</label>
                <md-input v-model="loginUser.username"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs" v-show="logincard">
                <md-icon>lock_outline</md-icon>
                <label>密码...</label>
                <md-input v-model="loginUser.password" type="password"></md-input>
              </md-field>
              
              <md-field class="md-form-group" slot="inputs" v-show="!logincard">
                <md-icon>chat_bubble_outline</md-icon>
                <label>6位数字验证码</label>
                
                <md-input v-model="loginUser.logincode"></md-input>
                <md-button v-show="show" id="smsbutton" class="md-primary md-raised" @click="SendSms()">获取验证码</md-button>
                <md-button v-show="!show" id="smsbutton" class="md-primary md-raised">{{count}}秒</md-button>
              </md-field>
              
              <md-button slot="footer" class="md-simple md-success md-lg" @click="login()" v-show="logincard">
                密码登录
              </md-button>
              <md-button slot="footer" id="nopasswordlogin" class="md-simple md-success md-lg" @click="codelogin()" v-show="!logincard">
                免密登录
              </md-button>

              
              
            </login-card>
         
            <md-dialog-alert
                :md-active.sync="smsdialog"
                md-content="短信验证码发送成功，请留意手机短信通知噢"
                md-confirm-text="知道啦!" />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components"
import { login, codelogin, sendloginsms, findUcComplete } from '@/api/user'
import { setUser } from '@/util/auth'
import { Loading } from 'element-ui';
import { isvalidUsername, isvalidPassword } from '@/util/validate'
const TIME_COUNT = 60;
export default {
  name: 'login',
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      loginUser: {
        username: '',
        password: '',
        logincode: ''
      },
      info: {},
      smsdialog: false,
      show: true,
      count: '',
      timer: null,
      logincard: true,
      //loading: true,
      options: {
        text: '登陆中...'
      }
      
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    
    login() {
      if(!isvalidUsername(this.loginUser.username)) {
        this.$message.error('请输入正确的手机号格式！');
        return false;
      }
      if(!isvalidPassword(this.loginUser.password)) {
        this.$message.error('请输入正确的密码格式！（5~16位字母，数字或者符号）');
        return false;
      }

      let loadingInstance = Loading.service(this.options);
      this.$store.dispatch('Login', this.loginUser).then(() => {
        loadingInstance.close();
        this.$router.push({ path: '/' })
        findUcComplete().then(response => {
          this.data = response.data
          if( this.data === 0){
              this.$notify.info({
                title: '提示',
                message: '请在个人中心里完善自己的信息噢~',
                duration: 0,
                offset: 30
              });
          }
          
        })
      }).catch(() => {
        loadingInstance.close();
      })
    },
    codelogin() {
      if(!isvalidUsername(this.loginUser.username)) {
        this.$message.error('请输入正确的手机号格式！');
        return false;
      }
      let loadingInstance = Loading.service(this.options);
      this.$store.dispatch('CodeLogin', this.loginUser).then(() => {
        loadingInstance.close();
        this.$router.push({ path: '/' })
      }).catch(() => {
        loadingInstance.close();
      })
    },
    SendSms(){

      if(!isvalidUsername(this.loginUser.username)) {
        this.$message.error('请输入正确的手机号格式！');
        return false;
      }
        if(!this.timer) {
            this.count = TIME_COUNT
            this.show = false
            this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--
                  } else {
                    this.show = true
                    clearInterval(this.timer)
                    this.timer = null
                  }
                }, 1000)
        }
        sendloginsms(this.loginUser.username).then(response => {
            this.code = response.code
            if(this.code === 200){
                this.smsdialog = true
            }else{
                this.count = 5
            }
        })
        
    },
  }
};
</script>

<style lang="css">
  #pslogin {
      margin-left: 15px;
  }
  #smsbutton {
            margin-top: -9px
        }
        #nopasswordlogin{
            margin-left: -1px
        }
</style>
