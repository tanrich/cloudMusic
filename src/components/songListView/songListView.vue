<template>
  <div>
    <transition name="view-show">
      <div class="view" v-show="show">
        <div class="top-container">
          <div class="top-bar">
          <span class="back" @click="hideView">
            <i class="iconfont icon-fanhui"></i>
          </span>
            <span class="name">歌单</span>
          </div>
          <div class="top-image">
            <div class="image">
              <img :src="defaultList.coverImgUrl" alt="" width="125" height="125">
            </div>
            <div class="content">
              <h1 class="title">{{defaultList.name}}</h1>
              <div class="info">
              <span class="avatar">
                <img :src="creator.avatarUrl" width="25" height="25">
              </span>
                <span class="name">心之所向便是阳</span>
              </div>
            </div>
          </div>
          <div class="bottom-tools">
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
        </div>
        <div class="middle-container">
          <listItem @showPlayView="_showPlayView"></listItem>
        </div>
      </div>
    </transition>
    <playView ref="playView" :songInfo="songInfo"></playView>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import listItem from 'components/listItem/listItem'
  import playView from 'components/playView/playView'
  export default {
    name: 'view',
    data () {
      return {
        show: false,
        songInfo: {}
      }
    },
    components: {
      listItem, playView
    },
    computed: {
      ...mapState([
        'defaultList', 'creator'
      ])
    },
    methods: {
      showView () {
        this.show = true;
      },
      hideView () {
        this.show = false;
      },
      _showPlayView (value) {
        this.songInfo = value;
        this.$refs['playView'].showPlayView()
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  .view
    position: fixed
    width 100%
    top 0
    left 0
    bottom 50px
    background #fff
    transform translate3d(0, 0, 0)
    &.view-show-enter, &.view-show-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    &.view-show-enter-active, &.view-show-leave-active
      transition all .5s
    .top-container
      padding 20px 17px 15px 17px
      background rgba(63, 62, 61, 1)
      box-sizing border-box
      .top-bar
        .back
          display inline-block
          vertical-align: top
          .icon-fanhui
            font-size 20px
            color #fff
        .name
          vertical-align: top
          display inline-block
          font-size 20px
          color #fff
          line-height 20px
          margin-left 22px
      .top-image
        padding 20px 10px 15px 10px
        display flex
        .image
          display inline-block
          flex 0 0 125px
          width 125px
        .content
          display inline-block
          flex 1
          padding-left 25px
          color #fff
          .title
            font-size 18px
            line-height 18px
            padding 10px 0
          .info
            padding 15px 0
            .avatar
              display inline-block
              width 25px
              height 25px
              border-radius 50%
              overflow: hidden
            .name
              display inline-block
              font-size 12px
              line-height 25px
              color #dbdbda
              vertical-align top
      .bottom-tools
        display flex
        .tool-content
          flex 1
          font-size 14px
          color #fff
          text-align center
          .iconfont
            font-weight bold
          .name
            margin-top 5px
            font-weight lighter
    .middle-container
      position: fixed
      width 100%
      height 100%
      top 252px
      bottom 0
      left 0
      background rgba(242, 244, 245, .6)
</style>
