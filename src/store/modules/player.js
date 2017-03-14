import * as type from '../mutation-types'
const state = {
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
  canPlay: false
};
const mutations = {
  [type.SET_CURRENTTIME] (state, newValue) {
    state.currentTime = newValue;
  },
  [type.SET_DURATION] (state, newValue) {
    state.duration = newValue;
  },
  [type.SET_EM] (state, newEm) {
    state.em = newEm;
  },
  [type.CHANGE_PLAYSTATUS] (state, newValue) {
    state.playStatus = newValue;
  },
  [type.SET_STARTCOUNTTIME] (state, newValue) {
    state.startCountTime = newValue;
  },
  [type.SET_MUSIC] (state, newValue) {
    state.MusicSource = newValue;
  },
  [type.SET_LMUSIC] (state, newValue) {
    state.lMusicSource = newValue;
  },
  [type.SET_MMUSIC] (state, newValue) {
    state.mMusicSource = newValue;
  },
  [type.SET_HMUSIC] (state, newValue) {
    state.hMusicSource = newValue;
  },
  [type.SET_MUSICQUALITY] (state, newValue) {
    state.musicQuality = newValue;
  },
  [type.SET_CANPLAY] (state, newValue) {
    state.canPlay = newValue;
  },
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
