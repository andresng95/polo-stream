import StarRating from '../common/StarRating';
import Tag from '../common/Tag';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { categories } from '../../mocks/mockData';
import './MovieInfo.css';

const MovieInfo = ({ movie, onRent, onBuy, isRented, isBought }) => {
    const category = categories.find(c => c.id === movie.categoryId)?.name || movie.categoryId;

    return (
        <div className="movie-info">
            <div className="movie-info__poster-container">
                <img src={movie.image} alt={movie.title} className="movie-info__poster" />
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
};

export default MovieInfo;
