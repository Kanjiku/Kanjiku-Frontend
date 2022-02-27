import { ActionTree, GetterTree, MutationTree } from "vuex";

class RootState {}

class State {
    loggedIn = false;
    username = "";
    checked = false;
}

const getters = <GetterTree<State, RootState>> {
    isLoggedIn: (state) => state.loggedIn,
    getUsername: (state) => state.username,
    isStatusChecked: (state) => state.checked
}

const mutations = <MutationTree<State>> {
    setLoggedIn(state, loggedIn: boolean) {
        state.loggedIn = loggedIn;
    },
    setUsername(state, name: string) {
        state.username = name;
    },
    setChecked(state, checked: boolean) {
        state.checked = checked;
    }
}

const actions = <ActionTree<State, RootState>> {
    awaitChecked: async function({ state }) {
        console.log(state.checked)
        if (!state.checked) {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    console.log("check", state.checked);
                    if (state.checked) {
                        resolve();
                    }
                }, 200);
            });
        }
    }
}

export default {
    state: new State(),
    getters: getters,
    mutations: mutations,
    actions: actions
}