<script>
	import { fade } from 'svelte/transition';
	import router from "page"
	import Movies from './components/Movies.svelte'
	import Movie from './components/Movie.svelte'

	export let time;
	export let name;
	var heure = new Date().getHours()
	time = (heure > 18)? "night" :  "day"

	let page;
	let params;
	router('/:page?', (ctx, next) => {
		params = ctx.params
		next()},  () => page = Movies)
	router('/movie/:id',(ctx, next) => {
		params = ctx.params
		next()}, () => page = Movie)
	//router('/about', () => page = About)

	router.start()

</script>
<main align="center" transition:fade="{{delay: 250, duration: 300}}">
	<h1 align="center">{name} {time}!</h1>
	<p class="uk-text-small">This project is up for learning purposes only. You can get the link on GitHub <a href="https://github.com/naoufalalaa/EXAMEN">GitHub Repos</a></p>
</main>
<svelte:component this={page} params={params} />

<style>
	
</style>