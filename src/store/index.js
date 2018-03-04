import Vue from 'vue'
import Vuex from 'vuex'
import * as type from './mutation-types'
import player from './modules/player'
import leftBar from './modules/leftBar'
import auth from './modules/auth'
Vue.use(Vuex);

const state = {
  // user歌单集合
  songListMenu: [],
  // 默认歌单
  defaultList: {},
  // 歌单创建者
  creator: {},
  // 歌曲集合
  tracks: [],
  // 歌曲在集合中序号
  songPosition: 0,
  // 歌曲信息
  songInfo: {},
};
const getter = {};
const mutations = {
  // 歌单集合
  [type.INIT_SONGLISTMENU] (state, newValue) {
    state.songListMenu = newValue;
  },
  // 歌单默认信息
  [type.INIT_DEFAULT_LIST] (state, newValue) {
    state.tracks = [];
    state.defaultList = {
      coverImgUrl: newValue.coverImgUrl,
      trackCount: newValue.trackCount,
      playCount: newValue.playCount,
      name: newValue.name,
      id: newValue.id
    };
    // 歌单创建者信息
    state.creator = {
      avatarUrl: newValue.creator.avatarUrl,
      nickname: newValue.creator.nickname,
      signature: newValue.creator.signature
    };
    // 歌单中提取所有歌曲音轨
    newValue.tracks.forEach((value) => {
      state.tracks.push(value);
    });
    // 设置默认歌曲信息为firstSong, 如果songInfo有就不需要再次更新
    if (!Object.keys(state.songInfo).length) {
      state.songInfo = state.tracks[state.songPosition]
    }
  },
  // 设置歌曲位置
  [type.SET_SONGPOSITION] (state, newValue) {
    state.songPosition = newValue;
  },
  // 设置歌曲默认信息
  [type.SET_SONGINFO] (state, newValue) {
    state.songInfo = newValue;
  }
};
const actions = {
  [type.SET_SONGINFO] ({ dispatch, commit }, newValue) {
    commit(type.SET_SONGINFO, newValue);
    dispatch(type.GET_LYRIC);
  }
};
export default new Vuex.Store({
  state,
  getter,
  mutations,
  actions,
  modules: {
    player,
    leftBar,
    auth,
  }
})
