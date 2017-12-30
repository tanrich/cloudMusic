<template>
  <div class="rank" ref="rank">
    <div class="rank-scroll">
      <h1 class="title">官方榜</h1>
      <RankBlock v-for="(item, index) in officalRankData" :data="item" :key="index" @click.native="showRankDetail($event, item)" />
      <h1 class="title">全球榜</h1>
      <RankBlock v-for="(item, index) in globalRankData" :data="item" :key="index" @click.native="showRankDetail($event, item)" />
    </div>
    <RankDetail :data="showDetailData" ref="rankDetail" />
  </div>
</template>
<script type="text/ecmascript-6">
  import RankBlock from 'components/mainPage/rank/rankBlock/rankBlock'
  import RankDetail from 'components/mainPage/rank/rankDetail/rankDetail'
  import API from 'API'
  import BScroll from 'better-scroll'
  import * as type from '@/store/mutation-types'
  import { setItem, getItem } from 'common/js/localStorage'

  export default {
    name: 'rank',
    data () {
      return {
        officalRankData: [],
        globalRankData: [],
        officalRankDataNew: [],
        globalRankDataNew: [],
        showDetailData: []
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
          const storage = getItem(`${type.INIT_DEFAULT_LIST}_${i}`);
          if (storage) this.officalRankData.push(storage);
          this.getOfficalRankItem(i);
        }
        this.officalRankData = this.officalRankDataNew;
        this.$nextTick(() => {
          this.initScroll();
        })
      },
      getGlobalRank() {
        for (let i = 4; i < 22; i++) {
          this.getGlobalRankItem(i);
        }
        this.$nextTick(() => {
          this.initScroll();
        })
      },
      getOfficalRankItem(value) {
        API.getRank({idx: value})
          .then(res => {
            if (res.status !== 200) {
              throw new Error();
            }
            this.officalRankDataNew.push(res.data.playlist);
            setItem(`${type.INIT_DEFAULT_LIST}_${value}`, res.data.playlist);
          })
          .catch(() => {
            this.getOfficalRankItem(value)
          });
      },
      getGlobalRankItem(value) {
        API.getRank({idx: value})
          .then(res => {
            if (res.status !== 200) {
              throw new Error();
            }
            this.globalRankDataNew.push(res.data.playlist);
            setItem(`${type.INIT_DEFAULT_LIST}_${value}`)
          })
          .catch(() => {
            this.getGlobalRankItem(value)
          });
      },
      showRankDetail(event, item) {
        this.showDetailData = item;
        this.$store.commit(type.INIT_DEFAULT_LIST, item);
        this.$refs['rankDetail'].toggleRankDetail(true);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  font = 270
  .rank
    background-color rgba(242,244,245,0.6)
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
