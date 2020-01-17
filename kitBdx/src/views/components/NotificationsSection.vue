<template>
  <div class="wrapper">
    <div id="notifications">
      <div class="alert alert-info">
        <div class="container">
          <button
            type="button"
            aria-hidden="true"
            class="close"
            @click="event => removeNotify(event, 'alert-info')"
          >
            <md-icon>clear</md-icon>
          </button>
          <div class="alert-icon">
            <md-icon>info_outline</md-icon>
          </div>
           提示  ：此站现在是基础版测试中，大部分功能暂未开放，若有对此站的改进有好的建议，请在导航内留言处参与留言。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    removeNotify(e, notifyClass) {
      var target = e.target;
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode;
      }
      return target.parentNode.removeChild(target);
    }
  }
};
</script>

<style lang="css"></style>
