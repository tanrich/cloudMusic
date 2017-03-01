<template>
  <div class="mainPage">
    <div class="tab">
      <div class="tabItem border-2px-bottom">
        <router-link to="/mainPage/recommend">个性推荐</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/mainPage/songList">歌单</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/mainPage/radio">主播电台</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/mainPage/rank">排行版</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'mainPage',
    data () {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mainPage
    .tab
      display flex
      .tabItem
        flex 1
        text-align center
        a
          display block
          width 100%
          padding 13px 0
          color #666666
          font-size 14px
          font-weight 200
          &.active
            border-2px-bottom(#4caf50)
            color #4caf50
</style>
