<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">注册页面</h4>
              


              <p slot="description" class="description">使用手机号注册</p>

              
              <md-field class="md-form-group" slot="inputs">
                <md-icon>phone_android</md-icon>
                <!-- <label class="error" v-if="errors['registerUser.userPhone']">手机号...{{errors['registerUser.userPhone']}}</label>
                <md-input v-model="registerUser.userPhone" v-vuerify="registerUser.userPhone"></md-input> -->
                <label>手机号...</label>
                <!-- <label v-show="!valitePhone">请输入正确的手机号</label> -->
                <md-input v-model="registerUser.userPhone"></md-input>
                
              </md-field>
              
              <md-field class="md-form-group" slot="inputs">
                <md-icon>chat_bubble_outline</md-icon>
                <label>6位数字验证码</label>
                
                <md-input v-model="registerUser.messageCode"></md-input>
                <md-button v-show="show" id="smsbutton" class="md-primary md-raised" @click="SendSms()">获取验证码</md-button>
                <md-button v-show="!show" id="smsbutton" class="md-primary md-raised">{{count}}秒</md-button>
              </md-field>           

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>密码...</label>
                <md-input v-model="registerUser.password" type="password"></md-input>
              </md-field>
              
              <md-button slot="footer" class="md-simple md-success md-lg" @click="Register()">
                注册
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
import { sendsms, register } from '@/api/user'
import { Message } from 'element-ui'
import { Loading } from 'element-ui';
import Aes from '@/util/aes'
import { isvalidUsername, isvalidPassword } from '@/util/validate'
//import Vuerify from 'vuerify'
const TIME_COUNT = 60;
export default {
  name: 'login',
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      registerUser: {
        userPhone: '',
        messageCode: '',
        password: ''
      },
      info: {},
      smsdialog: false,
      show: true,
      count: '',
      timer: null,
      options: {
        text: '注册中...'
      },
      //valitePhone: true
    };
  },
  // vuerify: {
  //   'registerUser.userPhone': {
  //     test: /\w{4,}/,
  //     message: '至少四个字符'
  //   }
  // },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  computed: {
    // errors() {
    //   return this.$vuerify.$errors
    // },
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    
  },
  methods: {
    SendSms(userPhone){
      if(!isvalidUsername(this.registerUser.userPhone)) {
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
        sendsms(this.registerUser.userPhone).then(response => {
            this.code = response.code
            if(this.code === 200){
                this.smsdialog = true
            }else{
                this.count = 5
            }
        })
        
    },
    Register(registerUser){
        // let verifyList = ['registerUser.userPhone'];
        // if(!this.$vuerify.check(verifyList)){
        //   return;
        // }
        // if(!isvalidUsername(this.registerUser.userPhone)){
        //   this.valitePhone = false;
        // }else{
        //   this.valitePhone = true;
        // }
        if(!isvalidUsername(this.registerUser.userPhone)) {
        this.$message.error('请输入正确的手机号格式！');
        return false;
        }
        if(!isvalidPassword(this.registerUser.password)) {
          this.$message.error('请输入正确的密码格式！（5~16位字母，数字或者符号）');
          return false;
        }

        let loadingInstance = Loading.service(this.options);
        register(this.registerUser.userPhone, Aes.encrypt(this.registerUser.password), this.registerUser.messageCode).then(response => {
           this.code = response.code
           if(this.code === 200){
             //console.log("哈哈哈huohuohuo")
              Message({
                message: response.msg,
                type: 'success',
                duration: 5 * 1000
            })
            loadingInstance.close();
            this.$router.push({ path: '/login' })
           }else{
            
             Message({
                message: response.msg,
                type: 'error',
                duration: 5 * 1000
            })
            this.registerUser.userPhone = ''
            this.registerUser.password = ''
            this.registerUser.messageCode = ''
            loadingInstance.close();
           }
        }).catch(() => {
        loadingInstance.close();
      })
    }
    
  }
};
</script>

<style>
        #smsbutton {
            margin-top: -9px
        }
</style>
