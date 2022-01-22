<script>
    import {onMount} from 'svelte';
    export let params;
    export let name;
    export let time;
    let movie = {}
    const getID =  () => {
        console.log(params.id)
        return params.id;
    };
    onMount(async () => {
        try{
            const response = await fetch('http://localhost:3000/movie/'+getID())
            movie = await response.json()
            console.log(movie)
            name = movie.title
        }catch(Err){
            console.log("error fetching data "+Err)
        }
    } )
</script>
<main align="center">
    {#if movie.title}
        <div align="center">
            <div class="uk-width-2-3 uk-card uk-card-default">
                <div class="uk-card-header">
                    <h5>{movie.title}</h5>
                </div>
                <div class="uk-card-body">
                    <h6 class="uk-text-small uk-text-muted ">
                        {#if movie.plot}
                            {movie.plot}
                            {:else}
                            {movie.type}
                        {/if}
                    </h6>
                </div>

                <div class="uk-card-footer">
                    <ul class="uk-list uk-list-divider">
                        {#each movie.writers as writer }
                            <li>{writer}</li>
                        {/each}
                    </ul>
                </div>
            </div>

        </div>
    {/if}
    {#if !movie.title}
        <div uk-spinner></div> Loading...
    {/if}

</main>