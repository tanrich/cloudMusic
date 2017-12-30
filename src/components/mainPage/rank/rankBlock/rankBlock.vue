<template>
  <div class="rank-block">
    <div class="rank-item">
      <div class="pic">
        <span class="tips">每天更新</span>
        <img :src="data.coverImgUrl" alt="">
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in data.tracks.slice(0,3)">{{index + 1}}.{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {}
    },
    props: ['data'],
    create() {
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  font = 270
  .rank-block
    .rank-item
      padding-left (30/font)rem
      display flex
      .pic
        position relative
        flex 0 0 (240/font)rem
        width (240/font)rem
        height (240/font)rem
        padding (30/font)rem 0
        img
          display block
          vertical-align top
          width inherit
          height inherit
      .tips
        position absolute
        top (43/font)rem
        right 0
        color #fff
        font-size (12/font)rem
        transform scale(0.8)
      .content
        display flex
        flex 1
        margin-left (40/font)rem
        padding (30/font)rem
        padding-left 0
        align-items center
        border-bottom 1px solid rgb(242, 244, 245)
        box-sizing border-box
        color #666
        ul
          flex 1
          li
            width (660/font)rem
            margin-top (30/font)rem
            font-size (34/font)rem
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            &:first-child
              margin-top 0
</style>
