<template>
    <el-main>
        <h3><strong>个人资料</strong></h3>
        <br /><hr /><br />
        
        
            <el-container>
                <el-aside width="120px">
                    
                        
                    <div class="demo-type">
                        <div>
                            <el-avatar :size="100" v-bind:src="info.headImgUrl"></el-avatar>
                        </div>
                        
                        <!-- <el-button style="margin-left: 22px; padding: 3px 0" type="text" @click="UpdateHeadImg">修改头像</el-button> -->
                        <el-button style="margin-left: 22px; padding: 3px 0" type="text" @click="dialogUpdateHead = true">修改头像</el-button>
                    </div>

                    <el-dialog
                      title="修改头像"
                      :visible.sync="dialogUpdateHead"
                      width="20%"
                      :modal-append-to-body="false">

                      <el-upload
                      class="elupload_HeadImg"
                        name="file"
                        ref="img"
                        action="http://localhost:9020/v2/user/uploadHeadImg"
                        :headers="importHeaders"
                        list-type="picture-card"
                        :limit="1"   
                        :show-file-list="false"     
                        :before-upload="beforeAvatarUpload"
                        :on-success="uploadHeadSuccess"
                        :on-error="uploadHeadError"
                        :on-remove="handleRemove">
                        <!-- <img v-if="imageUrl" :src="info.headImgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      （上传头像后自动保存修改头像）
                      <!-- <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog> -->
                      <!-- <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogUpdateHead = false">取 消</el-button>
                        <el-button type="primary" @click="uploadHeadImg()">上传头像</el-button>
                      </span> -->
                    </el-dialog>

                </el-aside>
                
                <el-main v-loading="loading">
                        <el-card class="box-card" shadow="never">
                          <div slot="header" class="clearfix">
                            <h4 style="margin-left: 500px;">今天不学习，明天变垃圾</h4>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="dialogFormVisible = true">修改资料1</el-button> -->
                            <el-button style="float: right; padding: 3px 0" type="text" @click="showInfo = false">修改资料</el-button>
                            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="showInfo = true">buxiugai</el-button> -->
                          </div>

                            <div class="text item" v-if="showInfo"><span>昵称：{{info.nickname}}</span></div>
                            <!-- <div class="text item" v-if="showInfo"><span>手机：{{info.userPhone}}</span></div> -->
                            <div class="text item" v-if="showInfo"><span>邮箱：{{info.userMail}}</span></div>
                            <div class="text item" v-if="showInfo"><span>性别：{{info.sex | sex}}</span></div>
                            <div class="text item" v-if="showInfo"><span>&nbsp;&nbsp;QQ：{{info.userQq}}</span></div>
                            <div class="text item" v-if="showInfo"><span>生日：{{info.birthday | formatData}}</span></div>
                            <div class="text item" v-if="showInfo"><span>家乡：{{info.homecity}}</span></div>
                            <div class="text item" v-if="showInfo"><span>学校：{{info.school}}</span></div>
                            <div class="text item" v-if="showInfo"><span>年级：{{info.grade}}</span></div>
                            <div class="text item" v-if="showInfo"><span>个人简介：{{info.introduce}}</span></div>

                            <div class="text item" v-if="!showInfo"><span>昵称：</span>
                                <el-input class="infoInput" size="small" v-model="info.nickname" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
                            </div>
                            <div class="text item" v-if="!showInfo"><span>邮箱：</span>
                                <el-input class="infoInput" size="small" v-model="info.userMail" placeholder="请输入内容"></el-input>
                            </div>
                          
                            <div class="text item" v-if="!showInfo"><span>性别：</span>
                              <el-radio v-model="info.sex" label="1">男</el-radio>
                              <el-radio v-model="info.sex" label="0">女</el-radio>
                            </div>
                            <div class="text item" v-if="!showInfo"><span>&nbsp;&nbsp;QQ：</span>
                              <el-input class="infoInput" size="small" v-model="info.userQq" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
                            </div>
                            <div class="text item" v-if="!showInfo"><span>生日：</span>
                              <!-- <el-input class="infoInput" size="small" v-model="info.birthday" placeholder="请输入内容"></el-input> -->
                              <el-date-picker
                                v-model="info.birthday"
                                type="date"
                                placeholder="选择日期">
                              </el-date-picker>
                            </div>
                            <div class="text item" v-if="!showInfo"><span>家乡：</span>
                              <el-input class="infoInput" size="small" v-model="info.homecity" placeholder="请输入内容"></el-input>
                              
                            </div>
                            <div class="text item" v-if="!showInfo"><span>学校：</span>
                              <el-input class="infoInput" size="small" v-model="info.school" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
                            </div>
                            <div class="text item" v-if="!showInfo"><span>年级：</span>
                            
                              <el-select v-model="info.grade" placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </div>
                            <div class="text item" v-if="!showInfo"><span>简介：</span>
                              <el-input class="infoInput" size="small" v-model="info.introduce" placeholder="请输入内容"></el-input>
                            </div>
                            <el-button class="infocancelbut" v-if="!showInfo" @click="CancelInfo()">取 消</el-button>
                            <el-button v-if="!showInfo" type="primary" @click="UpdateInfo()">更 改</el-button>

                            
                                <!-- <md-dialog-alert
                                  :md-active.sync="dialoginfo"
                                  md-title="Post created!"
                                  md-content="Your post <strong>Material Design is awesome</strong> has been created." >
                                  
                                </md-dialog-alert> -->

                            

                                
                              
                            <!-- <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
                                <el-form label-width="80px">
                                  <el-form-item label="昵称">
                                      <el-input v-model="info.nickname"  placeholder="用户昵称"></el-input>
                                  </el-form-item>
                                </el-form>
                                
                                
                                <div slot="footer" class="dialog-footer">
                                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                </div>
                            </el-dialog> -->
                            
                        </el-card>

                        
                        
                        
                
                </el-main>
            </el-container>
            
        

    </el-main>
</template>

<script>
//import { userInfo, updateuserInfo, uploadImg } from '@/api/profile'
import { userInfo, updateuserInfo, findUserHeadImg } from '@/api/profile'
import { getToken, setHeadImg } from '@/util/auth'
import axios from 'axios'
import aes from '@/util/aes'
  export default {
    data () {
      return {
        info:{},
        showInfo: true,
        dialoginfo: false,
        loading: false,
        dialogUpdateHead: false,
        dialogImageUrl: '',
        dialogVisible: false,
       // imageUrl: '',
        importHeaders: {
            'Authorization': 'Bearer ' + getToken(),
            'Timestamp': aes.encrypt(new Date().getTime())
        },
         options: [{
          value: '2013',
          label: '2013级'
        },{
          value: '2014',
          label: '2014级'
        },{
          value: '2015',
          label: '2015级'
        },{
          value: '2016',
          label: '2016级'
        }, {
          value: '2017',
          label: '2017级'
        }, {
          value: '2018',
          label: '2018级'
        }, {
          value: '2019',
          label: '2019级'
        }, {
          value: '2020',
          label: '2020级'
        }],
        
      }
    },
    methods: {
      uploadHeadSuccess() {
        this.loading = true
        findUserHeadImg().then(response => {
          this.data = response.data
          this.info.headImgUrl = this.data
          setHeadImg(this.data)
          console.log(this.data)
        })
        this.dialogUpdateHead = false;
        this.loading = false
        this.$message({
                message: '头像修改成功！',
                type: 'success'
              });
      },
      uploadHeadError() {
        this.dialogUpdateHead = false;
        this.loading =false
        this.$message.error('头像修改失败！');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadHeadImg(file) {
        
         let formData = new FormData();
         formData.append('file', file)
        // uploadImg(this.formData).then(response => {
        //   console.log(response.data.code)
        // })
        console.log(file)
        axios.post('http://localhost:9020/v2/user/uploadHeadImg', formData, { headers: { 'Content-Type': 'multipart/form-data' , 'Timestamp': aes.encrypt(new Date().getTime())} }).then(response => {
          console.log(response.data.code)
        })
        
       // this.$refs.uploadImg.submit();
        //this.dialogUpdateHead = false
        

      },
      // handleAvatarSuccess(res, file) {
      //   this.info.headImgUrl = URL.createObjectURL(file.raw);
      // },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return isJPG;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
          return isLt2M
        }
      },
      getUserInfo() {
          userInfo().then(response => {
            //console.log(response.data.data)
            this.info = response.data
            this.info.sex = this.info.sex.toString()
          })
      },
      UpdateInfo(info) {
        if(this.info.nickname.trim() === '' || this.info.nickname.trim() === undefined || this.info.nickname.trim() === null) {
          this.$message.error('昵称不能为空！');
          return false;
        }
         this.loading = true;
         updateuserInfo(this.info).then(response => {
           if(response.code === 200){
             this.getUserInfo()
             this.showInfo = true
             this.loading = false;
              this.$message({
                message: '信息修改成功！',
                type: 'success'
              });
           }else{
              this.loading = false;
              this.$message.error(response.msg);
           }
         }).catch(() => {
              this.loading = false;
      })
      },
      CancelInfo() {
        //this.loading = true;
        this.getUserInfo()
        //this.loading = false;
        this.showInfo = true
      }
      
    },
   
    created() {
      this.getUserInfo()
    },
    filters: {
      formatData: function (value) {
      let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + MM + '-' + d;
       },
       sex: function(value) {
         if(value === '1') {
          return '男'
         }else{
          return '女'
        }
       }
    }
  }
</script>
<style lang="scss" scoped>
 
 .elupload_HeadImg {
   margin-left: 85px;
 }

 .infocancelbut {
   margin-top: 30px;
   margin-left: 40px;
 }

 .infoInput {
   //margin-left: 40px;
   //margin-top: -22px;
   width: 300px;
 }

 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 58px;
  }
  
  .el-card {
    border: 0px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1400px;
  }

  .el-header, .el-footer {
    //background-color: #B3C0D1;
    //color: #333;
    text-align: left;
    line-height: 0px;
  }
  
  .el-aside {
    //background-color: #D3DCE6;
    //color: #333;
    text-align: left;
    line-height: 0px;
  }
  
  .el-main {
    //background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 0px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 25px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 20px;
  }



</style>
