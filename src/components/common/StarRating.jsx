import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './StarRating.css';

const StarRating = memo(({ rating, maxStars = 5, showValue = true }) => {
    const numericRating = useMemo(() => {
        const parsed = parseFloat(rating);
        return isNaN(parsed) ? 0 : parsed;
    }, [rating]);

    const stars = useMemo(() => {
        return Array.from({ length: maxStars }).map((_, i) => (
            <span
                key={i}
                className={`star-rating__star ${i < Math.floor(numericRating) ? 'star-rating__star--filled' : ''}`}
                aria-hidden="true"
            >
                ★
            </span>
        ));
    }, [maxStars, numericRating]);

    return (
        <div className="star-rating" aria-label={`Rating: ${numericRating} out of ${maxStars} stars`}>
            {showValue && <span className="star-rating__value">{rating}</span>}
            <div className="star-rating__stars">
                {stars}
            </div>
        </div>
    );
});

StarRating.displayName = 'StarRating';

StarRating.propTypes = {
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    maxStars: PropTypes.number,
    showValue: PropTypes.bool
};

export default StarRating;
