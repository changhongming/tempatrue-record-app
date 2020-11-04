// initial state
// shape: [{ id, quantity }]
const state = () => ({
  name: null,
  email: null,
  isLogin: false,
});

// getters
const getters = {
}

// actions
const actions = {
  updateUserInformation({ state, commit }, info) {
    if (info) {
      commit('setLoginState', true);
      commit('setUserInformation', info);
      return;
    }
    commit('setLoginState', false);
  }
}

// mutations
const mutations = {
  setUserInformation(state, { name, email }) {
    state.name = name;
    state.email = email;
  },

  setLoginState(state, loginState) {
    state.isLogin = loginState;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
