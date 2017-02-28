<template>
  <div class="header">
    <div class="name">
      <img src="./topbar.png" height="21">
    </div>
    <div class="search">
      <img src="./serach.png" alt="search" width="21" height="21">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'header',
    data () {
      return {}
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.header
  height 56px
  box-sizing border-box
  position relative
  background-color #4caf50
  padding 17px 16px
  .name
    font-family Hiragino Sans GB
    font-size 22px
    font-weight 200
    color #fff
  .search
    position absolute
    right 16px
    top 17px
</style>
