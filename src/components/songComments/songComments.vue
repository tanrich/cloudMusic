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
              <img :src="songInfo.al.picUrl" v-if="songInfo.al" width="71" height="71">
            </div>
            <div class="content">
              <div class="title">{{songInfo.name}}</div>
              <div class="name" v-show="songInfo.ar" v-for="item in songInfo.ar">{{item.name}}</div>
            </div>
          </div>
          <div class="comments" v-if="songComments">
            <div class="comments-wrapper">
              <div class="title">精彩评论</div>
              <ul v-if="hotComments">
                <li class="list" v-for="item in hotComments">
                  <div class="avatar">
                    <img v-lazy="item.user.avatarUrl" width="32" height="32">
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
                    <img v-lazy="item.user.avatarUrl" width="32" height="32">
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
              <!--<img src="./loading1.gif" alt="" width="100%" height="200/font)rem">-->
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
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import API from 'API'
  import BScroll from 'better-scroll'

  export default {
    name: 'songComments',
    data() {
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
      dateFormat(value) {
        let now = new Date();
        let date = new Date(value);
        if (now.getFullYear() > date.getFullYear()) {
          return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
        } else {
          if (now.getMonth() === date.getMonth() && now.getDate() === date.getDate()) {
            let hours, seconds;
            hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
            seconds = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
            return `${hours}:${seconds}`;
          } else {
            return `${date.getMonth() + 1}月${date.getDate()}日`;
          }
        }
      }
    },
    computed: {
      ...mapState({
        songInfo: (state) => state.songInfo
      })
    },
    methods: {
      // 检测对象是否为空
      isEmptyObject(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      },
      // 初始化滚动轴
      initScroll() {
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
      _hideSongComments() {
        this.songCommentsShow = false;
      },
      // 展示评论界面
      showSongComments() {
        this.songCommentsShow = true;
        // 如果评论为空||歌曲信息改变 会触发get请求
        if (this.isEmptyObject(this.songInfoDiffer) || this.songInfoDiffer) {
          this.getMusicComments();
        }
      },
      // 获取歌曲评论
      getMusicComments() {
        // offset为评论偏移量
        API.getMusicComments({
          id: this.songInfo.id,
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
      clickAgree(event) {
        if (!event._constructed) {
          return;
        }
        this.agree = !this.agree;
      },
      // 重置评论
      reset() {
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
      songInfo(newValue, oldValue) {
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
  font = 100
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
      padding (20/font)rem (17/font)rem
      font-size 0
      background #029688
      z-index 220
      .back
        flex 0 0 (20/font)rem
        vertical-align top
        .icon-fanhui
          display inline-block
          font-size (20/font)rem
          font-weight bold
          color #fff
      .content
        flex 1
        vertical-align top
        padding-left (20/font)rem
        .title
          font-size (20/font)rem
          color #fff
    .content-wrapper
      position absolute
      width 100%
      top (60/font)rem
      left 0
      bottom (50/font)rem
      overflow hidden
      z-index 210
      .song
        display flex
        padding (10/font)rem
        font-size 0
        z-index 220
        .avatar
          display inline-block
          flex 0 0 (71/font)rem
          width (71/font)rem
          img
            display block
        .content
          display inline-block
          flex 1
          padding-left (10/font)rem
          .title
            font-size (16/font)rem
            line-height (16/font)rem
            margin-top (15/font)rem
            color #333
          .name
            font-size (14/font)rem
            line-height (16/font)rem
            margin-top (10/font)rem
            color #666666
      .comments-wrapper
        .title
          padding (6/font)rem (10/font)rem
          height (26/font)rem
          font-size (14/font)rem
          background #e6e8e9
          opacity .8
          color #999999
          box-sizing border-box
        .list
          padding-left (10/font)rem
          padding-top (11/font)rem
          display flex
          .avatar
            flex 0 0 (32/font)rem
            width (32/font)rem
            height (32/font)rem
            vertical-align top
            border-radius 50%
            overflow hidden
            img
              display block
          .content
            flex 1
            position relative
            vertical-align top
            margin-left (10/font)rem
            padding-bottom (11/font)rem
            border-1px-bottom(#dadcdd)
            .name
              margin-top (3/font)rem
              font-size (12/font)rem
              line-height (12/font)rem
              color #666666
            .time
              margin-top (6/font)rem
              font-size (10/font)rem
              line-height (10/font)rem
              color #999999
            .text
              margin-top (8/font)rem
              padding-right (10/font)rem
              font-size (14/font)rem
              line-height (20/font)rem
            .agree
              position absolute
              right (10/font)rem
              top (9/font)rem
              font-size 0
              .count
                display inline-block
                vertical-align top
                font-size (12/font)rem
                line-height (14/font)rem
                color #999999
                margin-right (2/font)rem
              .icon-down
                display inline-block
                vertical-align top
                font-size (15/font)rem
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
        height (20/font)rem
        line-height (20/font)rem
        padding (10/font)rem 0
        text-align center
        font-size (14/font)rem
    .push-comments
      position fixed
      display flex
      width 100%
      height (50/font)rem
      left 0
      bottom 0
      background #fff
      padding (10/font)rem
      box-sizing border-box
      .text
        display inline-block
        flex 1
        input[type=text]
          display block
          width 100%
          height 100%
          outline none
          box-sizing border-box
          border-bottom (1/font)rem solid #e6e6e6
          font-size (16/font)rem
          &::-webkit-input-placeholder
            color #e6e6e6
          &::-moz-placeholder
            color #e6e6e6
      .send
        display inline-block
        flex 0 0 (40/font)rem
        width (50/font)rem
        margin-left (10/font)rem
        button[type=button]
          display block
          padding 0
          width 100%
          height 100%
          border (1/font)rem solid #e6e6e6
          border-radius (3/font)rem
          background #fff
          color #999999
</style>
