<template>
  <div id="app" @touchmove.prevent>
    <v-header />
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view" :tsName="transitionName"></router-view>
      </keep-alive>
    </transition>
    <v-play />
    <v-leftBar />
    <v-auth />
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import mainPage from 'components/mainPage/mainPage'
  import buttonPlay from 'components/bottomPlayer/bottomPlayer'
  import leftBar from 'components/leftBar/leftBar'
  import auth from 'components/auth/auth'
  import store from '@/store'

  export default {
    name: 'app',
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    store,
    components: {
      'v-header': Header,
      'v-mainPage': mainPage,
      'v-play': buttonPlay,
      'v-leftBar': leftBar,
      'v-auth': auth,
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        const toId = parseInt(to.query.id);
        const fromId = parseInt(from.query.id);
        if (toDepth > fromDepth || toId > fromId) {
          this.transitionName = 'slide-left';
        } else if (toDepth < fromDepth || toId < fromId) {
          this.transitionName = 'slide-right';
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
  #app
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    -webkit-font-smoothing antialiased
    min-height 100vh
    .child-view
      height calc(100vh - 0.56rem - 0.5rem)
      overflow hidden
      &.slide-right-enter-active, &.slide-right-leave-active, &.slide-left-enter-active, &.slide-left-leave-active
        transition all .5s
      &.slide-right-enter, &.slide-left-leave-to
        opacity 0
        transform translate3d(-100%, 0, 0)
      &.slide-right-leave-to, &.slide-left-enter
        opacity 0
        transform translate3d(100%, 0, 0)
</style>
