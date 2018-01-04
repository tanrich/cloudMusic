import * as type from '../mutation-types'
import API from 'API'

const state = {
  playViewShow: false,
  startCountTime: null,
  playStatus: false,
  currentTime: 0,
  duration: 0,
  em: null,
  MusicSource: null,
  canPlay: false,
  tipsWords: null,
};
const mutations = {
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
  [type.SET_MUSICSOURCE] (state, newValue) {
    state.MusicSource = newValue;
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
    state.em = null;
    state.MusicSource = null;
    state.canPlay = false;
  },
  // 设置tips内容
  [type.SET_TIPSWORDS] (state, newValue) {
    state.tipsWords = newValue;
  },
};
const actions = {
  [type.NEXT_SONG] ({ state, rootState, dispatch, commit }) {
    // 歌曲位置+1
    if (rootState.songPosition === rootState.tracks.length - 1) {
      commit(type.SET_TIPSWORDS, '没有下一首歌曲啦');
      return;
    }
    commit(type.SET_SONGPOSITION, rootState.songPosition + 1);
    commit(type.SET_SONGINFO, rootState.tracks[rootState.songPosition])
    dispatch(type.MAIN_START);
    console.log('开始检测音乐资源');
  },
  [type.PRE_SONG] ({ state, rootState, dispatch, commit }) {
    // 歌曲位置-1
    if (rootState.songPosition === 0) {
      commit(type.SET_TIPSWORDS, '没有上一首歌曲啦');
      return;
    }
    commit(type.SET_SONGPOSITION, rootState.songPosition - 1);
    commit(type.SET_SONGINFO, rootState.tracks[rootState.songPosition])
    dispatch(type.MAIN_START);
  },
  [type.TOGGLE_PLAY] ({ state, rootState, dispatch, commit }) {
    const a = true;
    if (a) {
      // DOMException: play() can only be initiated by a user gesture
      if (state.playStatus) {
        state.em.pause();
      } else {
        state.em.play();
      }
      commit(type.CHANGE_PLAYSTATUS, !state.playStatus);
    } else {
      console.log('资源加载中,请稍后');
      commit(type.SET_TIPSWORDS, '资源加载中,请稍后');
    }
  },
  [type.MAIN_START] ({ state, rootState, dispatch, commit }) {
    commit(type.RESET_PLAYER);
    dispatch(type.GET_MUSIC);
    // commit(type.SET_PLAYVIEWSHOW, true);
  },
  async [type.GET_MUSIC] ({ state, rootState, dispatch, commit }) {
    let res = await API.getMusicSource({id: rootState.songInfo.id});
    res = res.data;
    if (res.code === 200) {
      let data = res.data[0];
      // 设置默认渲染能够播放的最高音质
      await commit(type.SET_MUSICSOURCE, data.url);
      console.log('尝试加载能够播放的最高音质');
    }
  },
  // 设置歌曲是否可以播放(如果资源可以播放&&拖动音轨 会触发canplay事件执行setCanPlay函数)
  async [type.SET_CANPLAY] ({ state, rootState, dispatch, commit }) {
    console.log('可以播放')
    await commit(type.SET_CANPLAY, true);
    // 歌曲可播放时自动开始播放 && 拖动音轨改为播放
    await commit(type.CHANGE_PLAYSTATUS, false);
    dispatch(type.TOGGLE_PLAY)
  }
};
export default {
  state,
  mutations,
  actions
}
