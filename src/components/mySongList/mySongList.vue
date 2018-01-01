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
          <li class="list" @click.stop="showSongList(index)" v-for="(item,index) in songListMenu" :key="index">
            <div class="list-avatar">
              <img v-lazy="item.coverImgUrl" alt="" width="50" height="50" />
            </div>
            <div class="list-content border-1px-bottom">
              <div class="name">{{item.name}}</div>
              <div class="extra">{{item.trackCount}}首</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <songListDetail ref="detail" name="detail" />
  </div>
</template>
<script type="text/ecmascript-6">
  import * as type from '@/store/mutation-types'
  import {mapState} from 'vuex'
  import songListDetail from 'components/songListDetail/songListDetail'
  import API from 'API'
  import BScroll from 'better-scroll'
  import { setItem, getItem } from 'common/js/localStorage';

  export default {
    name: 'mySongList',
    data () {
      return {}
    },
    components: {
      songListDetail
    },
    created () {
      const storage = getItem(type.INIT_SONGLISTMENU);
      if (storage) {
        this.$store.commit(type.INIT_SONGLISTMENU, storage);
        this.$nextTick(() => this.initScroll());
      }
      API.getSongListMenu().then(res => {
        res = res.data;
        if (res.code === 200) {
          this.$store.commit(type.INIT_SONGLISTMENU, res.playlist);
          this.$nextTick(() => this.initScroll());
          setItem(type.INIT_SONGLISTMENU, res.playlist);
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
  font = 100
  .mySongList
    position relative
    .my-wrapper
      background rgba(242, 244, 245, .6)
      .my-box
        font-size 0
        display flex
        .icon
          display inline-block
          flex 0 0 (16/font)rem
          width (16/font)rem
          height (21/font)rem
          padding (16/font)rem (17/font)rem
          vertical-align top
          .icon-ttpodicon, .icon-diantai
            display inline-block
            font-size (21/font)rem
            font-weight bold
            color #029688
        .text
          flex 1
          padding (16/font)rem 0
          display inline-block
          border-1px-bottom(#dadcdd)
          .name
            display inline-block
            font-size (16/font)rem
            line-height (21/font)rem
            vertical-align top
          .count
            display inline-block
            font-size (14/font)rem
            line-height (21/font)rem
            color #999999
            margin-left (7/font)rem
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
          padding 0 (10/font)rem
          font-size (14/font)rem
          line-height (29/font)rem
          color #757575
      .menu
        position fixed
        top (190/font)rem
        right 0
        left 0
        bottom (50/font)rem
        background rgba(242, 244, 245, .6)
        overflow hidden
      .list-menu
        .list
          display flex
          .list-avatar
            display inline-block
            flex 0 0 (50/font)rem
            width (50/font)rem
            padding (10/font)rem (15/font)rem
            img
              display block
              vertical-align top
          .list-content
            display inline-block
            flex 1
            height (50/font)rem
            padding (10/font)rem 0
            vertical-align top
            border-1px-bottom(#dadcdd)
            .name
              font-size (16/font)rem
              line-height (25/font)rem
            .extra
              color #999999
              font-size (12/font)rem
              line-height (25/font)rem
</style>
