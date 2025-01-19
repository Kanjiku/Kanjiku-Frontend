import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const use_theme_store = defineStore("theme", () => {
	const theme_names = ["Slate", "Darkly", "Superhero", "Yeti", "Pulse", "Minty"];
	let themes: {
		[key: string]: HTMLLinkElement
	} = reactive({});
	let loading = ref(true);

	function preload_theme(href: string) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.disabled = false;
		link.href = href;

		return new Promise<HTMLLinkElement>((resolve, reject) => {
			link.onload = function () {
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
	}

	function select_theme(name: string) {
		if (name == null || !(name in themes)) {
			throw new Error(`Theme '${name}' is not available`);
		}

		for (let key of Object.keys(themes)) {
			if ((name == key) == !!themes[key].disabled) {
				themes[key].disabled = (name != key);
			}
		}

		localStorage.setItem("theme", name);
	}

	function has(name: string) {
		return name in themes;
	}

	function get_current() {
		return Object.keys(themes).find(e => !themes[e].disabled) ?? "";
	}

	function get_current_instant() {
		return localStorage.getItem("theme") ?? "";
	}

	function get_all() {
		return Object.keys(themes);
	}

	function add(name: string, href: string) {
		return preload_theme(href).then(url => themes[name] = url);
	}

	function init_themes() {
		let loading_arr = [];

		for (let theme of theme_names) {
			loading_arr.push(add(theme, `https://bootswatch.com/5/${theme.toLowerCase()}/bootstrap.min.css`));
		}

		Promise.all(loading_arr).then(() => {
			loading.value = false;

			const saved_theme = localStorage.getItem("theme");
			if (saved_theme !== null && saved_theme !== undefined && saved_theme in themes) {
				select_theme(saved_theme);
				return;
			} 

			for (let name of theme_names) {
				if (name in themes) {
					select_theme(name);
					break;
				}
			}
		});
	}

	return {
		loading,
		init_themes,
		select_theme,
		get_all,
		get_current,
		get_current_instant,
		has
	};
});