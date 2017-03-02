<template>
  <div class="myList">
    <div class="my-wrapper">
      <div class="my-box my-singer">
        <span class="icon">
          <img src="./singer.png" alt="singer" width="16" height="21">
        </span>
        <span class="text border-1px-bottom">
          <span class="name">我的歌手</span>
          <span class="count">(1)</span>
        </span>
      </div>
      <div class="my-box my-radio">
        <span class="icon">
          <img src="./radio.png" alt="radio" width="16" height="21">
        </span>
        <span class="text border-1px-bottom">
          <span class="name">我的电台</span>
          <span class="count">(1)</span>
        </span>
      </div>
    </div>
    <div class="music-wrapper">
      <div class="title">
        <h1>创建的歌单(1)</h1>
      </div>
      <div class="list" @click="showSongList">
        <div class="list-avatar">
          <img src="" alt="" width="50" height="50">
        </div>
        <div class="list-content">
          <div class="name">我喜欢的音乐</div>
          <div class="extra">52首</div>
        </div>
      </div>
    </div>
    <songListView ref="view" name="view"></songListView>
  </div>
</template>
<script type="text/ecmascript-6">
  import songListView from 'components/songListView/songListView'
  import axios from 'axios'
  import API from 'API'
  export default {
    name: 'myList',
    components: {
      songListView
    },
    data () {
      return {
        songList: {}
      }
    },
    created () {
      let that = this;
      API.getDefaultSongList().then(function (res) {
        that._initData(res);
        console.log(that.songList)
      })
    },
    methods: {
      showSongList () {
        this.$refs['view'].showView();
      },
      _initData (res) {
        this.songList = res;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  .myList
    .my-wrapper
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
      .title
        background #e6e8e9
        h1
          padding 0 10px
          font-size 14px
          line-height 29px
          color #757575
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
