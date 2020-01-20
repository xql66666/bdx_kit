<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        
        <div class="container">
          <!-- <div class="md-layout"> -->
            <!-- <div class="md-layout-item md-size-50 mx-auto"> -->
              <!-- <div class="profile"> -->
                
                
                    <!-- <h1>WangEditor Demo</h1>
                    <wang-editor :content="content" @editorContent="getEditorContent"/>
                    <h2>效果区域展示：</h2> -->
                    <div>
                    <!-- <h1 align="center">新闻资讯</h1> -->
                        <el-carousel :interval="5000" arrow="always" height="100" class="info_carousel">
                          <el-carousel-item v-for="item in 4" :key="item">
                              <img src="http://b.zol-img.com.cn/desk/bizhi/image/6/960x600/142180751573.jpg">
                          </el-carousel-item>
                          
                        </el-carousel>
                    
                    <main class="infomain" v-infinite-scroll="loadMore">
                     
                        <div>
                          <el-card class="info_type_card" shadow="hover">
                            <ul class="info_type_ul">
                             <router-link :to="{name:'info'}"  class="info_type_li" style="color: #707070;">推荐</router-link>
                             <router-link :to="{name:'infoMation'}"  class="info_type_li" style="color: #707070;">资讯</router-link>
                             <router-link :to="{name:'infoAdvise'}"  class="info_type_li" style="color: #707070;">通知</router-link>
                             <router-link :to="{name:'infoActivity'}"  class="info_type_li" style="color: #707070;">活动</router-link>
                             <router-link :to="{name:'infoOther'}"  class="info_type_li" style="color: #707070; background-color: #f44444;">其他</router-link>
                             
                           </ul>
                          </el-card>

                           
                        </div>
                      
                    
                        <ul class="infoul" v-loading.body="listLoading">
                       

                        <li class="infoli" v-for="(info, index) in infos" :key="index">
                            <div>
                                <router-link :to="{name:'infoDetail',params:{id: info.id}}"  class="titlelink" target="_blank">
                                  <h3 class="infoh3">
                                    {{info.infoName}}
                                  </h3>
                                </router-link>
                                
                                
                            </div>
                            <div class="infolidiv" style="color: #959595">
                                {{info.infoContent}}
                                <!-- <div ref="preview" v-html="info.infoContent" v-bind="info.infoContent"></div> -->
                            </div>
                            <dl>
                                <dd><el-avatar :size="25" :src="info.headImgUrl" v-bind="info.headImgUrl"></el-avatar></dd>
                                <dd class="nicknamedd" style="font-size: 14px;">{{info.nickname}}</dd>
                                <div>
                                <dd class="gooddd" @click="dialogTableVisible = true">
                                    <i class="el-icon-star-off"></i> {{info.infoGood}}
                                </dd>

                                <dd class="commentdd">
                                    <i class="el-icon-chat-dot-square"></i> {{info.infoReplyNum}}
                                </dd>
                                </div>
                            </dl>
                        </li>

                        
                        
                        </ul>
                    
                    </main> 
                    </div>
                
              <!-- </div> -->
            <!-- </div> -->
          <!-- </div>
          -->
          
        </div>
       

      </div>
       <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import { findAllInfoListByType } from '@/api/info'
export default {
  components: {
      Tabs
  },
  bodyClass: "profile-page",
  data() {
      return {
        page: 1,
        listLoading: true,
        infos: null,
      }
  },
  created () {
    this.findInfoList();
  },
  filters: {
    discardHtml: function (value) {
      let reg=/<\/?.+?\/?>/g;
      return value.replace(reg,'')
    },
  },
  methods: {
    findInfoList() {
      this.listLoading = true
      findAllInfoListByType(this.page, 4).then(response => {
        this.infos = response.data
        this.listLoading = false
      }).catch(() => {
          this.listLoading = false
      })
    },
    loadMore() {
      this.listLoading = true
      this.page++
      findAllInfoListByType(this.page, 4).then(response => {
        this.infos = this.infos.concat(response.data)
        this.listLoading = false
      }).catch(() => {
          this.listLoading = false
      })
    },
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

<style scope>
  .infomain {
    float: left;
    width: 100%;;
    min-height: 500px;
    margin-right: 12px;
    display: flex;
    justify-content: center;
  }
  .infoul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .infoli {
    list-style: none;
    margin: 0;
    padding: 0;
    padding: 8px 24px 0px 24px;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  }

  .infoul .infoli .infolidiv{
    width: 800px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  dl{
    /* clear: left; */
    height: 24px;
    line-height: 24px;
  }
  dt, dd{
    float: left;
    margin-left: 0px;
  }

  .nicknamedd{
    margin-left: 5px;
  }

  .gooddd{
    position: absolute;
    top: 118px;
    left: 620px;
  }
  .gooddd:hover{
    color: #CA0D16;
  }

  .commentdd{
    position: absolute;
    top: 118px;
    left: 720px;
  }

  .commentdd:hover{
    color: #CA0D16;
  }
  
  .infoli:hover{
    background-color: #FAFAFA;
  }

  .infoh3:hover{
    color: #CA0D16;
  }

  .infoh3{
      color: black;
      font-weight: 500
  }

  .info_carousel {
    width: 900px;
    text-align: center;
    margin: 0 auto;
  }

  .info_type_ul {
    margin-top: 5px;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .info_type_li {
    margin-top: 1px;
    width: 100%;
    height: 30px;
    display: block;
    font-size: 14px;
    margin-bottom: 1px;
    text-align:center
  }

  .info_type_card {
    margin-top: 10px;
    margin-right: 6px;
    width: 80px;
  }

  .info_type_li:hover {
    color: #FAFAFA;
    background-color: #f44444;
    
  }

  .info_type_li:visited {
    background-color: #f44444;
  }

  .el-card__body {
    padding: 0px;
  }

</style>