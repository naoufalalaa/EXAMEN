<script>
	
	import Movies from './components/Movies.svelte'
	export let time;
	var heure = new Date().getHours()
	time = (heure > 18)? "night" :  "day"

</script>
<main align="center">
	<h1 align="center">iMovie {time}!</h1>
	<p class="uk-text-small">This project is up for learning purposes only. You can get the link on GitHub <a href="https://github.com/naoufalalaa/EXAMEN">GitHub Repos</a></p>
	<Movies/>
</main>

<style>
	
</style>