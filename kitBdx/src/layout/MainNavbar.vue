<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">北斗星工作室</h3>
      </div>
      <div class="md-toolbar-section-end">

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
            </mobile-menu>
            <md-list>
            

                  <li class="md-list-item">
                    <a
                      href="javascript:void(0)"
                      class="md-list-item-router md-list-item-container md-button-clean dropdown"
                    >
                      <div class="md-list-item-content">
                        <drop-down direction="down">
                          <md-button
                            slot="title"
                            class="md-button md-button-link md-white md-simple dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <p>导航</p>
                          </md-button>
                          <ul
                            class="dropdown-menu"
                            
                          >
                            <li class="dropdown-header">主页功能列表</li>
                            <li>
                              <!-- <a href="/index" class="dropdown-item">主页</a> -->
                              <router-link :to="{name:'index'}"> 主页 </router-link>
                            </li>
                            <li>
                              <!-- <a href="/profile" class="dropdown-item"> -->
                                <router-link :to="{name:'message'}"> 留言 </router-link>
                              <!-- </a> -->
                            </li>
                            <li>
                              <!-- <a href="#" class="dropdown-item"
                                >资讯通知</a
                              > -->
                              <router-link :to="{name:'info'}"> 资讯通知 </router-link>
                            </li>
                            <li>
                              <!-- <a href="#" class="dropdown-item"
                                >学习资源 （暂未开放）</a
                              > -->
                              <router-link :to="{name:'source'}"> 学习资源 </router-link>
                            </li>
                            <li class="dropdown-divider"></li>
                            <li>
                              <a href="#" class="dropdown-item"
                                >内部入口 （暂未开放）</a
                              >
                            </li>
                            <li class="dropdown-divider"></li>
                            <li>
                              <a href="#" class="dropdown-item">
                                QQ交流群：746226641
                              </a>
                            </li>
                           
                            
                          </ul>
                        </drop-down>
                      </div>
                    </a>
                  </li>

              <md-list-item v-show="loadinglogin()"
                to="/login"
              >
                <i class="material-icons">fingerprint</i>
                <p>登录</p>
                <md-tooltip md-direction="bottom"
                  >有账号点击登录</md-tooltip
                >
              </md-list-item>
              
              <md-list-item v-show="loadinglogin()"
                to="/register"
              >
                <i class="material-icons">account_circle</i>
                <p>注册</p>
                <md-tooltip md-direction="bottom"
                  >没有账号请先注册噢</md-tooltip
                >
              </md-list-item>


                     <li class="md-list-item" v-show="loadinguser()">
                        <a
                          href="javascript:void(0)"
                          class="md-list-item-router md-list-item-container md-button-clean dropdown"
                        >
                          <div class="md-list-item-content">
                            <drop-down direction="down" class="profile-photo">
                              <div
                                class="profile-photo-small"
                                slot="title"
                                data-toggle="dropdown"
                              >
                                <!-- <img v-bind:src="headimg" alt="Circle Image" /> -->
                                
                                <el-avatar :size="40" v-bind:src="headimg"></el-avatar>
                        
                              </div>
                              <!-- <div>
                                <md-avatar class="md-small">
                                <img v-bind:src="user.headImg" alt="Avatar">
                                </md-avatar>
                              </div> -->
                              <ul class="dropdown-menu dropdown-menu-right">
                                <li class="dropdown-header">{{name}}</li>
                                <li>
                                  <a @click="ucprofile" class="dropdown-item">个人中心</a>
                                </li>
                                <li>
                                  <a @click="logout" class="dropdown-item"
                                    >退出</a
                                  >
                                  <!-- <span @click="logout">退出</span> -->
                                </li>
                              </ul>
                            </drop-down>
                          </div>
                        </a>
                      </li>
                  
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>

let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu"
import { getName } from '@/util/auth'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui';
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
      options: {
        text: '正在退出登录...'
      },
      joinimg: false
    };
  },
  computed: {
    ...mapGetters([
      'name',
      'headimg'
    ]),
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  methods: {
    
    loadinglogin() {
        if(this.name === undefined){
          return true
        }else{
          return false
        }
    },
    loadinguser() {
      if(this.name !== undefined){
          return true
        }else{
          return false
        }
    },
    ucprofile() {
      this.$router.push({
        path: '/uc/info'
      })
    },
    logout() {
      let loadingInstance = Loading.service(this.options);
      this.$store.dispatch('LogOut').then(() => {
        loadingInstance.close();
        location.reload()
        this.$router.push("/")
      })
    },
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>
