<template>
  <div>
    <transition name="playView">
      <div class="playView" v-show="playViewShow">
        <!--背景图片-->
        <div class="playView-bg" v-if="songInfo.al" :style="`background:url('${songInfo.al.picUrl}') no-repeat center/cover`"></div>
        <!--头部和打碟-->
        <div class="playView-up">
          <div class="header">
            <div class="back" @click.stop="setPlayViewShow(false)">
              <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="content">
              <div class="title">{{songInfo.name}}</div>
              <div class="name" v-for="item in songInfo.ar">{{item.name}}</div>
            </div>
            <div class="share">
              <i class="iconfont icon-share"></i>
            </div>
          </div>
          <div class="album">
            <div class="pin">
              <div class="pic-wrapper" :class="{active:playStatus}">
                <img src="./pin.png" width="100" class="img-pin">
              </div>
            </div>
            <div class="disk" :class="{active:playStatus}">
              <div class="pic-wrapper">
                <img :src="songInfo.al.picUrl" v-if="songInfo.al" width="185" height="185" class="img-album">
              </div>
            </div>
            <div class="tips" :class="{active:tipsStatus}">{{tipsInfo}}</div>
          </div>
        </div>
        <!--进度条、工具栏、控制按钮-->
        <div class="playView-down">
          <div class="tools-bar">
            <div class="content">
              <i class="iconfont icon-shoucang" :class="{active:collectStatus}" @click="collect"></i>
            </div>
            <div class="content">
              <a :href="MusicSource" title="download" download><i class="iconfont icon-xiazai"></i></a>
            </div>
            <div class="content">
              <i class="iconfont icon-pinglun" @click="_showSongComments"></i>
            </div>
            <div class="content">
              <i class="iconfont icon-jinlingyingcaiwangtubiao42"></i>
            </div>
          </div>
          <div class="play-bar">
            <div class="process">
              <span class="currentTime">{{currentTime | handleTime}}</span>
              <span class="range">
            <input
              ref="range"
              type="range"
              step="1"
              min="0"
              :max="duration"
              v-model="currentTime"
            >
          </span>
              <span class="duration">{{duration | handleTime}}</span>
              <audio ref="audio"
                     id="audio"
                     :src="MusicSource"
                     @loadedmetadata="initTime($event)"
                     @timeupdate="startCountTime($event)"
                     @error="error"
                     @canplay="setCanPlay"
                     @ended="nextSong"
                     controls hidden
              >
              </audio>
            </div>
            <div class="button">
              <div class="pre">
                <i class="iconfont icon-shangyishou" @click="preSong"></i>
              </div>
              <div class="go">
                <i class="iconfont icon-bofang" @click="togglePlay" v-show="!playStatus"></i>
                <i class="iconfont icon-bofang1" @click="togglePlay" v-show="playStatus"></i>
              </div>
              <div class="next">
                <i class="iconfont icon-xiayishou" @click="nextSong"></i>
              </div>
            </div>
          </div>
        </div>
        <!--sticky footer布局-->
      </div>
    </transition>
    <songComments ref="songComments" />
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import API from 'API'
  import * as type from '@/store/mutation-types'
  import {mapState, mapActions} from 'vuex'
  import songComments from 'components/songComments/songComments'
  import { debounce } from 'common/js/util';

  export default {
    name: 'playView',
    data () {
      return {
        tipsStatus: false,
        tipsInfo: '',
        collectStatus: false
      }
    },
    components: {
      songComments
    },
    filters: {
      // 对于时间进行格式化
      handleTime (value) {
        let min = Math.floor(value / 60);
        let second = Math.floor(value - min * 60);
        // 位数不够补零
        min = ('00' + min).substr(min.toString().length);
        second = ('00' + second).substr(second.toString().length);
        return min + ':' + second;
      }
    },
    computed: {
      ...mapState({
        player: (state) => state.player,
        // 触发开始函数
        mainStartCount: (state) => state.player.mainStartCount,
        // 获取界面展示||隐藏状态
        playViewShow: (state) => state.player.playViewShow,
        // 获取播放状态
        playStatus: (state) => state.player.playStatus,
        // 获取歌曲时间长度
        duration: (state) => state.player.duration,
        // 获取歌曲元素
        em: (state) => state.player.em,
        // 获取最终渲染url
        MusicSource: (state) => state.player.MusicSource,
        // tips内容
        tipsWords: state => state.player.tipsWords,
        // 获取歌曲信息
        songInfo: (state) => state.songInfo
      }),
      // 获取&&改变播放进度
      currentTime: {
        get () {
          return this.player.currentTime;
        },
        set (newValue) {
          this.setCurrentTime(newValue);
          this.em.currentTime = newValue;
        }
      }
    },
    methods: {
      ...mapActions({
        nextSong: type.NEXT_SONG,
        preSong: type.PRE_SONG,
        togglePlay: type.TOGGLE_PLAY,
        setCanPlay: type.SET_CANPLAY
      }),
      // 展示评论
      _showSongComments () {
        this.$refs['songComments'].showSongComments()
      },
      // 设置播放器界面状态
      setPlayViewShow (newValue) {
        this.$store.commit(type.SET_PLAYVIEWSHOW, newValue);
      },
      // collect功能未实现，后期修改<!mark>
      collect () {
        this.collectStatus = !this.collectStatus;
      },
      // 设置歌曲信息，为跳转音乐做准备
      setSongInfo (newValue) {
        this.$store.commit(type.SET_SONGINFO, newValue);
      },
      // 设置歌曲在集合中的位置
      setSongPosition (newValue) {
        this.$store.commit(type.SET_SONGPOSITION, newValue);
      },
      // 播放进度时间的改变
      setCurrentTime (newValue) {
        this.$store.commit(type.SET_CURRENTTIME, newValue);
      },
      // 设置歌曲时间长度
      setDuration (newValue) {
        this.$store.commit(type.SET_DURATION, newValue);
      },
      // 设置歌曲元素
      setEm (newEm) {
        this.$store.commit(type.SET_EM, newEm);
      },
      // 重置player数据
      resetPlayer () {
        this.$store.commit(type.RESET_PLAYER);
      },
      // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件，触发initTime()
      initTime (event) {
        console.log('正在缓冲数据');
        if (!this.em) {
          this.setEm(event.target);
          // 获取音乐时间长度
          let newValue = Math.round(this.em.duration);
          this.setDuration(newValue);
        }
      },
      // 音乐播放时改变其播放位置时运行脚本
      startCountTime (event) {
        let newValue = Math.round(event.target.currentTime);
        // let newValue = Math.floor(event.target.currentTime * 2) / 2;
        this.setCurrentTime(newValue);
      },
      // 歌曲404
      error () {
        console.log('抱歉无资源,准备切换下一首');
        this.$store.commit(type.SET_CANPLAY, false);
        this.tipsDisplay('抱歉无资源,准备切换下一首');
        this.nextSong();
      },
      tipsDisplay(info) {
        this.tipsInfo = info;
        this.tipsStatus = true;
        setTimeout(() => {
          this.tipsStatus = false;
        }, 2000);
      }
    },
    watch: {
      // 进度条填充色
      currentTime (value) {
        let ratio = (value / this.duration) * 100;
        this.$refs['range'].style.background = `linear-gradient(to right, #059CFA, #059CFA ${ratio}%, white 0, white 100%)`
      },
      // 发生改变就会触发开始播放
      mainStartCount () {
        this.mainStart();
      },
      tipsWords (value) {
        this.tipsDisplay(value);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  font = 100
  .playView
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    bottom 0
    background #000
    transform translate3d(0, 0, 0)
    z-index 100
    overflow hidden
    &.playView-enter-active, &.playView-leave-active
      transition all .5s
    &.playView-enter, &.playView-leave-active
      transform translate3d(100%, 0, 0)
    .playView-bg
      position absolute
      z-index -1
      top -10px
      left -10px
      right -10px
      bottom -10px
      filter: blur(5px)
      &::after
        content: ''
        position: absolute
        top -10px
        left -10px
        right -10px
        bottom -10px
        background-color rgba(0, 0, 0, .8)
    .playView-up
      height 100%
      min-height 100%
      padding-bottom (185/font)rem
      box-sizing border-box
      display flex
      flex-direction column
      .header
        display flex
        padding (20/font)rem (17/font)rem
        font-size 0
        .back
          flex 0 0 (20/font)rem
          vertical-align top
          margin-top (5/font)rem
          .icon-fanhui
            display inline-block
            font-size (20/font)rem
            font-weight bold
            color #fff
        .content
          flex 1
          font-size 0
          vertical-align top
          padding-left (20/font)rem
          .title
            font-size (16/font)rem
            color #fff
          .name
            font-size (12/font)rem
            color #a8a7a7
            margin-top (5/font)rem
        .share
          flex 0 0 (20/font)rem
          vertical-align top
          margin-top (5/font)rem
          .icon-share
            display inline-block
            font-size (20/font)rem
            font-weight bold
            color #fff

      .album
        position relative
        overflow hidden
        flex 1
        .pin
          position absolute
          display inline-block
          top (-18/font)rem
          left 50%
          margin-left (-16/font)rem
          z-index 99
          .pic-wrapper
            width (100/font)rem
            transform-origin (18/font)rem (18/font)rem
            transform rotate(-30deg)
            transition all .5s
            &.active
              transform rotate(-2deg)
        .disk
          position absolute
          width (275/font)rem
          height (275/font)rem
          top 0
          right 0
          bottom 0
          left 0
          margin auto
          background url("./disk.png") no-repeat
          background-size 100% 100%
          animation rotate 25s infinite linear
          animation-play-state paused;
          @keyframes rotate
            to
              transform rotate(1turn)
          &.active
            animation-play-state running
          .pic-wrapper
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            width (183/font)rem
            height (183/font)rem
            margin auto
            border-radius 50%
            overflow hidden
        .tips
          position absolute
          font-size (12/font)rem
          color #fff
          bottom (10/font)rem
          left 50%
          margin-left (-59/font)rem
          padding (3/font)rem (8/font)rem (4/font)rem (8/font)rem
          border (1/font)rem solid #fff
          border-radius (5/font)rem
          text-align center
          opacity 0
          transition all 1s
          &.active
            opacity 1
        @media only screen and (max-width 320px)
          pin
            .pic-wrapper
              width (70/font)rem
              .img-pin
                width inherit

          .disk
            width (230/font)rem
            height (230/font)rem
            .pic-wrapper
              width (154/font)rem
              height (154/font)rem
              .img-album
                width inherit
                height inherit
        @media only screen and (max-width 360px)
          .pin
            .pic-wrapper
              width (96/font)rem
              .img-pin
                width inherit

          .disk
            width (264/font)rem
            height (264/font)rem
            .pic-wrapper
              width (174/font)rem
              height (174/font)rem
              .img-album
                width inherit
                height inherit
    .playView-down
      position: relative
      margin-top (-185/font)rem
      .tools-bar
        display flex
        padding (15/font)rem (17/font)rem
        font-size 0
        .content
          flex 1
          text-align center
          .iconfont
            font-size (20/font)rem
            font-weight bold
            color #fff
          .icon-shoucang
            &.active
              color red
      .play-bar
        padding 0 (17/font)rem
        .process
          display flex
          font-size 0
          color #fff
          margin (15/font)rem 0
          .currentTime, .duration
            flex 0 0 (35/font)rem
            display inline-block
            font-size (12/font)rem
            line-height (22/font)rem
            text-align center
            vertical-align top
          .range
            flex 1
            display inline-block
            vertical-align top
            padding (10/font)rem (5/font)rem
            box-sizing border-box
            overflow hidden
            input[type=range]
              -webkit-appearance none
              width 100%
              height (2/font)rem
              border-radius: (10/font)rem
              box-sizing border-box
              background linear-gradient(to right, white 0, white 100%)
              cursor pointer
              &::-webkit-slider-runnable-track
                height (2/font)rem
                border-radius (10/font)rem
              &::-webkit-slider-thumb
                -webkit-appearance: none
                width (16/font)rem
                height (16/font)rem
                border-radius 50%
                background #fff
                margin-top (-7/font)rem
              &:focus
                outline none
        .button
          display flex
          padding (10/font)rem 0
          .pre, .go, .next
            display block
            flex 1
            color #fff
            vertical-align top
            text-align center
          .next
            margin-top (7/font)rem
            .icon-xiayishou
              display block
              font-size (42/font)rem
              line-height (42/font)rem
          .pre
            margin-top (7/font)rem
            .icon-shangyishou
              display block
              font-size (42/font)rem
              line-height (42/font)rem
          .go
            .icon-bofang, .icon-bofang1
              display block
              font-size (55/font)rem
              line-height (55/font)rem
</style>
