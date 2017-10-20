<template>
  <div class="rank" ref="rank">
    <div class="rank-scroll">
      <h1 class="title">官方榜</h1>
      <RankBlock v-for="(item, index) in officalRankData" :data="item" :key="index"></RankBlock>
      <h1 class="title">全球榜</h1>
      <RankBlock v-for="(item, index) in globalRankData" :data="item" :key="index"></RankBlock>
    </div>
    <RankDetail :data="officalRankData[0]"></RankDetail>
  </div>
</template>
<script type="text/ecmascript-6">
  import RankBlock from 'components/rankBlock/rankBlock.vue'
  import RankDetail from 'components/rankDetail/rankDetail.vue'
  import API from 'API'
  import BScroll from 'better-scroll'

  export default {
    name: 'rank',
    data () {
      return {
        officalRankData: [],
        globalRankData: []
      }
    },
    components: {
      RankBlock, RankDetail
    },
    created() {
      this.getOfficalRank();
      // this.getGlobalRank();
    },
    methods: {
      initScroll() {
        if (!this.rnScroll) {
          this.rnScroll = new BScroll(this.$refs['rank'], {
            // better-scroll对于常规事件preventDefault
            click: true
          })
        } else {
          this.rnScroll.refresh();
        }
      },
      getOfficalRank() {
        for (let i = 0; i < 4; i++) {
          this.getOfficalRankItem(i);
        }
      },
      getGlobalRank() {
        for (let i = 4; i < 22; i++) {
          this.getGlobalRankItem(i);
        }
      },
      getOfficalRankItem(value) {
        API.getRank({idx: value})
          .then(res => {
            if (res.status !== 200) {
              throw new Error();
            }
            this.officalRankData.push(res.data.result);
            this.$nextTick(() => {
              this.initScroll();
            })
          })
          .catch(() => {
            this.getRankItem(value)
          });
      },
      getGlobalRankItem(value) {
        API.getRank({idx: value})
          .then(res => {
            if (res.status !== 200) {
              throw new Error();
            }
            this.globalRankData.push(res.data.result);
            this.$nextTick(() => {
              this.initScroll();
            })
          })
          .catch(() => {
            this.getRankItem(value)
          });
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  font = 270
  .rank
    background-color #f1f1f1
    overflow hidden
    position absolute
    top (259.2/font)rem
    left 0
    right 0
    bottom (135/font)rem
    .rank-scroll
      overflow hidden
      .title
        border-left 3px solid #009786
        font-size (42/font) rem
        color #333
        margin (40/font)rem (30/font)rem 0
        padding-left (12/font)rem
</style>
