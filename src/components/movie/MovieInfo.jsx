import { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import StarRating from '../common/StarRating';
import Tag from '../common/Tag';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { categories } from '../../mocks/mockData';
import './MovieInfo.css';

const FALLBACK_POSTER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect fill="%231a1a1a" width="300" height="450"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" text-anchor="middle" x="150" y="225"%3ENo Poster%3C/text%3E%3C/svg%3E';

const MovieInfo = memo(({ movie, onRent, onBuy, isRented, isBought }) => {
    const [posterSrc, setPosterSrc] = useState(movie.image || FALLBACK_POSTER);
    const category = categories.find(c => c.id === movie.categoryId)?.name || movie.categoryId;

    const handlePosterError = useCallback(() => {
        setPosterSrc(FALLBACK_POSTER);
    }, []);

    return (
        <div className="movie-info">
            <div className="movie-info__poster-container">
                <img 
                    src={posterSrc} 
                    alt={movie.title} 
                    className="movie-info__poster"
                    onError={handlePosterError}
                />
                <div className="movie-info__status-badges">
                    {isBought && <Badge variant="success">Purchased</Badge>}
                    {isRented && !isBought && <Badge variant="warning">Rented</Badge>}
                </div>
            </div>

            <div className="movie-info__details">
                <h1 className="movie-info__title">{movie.title}</h1>

                <div className="movie-info__meta">
                    <span className="movie-info__year">{movie.year}</span>
                    <Tag text={category} />
                    <StarRating rating={movie.rating} />
                </div>

                <p className="movie-info__description">{movie.description}</p>

                <div className="movie-info__actions">
                    {!isBought && (
                        <Button
                            variant="primary"
                            onClick={onBuy}
                            className="movie-info__action-btn"
                        >
                            Buy ${movie.buyPrice}
                        </Button>
                    )}

                    {!isRented && !isBought && (
                        <Button
                            variant="outline"
                            onClick={onRent}
                            className="movie-info__action-btn"
                        >
                            Rent ${movie.price}
                        </Button>
                    )}

                    {(isRented || isBought) && (
                        <Button
                            variant="secondary"
                            className="movie-info__action-btn"
                            onClick={() => alert('Starting playback...')}
                        >
                            ▶ Play Now
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
});

MovieInfo.displayName = 'MovieInfo';

MovieInfo.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        image: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        categoryId: PropTypes.string,
        price: PropTypes.number,
        buyPrice: PropTypes.number
    }).isRequired,
    onRent: PropTypes.func,
    onBuy: PropTypes.func,
    isRented: PropTypes.bool,
    isBought: PropTypes.bool
};

MovieInfo.defaultProps = {
    onRent: () => {},
    onBuy: () => {},
    isRented: false,
    isBought: false
};

export default MovieInfo;
