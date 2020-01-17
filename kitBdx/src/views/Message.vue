<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img
                    :src="img"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">留言板</h3>
          
                </div>
              </div>
            </div>
          </div>
          <div class="description text-center">
            <p>
              磊大大太懒了，点赞回复查看主页功能暂未开通，欢迎大家发表对网站的建议~
            </p>
          </div>
          <div class="block" v-infinite-scroll="loadMore">
            <el-timeline v-loading.body="listLoading">
              <el-timeline-item 
                v-for="(msg, index) in msgs"
                
                placement="top"
                :key="index">
                <el-tag style="margin-left: 980px;" v-if="msg.messageLevel === 1">置顶</el-tag>
                    <el-tag type="danger" style="margin-left: 980px;" v-if="msg.messageLevel === 3">热门</el-tag>
                <el-card>
                  
                  <h3>{{msg.messageTitle}}
                    
                  </h3>
                  {{msg.messageContext}}
                  <!-- <p>{{msg.nickname}} 提交于 {{msg.createTime | formatData}}</p>:timestamp="msg.nickname" -->
                  <br /><br /><br />
                  <el-link>{{msg.nickname}}</el-link> 提交于 {{msg.createTime | formatData}}
                  <el-link :underline="false" class="good" type="primary">点赞：{{msg.messageGood}}</el-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <el-link :underline="false" class="num" type="primary">回复: {{msg.messageNum}}</el-link>
                   
                </el-card>
                
    
              </el-timeline-item>
              
            </el-timeline>
          </div>
          
        </div>
        <el-tooltip effect="light" content="添加留言" placement="top-start" >
            <el-button @click="editmsg()" class="msgeditbut" type="primary" icon="el-icon-edit" circle style="position:fixed" :style="{'left':left+'px','top':top+'px'}"></el-button>
        </el-tooltip>

        <el-dialog title="发表留言" ref="numberValidateForm" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
          <el-form :model="message" ref="message" label-width="100px">
            <el-form-item label="标题" label-width="50px">
                <el-input type="text" minlength="2" maxlength="10" placeholder="请输入留言标题 (2到10个字)" v-model="message.msgTitle" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="内容" label-width="50px">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" minlength="10" maxlength="100" placeholder="请输入留言内容 (10到100个字)" v-model="message.msgContext" show-word-limit></el-input>
            </el-form-item>
          </el-form>
            

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addmsg()">确 定</el-button>
            <!-- <el-button @click="findmsg()">查询</el-button> -->
          </div>
        </el-dialog>

      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import { addMessage, findMessageList } from '@/api/message';
import axios from 'axios'
export default {
  components: {
    Tabs
  },
  bodyClass: "profile-page",
  data() {
    return {
      left: 0,
      top: 0,
      dialogFormVisible: false,
      message: {
        msgTitle: '',
        msgContext: ''
      },
      loading: false,
      page: 1,
      msgs: null,
      listLoading: true,

    };
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
  },
  methods: {
    editmsg() {
      this.dialogFormVisible = true;
    },
    addmsg(message) {
      
      if(this.message.msgTitle === null || this.message.msgTitle === undefined || this.message.msgTitle.trim() === '' || this.message.msgTitle.length < 2) {
        this.$message.error('请输入至少两个字的标题！');
        return false;
      }
      if(this.message.msgContext === null || this.message.msgContext === undefined || this.message.msgContext.trim() === '' || this.message.msgContext.length < 10) {
        this.$message.error('请输入至少十个字的内容！');
        return false;
      }
      this.loading = true
      addMessage(this.message).then(response => {
        this.code = response.code
        this.dialogFormVisible = false
        this.loading = false
        if(this.code === 200) {
          this.$message({
                message: '留言成功！',
                type: 'success'
              }); 
        }
        this.message.msgTitle = ''
        this.message.msgContext = ''
        findMessageList(1).then(response => {
        this.msgs = response.data
      
        })
      
      })
    },
    findmsg() {
      this.listLoading = true
      findMessageList(this.page).then(response => {
        this.msgs = response.data
        this.listLoading = false
      }).catch(() => {
          this.listLoading = false
      })
    },
    loadMore() {
      this.listLoading = true
      this.page++
      findMessageList(this.page).then(response => {
        
          this.msgs = this.msgs.concat(response.data)
          this.listLoading = false
        
        
        
      }).catch(() => {
          this.listLoading = false
      })
    }

  },
  created(){
    this.left = document.documentElement.clientWidth - 200;
    this.top = document.documentElement.clientHeight*0.8;
    this.findmsg();
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  .good {
    margin-left: 540px;
  }
  .msgeditbut {
     box-shadow: 0 0 6px rgba(0,0,0,.12);
     width: 50px;
     height: 50px;
  }

  .section {
    padding: 0;
  }

.profile-tabs /deep/ {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
