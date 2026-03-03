import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getBackdropUrl } from '../../services/tmdb';
import './HeroBanner.css';

const HeroBanner = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const featuredMovies = movies?.slice(0, 5) || [];

    const goToSlide = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        const next = (currentIndex + 1) % featuredMovies.length;
        goToSlide(next);
    }, [currentIndex, featuredMovies.length, goToSlide]);

    useEffect(() => {
        if (featuredMovies.length <= 1) return;
        
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [nextSlide, featuredMovies.length]);

    if (!featuredMovies.length) return null;

    const currentMovie = featuredMovies[currentIndex];
    
    // Truncate overview to 2 lines max (approx 120 chars)
    const shortOverview = currentMovie.overview?.length > 120 
        ? `${currentMovie.overview.substring(0, 120)}...` 
        : currentMovie.overview;

    return (
        <section className="hero-banner">
            {/* Background layers for smooth transition */}
            {featuredMovies.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`hero-banner__bg ${index === currentIndex ? 'hero-banner__bg--active' : ''}`}
                    style={{
                        backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`
                    }}
                />
            ))}
            
            {/* Gradient overlay - simplified */}
            <div className="hero-banner__gradient" />

            {/* Content */}
            <div className="hero-banner__content" key={currentIndex}>
                <h1 className="hero-banner__title">{currentMovie.title}</h1>
                
                <p className="hero-banner__overview">{shortOverview}</p>
                
                <div className="hero-banner__actions">
                    <Link to={`/movie/${currentMovie.id}`} className="hero-banner__btn hero-banner__btn--primary">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        Ver ahora
                    </Link>
                    <Link to={`/movie/${currentMovie.id}`} className="hero-banner__btn hero-banner__btn--secondary">
                        Más información
                    </Link>
                </div>
            </div>

            {/* Pagination dots - minimal */}
            {featuredMovies.length > 1 && (
                <div className="hero-banner__pagination">
                    {featuredMovies.map((_, index) => (
                        <button
                            key={index}
                            className={`hero-banner__dot ${index === currentIndex ? 'hero-banner__dot--active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroBanner;
