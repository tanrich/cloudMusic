<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-play></v-play>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import mainPage from 'components/mainPage/mainPage'
  import buttonPlay from 'components/bottomPlayer/bottomPlayer'
  import axios from 'axios'
  import store from '@/store'
  import * as type from '@/store/mutation-types'
  export default {
    name: 'app',
    data () {
      return {}
    },
    store,
    components: {
      'v-header': Header,
      'v-mainPage': mainPage,
      'v-play': buttonPlay
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
