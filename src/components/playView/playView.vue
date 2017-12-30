<template>
  <div>
    <transition name="playView">
      <div class="playView" v-show="playViewShow">
        <!--背景图片-->
        <div class="playView-bg" v-if="songInfo.al" :style="`background:url('${songInfo.al.picUrl}') no-repeat center/cover`"></div>
        <!--头部和打碟-->
        <div class="playView-up">
          <div class="header">
            <div class="back" @click.stop="hidePlayView">
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
              <i class="iconfont icon-xiazai" @click="download"></i>
              <a :href="MusicSource" title="download" ref="download" download hidden></a>
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
                     @error="autoSwitch"
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
    <songComments ref="songComments"></songComments>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import API from 'API'
  import * as type from '@/store/mutation-types'
  import {mapState, mapMutations} from 'vuex'
  import songComments from 'components/songComments/songComments'
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
        // 获取音质类型(0,1,2对应低,中,高)
        musicQuality: (state) => state.player.musicQuality,
        // 获取高音质url
        hMusicSource: (state) => state.player.hMusicSource,
        // 获取中音质url
        mMusicSource: (state) => state.player.mMusicSource,
        // 获取低音质url
        lMusicSource: (state) => state.player.lMusicSource,
        // 获取最终渲染url
        MusicSource: (state) => state.player.MusicSource,
        // 获取资源是否可以播放
        canPlay: (state) => state.player.canPlay,
        // 获得歌曲在集合中的位置
        songPosition: (state) => state.songPosition,
        // 获取歌曲集合
        tracks: (state) => state.tracks,
        // 获取歌曲信息
        songInfo: (state) => state.songInfo
      }),
      // 提取歌曲资源为对象，准备发送至后台解码
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
      // 获取&&改变播放进度
      currentTime: {
        get () {
          return this.$store.state.player.currentTime;
        },
        set (newValue) {
          this.setCurrentTime(newValue);
          this.$store.state.player.em.currentTime = newValue;
        }
      }
    },
    methods: {
      // 展示评论
      _showSongComments () {
        this.$refs['songComments'].showSongComments()
      },
      // 播放器开始工作入口
      mainStart () {
        // 等待songInfo数据更新
        this.$nextTick(() => {
          this.resetPlayer();
          this.getMusic();
        });
      },
      // 设置播放器界面状态
      setPlayViewShow (newValue) {
        this.$store.commit(type.SET_PLAYVIEWSHOW, newValue);
      },
      // collect功能未实现，后期修改<!mark>
      collect () {
        this.collectStatus = !this.collectStatus;
      },
      // 设置歌曲是否可以播放(如果资源可以播放&&拖动音轨 会触发canplay事件执行setCanPlay函数)
      setCanPlay () {
        console.log('可以播放')
        this.$store.commit(type.SET_CANPLAY, true);
        // 歌曲可播放时自动开始播放 && 拖动音轨改为播放
        this.em.play();
        this.changePlayStatus(true);
      },
      // 准备播放上一首
      preSong () {
        // 歌曲位置-1
        this.setSongPosition(this.songPosition - 1);
        this.setSongInfo(this.tracks[this.songPosition]);
        this.mainStart();
        // 延迟执行1500ms，等待音乐资源结束判断是否跳转上一首
        setTimeout(() => {
          console.log('开始检测音乐资源');
          if (this.musicQuality === 2 && !this.canPlay) {
            console.log('切换上一首中');
            this.preSong();
          }
        }, 1500)
      },
      // 准备播放下一首
      nextSong () {
        // 歌曲位置+1
        this.setSongPosition(this.songPosition + 1);
        this.setSongInfo(this.tracks[this.songPosition]);
        this.mainStart();
        // 延迟执行1500ms，等待音乐资源结束判断是否跳转下一首
        setTimeout(() => {
          console.log('开始检测音乐资源');
          if (this.musicQuality === 2 && !this.canPlay) {
            console.log('切换下一首中');
            this.nextSong();
          }
        }, 1500)
      },
      // 下载音乐
      download () {
        this.$refs['download'].click();
      },
      // 向后台获取解码歌曲资源
      getMusic () {
        API.getMusicSource({id: this.songInfo.id})
          .then((res) => {
            res = res.data;
            if (res.code === 200) {
              let data = res.data[0];
              // 设置默认渲染url为低音质
              this.setAllMusic(type.SET_MUSIC, data.url);
              console.log('尝试加载低音质')
            }
          })
          .catch((err) => {
            console.log(err);
          })
      },
      // 设置歌曲信息，为跳转音乐做准备
      setSongInfo (newValue) {
        this.$store.commit(type.SET_SONGINFO, newValue);
      },
      // 设置歌曲在集合中的位置
      setSongPosition (newValue) {
        this.$store.commit(type.SET_SONGPOSITION, newValue);
      },
      // 设置音质类型
      setMusicQuality (newValue) {
        this.$store.commit(type.SET_MUSICQUALITY, newValue)
      },
      // 设置高、中、低三音质url及最终渲染url
      setAllMusic (name, newValue) {
        this.$store.commit(name, newValue)
      },
      // 改变播放状态
      changePlayStatus (newValue) {
        this.$store.commit(type.CHANGE_PLAYSTATUS, newValue);
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
      // 音乐界面展示
      showPlayView () {
        this.setPlayViewShow(true);
      },
      // 隐藏音乐界面
      hidePlayView () {
        this.setPlayViewShow(false);
      },
      // 重置player数据
      resetPlayer () {
        this.$store.commit(type.RESET_PLAYER);
      },
      // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件，触发initTime()
      initTime (event) {
        console.log('正在缓冲数据');
        if (this.em === '') {
          this.setEm(event.target);
          // 获取音乐时间长度
          let newValue = Math.round(this.em.duration);
          this.setDuration(newValue);
        }
      },
      // 暂停&&播放
      togglePlay () {
        if (this.canPlay) {
          if (this.playStatus) {
            this.em.pause();
          } else {
            this.em.play();
          }
          this.changePlayStatus(!this.playStatus);
        } else {
          console.log('资源加载中,请稍后');
          this.tipsInfo = '资源加载中,请稍后';
          this.tipsStatus = true;
          setTimeout(() => {
            this.tipsStatus = false;
          }, 2000);
        }
      },
      // 音乐播放时改变其播放位置时运行脚本
      startCountTime (event) {
        let newValue = Math.round(event.target.currentTime);
        // let newValue = Math.floor(event.target.currentTime * 2) / 2;
        this.setCurrentTime(newValue);
      },
      // 歌曲音质自动切换避免404
      autoSwitch () {
        this.$nextTick(() => {
          if (!this.lMusicSource) {
            return;
          }
          switch (this.musicQuality) {
            case 0:
              console.log('尝试加载中音质');
              this.setAllMusic(type.SET_MUSIC, this.mMusicSource);
              this.setMusicQuality(1);
              break;
            case 1:
              console.log('尝试加载高音质');
              this.setAllMusic(type.SET_MUSIC, this.hMusicSource);
              this.setMusicQuality(2);
              break;
            case 2:
              console.log('抱歉无资源,准备切换下一首');
              this.tipsInfo = '抱歉无资源,准备切换下一首';
              this.tipsStatus = true;
              setTimeout(() => {
                this.tipsStatus = false;
              }, 2000);
              break;
          }
        })
      }
    },
    watch: {
      // 进度条填充色
      currentTime (value) {
        let ratio = (value / this.duration) * 100;
        this.$refs['range'].style.background = `linear-gradient(to right, #059CFA, #059CFA ${ratio}%, white 0, white 100%)`
      },
      // 发生改变就会触发开始播放
      mainStartCount (value) {
        this.mainStart();
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
                background red
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
