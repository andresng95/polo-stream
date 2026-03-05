import { useState, useEffect } from 'react';
import HeroBanner from '../../components/home/HeroBanner';
import MovieCarousel from '../../components/home/MovieCarousel';
import Loader from '../../components/common/Loader';
import Skeleton, { CarouselSkeleton } from '../../components/common/Skeleton';
import { 
    fetchTrendingMovies, 
    fetchPopularMovies, 
    fetchTopRatedMovies, 
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchMoviesByGenre
} from '../../services/tmdb';
import './HomePage.css';

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        trending: [],
        popular: [],
        topRated: [],
        nowPlaying: [],
        upcoming: [],
        action: [],
        comedy: [],
        horror: [],
        scifi: []
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [
                    trendingRes,
                    popularRes,
                    topRatedRes,
                    nowPlayingRes,
                    upcomingRes,
                    actionRes,
                    comedyRes,
                    horrorRes,
                    scifiRes
                ] = await Promise.all([
                    fetchTrendingMovies('week'),
                    fetchPopularMovies(),
                    fetchTopRatedMovies(),
                    fetchNowPlayingMovies(),
                    fetchUpcomingMovies(),
                    fetchMoviesByGenre(28),   // Action
                    fetchMoviesByGenre(35),   // Comedy
                    fetchMoviesByGenre(27),   // Horror
                    fetchMoviesByGenre(878)   // Sci-Fi
                ]);

                setData({
                    trending: trendingRes.results || [],
                    popular: popularRes.results || [],
                    topRated: topRatedRes.results || [],
                    nowPlaying: nowPlayingRes.results || [],
                    upcoming: upcomingRes.results || [],
                    action: actionRes.results || [],
                    comedy: comedyRes.results || [],
                    horror: horrorRes.results || [],
                    scifi: scifiRes.results || []
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    if (loading) {
        return (
            <div className="home-page home-page--loading">
                {/* Hero Skeleton */}
                <div className="home-page__hero-skeleton">
                    <Skeleton variant="rectangular" width="100%" height="70vh" />
                </div>
                
                {/* Carousel Skeletons */}
                <div className="home-page__content">
                    <CarouselSkeleton size="large" count={5} />
                    <CarouselSkeleton size="medium" count={6} />
                    <CarouselSkeleton size="medium" count={6} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-page home-page--error">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <HeroBanner movies={data.trending} />
            
            <div className="home-page__content">
                <MovieCarousel 
                    title="Tendencias de la semana" 
                    movies={data.trending} 
                    size="large"
                />
                
                <MovieCarousel 
                    title="En cines ahora" 
                    movies={data.nowPlaying} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Películas populares" 
                    movies={data.popular} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Próximos estrenos" 
                    movies={data.upcoming} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Mejor valoradas" 
                    movies={data.topRated} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Acción" 
                    movies={data.action} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Comedia" 
                    movies={data.comedy} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Terror" 
                    movies={data.horror} 
                    size="medium"
                />
                
                <MovieCarousel 
                    title="Ciencia ficción" 
                    movies={data.scifi} 
                    size="medium"
                />
            </div>
        </div>
    );
};

export default HomePage;
