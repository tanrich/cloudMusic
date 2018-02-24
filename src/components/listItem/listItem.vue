<template>
  <div class="listItem" ref="listItem">
    <ul v-if="defaultList.trackCount">
      <li v-for="(item,index) in tracks" :key="index" class="item" @click.stop="mainStart($event,item,index)">
        <div class="num">{{index + 1}}</div>
        <div class="content border-1px-bottom">
          <h1 class="name">{{item.name}}</h1>
          <div class="extra">
            <span class="artist">{{item.ar[0].name}} - {{item.al.name}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapState, mapActions } from 'vuex'
  import BScroll from 'better-scroll'
  import * as type from '@/store/mutation-types'

  export default {
    name: 'listItem',
    data() {
      return {
        count: 1
      }
    },
    components: {},
    computed: {
      ...mapState([ 'defaultList', 'tracks' ]),
      ...mapState({
        currentTime: state => state.player.currentTime,
        canPlay: state => state.player.canPlay,
      })
    },
    methods: {
      // 滚动初始化
      initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['listItem'], {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      },
      // 开始播放音乐
      async mainStart(event, songInfo, songPosition) {
        // 网页版因为不存在preventDefault,所以阻止移动端的派发事件
        if (!event._constructed) {
          return false
        }
        // 初始化播放歌曲信息
        await this.$store.commit(type.SET_SONGINFO, songInfo);
        // 初始化播放歌曲在集合中位置
        await this.$store.commit(type.SET_SONGPOSITION, songPosition);
        // 触发播放函数
        await this.$store.dispatch(type.MAIN_START);
        this.$emit('accessShow');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  font = 100
  .listItem
    overflow hidden
    font-size 0
    .item
      display flex
      .num
        flex 0 0 (50/font)rem
        width (50/font)rem
        font-size (16/font)rem
        color #999999
        text-align center
        line-height 0.58rem
        box-sizing border-box
      .content
        flex 1
        padding (10/font)rem 0
        border-1px-bottom(#dadcdd)
        .name
          font-size (16/font)rem
        .extra
          font-size 0
          margin-top (10/font)rem
          box-sizing border-box
          overflow hidden
          white-space nowrap
          .artist
            width 3rem
            display inline-block
            font-size (12/font)rem
            line-height (14/font)rem
            color #999999
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
</style>
