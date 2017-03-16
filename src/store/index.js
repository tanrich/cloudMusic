import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'
import player from './modules/player'
Vue.use(Vuex);

const state = {
  // 默认歌单
  defaultList: {},
  // 歌单创建者
  creator: {},
  // 歌曲集合
  tracks: [],
  // 歌曲在集合中序号
  songPosition: 0,
  // 歌曲信息
  songInfo: {}
};
const getter = {};
const mutations = {
  [type.INIT_DEFAULT_LIST] (state, data) {
    // 歌单默认信息
    state.defaultList = {
      coverImgUrl: data.coverImgUrl,
      trackCount: data.trackCount,
      name: data.name
    };
    // 歌单创建者信息
    state.creator = {
      avatarUrl: data.creator.avatarUrl,
      nickname: data.creator.nickname,
      signature: data.creator.signature
    };
    // 歌单中提取所有歌曲音轨
    data.tracks.forEach((value) => {
      state.tracks.push(value);
    });
    // 设置默认歌曲信息为firstSong
    state.songInfo = state.tracks[state.songPosition]
  },
  // 设置歌曲位置
  [type.SET_SONGPOSITION] (state, newValue) {
    state.songPosition = newValue;
  },
  // 设置歌曲信息
  [type.SET_SONGINFO] (state, newValue) {
    state.songInfo = newValue;
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
