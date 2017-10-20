import * as type from '../mutation-types'
const state = {
  playViewShow: false,
  startCountTime: null,
  playStatus: false,
  currentTime: 0,
  duration: 0,
  em: '',
  musicQuality: 0,
  hMusicSource: '',
  mMusicSource: '',
  lMusicSource: '',
  MusicSource: '',
  canPlay: false,
  mainStartCount: 0
};
const mutations = {
  [type.CHANGE_MAINSTART] (state, newValue) {
    state.mainStartCount = state.mainStartCount + 1;
  },
  [type.SET_PLAYVIEWSHOW] (state, newValue) {
    state.playViewShow = newValue;
  },
  // 设置播放器即时时间
  [type.SET_CURRENTTIME] (state, newValue) {
    state.currentTime = newValue;
  },
  // 设置歌曲总长时间
  [type.SET_DURATION] (state, newValue) {
    state.duration = newValue;
  },
  // 设置audio元素
  [type.SET_EM] (state, newEm) {
    state.em = newEm;
  },
  // 改变播放状态
  [type.CHANGE_PLAYSTATUS] (state, newValue) {
    state.playStatus = newValue;
  },
  // 设置最终渲染歌曲资源
  [type.SET_MUSIC] (state, newValue) {
    state.MusicSource = newValue;
  },
  // 设置低音质资源
  [type.SET_LMUSIC] (state, newValue) {
    state.lMusicSource = newValue;
  },
  // 设置中音质资源
  [type.SET_MMUSIC] (state, newValue) {
    state.mMusicSource = newValue;
  },
  // 这只高音质资源
  [type.SET_HMUSIC] (state, newValue) {
    state.hMusicSource = newValue;
  },
  // 设置音乐品质0,1,2对应低，中，高
  [type.SET_MUSICQUALITY] (state, newValue) {
    state.musicQuality = newValue;
  },
  // 设置音乐资源是否可播放
  [type.SET_CANPLAY] (state, newValue) {
    state.canPlay = newValue;
  },
  // 重置播放器
  [type.RESET_PLAYER] (state) {
    state.startCountTime = null;
    state.playStatus = false;
    state.currentTime = 0;
    state.duration = 0;
    state.em = '';
    state.musicQuality = 0;
    state.hMusicSource = '';
    state.mMusicSource = '';
    state.lMusicSource = '';
    state.MusicSource = '';
    state.canPlay = false;
  }
};
export default {
  state,
  mutations
}
