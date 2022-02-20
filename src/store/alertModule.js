export default {
  state: () => ({
    alertsId: -1,
    alerts: {
    }
  }),
  getters: {
    getAlerts: (state) => state.alerts
  },
  mutations: {
    addAlert(state, [type, text, expire=120000]) {
      state.alertsId++;
      state.alerts[state.alertsId] = {type: type, text: text, fading:false};
      setTimeout((id) => {
        if (id in state.alerts) {
          state.alerts[id].fading = true;
          setTimeout(() => {
            delete state.alerts[id];
          }, 400)
        }
      }, expire, state.alertsId);
    },
    removeAlert(state, id) {
      state.alerts[id].fading = true;
      setTimeout(() => {
        delete state.alerts[id];
      }, 400)
    }
  }
}