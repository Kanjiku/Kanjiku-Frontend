import { GetterTree, MutationTree } from "vuex";

type Alert = {
    id: number
    type: string,
    text: string
}

class RootState {}

class State {
    alertsId = -1;
    alerts: Alert[] = [];
}


const getters = <GetterTree<State, RootState>> {
    getAlerts: (state) => state.alerts
}

const mutations = <MutationTree<State>> {
    addAlert(state, [type, text, expire = 3000]: [string, string, number]) {
        state.alertsId++;
        state.alerts.push({id: state.alertsId, type: type, text: text});
        setTimeout((id: number) => {
            const idx = state.alerts.findIndex((alert: { id: number; }) => alert.id == id);
            if (idx == -1) return;
            state.alerts.splice(idx, 1);
        }, expire, state.alertsId);
    },
    removeAlert(state, id: number) {
        const idx = state.alerts.findIndex(alert => alert.id == id);
        if (idx == -1) return;
        state.alerts.splice(idx, 1);
    }
}


export default {
    state: new State(),
    getters: getters,
    mutations: mutations
}