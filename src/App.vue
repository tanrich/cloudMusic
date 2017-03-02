<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import mainPage from 'components/mainPage/mainPage'
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return {
        info: ''
      }
    },
    components: {
      'v-header': Header,
      'v-mainPage': mainPage
    },
    created () {
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
