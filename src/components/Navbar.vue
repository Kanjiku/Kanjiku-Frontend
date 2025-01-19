<script setup lang="ts">
import {useI18n} from 'vue-i18n';

const {t} = useI18n({
	legacy: false,
	locale: "de",
	fallbackLocale: "en",
	messages: {
		de: {
			home: "Home",
			latest: "Neueste",
			projects: "Projekte",
			options: "Optionen",
			search: "Suchen",
			login: "Einloggen",
			signup: "Registrieren"
		},
		en: {
			home: "Home",
			latest: "Latest",
			projects: "Projects",
			options: "Options",
			search: "Search",
			login: "Login",
			signup: "Signup"
		}
	}
})

</script>

<template>
	<nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
		<div class="container-fluid">
			<RouterLink to="/" class="navbar-brand">Kanjiku</RouterLink>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarColor01">
				<ul class="navbar-nav me-auto">
					<li class="nav-item">
						<RouterLink to="/" class="nav-link" activeClass="active">{{t("home")}}</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/latest" class="nav-link" activeClass="active">{{t("latest")}}</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/projects" class="nav-link" activeClass="active">{{t("projects")}}</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/options" class="nav-link" activeClass="active">{{t("options")}}</RouterLink>
					</li>
					<!--<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
						<div class="dropdown-menu">
							<a class="dropdown-item" href="#">Action</a>
							<a class="dropdown-item" href="#">Another action</a>
							<a class="dropdown-item" href="#">Something else here</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Separated link</a>
						</div>
					</li>-->
				</ul>
				<ul class="navbar-nav">
					<li class="nav-item">
						<RouterLink to="/login" class="nav-link" activeClass="active">{{t("login")}}</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/signup" class="nav-link" activeClass="active">{{t("signup")}}</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>