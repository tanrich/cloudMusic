<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tabItem border-2px-bottom">
        <router-link to="/recommend">个性推荐</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/songList">歌单</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/radio">主播电台</router-link>
      </div>
      <div class="tabItem border-1px-bottom">
        <router-link to="/rank">排行版</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return {
        info: ''
      }
    },
    components: {
      'v-header': Header
    },
    created () {
      axios.get('/getSong').then(function (res) {
        console.log(res);
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
  #app
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
