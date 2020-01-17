<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="https://www.baidu.com">
              开源代码
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com">
              关于我们
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com">
              作者主页
            </a>
          </li>
          <li>
            <a href="https://www.baidu.com">
              分享页面
            </a>
            
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, &nbsp;&nbsp;北斗星工作室 <md-icon>favorite</md-icon> 
        ，<a href="http://www.xuqianlei.top" target="_blank">www.xuqianlei.top</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
