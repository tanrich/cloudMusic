<template>
  <div class="play" @click.stop="setPlayViewShow">
    <playView ref="playView" />
    <div class="detail">
      <div class="avatar">
        <img v-if="songInfo.al" :src="songInfo.al.picUrl" width="40" height="40" />
        <img v-else width="40" height="40" />
      </div>
      <div class="info" v-if="songInfo.name">
        <div class="title">{{songInfo.name}}</div>
        <div class="name" v-if="songInfo.ar">
          <span v-for="item in songInfo.ar">{{item.name}}</span>
        </div>
      </div>
      <div class="info" v-else>去找点音乐吧~</div>
    </div>
    <div class="bar">
      <div class="pre" @click.stop="preSong">
        <i class="iconfont icon-shangyishou"></i>
      </div>
      <div class="go" @click.stop="togglePlay">
        <i class="iconfont icon-bofang" v-show="!playStatus"></i>
        <i class="iconfont icon-bofang1" v-show="playStatus"></i>
      </div>
      <div class="next" @click.stop="nextSong">
        <i class="iconfont icon-xiayishou"></i>
      </div>
    </div>
    <input class="range" type="range" ref="range" min="0" :max="duration" step="1">
  </div>
</template>
<script type="text/ecmascript-6">
  import store from '@/store'
  import { mapState, mapActions } from 'vuex'
  import * as type from '@/store/mutation-types'
  import playView from 'components/playView/playView'

  export default {
    name: 'play',
    data () {
      return {}
    },
    store,
    components: {
      playView
    },
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
      ...mapActions({
        nextSong: type.NEXT_SONG,
        preSong: type.PRE_SONG,
        togglePlay: type.TOGGLE_PLAY
      }),
      setPlayViewShow () {
        this.$store.commit(type.SET_PLAYVIEWSHOW, true);
      },
    },
    watch: {
      currentTime (value) {
        let ratio = (value / this.duration) * 100;
        this.$refs['range'].style.background = `linear-gradient(to right, #029688, #029688 ${ratio}%, white 0, white 100%)`
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
        font-size (14/font)rem
        line-height (40/font)rem
        .title
          font-size (14/font)rem
          line-height (24/font)rem
          color #333333
        .name
          font-size (12/font)rem
          line-height (12/font)rem
          color #888888
          span + span
            margin-left (5/font)rem
    .bar
      flex 0 0 (105/font)rem
      width (105/font)rem
      color #029688
      font-size 0
      .pre, .next
        display inline-block
        vertical-align top
        padding (5/font)rem
        margin-top (8/font)rem
        .icon-xiayishou, .icon-shangyishou
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
        display: none
      &::-webkit-slider-runnable-thumb
        -webkit-appearance: none
</style>
