<template>
  <transition name="view-show">
    <div class="view" v-show="show">
      <div class="top-container">
        <div class="top-bar">
          <span class="back" @click="hideView">
            <i class="icon-arrow_lift"></i>
          </span>
          <span class="name">歌单</span>
        </div>
        <div class="top-image">
          <div class="image">
            <img :src="songList.coverImgUrl" alt="" width="125" height="125">
          </div>
          <div class="content">
            <div class="title">demo</div>
            <div class="info">
              <img src="" width="25" height="25">
              <span class="name">心之所向便是阳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'view',
    data () {
      return {
        show: false,
        creator: {},
        tracks: []
      }
    },
    props: ['songList'],
    methods: {
      showView () {
        this.show = true;
      },
      hideView () {
        this.show = false;
      },
      initData () {

      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/icon.css"
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
      height 246px
      padding 20px 17px
      background rgba(63, 62, 61, 1)
      box-sizing border-box
      .top-bar
        .back
          display inline-block
          vertical-align: top
          .icon-arrow_lift
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
        padding 20px 10px
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
            font-size 16px
            line-height 16px
            padding 10px 0
          .name
            font-size 14px
            line-height 14px
            padding 10px 0
            color #dbdbda
</style>
