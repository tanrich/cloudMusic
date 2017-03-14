<template>
  <div class="header">
    <div class="name">
      <i class="iconfont icon-wangyi"></i>
    </div>
    <div class="bar">
      <span class="icon">
        <router-link to="/mainPage">
          <i class="iconfont icon-music3"></i>
        </router-link>
      </span>
      <span class="icon">
        <router-link to="/mySongList">
          <i class="iconfont icon-music2"></i>
        </router-link>
      </span>
    </div>
    <div class="search">
      <i class="iconfont icon-icons01"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'header',
    data () {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  .header
    height 56px
    box-sizing border-box
    position relative
    background-color #4caf50
    padding 17px 16px
    .name
      position: absolute
      left 16px
      top 17px
      .icon-wangyi
        display inline-block
        font-size 16px
        line-height 22px
        color #fff
    .bar
      width 100px
      margin 0 auto
      text-align center
      font-size 0
      .icon
        display inline-block
        margin-right 30px
        .icon-music2, .icon-music3
          display inline-block
          font-size 20px
          color #fff
          line-height 22px
        .icon-music2
          font-weight bold
        &:last-child
          margin-right 0
    .search
      position absolute
      right 16px
      top 17px
      .icon-icons01
        display inline-block
        font-size 20px
        color #fff
        line-height 22px
        font-weight bold
</style>
