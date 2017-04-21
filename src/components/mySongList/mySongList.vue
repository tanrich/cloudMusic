<template>
  <div class="mySongList">
    <div class="my-wrapper">
      <div class="my-box my-singer">
        <span class="icon">
          <i class="iconfont icon-ttpodicon"></i>
        </span>
        <span class="text border-1px-bottom">
          <span class="name">我的歌手</span>
          <span class="count">(1)</span>
        </span>
      </div>
      <div class="my-box my-radio">
        <span class="icon">
          <i class="iconfont icon-diantai"></i>
        </span>
        <span class="text border-1px-bottom">
          <span class="name">我的电台</span>
          <span class="count">(1)</span>
        </span>
      </div>
    </div>
    <div class="music-wrapper">
      <div class="title">
        <h1>创建的歌单({{songListMenu.length}})</h1>
      </div>
      <div ref="menu" class="menu">
        <ul class="list-menu">
          <li class="list" @click="showSongList(index)" v-for="(item,index) in songListMenu">
            <div class="list-avatar">
              <img :src="item.coverImgUrl" alt="" width="50" height="50">
            </div>
            <div class="list-content border-1px-bottom">
              <div class="name">{{item.name}}</div>
              <div class="extra">{{item.trackCount}}首</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <songListDetail ref="detail" name="detail"></songListDetail>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as type from '@/store/mutation-types'
  import {mapState} from 'vuex'
  import songListDetail from 'components/songListDetail/songListDetail'
  import API from 'API'
  import BScroll from 'better-scroll'
  export default {
    name: 'mySongList',
    data () {
      return {}
    },
    components: {
      songListDetail
    },
    created () {
      let that = this;
      API.getSongListMenu().then((res) => {
        res = res.data;
        if (res.code === 200) {
          that.$store.commit(type.INIT_SONGLISTMENU, res.playlist);
          that.$nextTick(() => {
            that.initScroll();
          })
        }
      })
    },
    computed: {
      ...mapState([
        'songListMenu'
      ])
    },
    methods: {
      initScroll () {
        if (!this.menu) {
          this.menu = new BScroll(this.$refs['menu'], {
            click: true
          })
        } else {
          this.menu.refresh();
        }
      },
      showSongList (index) {
        this.$refs['detail'].showDetail(index);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  @import "../../common/stylus/iconfont.css"
  .mySongList
    position relative
    .my-wrapper
      background rgba(242, 244, 245, .6)
      .my-box
        font-size 0
        display flex
        .icon
          display inline-block
          flex 0 0 16px
          width 16px
          height 21px
          padding 16px 17px
          vertical-align top
          .icon-ttpodicon, .icon-diantai
            display inline-block
            font-size 21px
            font-weight bold
            color #5dae52
        .text
          flex 1
          padding 16px 0
          display inline-block
          border-1px-bottom(#dadcdd)
          .name
            display inline-block
            font-size 16px
            line-height 21px
            vertical-align top
          .count
            display inline-block
            font-size 14px
            line-height 21px
            color #999999
            margin-left 7px
            vertical-align: top
      .my-radio
        .text
          border-none()
    .music-wrapper
      position relative
      .title
        background #e6e8e9
        opacity .8
        h1
          padding 0 10px
          font-size 14px
          line-height 29px
          color #757575
      .menu
        position fixed
        top 190px
        right 0
        left 0
        bottom 50px
        background rgba(242, 244, 245, .6)
        overflow hidden
      .list-menu
        .list
          display flex
          .list-avatar
            display inline-block
            flex 0 0 50px
            width 50px
            padding 10px 15px
          .list-content
            display inline-block
            flex 1
            height 50px
            padding 10px 0
            vertical-align top
            border-1px-bottom(#dadcdd)
            .name
              font-size 16px
              line-height 25px
            .extra
              color #999999
              font-size 12px
              line-height 25px
</style>
