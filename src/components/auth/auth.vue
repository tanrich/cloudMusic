<template>
  <transition name="auth">
    <div class="auth" v-show="authShow">
      <div class="home-page" v-show="homePage">
        <img src="./narrow.png" alt="narrow" class="narrow" @click.stop="setAuthShow(false)">
        <div class="logo-content">
          <div class="logo">
            <img src="./logo.png" alt="logo">
          </div>
        </div>
        <div class="action-content">
          <div class="block login" :class="{'active': activeL}"
               @click="openActionPage($event, 'login')"
               @touchstart.stop="activeL = true"
               @touchend.stop="activeL = false"
          >登录</div>
          <div class="block register" :class="{'active': activeR}"
               @click="openActionPage($event, 'register')"
               @touchstart.stop="activeR = true"
               @touchend.stop="activeR = false"
          >注册</div>
        </div>
      </div>
      <div class="action-page" v-show="!homePage">
        <div class="header">
          <div class="back" @click="back"><i class="iconfont icon-fanhui"></i></div>
          <div class="name">{{headerName}}</div>
        </div>
        <div class="register" v-show="registerShow">
          <div class="r-form">
            <div class="r-form-item">
              <i class="r-icon">
                <img src="./username.png" alt="username">
              </i>
              <input type="text"
                     class="r-input username"
                     v-model="rUsername"
                     placeholder="设置用户名，字母或者数字"
                     @focus="errRUsername = ''"
              >
              <span class="err">{{errRUsername}}</span>
            </div>
            <div class="r-form-item">
              <i class="r-icon">
                <img src="./passwd.png" alt="password">
              </i>
              <input
                type="password"
                class="r-input passwd"
                v-model="rPasswd"
                placeholder="设置登陆密码，不少于6位"
                @focus="errRPasswd = ''"
              >
              <span class="err">{{errRPasswd}}</span>
            </div>
            <div class="r-form-item submit" @click.stop="rSubmit">提交</div>
          </div>
        </div>
        <div class="login" v-show="!registerShow">
          <div class="r-form">
            <div class="r-form-item">
              <i class="r-icon">
                <img src="./username.png" alt="username">
              </i>
              <input
                type="text"
                class="r-input username"
                v-model="lUsername"
                placeholder="请输入用户名"
                @focus="errLUsername = ''"
              >
              <span class="err">{{errLUsername}}</span>
            </div>
            <div class="r-form-item">
              <i class="r-icon">
                <img src="./passwd.png" alt="password">
              </i>
              <input
                type="password"
                class="r-input passwd"
                v-model="lPasswd"
                placeholder="请输入密码"
                @focus="errLPasswd = ''"
              >
              <span class="err">{{errLPasswd}}</span>
            </div>
            <div class="r-form-item submit" @click.stop="lSubmit">提交</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import API from 'API'
  import * as type from '@/store/mutation-types'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'auth',
    data () {
      return {
        activeL: false,
        activeR: false,
        homePage: true,
        registerShow: false,
        headerName: '',
        rUsername: '',
        rPasswd: '',
        lUsername: '',
        lPasswd: '',
        errRUsername: '',
        errRPasswd: '',
        errLUsername: '',
        errLPasswd: ''
      }
    },
    computed: {
      ...mapState({
        authShow: state => state.auth.authShow,
      })
    },
    methods: {
      ...mapMutations({
        setAuthShow: type.SET_AUTHSHOW,
        setUsername: type.SET_USERNAME,
      }),
      back() {
        this.homePage = true;
        this.registerShow = false;
        this.headerName = '';
        this.rUsername = '';
        this.rPasswd = '';
        this.lUsername = '';
        this.lPasswd = '';
        this.errRUsername = '';
        this.errRPasswd = '';
        this.errLUsername = '';
        this.errLPasswd = '';
      },
      openActionPage(e, value) {
        this.homePage = false;
        if (value === 'register') {
          this.headerName = '注册';
          this.registerShow = true;
        } else {
          this.headerName = '登录';
          this.registerShow = false;
        }
      },
      lSubmit() {
        const _self = this;
        const lUsername = this.lUsername.trim();
        const lPasswd = this.lPasswd.trim();
        if (!/^[A-Za-z0-9_\u4e00-\u9fa5]+$/.test(lUsername)) {
          this.errLUsername = '不合符规范';
          return;
        }
        if (!/^\w{6,}$/.test(lPasswd)) {
          this.errLPasswd = '不符合规范';
          return;
        }
        API.login({ username: lUsername, password: lPasswd })
          .then(res => {
            const status = res.data ? res.data.status : 0;
            if (!status) {
              _self.errLUsername = '用户名与密码不匹配';
            } else {
              _self.setUsername(res.data ? res.data.username : null);
              _self.setAuthShow(false);
              _self.back();
            }
          })
      },
      rSubmit() {
        const _self = this;
        const rUsername = this.rUsername.trim();
        const rPasswd = this.rPasswd.trim();
        if (!/^[A-Za-z0-9_\u4e00-\u9fa5]+$/.test(rUsername)) {
          this.errRUsername = '不合符规范';
          return;
        }
        if (!/^\w{6,}$/.test(rPasswd)) {
          this.errRPasswd = '不符合规范';
          return;
        }
        API.register({
          username: rUsername,
          password: rPasswd
        })
          .then(res => {
            const status = res.data ? res.data.status : 0;
            if (!status) {
              _self.errRUsername = '用户名已经被注册'
            } else {
              _self.back();
              _self.openActionPage(null, 'login');
            }
          })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  @import "../../common/stylus/index.styl"
  font = 100
  .auth
    fix-screen-auth()
    z-index 99
    min-height 100vh
    background-color #eff1f2
    &.auth-enter-active, &.auth-leave-active
      transition all .3s
    &.auth-enter, &.auth-leave-to
      transform translate3d(0, 100%, 0)
    .narrow
      position absolute
      width (40/font)rem
      right (10/font)rem
      bottom (10/font)rem
    .home-page
      min-height 100vh
      background url("./auth-bg.jpg") right center
      .logo-content
        height (300/font)rem
        display flex
        align-items center
        justify-content center
        .logo
          width (100/font)rem
          height (100/font)rem
          img
            width inherit
            display block
      .action-content
        padding 0 (50/font)rem
        .block
          font-size (20/font)rem
          line-height (40/font)rem
          border 1px solid #c1282d
          border-radius (40/font)rem
          text-align center
          color #c1282d
        .register
          margin-top (15/font)rem
        .active
          background-color #c1282d
          color #fff
    .action-page
      .header
        height (56/font)rem
        padding (17/font)rem (16/font)rem
        box-sizing border-box
        font-size (20/font)rem
        color #fff
        background-color #029688
        .back
          vertical-align top
          display inline-block
          .icon-fanhui
            display block
            font-size (20/font)rem
            color #fff
        .name
          vertical-align top
          display inline-block
          margin-left (22/font)rem
      .register, .login
        margin-top (30/font)rem
        .r-form
          padding 0 (20/font)rem
          .r-form-item
            position relative
            display flex
            line-height (24/font)rem
            font-size (18/font)rem
            color #333
            border-bottom 1px solid #c4c7c7
            padding (10/font)rem 0
            .r-icon
              flex 0 0 (22/font)rem
              width (22/font)rem
              vertical-align top
              img
                display block
                width (22/font)rem
            .r-input
              flex 1
              margin-left (10/font)rem
              outline none
              background none
              &::-webkit-input-placeholder
                color #c4c7c7
            .err
              position absolute
              right 0
              top 0
              line-height (42/font)rem
              color red
          .r-form-item + .r-form-item
            margin-top (20/font)rem
          .submit
            display block
            margin-top (30/font)rem !important
            border none
            background-color #029688
            border-radius (22/font)rem
            color #fff
            text-align center
</style>
