/**
 * @file
 * @author tanrich@foxmail.com
 */

import * as type from '../mutation-types'
import API from 'API'

const state = {
  leftBarShow: false,
  username: null,
};
const mutations = {
  [type.SET_LEFTBARSHOW] (state, newValue) {
    state.leftBarShow = newValue;
  },
  [type.SET_USERNAME] (state, newValue) {
    state.username = newValue;
  }
};
const actions = {
};

export default {
  state,
  mutations,
  actions
}
