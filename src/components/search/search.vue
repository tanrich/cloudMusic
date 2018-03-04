<template>
  <div class="search">
    <!--头部返回栏-->
    <div class="bar">
      <span class="back" @click.stop="_back()">
        <i class="iconfont icon-fanhui"></i>
      </span>
      <span class="input-content">
        <input
          type="text"
          placeholder="搜索单曲"
          v-model.trim="searchContent"
          @focus="suggestShow = true"
        >
        <span class="search-icon" @click.stop="search()">
          <i class="iconfont icon-icons01"></i>
        </span>
      </span>
      <div class="result" v-show="searchContent && suggestShow">
        <ul>
          <li v-show="searchContent" class="result-list result-search" @click.stop="search()">搜索&nbsp;&nbsp;"{{searchContent}}"</li>
          <li v-for="item in suggestRes" class="result-list" @click.stop="getSongInfo(item.id)">
            <span class="search-icon"><i class="iconfont icon-icons01"></i></span>
            <span class="song-name">{{item.name}}</span>
            <span class="artist-name" v-if="item.artists" v-for="list in item.artists">- {{list.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content" v-show="searchRes.length">
      <ul>
        <li v-for="item in searchRes" class="result-list" @click.stop="getSongInfo(item.id)">
          <div class="song-name">{{ item.name }}</div>
          <div class="ar-al-name">
            <span v-for="(list, index) in item.artists">{{ list.name }}<i v-if="index < item.artists.length - 1">/</i></span>
            <i>-</i>
            <span v-if="item.album">{{ item.album.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { throttle } from 'common/js/util';
  import API from 'API';
  import * as type from '@/store/mutation-types';

  export default {
    name: 'search',
    data () {
      return {
        searchContent: null,
        suggestShow: true,
        suggestRes: [],
        searchRes: [],
      }
    },
    mounted() {
      const _self = this;
      _self.getResult = throttle(async function () {
        let res = await API.searchSuggest({ keywords: _self.searchContent });
        if (res.status === 200 && res.data.code === 200) {
          res = res.data.result;
          _self.suggestRes = res.songs || [];
        }
      }, 200)
    },
    methods: {
      async getSongInfo(ids) {
        let res = await API.getSongInfo({ids});
        if (res.status !== 200 && !res.data && !res.data.songs) return;
        res = res.data.songs[0];
        await this._mainStart(res);
      },
      async _mainStart(songInfo) {
        // 展示播放界面
        this.$store.commit(type.SET_PLAYVIEWSHOW, true);
        await new Promise(resolve => setTimeout(() => resolve(), 600));
        // 初始化播放歌曲信息
        await this.$store.dispatch(type.SET_SONGINFO, songInfo);
        // 初始化播放歌曲在集合中位置
        await this.$store.commit(type.SET_SONGPOSITION, -1);
        // 触发播放函数
        await this.$store.dispatch(type.MAIN_START);
      },
      _back() {
        this.searchContent = null;
        this.suggestRes = [];
        this.$router.go(-1);
      },
      async search() {
        if (!this.searchContent) return;
        this.suggestShow = false;
        let res = await API.search({
          keywords: this.searchContent,
          limit: 5,
        });
        if (res.status !== 200 || res.data.code !== 200 || !res.data.result) return;
        this.searchRes = res.data.result.songs || [];
        console.log(this.searchRes)
      }
    },
    watch: {
      'searchContent'(newValue) {
        if (newValue === '') {
          this.suggestRes = [];
          return;
        }
        this.getResult();
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  @import "../../common/stylus/index.styl"
  font = 100
  .search
    position: fixed
    width 100%
    height auto !important
    top 0
    left 0
    bottom (50/font)rem
    background #fff
    transform translate3d(0, 0, 0)
    overflow hidden
    font-size 0
    &::after
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      z-index -1
      background-color #ecf1f5
    .bar
      display flex
      position fixed
      top 0
      width 100%
      height (57/font)rem
      padding (18/font)rem (16/font)rem
      box-sizing border-box
      z-index 2
      background-color #029688
      .back
        display inline-block
        vertical-align: top
      .input-content
        flex 1
        vertical-align: top
        display flex
        font-size (20/font)rem
        line-height (20/font)rem
        margin-left (22/font)rem
        box-sizing border-box
        border-1px-bottom(#fff)
        &::after
          bottom (-13/font)rem
        input
          flex 1
          padding-left (5/font)rem
          padding-right (22/font)rem
          background-color transparent
          color #fff
          outline none
          font-size (18/font)rem
          &::-webkit-input-placeholder
            color #3fa89b
            font-size (18/font)rem
        .search-icon
          margin-right (10/font)rem
          flex 0 0 (20/font)rem
      .icon-icons01, .icon-fanhui
        display block
        vertical-align top
        font-size (20/font)rem
        color #fff
      .result
        position absolute
        top (57/font)rem
        left (25/font)rem
        right (8/font)rem
        font-size (16/font)rem
        background-color #f3f7fb
        box-shadow: 0 2px 10px #92969a
        color #555
        .result-list
          display block
          box-sizing border-box
          padding (19/font)rem (15/font)rem
          border-1px-bottom(#dfe4e7)
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          .song-name
            width inherit
            display inline-block
            line-height (18/font)rem
            padding-left (30/font)rem
          .search-icon
            position relative
            .icon-icons01
              position absolute
              top (-2/font)rem
              display inline-block
              font-size (20/font)rem
              color #555
        .result-search
          color #4464a6
    .content
      padding-top (57/font)rem
      .result-list
        display block
        box-sizing border-box
        padding (14/font)rem (10/font)rem
        border-1px-bottom(#dfe4e7)
        font-size (16/font)rem
        color #333
        .song-name
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .ar-al-name
          margin-top (10/font)rem
          font-size (12/font)rem
          color #abb0b3;
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
</style>
