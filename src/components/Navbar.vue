<script setup lang="ts">
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
						<RouterLink to="/" class="nav-link" activeClass="active">Home</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/releases" class="nav-link" activeClass="active">Releases</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/projects" class="nav-link" activeClass="active">Projects</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/options" class="nav-link" activeClass="active">Options</RouterLink>
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
				<form class="d-flex">
					<input class="form-control me-sm-2" type="search" placeholder="Search">
					<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</div>
	</nav>
</template>