<template>
  <transition name="playView">
    <div class="playView" v-show="playViewShow">
      <div class="header">
        <div class="back" @click="hidePlayView">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="content">
          <div class="title">{{songInfo.name}}</div>
          <div class="name" v-for="item in songInfo.artists">{{item.name}}</div>
        </div>
        <div class="share">
          <i class="iconfont icon-share"></i>
        </div>
      </div>
      <div class="album">
        <div class="disk" :class="{active:playStatus}">
          <div class="pic-wrapper">
            <img :src="songInfo.album.blurPicUrl" v-if="songInfo.album" width="185" height="185">
          </div>
        </div>
      </div>
      <div class="tools-bar">
        <div class="content">
          <i class="iconfont icon-shoucang"></i>
        </div>
        <div class="content">
          <i class="iconfont icon-xiazai"></i>
        </div>
        <div class="content">
          <i class="iconfont icon-pinglun
电台
"></i>
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
              @change="test($event)"
            >
          </span>
          <span class="duration">{{duration | handleTime}}</span>
          <!--http://m2.music.126.net/HtgbPCMSEkVMzlQLoRw8dg==/8991806091995315.mp3-->
          <audio ref="audio"
                 id="audio"
                 src=""
                 @loadedmetadata="initTime($event)"
                 @timeupdate="startCountTime($event)"
                 controls hidden
          ></audio>
        </div>
        <div class="button">
          <div class="pre">
            <i class="iconfont icon-xiayishou"></i>
          </div>
          <div class="go">
            <i class="iconfont icon-bofang" @click="togglePlay" v-show="!playStatus"></i>
            <i class="iconfont icon-bofang1" @click="togglePlay" v-show="playStatus"></i>
          </div>
          <div class="next">
            <i class="iconfont icon-xiayishou"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script type="text/ecmascript-6">
  import API from 'API'
  import * as type from '@/store/mutation-types'
  export default {
    name: 'playView',
    data () {
      return {
        playViewShow: false,
        musicQuality: 'hMusic'
      }
    },
    props: ['songInfo'],
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
      // 提取歌曲资源
      initMusicSource () {
        return {
          hMusic: {
            dfsId: this.songInfo.hMusic.dfsId
          },
          mMusic: {
            dfsId: this.songInfo.mMusic.dfsId
          },
          lMusic: {
            dfsId: this.songInfo.lMusic.dfsId
          }
        };
      },
      // 获取播放状态
      playStatus () {
        return this.$store.state.player.playStatus;
      },
      // 获取歌曲时间长度
      duration () {
        return this.$store.state.player.duration;
      },
      // 获取歌曲元素
      em () {
        return this.$store.state.player.em;
      },
      // 获取&&改变播放进度
      currentTime: {
        get () {
          return this.$store.state.player.currentTime;
        },
        set (newValue) {
          this.changeCurrentTime(newValue);
          this.$store.state.player.em.currentTime = newValue;
        }
      }
    },
    methods: {
      // 获取歌曲资源
      getMusic () {
        API.getMusicSource(this.initMusicSource)
          .then((res) => {
            res = res.data;
            if (res.state === 0) {
              let data = res.data;
            }
          })
      },
      // 改变播放状态
      changePlayStatus (newValue) {
        this.$store.commit(type.CHANGE_PLAYSTATUS, newValue);
      },
      // 播放进度时间的改变
      changeCurrentTime (newValue) {
        this.$store.commit(type.CHANGE_CURRENTTIME, newValue);
      },
      // 设置歌曲时间长度
      setDuration (newValue) {
        this.$store.commit(type.SET_DURATION, newValue);
      },
      // 设置歌曲元素
      setEm (newEm) {
        this.$store.commit(type.SET_EM, newEm);
      },
      // 音乐界面展示并获取音乐资源
      showPlayView () {
        this.playViewShow = true;
        // 等待songInfo数据更新
        this.$nextTick(() => {
          this.getMusic();
        });
      },
      hidePlayView () {
        this.playViewShow = false;
      },
      // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件，触发initTime()
      initTime (event) {
        if (this.em === '') {
          this.setEm(event.target);
          // 获取音乐时间长度
          let newValue = Math.round(this.em.duration);
          this.setDuration(newValue);
        }
      },
      // 暂停&&播放
      togglePlay () {
        if (this.playStatus) {
          this.$refs['audio'].pause();
        } else {
          this.$refs['audio'].play();
        }
        this.changePlayStatus(!this.playStatus);
      },
      // 音乐播放时改变其播放位置时运行脚本
      startCountTime (event) {
        let newValue = Math.floor(event.target.currentTime * 2) / 2;
        this.changeCurrentTime(newValue);
      },
      // 进度条填充颜色
      test (event) {
        let nowValue = event.target.value;
        let max = event.target.max;
        let ratio = nowValue / max;
        console.log(ratio * 100)
        console.log(this.$refs['range'])
        this.$refs['range'].style.background = 'linear-gradient(to right, #059CFA, white ' + ratio + '%, white)'
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .playView
    position fixed
    width 100%
    top 0
    left 0
    bottom 0
    background #000
    transform translate3d(0, 0, 0)
    z-index 9999
    overflow hidden
    &.playView-enter-active, &.playView-leave-active
      transition all .5s
    &.playView-enter, &.playView-leave-active
      transform translate3d(100%, 0, 0)
    .header
      display: flex
      padding 20px 17px
      font-size 0
      .back
        flex 0 0 20px
        vertical-align top
        margin-top 5px
        .icon-fanhui
          display inline-block
          font-size 20px
          font-weight bold
          color #fff
      .content
        flex 1
        font-size 0
        vertical-align top
        padding-left 20px
        .title
          font-size 16px
          color #fff
        .name
          font-size 12px
          color #a8a7a7
          margin-top 5px
      .share
        flex 0 0 20px
        vertical-align top
        margin-top 5px
        .icon-share
          display inline-block
          font-size 20px
          font-weight bold
          color #fff
    .album
      height 400px
      position relative
      .disk
        position absolute
        width 275px
        height 275px
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
          width 185px
          height 185px
          margin auto
          border-radius 50%
          overflow hidden
    .tools-bar
      display flex
      padding 15px 17px
      font-size 0
      .content
        flex 1
        text-align center
        .iconfont
          font-size 20px
          font-weight bold
          color #fff
    .play-bar
      padding 0 17px
      .process
        display flex
        font-size 0
        color #fff
        margin 15px 0
        .currentTime, .duration
          flex 0 0 35px
          display inline-block
          font-size 12px
          line-height 22px
          text-align center
          vertical-align top
        .range
          flex 1
          display inline-block
          vertical-align top
          padding 10px 5px
          box-sizing border-box
          overflow hidden
          input[type=range]
            -webkit-appearance none
            width 100%
            height 2px
            border-radius: 10px
            box-sizing border-box
            &::-webkit-slider-thumb
              -webkit-appearance: none
            &::-webkit-slider-runnable-track
              height 2px
              border-radius 10px
            &::-webkit-slider-thumb
              width 16px
              height 16px
              border-radius 50%
              background red
              margin-top -7px
            &:focus
              outline none
      .button
        display flex
        padding 10px 0
        .pre, .go, .next
          flex 1
          color #fff
          vertical-align top
          text-align center
        .pre
          transform rotate(180deg)
        .pre, .next
          margin-top 7px
          .icon-xiayishou
            display inline-block
            font-size 42px
            line-height 42px
        .go
          .icon-bofang, .icon-bofang1
            display inline-block
            font-size 55px
            line-height 55px
</style>
