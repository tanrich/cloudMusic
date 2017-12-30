<template>
  <transition name="detail-show">
    <div class="rank-detail" v-show="show">
      <div class="bar" :style="`background: url(${data.coverImgUrl})`">
        <span class="back" @click.stop="toggleRankDetail(false)">
          <i class="iconfont icon-fanhui"></i>
        </span>
        <span class="name">{{data.name}}</span>
      </div>
      <div ref="container" class="container">
        <div>
          <div class="top-container" :style="`background:url(${data.coverImgUrl}) no-repeat center 40%/cover`">
            <div class="cover-image">
              <img src="" alt="">
            </div>
            <songListDetailToolBar />
          </div>
          <div class="middle-container">
            <listItem />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import songListDetailToolBar from 'components/songListDetailToolBar/songListDetailToolBar'
  import listItem from 'components/listItem/listItem'

  export default {
    name: 'rankDetail',
    data () {
      return {
        show: false
      }
    },
    props: ['data'],
    components: {
      songListDetailToolBar, listItem
    },
    methods: {
      initContainerScroll () {
        if (!this.container) {
          this.container = new BScroll(this.$refs['container'], {
            click: true
          })
        } else {
          this.container.refresh();
        }
      },
      toggleRankDetail(state) {
        this.show = state;
        if (state) {
          this.$nextTick(() => this.initContainerScroll());
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "../../../../common/stylus/iconfont.css"

  font = 100
  .rank-detail
    position fixed
    width 100%
    top 0
    left 0
    right 0
    bottom (50/font)rem
    background-color #fff
    &::after
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      z-index -1
      background-color rgba(242,244,245,0.6)
    &.detail-show-enter, &.detail-show-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    &.detail-show-enter-active, &.detail-show-leave-active
      transition all .5s
    .bar
      font-size 0
      position fixed
      top 0
      width 100%
      padding (20/font)rem (17/font)rem
      box-sizing border-box
      z-index 2
      .back
        display inline-block
        vertical-align: top
        .icon-fanhui
          display block
          vertical-align top
          font-size (20/font)rem
          color #fff
      .name
        vertical-align: top
        display inline-block
        font-size (20/font)rem
        color #fff
        line-height (20/font)rem
        margin-left (22/font)rem
    .container
      width 100%
      height 100%
      .top-container
        padding (60/font)rem (17/font)rem (13/font)rem (17/font)rem
        box-sizing border-box
        .cover-image
          margin-top (20/font)rem
          margin-bottom (10/font)rem
          img
            width (150/font)rem
</style>
