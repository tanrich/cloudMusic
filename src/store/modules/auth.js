/**
 * @file
 * @author tanrich@foxmail.com
 */

import * as type from '../mutation-types'

const state = {
  authShow: false
};
const mutations = {
  [type.SET_AUTHSHOW] (state, newValue) {
    state.authShow = newValue;
  }
};
const actions = {};

export default {
  state,
  mutations,
  actions,
};
