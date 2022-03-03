import { defineStore } from "pinia";

type ThemesObj = {
    [key: string]: HTMLLinkElement
}

type ThemeState = {
    themes: ThemesObj,
    themeNames: string[],
    loading: boolean
}

export const useThemeStore = defineStore("theme", {
    state: () => ({
        themes: {},
        themeNames: ["Slate","Darkly","Superhero","Yeti","Pulse","Minty"],
        loading: true
    } as ThemeState),

    actions: {
        preloadTheme(href: string) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.disabled = false;
            link.href = href;
    
            return new Promise<HTMLLinkElement>((resolve, reject) => {
                link.onload = function() {
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

        selectTheme(name: string) {
            if (!(name != null && (name in this.themes))) {
                throw new Error(`unknown theme "${name}"`);
            }
            Object.keys(this.themes).forEach(n => {
                if (n !== name && !this.themes[n].disabled) this.themes[n].disabled = true;
            });
            if (this.themes[name]?.disabled) this.themes[name].disabled = false;
            localStorage.setItem("theme", name);
        },

        has(name: string) {
            return (name == null && (name in this.themes));
        },

        get() {
            return Object.keys(this.themes).find(n => !this.themes[n].disabled) ?? "";
        },

        add(name: string, href: string) {
            return this.preloadTheme(href).then((s: HTMLLinkElement) => (this.themes[name] = s))
        },

        initThemes() {
        const added = this.themeNames.map((name: string) => {
            return this.add(name, "https://bootswatch.com/5/"+name.toLowerCase()+"/bootstrap.min.css");
        });
    
        if (!this.themeNames.includes(localStorage.getItem("theme") ?? "")) {
            localStorage.setItem("theme", "Slate");
        }

        Promise.all(added).then(() => {
            this.loading = false;
            this.selectTheme(localStorage.getItem("theme") ?? "Slate");
        });
    }
    }
})