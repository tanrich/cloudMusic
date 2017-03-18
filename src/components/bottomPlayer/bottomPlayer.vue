<template>
  <div class="play" @click="setPlayViewShow">
    <div class="detail">
      <div class="avatar">
        <img :src="defaultList.coverImgUrl" width="40" height="40">
      </div>
      <div class="info">
        <div class="title">{{songInfo.name}}</div>
        <div class="name" v-if="songInfo.artists" v-for="item in songInfo.artists">{{item.name}}</div>
      </div>
    </div>
    <div class="bar">
      <div class="pre">
        <i class="iconfont icon-nextvideo-copy"></i>
      </div>
      <div class="go">
        <i class="iconfont icon-bofang" @click.stop="togglePLay" v-show="!playStatus"></i>
        <i class="iconfont icon-bofang1" @click.stop="togglePLay" v-show="playStatus"></i>
      </div>
      <div class="next">
        <i class="iconfont icon-nextvideo-copy"></i>
      </div>
    </div>
    <input class="range" type="range" ref="range" min="0" :max="duration" step="1">
  </div>
</template>
<script type="text/ecmascript-6">
  import store from '@/store'
  import {mapState} from 'vuex'
  import * as type from '@/store/mutation-types'
  export default {
    name: 'play',
    data () {
      return {}
    },
    store,
    computed: {
      ...mapState([
        'defaultList',
        'songInfo'
      ]),
      ...mapState({
        em: (state) => state.player.em,
        playStatus: (state) => state.player.playStatus,
        playViewShow: (state) => state.player.playViewShow,
        currentTime: (state) => state.player.currentTime,
        duration: (state) => state.player.duration
      })
    },
    methods: {
      setPlayViewShow () {
        this.$store.commit(type.SET_PLAYVIEWSHOW, true);
      },
      togglePLay () {
        if (!this.em) {
          console.log('请先打开播放器初始化');
          return;
        }
        if (this.playStatus) {
          this.em.pause();
        } else {
          this.em.play();
        }
        this.$store.commit(type.CHANGE_PLAYSTATUS, !this.playStatus);
      }
    },
    watch: {
      currentTime (value) {
        let ratio = (value / this.duration) * 100;
        this.$refs['range'].style.background = `linear-gradient(to right, #4caf50, #4caf50 ${ratio}%, white 0, white 100%)`
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  .play
    position fixed
    width 100%
    height 50px
    left 0
    bottom 0
    z-index 98
    background rgba(255, 255, 255, 1)
    padding 5px 8px
    box-sizing border-box
    display flex
    .detail
      flex 1
      font-size 0
      .avatar
        display inline-block
      .info
        display inline-block
        vertical-align top
        margin-left 8px
        .title
          font-size 14px
          line-height 24px
          color #333333
        .name
          font-size 12px
          line-height 12px
          color #888888
    .bar
      flex 0 0 105px
      width 105px
      color #4caf50
      font-size 0
      .pre, .next
        display inline-block
        vertical-align top
        padding 5px
        margin-top 8px
        transform rotate(180deg)
        .icon-nextvideo-copy
          font-size 18px
          font-weight bold
      .next
        transform rotate(0deg)
      .go
        display inline-block
        vertical-align top
        padding 5px
        margin 2px 5px 0 5px
        .icon-bofang, .icon-bofang1
          font-size 26px
    .range
      -webkit-appearance none
      position: absolute
      width 100%
      height 2px
      bottom 0
      left 0
      background linear-gradient(to right, #fff 0, #fff 100%)
      &::-webkit-slider-runnable-track
        height 2px
      &::-webkit-slider-runnable-thumb
        -webkit-appearance: none
</style>
