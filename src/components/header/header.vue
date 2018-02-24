<template>
  <div class="header">
    <div class="name" @click="openLeftBar(true)">
      <!--<i class="iconfont icon-wangyi"></i>-->
      <img src="./logo-muhan.png" alt="" style="display: block; width: 1.2rem">
    </div>
    <div class="bar">
      <!--<span class="icon">-->
        <!--<router-link to="/mainPage?linkcode=1">-->
          <!--<i class="iconfont icon-music3"></i>-->
        <!--</router-link>-->
      <!--</span>-->
      <!--<span class="icon">-->
        <!--<router-link to="/mySongList?linkcode=2">-->
          <!--<i class="iconfont icon-music2"></i>-->
        <!--</router-link>-->
      <!--</span>-->
    </div>
    <div class="search">
      <router-link to="/search?linkcode=3">
        <i class="iconfont icon-icons01"></i>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as type from '@/store/mutation-types'
  import { mapMutations } from 'vuex'

  export default {
    name: 'header',
    data () {
      return {}
    },
    methods: {
      ...mapMutations({
        openLeftBar: type.SET_LEFTBARSHOW
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  font = 100
  .header
    height (56/font)rem
    box-sizing border-box
    position relative
    background-color #029688
    padding (17/font)rem (16/font)rem
    .name
      position: absolute
      left (16/font)rem
      top (17/font)rem
      .icon-wangyi
        display block
        font-size (16/font)rem
        line-height (22/font)rem
        color #fff
    .bar
      width (100/font)rem
      margin 0 auto
      text-align center
      font-size 0
      .icon
        display inline-block
        margin-right (30/font)rem
        .icon-music2, .icon-music3
          display inline-block
          font-size (20/font)rem
          color #fff
          line-height (22/font)rem
        .icon-music2
          font-weight bold
        &:last-child
          margin-right 0
    .search
      position absolute
      right (16/font)rem
      top (17/font)rem
      .icon-icons01
        display block
        font-size (20/font)rem
        color #fff
        line-height (22/font)rem
        font-weight bold
</style>
