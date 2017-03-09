<template>
  <div class="play">
    <div class="detail">
      <div class="avatar">
        <img :src="defaultList.coverImgUrl" width="40" height="40">
      </div>
      <div class="info">
        <div class="title">记得我还爱你</div>
        <div class="name">李易峰</div>
      </div>
    </div>
    <div class="bar">
      <div class="pre">
        <i class="iconfont icon-nextvideo-copy"></i>
      </div>
      <div class="go">
        <i class="iconfont icon-bofang"></i>
      </div>
      <div class="next">
        <i class="iconfont icon-nextvideo-copy"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import store from '@/store'
  import {mapState} from 'vuex'
  export default {
    name: 'play',
    data () {
      return {}
    },
    store,
    computed: {
      ...mapState([
        'defaultList'
      ])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  .play
    position fixed
    width 100%
    height 50px
    left 0
    bottom 0
    z-index 999
    background rgba(255, 255, 255, 1)
    padding 5px 8px
    box-sizing border-box
    display flex
    .detail
      flex 1
      font-size 0
      .avatar
        display inline-block
      .info
        display inline-block
        vertical-align top
        margin-left 8px
        .title
          font-size 14px
          line-height 24px
          color #333333
        .name
          font-size 12px
          line-height 12px
          color #888888
    .bar
      flex 0 0 105px
      width 105px
      color #4caf50
      font-size 0
      .pre, .next
        display inline-block
        vertical-align top
        padding 5px
        margin-top 8px
        transform rotate(180deg)
        .icon-nextvideo-copy
          font-size 18px
          font-weight bold
      .next
        transform rotate(0deg)
      .go
        display inline-block
        vertical-align top
        padding 5px
        margin 2px 5px 0 5px
        .icon-bofang
          font-size 26px
</style>
