<script>
    import {onMount} from 'svelte';
    export let params
    let allmovies = {}
    let movies = []
    let pages = 1

    const getValues =()=> {
        let url = window.location.search;
        return url.split('=')[1]
    }
    console.log(getValues())
    onMount(async () => {
        try{
            const response = (getValues()) ? await fetch('http://localhost:3000/movies?page='+getValues()) : await fetch('http://localhost:3000/movies')
            allmovies = await response.json()
            movies=allmovies.data
            pages = parseInt(allmovies.pagination.count / 10)
        }catch(Err){
            console.log("error fetching data")
        }
    } )
    function gotot(id){
        window.location.replace('/movie/'+id)
    }
    function gotoPage(page){
        window.location.replace('/?page='+page)
    }
</script>
<main align="center">
    <div align="center">
        <div align="center" class="uk-width-5-6 " uk-grid="parallax : 50">
            {#each movies as movie (movie.id)}
                <div on:click={gotot(movie.id)} class="uk-width-1-3">
                    <div class="uk-card uk-card-default">
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
                            <div uk-grid>
                                <div class="uk-width-1-2">
                                    <span><small>imdb {movie.imdb.rating}</small></span>
                                </div>
                                <div class="uk-width-1-2">
                                    <span><small>{movie.tomatoes.viewer.rating} Tomatoes</small></span>
                                </div>
                            </div>
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
            {#each {length : pages} as _,i }
                <li><a on:click|preventDefault="{() => {gotoPage(i+1)}}">{i+1}</a></li>
            {/each}
        <li><a href=""><span uk-pagination-next></span></a></li>
    </ul>
</main>