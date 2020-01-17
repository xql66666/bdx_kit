<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">

    </parallax>


    <div class="main main-raised">
    <br />
      <el-container>
        <el-aside width="200px">
            
            <el-col :span="20">
                
                <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                >
                
                <el-menu-item index="1" @click="infoRouter">
                    <span slot="title">个人资料</span>
                </el-menu-item>
                <el-menu-item index="2" @click="sourceRouter">
                    <span slot="title">我的资源</span>
                </el-menu-item>
                <el-menu-item index="3" @click="answerRouter">
                    <span slot="title">我的问答</span>
                </el-menu-item>
                <el-menu-item index="4" @click="activityRouter">
                    <span slot="title">参与活动</span>
                </el-menu-item>
                <el-menu-item index="5" @click="accountRouter">
                    <span slot="title">账号设置</span>
                </el-menu-item>
                <el-menu-item index="6" @click="drawRouter">
                    <span slot="title">每日抽奖</span>
                </el-menu-item>
                </el-menu>
            </el-col>

                
            
            
        </el-aside>
        
        <el-container>
                
            <router-view/>
        
        </el-container>
      </el-container>
     <br /><br /><br /><br /><br /><br />
      
    </div>
  </div>
</template>

<script>
//import { Tabs } from "@/components";
export default {
//   components: {
//     Tabs
//   },
  bodyClass: "profile-page",
  data() {
    return {
      
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/5500.png")
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
    infoRouter() {
      this.$router.push({
        path: '/uc/info'
      })
    },
    sourceRouter() {
      this.$router.push({
        path: '/uc/mysource'
      })
    },
    answerRouter() {
      this.$router.push({
        path: '/uc/answer'
      })
    },
    activityRouter() {
      this.$router.push({
        path: '/uc/activity'
      })
    },
    accountRouter() {
      this.$router.push({
        path: '/uc/account'
      })
    },
    drawRouter() {
      this.$router.push({
        path: '/uc/draw'
      })
    },
  }
};
</script>

<style lang="scss" scoped>

  .el-header, .el-footer {
    //background-color: #B3C0D1;
    //color: #333;
    text-align: left;
    line-height: 30px;
  }
  
  .el-aside {
    //background-color: #D3DCE6;
    //color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    //background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 20px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
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
