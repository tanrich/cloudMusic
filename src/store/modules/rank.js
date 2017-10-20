/**
 * @file
 * @author tanruiqi@baidu.com
 */

import * as type from '../mutation-types'
const state = {
  fastUpAl: '',
  newSongAl: '',
  selfSongAl: '',
  hotSongAl: ''
};
const mutations = {
  [type.SET_FASTUPAL] (state, newValue) {
    this.fastUpAl = newValue;
  },
  [type.SET_NEWSONGAL] (state, newValue) {
    this.newSongAl = newValue;
  },
  [type.SET_SELFSONGAL] (state, newValue) {
    this.selfSongAl = newValue;
  },
  [type.SET_HOTSONGAL] (state, newValue) {
    this.hotSongAl = newValue;
  }
};
export default {
  state,
  mutations
}
