<template>
  <transition name="songComments">
    <div class="songComments" v-show="songCommentsShow">
      <div class="header">
        <div class="back" @click="_hideSongComments">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="content">
          <div class="title">评论 ({{comments.total}})</div>
        </div>
      </div>
      <div class="content-wrapper" ref="content-wrapper">
        <div>
          <div class="song">
            <div class="avatar">
              <img :src="songInfo.album.blurPicUrl" v-if="songInfo.album" width="71" height="71">
            </div>
            <div class="content">
              <div class="title">{{songInfo.name}}</div>
              <div class="name" v-show="songInfo.artists" v-for="item in songInfo.artists">{{item.name}}</div>
            </div>
          </div>
          <div class="comments">
            <div class="comments-wrapper">
              <div class="title">精彩评论</div>
              <ul v-if="comments">
                <li class="list" v-for="item in comments.hotComments">
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
            <div class="comments-wrapper">
              <div class="title">最新评论</div>
              <ul v-if="comments">
                <li class="list" v-for="item in comments.comments">
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
        songCommentsShow: false,
        comments: {}
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
      initScroll () {
        if (!this.cmScroll) {
          this.cmScroll = new BScroll(this.$refs['content-wrapper'], {
            click: true
          })
        } else {
          this.cmScroll.refresh();
        }
      },
      _hideSongComments () {
        this.songCommentsShow = false;
      },
      showSongComments () {
        this.songCommentsShow = true;
        this.getMusicComments();
      },
      // 获取歌曲评论
      getMusicComments () {
        API.getMusicComments({
          musicId: this.songInfo.id,
          offset: 0
        })
          .then((res) => {
            res = res.data;
            this.comments = res;
            // 更新DOM
            this.$nextTick(() => {
              this.initScroll();
            })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    watch: {
      // 歌曲信息改变&&评论界面打开 就会刷新评论
//      songInfo () {
//        if (this.songCommentsShow) {
//          this.getMusicComments();
//        }
//      }
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
