<template>
  <div class="play" @click="setPlayViewShow">
    <div class="detail">
      <div class="avatar">
        <img :src="defaultList.coverImgUrl" width="40" height="40">
      </div>
      <div class="info">
        <div class="title">{{songInfo.name}}</div>
        <div class="name" v-if="songInfo.ar" v-for="item in songInfo.ar">{{item.name}}</div>
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
  font = 100
  .play
    position fixed
    width 100%
    height (50/font)rem
    left 0
    bottom 0
    z-index 98
    background rgba(255, 255, 255, 1)
    padding (5/font)rem (8/font)rem
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
        margin-left (8/font)rem
        .title
          font-size (14/font)rem
          line-height (24/font)rem
          color #333333
        .name
          font-size (12/font)rem
          line-height (12/font)rem
          color #888888
    .bar
      flex 0 0 (105/font)rem
      width (105/font)rem
      color #4caf50
      font-size 0
      .pre, .next
        display inline-block
        vertical-align top
        padding (5/font)rem
        margin-top (8/font)rem
        transform rotate(180deg)
        .icon-nextvideo-copy
          font-size (18/font)rem
          font-weight bold
      .next
        transform rotate(0deg)
      .go
        display inline-block
        vertical-align top
        padding (5/font)rem
        margin (2/font)rem (5/font)rem 0 (5/font)rem
        .icon-bofang, .icon-bofang1
          font-size (26/font)rem
    .range
      -webkit-appearance none
      position: absolute
      width 100%
      height (2/font)rem
      bottom 0
      left 0
      background linear-gradient(to right, #fff 0, #fff 100%)
      &::-webkit-slider-runnable-track
        height (2/font)rem
      &::-webkit-slider-runnable-thumb
        -webkit-appearance: none
</style>
