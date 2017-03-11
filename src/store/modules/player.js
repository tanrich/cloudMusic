import * as type from '../mutation-types'
const state = {
  startCountTime: null,
  playStatus: false,
  currentTime: 0,
  duration: 0,
  em: ''
};
const mutations = {
  [type.CHANGE_CURRENTTIME] (state, newValue) {
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
  }
};
export default {
  state,
  mutations
}
