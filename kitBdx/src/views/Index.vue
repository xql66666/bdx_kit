<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" />
            <div class="brand">
              <h1>北斗星工作室</h1>
              <h3>一个专注于创新领域，扎实发展的软件学院社团。</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">

    


      <div class="section section-download" id="downloadSection">
        <div class="container">
          <div class="md-layout text-left">
            <div class="md-layout-item md-size-66 md-small-size-100 mx-auto">
              <h2>我们是什么 ?</h2>
              <br />
              <h4>
                
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              北斗星工作室成立于2015年，是软件学院导师带领下的软件开发方面的带有学习性质的技术型社团，主要学习方向为前后端开发和大数据。
              我们致力于培养具有专业素养的优秀人才，通过完善的学习体系以及目标的制定使社员们的编程水平能够得到最大的提升，
              并且一直以提升大家的学习能力与创新水平为己任，鼓励大家不断创新，不断进步。
              工作室坚持在前沿技术上不断探索与发现，完善所学知识体系，致力于成为一个朝气蓬勃的优秀团队!
              </h4>
            </div>
    
          </div>
          <br /><br />

          <div class="md-layout text-left">
            <div class="md-layout-item md-size-66 md-small-size-100 mx-auto">
              <h2>具体是干啥的 ?</h2>
              <br />
              <h4>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                我们是一群爱好编程的南工学子所组建起来的一个充满热情与活力的大家庭，
                
                现拥有大学生科技园B区地下室以及202实验室，具备完善的学习体系和丰富的学习资源。如果你想实现以下其中一条及以上：
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                1，在课余的闲暇时间里提升自己的编程水平
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                2，认识一群同样爱好编程的人
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                3，提升自己的英语水平
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                4，成为传说中的dalao
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                5，脑子里有着一些天马行空的想法并努力为之实现
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                6，做一些包含但不仅仅局限这些的其他很nice的事情
                <br /><br />
                那么，你正是我们所需要的那个人，来加入我们吧！
                

                <!-- 实验室作为每一个社团必不可缺的一部，都充当着其必要的角色。实验室是一个活跃的地方，交流的地方， 它可以作为大家的学习，交流，开会等等的地点。
                我们在这里畅谈梦想，扎头提升自己的技术水平，偶尔会造几个bug。 喝着枸杞泡的茶，听着自己喜欢的歌，这是你自由发挥的天地。做你感兴趣的事，做你想做的事， 发散思维，梦想从这里起航！ -->
              </h4>
            </div>
          </div>

        </div>
      </div>

      <!-- <div class="section section-notifications">
        <notifications></notifications>
      </div> -->

       

      <!-- 基本介绍 -->
      <div class="section section-white">
        <div class="container">
          <nav-pills></nav-pills>
          <javascript-components></javascript-components>
        </div>
      </div>

      <a name="a"></a>
      
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      
      
       
      
    </div>
  </div>
  
</template>

<script>
//import BasicElements from "./components/BasicElementsSection";
//import Navigation from "./components/NavigationSection";
//import SmallNavigation from "./components/SmallNavigationSection";
//import Tabs from "./components/TabsSection";
import NavPills from "./components/NavPillsSection";
import Notifications from "./components/NotificationsSection";
//import TypographyImages from "./components/TypographyImagesSection";
import JavascriptComponents from "./components/JavascriptComponentsSection";
import { LoginCard } from "@/components";

export default {
  components: {
   // BasicElements,
    //Navigation,
    //SmallNavigation,
    //Tabs,
    NavPills,
    Notifications,
    //TypographyImages,
    JavascriptComponents,
    LoginCard
  },
  name: "index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg")
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png")
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png")
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png")
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg")
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
      leafShow: false
    };
  },
  methods: {
    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false;
      } else {
        this.leafShow = true;
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      };
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      };
    }
  },
  mounted() {
    this.leafActive();
    window.addEventListener("resize", this.leafActive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive);
  }
};
</script>
<style lang="scss">
.section-download {
  .md-button + .md-button {
    margin-left: 5px;
  }
}

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
