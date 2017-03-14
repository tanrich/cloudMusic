<template>
  <div class="listItem" ref="listItem">
    <ul v-show="defaultList.trackCount">
      <li v-for="(item,index) in tracks" class="item" @click="showPlayView(item,index)">
        <div class="num">{{index+1}}</div>
        <div class="content border-1px-bottom">
          <h1 class="name">{{item.name}}</h1>
          <div class="extra">
            <span class="artist" v-for="artist in item.artists">{{artist.name}}</span>
            <span class="line">-</span>
            <span class="album">{{item.album.name}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import * as type from '@/store/mutation-types'
  export default {
    name: 'listItem',
    data () {
      return {}
    },
    components: {},
    computed: {
      ...mapState([
        'defaultList', 'tracks'
      ])
    },
    methods: {
      // 滚动初始化
      initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['listItem'], {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      },
      // 初始化播放歌曲信息
      initSongInfo (newValue) {
        this.$store.commit(type.SET_SONGINFO, newValue);
      },
      // 初始化播放歌曲在集合中位置
      initSongPosition (newValue) {
        this.$store.commit(type.SET_SONGPOSITION, newValue);
      },
      // 打开播放界面
      showPlayView (songInfo, songPosition) {
        this.initSongInfo(songInfo);
        this.initSongPosition(songPosition);
        this.$emit('showPlayView');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  .listItem
    position: absolute
    width 100%
    height inherit
    top 0
    bottom 0
    left 0
    overflow hidden
    .item
      display flex
      .num
        flex 0 0 50px
        width 50px
        font-size 16px
        color #999999
        line-height 16px
        padding 21px 21px
        box-sizing border-box
      .content
        flex 1
        padding 10px 0
        border-1px-bottom(#dadcdd)
        .name
          font-size 16px
        .extra
          font-size 0
          margin-top 10px
          .line
            margin 0 3px
          .artist, .album, .line
            display inline-block
            font-size 12px
            line-height 12px
            color #999999
</style>
