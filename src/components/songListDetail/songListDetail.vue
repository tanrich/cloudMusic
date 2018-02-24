<template>
  <transition name="detail-show">
    <div class="detail">
      <!--头部返回栏-->
      <div class="bar" :style="`background: url(${defaultList.coverImgUrl}) no-repeat top left/ 1000%`">
        <span class="back" @click="hideDetail">
          <i class="iconfont icon-fanhui"></i>
        </span>
        <span class="name">{{ defaultList.name }}</span>
      </div>
      <div ref="container" class="container">
        <div>
          <!--头部-->
          <div class="top-container">
            <div class="top-container-bg" :style="`background: url(${defaultList.coverImgUrl}) no-repeat top left/ 100%`"></div>
            <div class="top-image">
              <div class="image">
                  <span class="earing">
                    <i class="iconfont icon-icon14"></i>
                    <span>{{defaultList.playCount}}</span>
                  </span>
                <img :src="defaultList.coverImgUrl" style="width: 1.1rem;">
              </div>
              <div class="content">
                <h1 class="title">{{defaultList.name}}</h1>
                <div class="info">
              <span class="avatar">
                <img :src="creator.avatarUrl" style="width: 0.25rem;">
              </span>
                  <span class="name">{{creator.nickname}}</span>
                </div>
              </div>
            </div>
            <songListDetailToolBar />
          </div>
          <!--列表-->
          <div class="middle-container">
            <listItem @accessShow="receiveAS" />
          </div>
        </div>
      </div>
      <!--伪造play弹窗，获取用户权限-->
      <transition name="slide">
        <div class="access-box" v-show="firstClick && accessShow">
          <div class="access">
            <div class="title">循环播放当前列表音乐吗？</div>
            <div class="action" @click.stop="getPlayAccess">
              <div>是</div>
              <div>否</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import listItem from 'components/listItem/listItem'
  import songListDetailToolBar from 'components/songListDetailToolBar/songListDetailToolBar'
  import * as type from '@/store/mutation-types'
  import API from 'API'
  import BScroll from 'better-scroll'
  import { setItem, getItem } from 'common/js/localStorage'

  export default {
    name: 'detail',
    data () {
      return {
        show: false,
        firstClick: true,
        accessShow: false,
      }
    },
    components: {
      listItem, songListDetailToolBar
    },
    computed: {
      ...mapState([
        'defaultList',
        'creator',
        'songInfo',
        'songListMenu'
      ])
    },
    beforeRouteEnter(to, from, next) {
      const index = to.query ? to.query.index : 0;
      next(vm => vm.showDetail(index));
    },
    methods: {
      initContainerScroll () {
        if (!this.container) {
          this.container = new BScroll(this.$refs['container'], {
            click: true
          })
        } else {
          this.container.refresh();
        }
      },
      showDetail (index) {
        const length = this.songListMenu.length;
        if (length === 0) {
          // 刷新页面无数据加载主页
          this.$router.push({ name: 'mySongList' });
          return;
        }
        // 防止index超出
        index = index > length - 1 ? length - 1 : index;
        const id = this.songListMenu[index].id;
        // 若两次点击歌单相同，则不发送ajax
        if (this.defaultList.id === id) {
          return;
        }
        this.initSongList(id);
      },
      hideDetail () {
        this.$router.go(-1);
      },
      initSongList (id) {
        const storage = getItem(`${type.INIT_DEFAULT_LIST}_${id}`);
        if (storage) {
          this.$store.commit(type.INIT_DEFAULT_LIST, storage);
          this.$nextTick(() => {
            this.initContainerScroll();
          });
        }
        API.getDefaultSongList({id})
          .then(res => {
            res = res.data;
            if (res.code === 200) {
              this.$store.commit(type.INIT_DEFAULT_LIST, res.playlist);
              setItem(`${type.INIT_DEFAULT_LIST}_${id}`, res.playlist);
            }
          })
          .then(() => {
            // better-scroll严重依赖DOM获取高度，等待数据更新，重新获取高度
            this.$nextTick(() => {
              this.initContainerScroll();
            });
          })
          .catch(err => {
            console.log(err)
          });
      },
      getPlayAccess () {
        this.firstClick = false;
        this.accessShow = false;
        this.$store.commit(type.CHANGE_PLAYSTATUS, false);
        this.$store.dispatch(type.TOGGLE_PLAY);
      },
      receiveAS () {
        this.accessShow = true;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/iconfont.css"
  font = 100
  .detail
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
      background-color rgba(242,244,245,0.6)
    &.detail-show-enter, &.detail-show-leave-to
      opacity 0
      transform translate3d(100%, 0, 0)
    &.detail-show-enter-active, &.detail-show-leave-active
      transition all .5s
    .bar
      position fixed
      top 0
      width 100%
      padding (17/font)rem (16/font)rem
      box-sizing border-box
      z-index 2
      &::after
        content ''
        z-index -1
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background rgba(0, 0, 0, .6)
      .back
        display inline-block
        vertical-align: top
        .icon-fanhui
          display block
          vertical-align top
          font-size (20/font)rem
          color #fff
      .name
        vertical-align: top
        display inline-block
        font-size (20/font)rem
        color #fff
        line-height (20/font)rem
        margin-left (22/font)rem
    .container
      width 100%
      height 100%
      .top-container
        position relative
        padding (40/font)rem (17/font)rem (13/font)rem (17/font)rem
        box-sizing border-box
        overflow hidden
        .top-container-bg
          z-index -2
          position absolute
          top -10px
          right -10px
          bottom -10px
          left -10px
          filter blur(5px)
          &::after
            content ''
            z-index -1
            position absolute
            top 0
            right 0
            bottom 0
            left 0
            background rgba(0, 0, 0, .6)
        .top-image
          padding (20/font)rem (10/font)rem (20/font)rem (10/font)rem
          display flex
          .image
            position relative
            display inline-block
            flex 0 0 (110/font)rem
            width (110/font)rem
            .earing
              position absolute
              right (4/font)rem
              top (4/font)rem
              color #fff
              font-size (12/font)rem
              .icon-icon14
                font-size (12/font)rem
            img
              display block
          .content
            display inline-block
            flex 1
            padding-left (25/font)rem
            color #fff
            .title
              font-size (18/font)rem
              line-height (18/font)rem
              padding (10/font)rem 0
            .info
              padding (15/font)rem 0
              .avatar
                display inline-block
                width (25/font)rem
                height (25/font)rem
                border-radius 50%
                overflow: hidden
              .name
                display inline-block
                font-size (12/font)rem
                line-height (25/font)rem
                color #dbdbda
                vertical-align top
                margin-left (6/font)rem
        .bottom-tools
          display flex
          .tool-content
            flex 1
            font-size (12/font)rem
            color #fff
            text-align center
            .iconfont
              font-weight bold
            .name
              margin-top (3/font)rem
              font-weight lighter

    .access-box
      position absolute
      transform translate3d(-50%, -50%, 0);
      margin auto
      width 75%
      left 50%
      top 45%
      background #fff
      font-size (14/font)rem
      border-radius 4px
      border 1px solid #ebeef5
      color #606266
      text-align center
      box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
      box-sizing border-box
      padding (25/font)rem
      padding-bottom (10/font)rem
      &.slide-enter-active, &.slide-leave-active
        transition all 0.5s
      &.slide-enter, &.slide-leave-to
        opacity 0
        transform translate3d(0, 100%, 0);
      .action
        margin-top (20/font)rem
        div
          display inline-block
          padding (8/font)rem (15/font)rem
          font-weight bold
</style>
