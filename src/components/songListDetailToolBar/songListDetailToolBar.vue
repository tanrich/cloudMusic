<template>
  <div class="tool-bar">
    <div class="tool-content">
      <i class="iconfont icon-shoucang"></i>
      <div class="name">收藏</div>
    </div>
    <div class="tool-content">
      <i class="iconfont icon-pinglun"></i>
      <div class="name">评论</div>
    </div>
    <div class="tool-content">
      <i class="iconfont icon-share"></i>
      <div class="name">分享</div>
    </div>
    <div class="tool-content">
      <i class="iconfont icon-xiazai"></i>
      <div class="name">下载</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'songListDetailToolBar',
    data () {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  font = 100
  .tool-bar
    display flex
    .tool-content
      flex 1
      font-size (12/font)rem
      color #fff
      text-align center
      .iconfont
        font-weight bold
      .name
        margin-top (3/font)rem
        font-weight lighter
</style>
