export default {
  state: () => ({
    loggedIn: false,
    username: ""
  }),
  getters: {
    isLoggedIn: (state) => state.loggedIn,
    getUsername: (state) => state.username
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },

    setUsername(state, name) {
      state.username = name;
    }
  }
}