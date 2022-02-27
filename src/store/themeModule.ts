//https://www.examplefiles.net/cs/162236

import { ref } from "vue";
import { ActionTree, GetterTree, MutationTree } from "vuex";

type ThemesObj = {
    [key: string]: HTMLLinkElement
}


interface ThemeHelper {
    themes: ThemesObj,
    preloadTheme: (href: string) => Promise<HTMLLinkElement>,
    add: (name: string, href: string) => void,
    selectTheme: (name: string | null) => void,
    has: (name: string) => boolean,
    get: () => string
}

const ThemeHelper: ThemeHelper = {
    themes: {},
    preloadTheme: function(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.disabled = false;
        link.href = href;

        return new Promise<HTMLLinkElement>((resolve, reject) => {
            link.onload = function() {
                // Remove the onload() event listener after initial load, because some
                // browsers (like Firefox) could call onload() later again when changing
                // the link.disabled value.
                link.onload = null;
                link.disabled = true;
                resolve(link);
            };
            link.onerror = event => {
                link.onerror = null;
                reject(event);
            };
            document.head.appendChild(link);
        });
    },

    selectTheme: function(name) {
        console.log(name, this.themes);
        if (!(name != null && (name in this.themes))) {
            throw new Error(`unknown theme "${name}"`);
        }
        Object.keys(this.themes).forEach(n => {
            if (n !== name && !this.themes[n].disabled) this.themes[n].disabled = true;
        });
        if (this.themes[name]?.disabled) this.themes[name].disabled = false;
    },
    has: function(name) {
        return (name == null && (name in this.themes));
    },
    get: function() {
        return Object.keys(this.themes).find(n => !this.themes[n].disabled) ?? "";
    },
    add: function(name: string, href: string) {
        return this.preloadTheme(href).then((s: HTMLLinkElement) => (this.themes[name] = s))
    }
};

class RootState {}

class State {
    themes = ["Slate","Darkly","Superhero","Yeti","Pulse","Minty"];
    themeHelper = ThemeHelper;
    loading = true;
}

const getters = <GetterTree<State, RootState>> {
    getThemes: (state) => state.themes,
    getCurrentTheme: (state) => ref(state.themeHelper.get()),
    isLoading: (state) => state.loading
}

const mutations = <MutationTree<State>> {
    setTheme (state, theme: string) {
        state.themeHelper.selectTheme(theme);
        localStorage.setItem("theme", theme);
    }
}

const actions = <ActionTree<State, RootState>> {
    initThemes: async function({ state }) {
        const added = state.themes.map((name: string) => {
            return state.themeHelper.add(name, window.location.origin+"/"+name.toLowerCase()+".min.css");
        });
    
        if (!state.themes.includes(localStorage.getItem("theme") ?? "")) {
            localStorage.setItem("theme", "Slate");
        }

        Promise.all(added).then(() => {
            state.loading = false;
            state.themeHelper.selectTheme(localStorage.getItem("theme"));
        });
    }
}

export default {
    state: new State(),
    getters: getters,
    mutations: mutations,
    actions: actions
}