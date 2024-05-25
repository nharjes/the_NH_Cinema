let page = 1;
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

nextButton.addEventListener("click", () => {
    if (page < 1000) {
        page += 1;
        fetchMovies();
    }
})

prevButton.addEventListener("click", () => {
    if (page > 1) {
        page -= 1;
        fetchMovies();
    }
})

const fetchMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d5c775389c73a0b2a2bc815d05093528&language=en-US&page=${page}`)
        console.log(response)

        if (response.status === 200) {
            const data = await response.json();
            
            let movies = "";
            
            data.results.forEach(movie => {
                movies += `
                    <div class="movie">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                        <h3 class="title">${movie.title}</h3>
                    </div>
                `;
            });

            document.getElementById("container").innerHTML = movies

        } else if (response.status === 401) {
            console.log("Invalid API key");
        } else if (response.status === 404) {
            console.log("Movie not found");
        } else {
            console.log("An unexpected error occurred");
        }

    } catch (error) {
        console.log(error);
    }
}

fetchMovies()