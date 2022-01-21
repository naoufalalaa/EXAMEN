<script>
    import {onMount} from 'svelte';
    let movies = []
    onMount(async () => {
        try{
            const response = await fetch('http://localhost:3000/movies')
            movies = await response.json()
            movies=movies.data
            console.log(movies)
            
        }catch(Err){
            console.log("error fetching data")
        }
    } )
</script>
<main>
    <div align="center">
        <div align="center" class="uk-width-5-6 uk-grid-match" uk-grid="parallax : 50">
            {#each movies as movie (movie.id)}
                <div class="uk-width-1-3">
                    <div class="uk-card uk-card-default uk-padding">
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
                            {#each movie.writers as writer }
                                <li><small>{writer}</small></li>
                            {/each}
                        </div>
                    </div>

                </div>
                {:else }
                <div uk-spinner></div> Loading...
            {/each}
        </div>
    </div>
    <ul class="uk-pagination uk-flex-center" uk-margin>
        <li><a href=""><span uk-pagination-previous></span></a></li>
        <li><a href="">1</a></li>
        <li class="uk-disabled"><span>...</span></li>
        <li><a href="">5</a></li>
        <li><a href="">6</a></li>
        <li class="uk-active"><span>7</span></li>
        <li><a href="">8</a></li>
        <li><a href=""><span uk-pagination-next></span></a></li>
    </ul>
</main>