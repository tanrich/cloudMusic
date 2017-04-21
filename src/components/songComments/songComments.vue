<template>
  <transition name="songComments">
    <div class="songComments" v-show="songCommentsShow">
      <div class="header">
        <div class="back" @click="_hideSongComments">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="content">
          <div class="title">评论 ({{songComments.total}})</div>
        </div>
      </div>
      <div class="content-wrapper" ref="content-wrapper">
        <div ref="content-height">
          <div class="song">
            <div class="avatar">
              <img :src="songInfo.album.blurPicUrl" v-if="songInfo.album" width="71" height="71">
            </div>
            <div class="content">
              <div class="title">{{songInfo.name}}</div>
              <div class="name" v-show="songInfo.artists" v-for="item in songInfo.artists">{{item.name}}</div>
            </div>
          </div>
          <div class="comments" v-if="songComments">
            <div class="comments-wrapper">
              <div class="title">精彩评论</div>
              <ul v-if="hotComments">
                <li class="list" v-for="item in hotComments">
                  <div class="avatar">
                    <img :src="item.user.avatarUrl" width="32" height="32">
                  </div>
                  <div class="content border-1px-bottom">
                    <div class="name">{{item.user.nickname}}</div>
                    <div class="time">{{item.time | dateFormat}}</div>
                    <div class="text">{{item.content}}</div>
                    <div class="agree" @click.stop="clickAgree($event)">
                      <span class="count">{{item.likedCount}}</span>
                      <i class="iconfont icon-down" :class="{active:agree}"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="comments-wrapper">
              <div class="title">最新评论</div>
              <ul v-if="newComments">
                <li class="list" v-for="item in newComments">
                  <div class="avatar">
                    <img :src="item.user.avatarUrl" width="32" height="32">
                  </div>
                  <div class="content border-1px-bottom">
                    <div class="name">{{item.user.nickname}}</div>
                    <div class="time">{{item.time | dateFormat}}</div>
                    <div class="text">{{item.content}}</div>
                    <div class="agree">
                      <span class="count">{{item.likedCount}}</span>
                      <i class="iconfont icon-down"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="loading" v-show="resWait">
              正在加载中……
              <!--<img src="./loading1.gif" alt="" width="100%" height="200px">-->
            </div>
          </div>
        </div>
      </div>
      <div class="push-comments">
        <div class="text">
          <input type="text" placeholder="写评论">
        </div>
        <div class="send">
          <button type="button">发送</button>
        </div>
      </div>
    </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import API from 'API'
  import BScroll from 'better-scroll'
  export default {
    name: 'songComments',
    data () {
      return {
        // 歌曲信息是否有差异
        songInfoDiffer: false,
        songCommentsShow: false,
        songComments: {},
        hotComments: [],
        newComments: [],
        agree: false,
        scrollY: 0,
        offset: 0,
        // 请求等待
        reqWait: false,
        // 返回等待
        resWait: true
      }
    },
    filters: {
      dateFormat (value) {
        let date = new Date(value);
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDay() + 1}日`
      }
    },
    computed: {
      ...mapState({
        songInfo: (state) => state.songInfo
      })
    },
    methods: {
      // 检测对象是否为空
      isEmptyObject (obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      },
      // 初始化滚动轴
      initScroll () {
        if (!this.cmScroll) {
          this.cmScroll = new BScroll(this.$refs['content-wrapper'], {
            // 探针作用，希望能够实时获取scroll的位置
            probeType: 3,
            // better-scroll对于常规事件preventDefault
            click: true
          })
        } else {
          this.cmScroll.refresh();
        }
        // 监听scroll事件，实时获取scrollY
        this.cmScroll.on('scroll', (position) => {
          this.scrollY = Math.abs(Math.round(position.y));
          // 实际评论视窗高度
          let cmEyeHeight = window.innerHeight - 110;
          // 真正评论高度
          let cmReallyHeight = this.$refs['content-height'].clientHeight;
          if (cmEyeHeight + this.scrollY > cmReallyHeight && !this.wait) {
            console.log('到底了！');
            if (!this.reqWait) {
              this.offset += 10;
              this.getMusicComments();
              // 设置加载评论时间间隔
              setTimeout(() => {
                this.reqWait = false;
              }, 1000)
            }
            this.reqWait = true;
          }
        })
      },
      // 隐藏评论界面
      _hideSongComments () {
        this.songCommentsShow = false;
      },
      // 展示评论界面
      showSongComments () {
        this.songCommentsShow = true;
        // 如果评论为空||歌曲信息改变 会触发get请求
        if (this.isEmptyObject(this.songInfoDiffer) || this.songInfoDiffer) {
          this.getMusicComments();
        }
      },
      // 获取歌曲评论
      getMusicComments () {
        // offset为评论偏移量
        API.getMusicComments({
          musicId: this.songInfo.id,
          offset: this.offset
        })
          .then((res) => {
            res = res.data;
            this.songComments = res;
            // 热门评论不用更新
            if (this.hotComments.length === 0) {
              this.hotComments = res.hotComments;
            }
            // 最新评论与原来的合并
            this.newComments = this.newComments.concat(res.comments);
            // 更新DOM
            this.$nextTick(() => {
              this.initScroll();
            })
          })
          .catch((err) => {
            console.log(err);
          })
      },
      // 点赞
      clickAgree (event) {
        if (!event._constructed) {
          return;
        }
        this.agree = !this.agree;
      },
      // 重置评论
      reset () {
        this.songComments = {};
        this.hotComments = [];
        this.newComments = [];
        this.agree = false;
        this.scrollY = 0;
        this.offset = 0;
        this.reqWait = false;
        this.songInfoDiffer = false;
      }
    },
    watch: {
      // 歌曲信息改变
      songInfo (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.songInfoDiffer = true;
          this.reset();
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  @import "../../common/stylus/index.styl"
  .songComments
    position fixed
    width 100%
    top 0
    left 0
    bottom 0
    background #f2f4f5
    transform translate3d(0, 0, 0)
    z-index 200
    overflow hidden
    &.songComments-enter-active, &.songComments-leave-active
      transition all .5s
    &.songComments-enter, &.songComments-leave-active
      transform translate3d(100%, 0, 0)
    .header
      display flex
      width 100%
      padding 20px 17px
      font-size 0
      background #5dae52
      z-index 220
      .back
        flex 0 0 20px
        vertical-align top
        .icon-fanhui
          display inline-block
          font-size 20px
          font-weight bold
          color #fff
      .content
        flex 1
        vertical-align top
        padding-left 20px
        .title
          font-size 20px
          color #fff
    .content-wrapper
      position absolute
      width 100%
      top 60px
      left 0
      bottom 50px
      overflow hidden
      z-index 210
      .song
        display flex
        padding 10px
        font-size 0
        z-index 220
        .avatar
          display inline-block
          flex 0 0 71px
          width 71px
        .content
          display inline-block
          flex 1
          padding-left 10px
          .title
            font-size 16px
            line-height 16px
            margin-top 15px
            color #333
          .name
            font-size 14px
            line-height 16px
            margin-top 10px
            color #666666
      .comments-wrapper
        .title
          padding 6px 10px
          height 26px
          font-size 14px
          background #e6e8e9
          opacity .8
          color #999999
          box-sizing border-box
        .list
          padding-left 10px
          padding-top 11px
          display flex
          .avatar
            flex 0 0 32px
            width 32px
            height 32px
            vertical-align top
            border-radius 50%
            overflow hidden
          .content
            flex 1
            position relative
            vertical-align top
            margin-left 10px
            padding-bottom 11px
            border-1px-bottom(#dadcdd)
            .name
              margin-top 3px
              font-size 12px
              line-height 12px
              color #666666
            .time
              margin-top 6px
              font-size 10px
              line-height 10px
              color #999999
            .text
              margin-top 8px
              padding-right 10px
              font-size 14px
              line-height 20px
            .agree
              position absolute
              right 10px
              top 9px
              font-size 0
              .count
                display inline-block
                vertical-align top
                font-size 12px
                line-height 14px
                color #999999
                margin-right 2px
              .icon-down
                display inline-block
                vertical-align top
                font-size 15px
                font-weight bold
                color #999999
                &.active
                  animation agree .5s linear
                  color red;
                @keyframes agree
                  0%
                    transform scale(1)
                  50%
                    transform scale(1.2)
                  100%
                    transform scale(1)
      .loading
        height 20px
        line-height 20px
        padding 10px 0
        text-align center
    .push-comments
      position fixed
      display flex
      width 100%
      height 50px
      left 0
      bottom 0
      background #fff
      padding 10px
      box-sizing border-box
      .text
        display inline-block
        flex 1
        input[type=text]
          width 100%
          height 100%
          outline none
          box-sizing border-box
          border-bottom 1px solid #e6e6e6
          &::-webkit-input-placeholder
            color #e6e6e6
          &::-moz-placeholder
            color #e6e6e6
      .send
        display inline-block
        flex 0 0 40px
        width 50px
        margin-left 10px
        button[type=button]
          padding 0
          width 100%
          height 100%
          border 1px solid #e6e6e6
          border-radius 3px
          background #fff
          color #999999
</style>
