<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <!-- <div class="section profile-content"> -->
                    <!-- <el-card class="box-card">
                      <div v-for="o in 4" :key="o" class="text item">
                        {{'列表内容 ' + o }}
                      </div>
                    </el-card>   -->
        <!-- <div class="container">
     
        </div> -->

                    <!-- <div>
                      <h1 align="center">{{info.infoName}}</h1>
                      <div ref="preview" v-html="info.infoContent" v-bind="info.infoContent"></div>
                    </div> -->
       

      <!-- </div> -->
      <div class="info_div_container">
          <main class="info_main_container">
            <el-card class="info_main_boxcard" shadow="always">
              <div class="info_content_box">
                <!-- 资讯头部 -->
                  <div class="info_title_header">
                      <div class="info_title_header_up">
                        <h2 class="info_title_header_h2" style="margin-top: 2px; margin-bottom: 0px;">{{info.infoName}}</h2>
                      </div>
                      <div class="info_title_header_down">
                        <span class="info_title_header_down_type">{{info.infoType | type}}</span>&nbsp;&nbsp;
                        <span style="color: #6CC2F5; font-size: 14px;">{{info.nickname}}</span>&nbsp;&nbsp;&nbsp;
                        <span style="font-size: 14px;">最后发布于{{info.createTime | formatData}}</span>
                        
                      </div>
                  </div>
                  <!-- 分割线 -->
                  <el-divider></el-divider>
                  <!-- 资讯尾部 -->
                      <div ref="preview" v-html="info.infoContent" v-bind="info.infoContent"></div>
                  <div>
                  </div>
              </div>
              
            </el-card>

            <el-card class="info_commment_boxcard" shadow="always">
              <!-- 发表评论的div -->
                <div class="info_comment_edit">
                    <!-- 展示用户头像 -->
                    <div class="usr-image">
                        <a href="//me.csdn.net/qq_37208185" target="_blank" rel="noopener">
                          <el-avatar :size="24" :src="headimg" v-bind="headimg"></el-avatar>
                        </a>
                    </div>
                    <div class="commentform">
                      <textarea class="comment_content" v-model="commentContext" placeholder="想对作者说点什么" maxlength="1000"></textarea>
                      <!-- button -->
                      <div class="info_comment_button_div">
                          <div class="info_comment_button_right">
                              <input type="button" @click="submitCommenr()" class="info_comment_button" value="发表评论">
                          </div>
                      </div>
                    </div>
                    
                </div>
                <!-- 展示评论的div -->
                <diV class="info_reply_list">
                    <ul class="info_reply_ul" v-for="(infoReply, index) in infoReplys" :key="index">
                      <li class="info_reply_li">
                        <a target="_blank" href="//me.csdn.net/qq_37208185" class="info_reply_li_a">
                          <el-avatar :size="24" :src="infoReply.headImgUrl" v-bind="infoReply.headImgUrl"></el-avatar>
                        </a>
                        <div class="info_reply_li_b">
                          <div class="info_reply_li_c">
                            <span class="info_reply_li_nickname">{{infoReply.nickname}}</span>
                            <span class="info_reply_li_date">{{infoReply.createTime | formatData}}</span>
                            <span class="info_reply_li_context">{{infoReply.infoReplyContent}}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <br /><br /><br />
                </div>
            </el-card>
            
          </main>
          <aside class="info_aside_container">
            <el-card class="info_aside_boxcard" shadow="always">
              <div class="info_aside_boxcard_head">
                  
                  <div class="info_aside_boxcard_head_a">
                      <el-avatar :size="48" :src="info.headImgUrl" v-bind="info.headImgUrl"></el-avatar>
                  </div>
                  <div class="info_aside_boxcard_head_b">
                      <div>
                        <span style="color: #4C668C; font-size: 14px;">{{info.nickname}}</span>
                      </div>
                      <div class="info_aside_boxcard_head_b_zhuye">
                        <span>
                          <a target="" href="" style="color: #6CC2F5; font-size: 14px;">TA的个人主页 ></a>
                        </span>
                      </div>
                  </div>
              </div>
              
            </el-card>
          </aside>

          <div style="clear:both;"></div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          
          
      </div>
      
      
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import { findInfoDeatil, addInfoComment, findInfoComment } from '@/api/info'
import { mapGetters } from 'vuex'
export default {
  components: {
      Tabs
  },
  bodyClass: "profile-page",
  data() {
      return {
          info: null,
          commentContext: '',
          infoReplys: null,
      }
  },
  created () {
    this.findInfo()
    this.findInfoReply()
  },
  filters: {
    formatData: function (value) {
      let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
       type: function(value) {
          // for( let i in value) {
          //     return i
          // }
          if(value == "1") {
            return "资讯"
          }
          if(value == "2") {
            return "通知"
          }
          if(value == "3") {
            return "活动"
          }
          if(value == "4") {
            return "其他"
          }
          
       }
  },
  methods: {
    findInfo() {
        findInfoDeatil(this.$route.params.id).then(response => {
            this.info = response.data
        })
    },
    submitCommenr() {
        
        addInfoComment(this.$route.params.id, this.commentContext).then(response => {
            if(response.code === 200) {
              this.$message({
                      message: '回复成功！',
                      type: 'success'
                  });
              this.commentContext = '';
              this.findInfoReply()
            }
        })
    },
    findInfoReply() {
       findInfoComment(this.$route.params.id).then(response => {
            this.infoReplys = response.data
       })
    }
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/5500.png")
    },
    img: {
      type: String,
      default: require("@/assets/img/owtianshi.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    ...mapGetters([
      'headimg'
    ]),
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

  .info_div_container {
    
    margin: 0 auto;
    width: 1318px;
    padding: 8px 0 0;
    
  }

  .info_main_container {
    width: 1010px;
    
    position: relative;
    float: right;
    margin-bottom: 40px;
  }

  .info_aside_container {
    float: left;
    width: 300px;
    
  }

  .info_content_box {
    position: relative;
    padding: 0 14px 16px;
    margin-bottom: 8px;
    background-color: #fff;
  }

  .info_title_header {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
    outline: 0;
  }

  .info_commment_boxcard {
    margin-top: 8px;
  }

  .info_title_header_h2 {
    display: block;
    font-size: 33px;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
 
  .info_title_header_down {
    padding-bottom: 14px;
    position: relative;
    margin-top: 10px;

  }

  .info_aside_boxcard_head {
    padding: 1px 1px 1px 1px;
    padding-bottom: 12px;
    display: flex;
  }

  .info_aside_boxcard_head_a {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    padding: 0;
    margin: 0;
  }

  .info_aside_boxcard_head_b {
    margin-left: 8px;
    width: 156px;
    position: relative;
    -webkit-box-flex: 1;
    flex-grow: 1;
  }

  .info_aside_boxcard_head_b_zhuye {
    margin-top: 5px;
  }

  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 0px 0px 30px 0px;
  }

  .info_title_header_down_type {
    line-height: 20px;
    display: inline-block;
    color: #ca0c16;
    background: #f9ecec;
    font-size: 12px;
    text-align: center;
    width:34px;
    height: 20px;
    border-radius: 2px;
    vertical-align: 1px;
    
  }

  .info_comment_edit {
    padding: 16px 24px 8px;
    display: flex;
  }

  .usr-image {
    margin-right: 8px;
    margin: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    position: relative;
  }

  .commentform {
    width: 100%;
    -webkit-box-flex: 1;
    flex-grow: 1;
  }

  .comment_content {
    margin: 0;
    margin-left: 8px;
    padding: 0;
    height: 80px;
    display: block;
    width: 100%;
    padding: 7px 8px;
    background: #fff;
    border: 1px solid #c1c1c1;
    border-radius: 4px;
    resize: none;
    height: 80px;
    font-size: 14px;
    line-height: 22px;
  }

  textarea {
    overflow: auto;
    font-family: monospace;
  }

  .info_comment_button_div {
    display: flex;
    margin-top: 8px;
  }

  .info_comment_button_right {
    margin-left: auto;
  }

  .info_comment_button {
    margin: 0;
    margin-left: 16px;
    height: 30px;
    line-height: 28px;
    min-width: 72px;
    color: #fff !important;
    border: 1px solid #ca0c16 !important;
    background-color: #ca0c16 !important;
    padding: 0 8px;
    display: inline-block;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
  }

  .info_reply_list {
    padding: 0 24px;
    overflow: hidden;
    
  }

  .info_reply_ul {
    margin-top: 22px;
    border-bottom: 1px dashed #e0e0e0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .info_reply_li {
    padding: 0;
    margin: 0;
    margin-top: 14px;
    list-style: none;
    position: relative;
    margin-bottom: 12px;
    display: flex !important;
  }

  .info_reply_li_a {
    display: block;
    margin-right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .info_reply_li_b {
    position: relative;
    width: 97%;
  }

  .info_reply_li_c {
    width: 100%;
    line-height: 22px;
    margin-bottom: 4px;
    word-wrap: break-word;
    color: #999;
    padding: 0;
    margin: 0;
  }

  .info_reply_li_nickname {
    margin-left: 2px;
    margin-right: 0;
    font-size: 14px;
    font-weight: bold;
    color: #2e2e2e;
    display: inline-block;
    vertical-align: top;
    font-family: 'PingFangSC-Semibold';
  }

  .info_reply_li_date {
    margin-left: 14px;
    font-size: 12px;
    color: #999;
    vertical-align: top;
    display: inline-block;
    
  }

  .info_reply_li_context {
    margin-left: 14px;
    font-size: 14px;
    color: #2e2e2e;
    display: inline-block;
    vertical-align: top;
    font-weight: 400;
  }

</style>