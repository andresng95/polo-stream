import './StarRating.css';

const StarRating = ({ rating, maxStars = 5 }) => {
    return (
        <div className="star-rating">
            <span className="star-rating__value">{rating}</span>
            <div className="star-rating__stars">
                {Array.from({ length: maxStars }).map((_, i) => (
                    <span
                        key={i}
                        className={`star-rating__star ${i < Math.floor(rating) ? 'star-rating__star--filled' : ''}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        </div>
    );
};

export default StarRating;
