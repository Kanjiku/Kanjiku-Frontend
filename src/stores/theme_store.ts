import { defineStore } from "pinia";
import { ref, reactive } from "vue";

type Theme = {
	name: string;
	dark: boolean;
	loaded: boolean;
	link?: HTMLLinkElement;
}

export const use_theme_store = defineStore("theme", () => {
	const themes: {[key: string]: Theme} = reactive({});
	function add_theme(name: string, dark: boolean = true) {
		themes[name] = {
			name, dark,
			loaded: false
		};
	}

	add_theme("Slate");
	add_theme("Darkly");
	add_theme("Superhero");
	add_theme("Yeti", false);
	add_theme("Pulse", false);
	add_theme("Minty", false);
	let loading = ref(true);

	// load css for theme
	function preload_theme(theme: Theme) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.disabled = false;
		link.href = `https://bootswatch.com/5/${theme.name.toLowerCase()}/bootstrap.min.css`;

		return new Promise<Theme>((resolve, reject) => {
			link.onload = function () {
				link.onload = null;
				link.disabled = true;

				theme.link = link;
				theme.loaded = true;
				resolve(theme);
			};
			link.onerror = event => {
				link.onerror = null;
				reject(event);
			};
			document.head.appendChild(link);
		});
	}

	function select_theme(name: string) {
		if (name == null || !(name in themes)) {
			throw new Error(`Theme '${name}' is not available`);
		}

		for (let theme of Object.values(themes)) {
			if (theme.loaded && ((name == theme.name) == !!theme.link!.disabled)) {
				theme.link!.disabled = (name != theme.name);
			}
		}

		localStorage.setItem("theme", name);
	}

	function has(name: string) {
		return name in themes;
	}

	// if themes aren't loaded yet use get_saved_theme
	function get_current() {
		return Object.values(themes).find(theme => theme.loaded && !theme.link!.disabled) ?? "";
	}

	// usable before themes are available. otherwise prefer get_current
	function get_saved_theme() {
		return localStorage.getItem("theme") ?? "";
	}

	function get_all() {
		return themes;
	}

	// preload all themes listed in themes
	function init_themes() {
		let link_promises = [];

		for (let theme of Object.values(themes)) {
			link_promises.push(preload_theme(theme));
		}

		Promise.all(link_promises).then(() => {
			const saved_theme = localStorage.getItem("theme");
			if (saved_theme !== null && saved_theme !== undefined && saved_theme in themes) {
				select_theme(saved_theme);
				loading.value = false;
				return;
			} 

			for (let theme of Object.values(themes)) {
				if (theme.loaded) {
					select_theme(theme.name);
					break;
				}
			}
			loading.value = false;
		});
	}

	return {
		loading,
		init_themes,
		select_theme,
		get_all,
		get_current,
		get_saved_theme,
		has
	};
});