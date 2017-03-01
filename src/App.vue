<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
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
      axios.get('/getSong').then(function (res) {
        console.log(res);
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
