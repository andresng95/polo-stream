import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/tmdb';
import './MovieCarousel.css';

const MovieCarousel = ({ title, movies, size = 'medium' }) => {
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
                        <Link 
                            key={movie.id} 
                            to={`/movie/${movie.id}`}
                            className={`movie-carousel__item movie-carousel__item--${size}`}
                        >
                            <div className="movie-carousel__poster">
                                <img 
                                    src={getImageUrl(movie.poster_path, size === 'large' ? 'w500' : 'w342')} 
                                    alt={movie.title}
                                    loading="lazy"
                                />
                                <div className="movie-carousel__overlay">
                                    <span className="movie-carousel__overlay-title">{movie.title}</span>
                                    <span className="movie-carousel__rating">
                                        {movie.release_date?.split('-')[0]} • ★ {movie.vote_average?.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </Link>
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
};

export default MovieCarousel;
