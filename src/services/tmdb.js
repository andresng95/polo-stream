const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Image URL helpers
export const getImageUrl = (path, size = "w500") => 
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getBackdropUrl = (path, size = "original") => 
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export async function fetchPopularMovies() {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchTrendingMovies(timeWindow = "week") {
    const res = await fetch(
        `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=es-ES`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchNowPlayingMovies() {
    const res = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchTopRatedMovies() {
    const res = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchUpcomingMovies() {
    const res = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=1`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchMoviesByGenre(genreId) {
    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}&sort_by=popularity.desc`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchGenres() {
    const res = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function searchMovies(query) {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES&page=1`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchMovieDetails(id) {
    const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=credits,similar,recommendations`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}

export async function fetchMovieVideos(id) {
    const res = await fetch(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );

    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status}`);
    }

    return res.json();
}
