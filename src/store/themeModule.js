//https://www.examplefiles.net/cs/162236

import { ref } from "vue";

const ThemeHelper = function() {
  const preloadTheme = href => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.disabled = false;
    link.href = href;

    return new Promise((resolve, reject) => {
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
  };

  const selectTheme = (themes, name) => {
    if (!(name && (name in themes))) {
      throw new Error(`unknown theme "${name}"`);
    }
    Object.keys(themes).forEach(n => {
      if (n !== name && !themes[n].disabled) themes[n].disabled = true;
    });
    if (themes[name].disabled) themes[name].disabled = false;
  };

  let themes = {};

  return {
    add(name, href) {
      return preloadTheme(href).then(s => (themes[name] = s));
    },
    has(name) {
      return (name && name in themes);
    },
    set theme(name) {
      selectTheme(themes, name);
    },
    get theme() {
      return Object.keys(themes).find(n => !themes[n].disabled);
    }
  };
};

export default {
  state: () => ({
    themes: ["Slate","Darkly","Superhero","Yeti","Pulse","Minty"],
    themeHelper: new ThemeHelper(),
    loading: true
  }),
  getters: {
    getThemes: (state) => state.themes,
    getCurrentTheme: (state) => ref(state.themeHelper.theme),
    isLoading: (state) => state.loading
  },
  mutations: {
    setTheme (state, theme) {
      state.themeHelper.theme = theme;
      localStorage.setItem("theme", theme);
    }
  },
  actions: {
    initThemes({ state }) {
      let added = state.themes.map(name => {
        return state.themeHelper.add(name, window.location.origin+"/"+name.toLowerCase()+".min.css");
      });
  
      if (!state.themes.includes(localStorage.getItem("theme"))) {
        localStorage.setItem("theme", "Slate");
      }

      Promise.all(added).then(() => {
        state.loading = false;
        state.themeHelper.theme = localStorage.getItem("theme");
      });
    }
  }
}