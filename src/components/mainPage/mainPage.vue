<template>
  <div class="mainPage">
    <div class="tab">
      <div class="tabItem border-2px-bottom">
        <router-link to="/mainPage/recommend?id=1">个性推荐</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/mainPage/songList?id=2">歌单</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/mainPage/radio?id=3">主播电台</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/mainPage/rank?id=4">排行榜</router-link>
      </div>
    </div>
    <transition :name="tsName">
      <keep-alive>
        <router-view class="second-child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'mainPage',
    data () {
      return {}
    },
    props: ['tsName'],
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  font = 100
  .mainPage
    fix-screen()
    .tab
      display flex
      .tabItem
        flex 1
        text-align center
        a
          display block
          width 100%
          padding (13/font)rem 0
          color #666666
          font-size (14/font)rem
          font-weight 200
          &.active
            border-2px-bottom(#029688)
            color #029688
    .second-child-view
      fix-screen-second()
      height calc(100vh - .56rem - .5rem - .4rem)
      overflow hidden
      &.slide-right-enter-active, &.slide-right-leave-active, &.slide-left-enter-active, &.slide-left-leave-active
        transition all .5s
      &.slide-right-enter, &.slide-left-leave-to
        transform translate3d(-100%, 0, 0)
      &.slide-right-leave-to, &.slide-left-enter
        transform translate3d(100%, 0, 0)
</style>
