<template>
  <transition name="bg-show">
    <div class="left-bar" v-show="leftBarShow" @click.stop="closeLeftBar(false)">
      <transition name="container-show">
        <div class="left-bar-container" @click.stop v-show="leftBarShow">
          <div class="header">
            <div class="header-box" v-show="!username" >
              <p class="title">登陆木涵音乐</p>
              <p class="title">320K高音质无限下载，手机电脑多端同步</p>
              <div class="login" @click.stop="() => {
                closeLeftBar()
                setAuthShow(true);
              }">
                立即登录
              </div>
            </div>
            <div class="header-box" v-show="username">
              <div class="avatar">
                <img src="./default.jpg" alt="username">
              </div>
              <div class="username">{{username}}</div>
            </div>
          </div>
          <div class="content">待开发</div>
          <div class="footer">
            <div class="logout"
                 :class="{'active': logoutActive}"
                 @click.stop="logout"
                 @touchstart="() => { logoutActive = true }"
                 @touchend="() => { logoutActive = false }"
            >退出登录</div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import { mapState, mapMutations } from 'vuex'
  import * as type from '@/store/mutation-types'
  import API from 'API'

  export default {
    name: 'leftBar',
    data () {
      return {
        logoutActive: false,
      }
    },
    created () {
      const _self = this;
      API.login()
        .then(res => {
          _self.setUsername(res.data ? res.data.username : null);
        })
        .catch(err => console.log(err))
    },
    computed: {
      ...mapState({
        leftBarShow: state => state.leftBar.leftBarShow,
        username: state => state.leftBar.username,
      })
    },
    methods: {
      ...mapMutations({
        closeLeftBar: type.SET_LEFTBARSHOW,
        setAuthShow: type.SET_AUTHSHOW,
        setUsername: type.SET_USERNAME,
      }),
      logout() {
        const _self = this;
        API.logout()
          .then(res => {
            if (res.data && res.data.status === 0) {
              _self.setUsername(null);
            } else {
              throw new Error();
            }
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "../../common/stylus/index.styl"
  font = 100
  transition = all .3s
  .left-bar
    fix-screen-auth()
    background rgba(0, 0, 0, .6)
    z-index 99
    &.bg-show-enter-active, &.bg-show-leave-active
      transition transition
    &.bg-show-enter, &.bg-show-leave-to
      opacity 0
    .left-bar-container
      display flex
      flex-direction column
      height 100%
      width 82%
      background-color #fff
      &.container-show-enter-active, &.container-show-leave-active
        transition transition
      &.container-show-enter, &.container-show-leave-to
        transform translate3d(-100%, 0, 0)
      .header
        position relative
        display flex
        justify-content center
        height (180/font)rem
        flex 0 0 (180/font)rem
        background url("./header-bg.jpg") center
        overflow hidden
        .header-box
          font-size (14/font)rem
          color #bcbcbd
          text-align center
          margin-top (57/font)rem
          .title + .title
            margin-top (5/font)rem
          .login
            display inline-block
            padding (8/font)rem (40/font)rem
            margin (25/font)rem auto 0
            color #fff
            border 1px solid #bcbcbd
            border-radius (18/font)rem
          .avatar
            display inline-block
            width (100/font)rem
            height (100/font)rem
            border-radius 50%
            background-color #fff
            text-align center
            line-height (100/font)rem
            overflow hidden
            img
              width inherit
          .username
            max-width (100/font)rem
            font-size (18/font)rem
            margin-top (10/font)rem
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .header-box + .header-box
          margin-top (35/font)rem
      .content
        flex 1
        font-size (20/font)rem
        background-color rgba(242,244,245,.6)
      .footer
        flex 0 0 (40/font)rem
        height (40/font)rem
        .logout
          text-align center
          font-size (18/font)rem
          line-height (40/font)rem
          transition all .1s
        .active
          background-color rgba(0, 0, 0, .1)
</style>
