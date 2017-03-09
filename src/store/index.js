import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'
import player from './modules/player'
Vue.use(Vuex);

const state = {
  defaultList: {},
  creator: {},
  tracks: [],
  artists: [],
  album: {}
};
const getter = {};
const mutations = {
  [type.INIT_DEFAULT_LIST] (state, data) {
    state.defaultList = {
      coverImgUrl: data.coverImgUrl,
      trackCount: data.trackCount,
      name: data.name
    };
    state.creator = {
      avatarUrl: data.creator.avatarUrl,
      nickname: data.creator.nickname,
      signature: data.creator.signature
    };
    data.tracks.forEach((value) => {
      state.tracks.push(value);
    })
  }
};
const actions = {};
export default new Vuex.Store({
  state,
  getter,
  mutations,
  actions,
  modules: {
    player
  }
})
