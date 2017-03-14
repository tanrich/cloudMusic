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
        <h1>创建的歌单(1)</h1>
      </div>
      <div class="list" @click="showSongList">
        <div class="list-avatar">
          <img :src="defaultList.coverImgUrl" alt="" width="50" height="50">
        </div>
        <div class="list-content border-1px-bottom">
          <div class="name">{{defaultList.name}}</div>
          <div class="extra">{{defaultList.trackCount}}首</div>
        </div>
      </div>
    </div>
    <songListDetail ref="detail" name="detail"></songListDetail>
  </div>
</template>
<script type="text/ecmascript-6">
  import * as type from '@/store/mutation-types'
  import store from '@/store'
  import {mapState} from 'vuex'
  import songListDetail from 'components/songListDetail/songListDetail'
  import axios from 'axios'
  import API from 'API'
  export default {
    name: 'mySongList',
    data () {
      return {}
    },
    store,
    components: {
      songListDetail
    },
    created () {
      let that = this;
      API.getDefaultSongList().then((res) => {
        res = res.data;
        if (res.code === 200) {
          let data = res.result;
          that.$store.commit(type.INIT_DEFAULT_LIST, data);
        }
      })
    },
    computed: {
      ...mapState([
        'defaultList'
      ])
    },
    methods: {
      showSongList () {
        this.$refs['detail'].showDetail();
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  @import "../../common/stylus/iconfont.css"
  .mySongList
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
      .title
        background #e6e8e9
        opacity .8
        h1
          padding 0 10px
          font-size 14px
          line-height 29px
          color #757575
      .list
        display flex
        position: fixed
        width 100%
        height 100%
        background rgba(242, 244, 245, .6)
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
