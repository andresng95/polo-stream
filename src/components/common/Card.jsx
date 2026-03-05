import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

const FALLBACK_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect fill="%231a1a1a" width="300" height="450"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" text-anchor="middle" x="150" y="225"%3ENo Image%3C/text%3E%3C/svg%3E';

const Card = memo(({ movie }) => {
    const [imgSrc, setImgSrc] = useState(movie.image || FALLBACK_IMAGE);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = useCallback(() => {
        setImgSrc(FALLBACK_IMAGE);
    }, []);

    const handleLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="card">
            <Link to={`/movie/${movie.id}`} className="card__link">
                <div className="card__image-container">
                    {!isLoaded && <div className="card__skeleton" />}
                    <img 
                        src={imgSrc} 
                        alt={movie.title} 
                        className={`card__image ${isLoaded ? 'card__image--loaded' : ''}`}
                        onError={handleError}
                        onLoad={handleLoad}
                        loading="lazy"
                    />
                    <div className="card__overlay">
                        <h3 className="card__title">{movie.title}</h3>
                        <div className="card__meta">
                            <span className="card__year">{movie.year}</span>
                            <span className="card__rating">⭐ {movie.rating}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
});

Card.displayName = 'Card';

Card.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }).isRequired
};

export default Card;
