<template>
  <div class="wrapper">
    <div id="navigation-pills">
      <!-- <div class="title">
        <h3>北斗星工作室</h3>
      </div> -->
      
      <div class="title">
        <h3>地下室与实验室</h3>
      </div>
      <div class="md-layout">
        <div class="md-layout-item md-size-500 md-small-size-100">
          <tabs
            :tab-name="['简介', '地下室', '实验室']"
            :tab-icon="['dashboard', 'home', 'home_work']"
            plain
            nav-pills-icons
            color-button="primary"
          >
            <!-- here you can add your content for tab-content -->
            <template slot="tab-pane-1">
              地下室和实验室是我们日常学习和交流的场所，具体是干啥的咱也不敢问，咱也不敢说~
              <br /><br />
              总之应该是比较nice的，此处省略一千字......
            </template>
            <template slot="tab-pane-2">
              地下室是我们。。。，谁知道是啥啥啥玩意
              <br /><br />
              地下室位于14号教学楼楼下，软件学院大学生科技园B区进门右拐，北斗星工作室，夏有空调，冬有暖气，学习之处的不二之选噢~
            </template>
            <template slot="tab-pane-3">
              实验室是我们。。。，谁知道是啥啥啥玩意
              <br /><br />
              实验室位于15号教学楼二楼，202号苹果机房，配置齐全，上下楼老省劲啦~
            </template>
          </tabs>
        </div>
        <!-- <div class="md-layout-item md-size-50 md-small-size-100">
          <tabs
            :tab-name="['Dashboard', 'Schedule']"
            :tab-icon="['dashboard', 'schedule']"
            plain
            flex-column
            nav-pills-icons
            color-button="primary"
          >
            
            <template slot="tab-pane-1">
              Collaboratively administrate empowered markets via plug-and-play
              networks. Dynamically procrastinate B2C users after installed base
              benefits.
              <br /><br />
              Dramatically visualize customer directed convergence without
              revolutionary ROI.
            </template>
            <template slot="tab-pane-2">
              Efficiently unleash cross-media information without cross-media
              value. Quickly maximize timely deliverables for real-time schemas.
              <br /><br />
              Dramatically maintain clicks-and-mortar solutions without
              functional solutions.
            </template>
          </tabs>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";

export default {
  components: {
    Tabs
  }
};
</script>

<style lang="css"></style>
