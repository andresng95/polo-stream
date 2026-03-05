import { useRef, useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../services/tmdb';
import './MovieCarousel.css';

const FALLBACK_POSTER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect fill="%231a1a1a" width="300" height="450"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" text-anchor="middle" x="150" y="225"%3ENo Image%3C/text%3E%3C/svg%3E';

// Memoized carousel item to prevent unnecessary re-renders
const CarouselItem = memo(({ movie, size }) => {
    const [imgSrc, setImgSrc] = useState(
        getImageUrl(movie.poster_path, size === 'large' ? 'w500' : 'w342')
    );

    const handleError = useCallback(() => {
        setImgSrc(FALLBACK_POSTER);
    }, []);

    return (
        <Link 
            to={`/movie/${movie.id}`}
            className={`movie-carousel__item movie-carousel__item--${size}`}
        >
            <div className="movie-carousel__poster">
                <img 
                    src={imgSrc}
                    alt={movie.title}
                    loading="lazy"
                    onError={handleError}
                />
                <div className="movie-carousel__overlay">
                    <span className="movie-carousel__overlay-title">{movie.title}</span>
                    <span className="movie-carousel__rating">
                        {movie.release_date?.split('-')[0]} • ★ {movie.vote_average?.toFixed(1)}
                    </span>
                </div>
            </div>
        </Link>
    );
});

CarouselItem.displayName = 'CarouselItem';

CarouselItem.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number
    }).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired
};

const MovieCarousel = memo(({ title, movies, size = 'medium' }) => {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);
        }
        return () => {
            if (carousel) {
                carousel.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            }
        };
    }, [movies]);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth * 0.8;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <section className="movie-carousel">
            <div className="movie-carousel__header">
                <h2 className="movie-carousel__title">{title}</h2>
            </div>
            
            <div className="movie-carousel__wrapper">
                {canScrollLeft && (
                    <button 
                        className="movie-carousel__btn movie-carousel__btn--left"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>
                )}
                
                <div 
                    className={`movie-carousel__track movie-carousel__track--${size}`}
                    ref={carouselRef}
                >
                    {movies.map((movie) => (
                        <CarouselItem key={movie.id} movie={movie} size={size} />
                    ))}
                </div>

                {canScrollRight && (
                    <button 
                        className="movie-carousel__btn movie-carousel__btn--right"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                        </svg>
                    </button>
                )}
            </div>
        </section>
    );
});

MovieCarousel.displayName = 'MovieCarousel';

MovieCarousel.propTypes = {
    title: PropTypes.string.isRequired,
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            poster_path: PropTypes.string,
            release_date: PropTypes.string,
            vote_average: PropTypes.number
        })
    ).isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default MovieCarousel;
