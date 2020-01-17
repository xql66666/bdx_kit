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
                        <span class="info_title_header_down_type">资讯</span>
                      </div>
                  </div>
                  <!-- 分割线 -->
                  <el-divider></el-divider>
                  <!-- 资讯尾部 -->
                      <div ref="preview" v-html="info.infoContent" v-bind="info.infoContent"></div>
                  <div>
                  </div>
              </div>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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

          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
       <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import { findInfoDeatil } from '@/api/info'
export default {
  components: {
      Tabs
  },
  bodyClass: "profile-page",
  data() {
      return {
          info: null
      }
  },
  created () {
    this.findInfo()
  },
  filters: {
    
  },
  methods: {
    findInfo() {
        findInfoDeatil(this.$route.params.id).then(response => {
            this.info = response.data
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
    }
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
    width: 48px;
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

</style>