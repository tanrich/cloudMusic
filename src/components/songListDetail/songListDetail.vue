<template>
  <div>
    <transition name="detail-show">
      <div class="detail" v-show="show">
        <div class="bar">
          <span class="back" @click="hideDetail">
            <i class="iconfont icon-fanhui"></i>
          </span>
          <span class="name">歌单</span>
        </div>
        <div ref="container" class="container">
          <div>
            <div class="top-container">
              <div class="top-image">
                <div class="image">
                  <span class="earing">
                    <i class="iconfont icon-icon14"></i>
                    <span>{{defaultList.playCount}}</span>
                  </span>
                  <img :src="defaultList.coverImgUrl" alt="" width="110" height="110">
                </div>
                <div class="content">
                  <h1 class="title">{{defaultList.name}}</h1>
                  <div class="info">
              <span class="avatar">
                <img :src="creator.avatarUrl" width="25" height="25">
              </span>
                    <span class="name">{{creator.nickname}}</span>
                  </div>
                </div>
              </div>
              <songListDetailToolBar></songListDetailToolBar>
            </div>
            <div class="middle-container">
              <listItem @mainStart="_mainStart" ref="listItem"></listItem>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import listItem from 'components/listItem/listItem'
  import songListDetailToolBar from 'components/songListDetailToolBar/songListDetailToolBar'
  import * as type from '@/store/mutation-types'
  import API from 'API'
  import BScroll from 'better-scroll'
  export default {
    name: 'detail',
    data () {
      return {
        show: false
      }
    },
    components: {
      listItem, songListDetailToolBar
    },
    computed: {
      ...mapState([
        'defaultList',
        'creator',
        'songInfo',
        'songListMenu'
      ])
    },
    created () {
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
      showDetail (index) {
        this.show = true;
        // 若两次点击歌单相同，则不发送ajax
        if (this.defaultList.id === this.songListMenu[index].id) {
          return;
        }
        this.initSongList(this.songListMenu[index].id);
      },
      hideDetail () {
        this.show = false;
      },
      _mainStart () {
        this.$refs['playView'].mainStart();
      },
      initSongList (id) {
        let that = this;
        API.getDefaultSongList({id})
          .then((res) => {
            res = res.data;
            if (res.code === 200) {
              let data = res.playlist;
              that.$store.commit(type.INIT_DEFAULT_LIST, data);
            }
          })
          .then(() => {
//             better-scroll严重依赖DOM获取高度，等待数据更新，重新获取高度
            this.$nextTick(() => {
              that.initContainerScroll();
              // this.$refs.listItem.initScroll();
            });
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  font = 100
  .detail
    position: fixed
    width 100%
    top 0
    left 0
    bottom (50/font)rem
    background #fff
    transform translate3d(0, 0, 0)
    overflow hidden
    font-size 0
    &.detail-show-enter, &.detail-show-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    &.detail-show-enter-active, &.detail-show-leave-active
      transition all .5s
    .bar
      position fixed
      top 0
      width 100%
      padding (20/font)rem (17/font)rem
      box-sizing border-box
      background #3f3e3d
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
      padding (40/font)rem (17/font)rem (13/font)rem (17/font)rem
      background rgba(63, 62, 61, 1)
      box-sizing border-box
      .top-image
        padding (20/font)rem (10/font)rem (20/font)rem (10/font)rem
        display flex
        .image
          position relative
          display inline-block
          flex 0 0 (110/font)rem
          width (110/font)rem
          .earing
            position absolute
            right (4/font)rem
            top (4/font)rem
            color #fff
            font-size (12/font)rem
            .icon-icon14
              font-size (12/font)rem
          img
            display block
        .content
          display inline-block
          flex 1
          padding-left (25/font)rem
          color #fff
          .title
            font-size (18/font)rem
            line-height (18/font)rem
            padding (10/font)rem 0
          .info
            padding (15/font)rem 0
            .avatar
              display inline-block
              width (25/font)rem
              height (25/font)rem
              border-radius 50%
              overflow: hidden
            .name
              display inline-block
              font-size (12/font)rem
              line-height (25/font)rem
              color #dbdbda
              vertical-align top
              margin-left (6/font)rem
      .bottom-tools
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
