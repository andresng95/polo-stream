import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ movie }) => {
    return (
        <div className="card">
            <Link to={`/movie/${movie.id}`} className="card__link">
                <div className="card__image-container">
                    <img src={movie.image} alt={movie.title} className="card__image" />
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
};

export default Card;
