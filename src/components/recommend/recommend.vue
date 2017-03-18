<template>
  <div class="recommend">
    <audio
      ref="audio"
      :src="resource"
      @error="error"
      controls
    ></audio>
    <button @click="togglePlay">播放/暂停</button>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'recommend',
    data () {
      return {
        resource: '123.p3',
        playSatus: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        let play = setInterval(() => {
          if (!this.$refs['audio'].duration) {
            this.$refs['audio'].play();
          } else {
            clearTimeout(play);
          }
        })
      })
    },
    methods: {
      error () {
        this.resource = 'http://m2.music.126.net/ayZnL9gQ8QC7vxIP75MPKQ==/1216059860327462.mp3'
      },
      test () {
        if (this.playSatus) {
          this.$refs['audio'].pause();
        } else {
          this.$refs['audio'].play();
        }
        this.playSatus = !this.playSatus;
      },
      togglePlay () {
        this.test();
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
