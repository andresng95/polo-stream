import { memo } from 'react';
import PropTypes from 'prop-types';
import './Skeleton.css';

/**
 * Base Skeleton component for loading states
 */
const Skeleton = memo(({ 
    variant = 'rectangular', 
    width, 
    height, 
    className = '',
    animation = 'shimmer',
    borderRadius
}) => {
    const style = {
        width,
        height,
        borderRadius: borderRadius || (variant === 'circular' ? '50%' : undefined)
    };

    return (
        <div 
            className={`skeleton skeleton--${variant} skeleton--${animation} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
});

Skeleton.displayName = 'Skeleton';

Skeleton.propTypes = {
    variant: PropTypes.oneOf(['text', 'rectangular', 'circular']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    animation: PropTypes.oneOf(['shimmer', 'pulse', 'none']),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

/**
 * Skeleton for movie cards in grid
 */
export const MovieCardSkeleton = memo(() => (
    <div className="skeleton-card">
        <Skeleton variant="rectangular" className="skeleton-card__image" />
        <div className="skeleton-card__content">
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="50%" height={16} />
        </div>
    </div>
));

MovieCardSkeleton.displayName = 'MovieCardSkeleton';

/**
 * Skeleton for movie grid loading state
 */
export const MovieGridSkeleton = memo(({ count = 8 }) => (
    <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, i) => (
            <MovieCardSkeleton key={i} />
        ))}
    </div>
));

MovieGridSkeleton.displayName = 'MovieGridSkeleton';

MovieGridSkeleton.propTypes = {
    count: PropTypes.number
};

/**
 * Skeleton for carousel loading state
 */
export const CarouselSkeleton = memo(({ count = 6, size = 'medium' }) => (
    <div className="skeleton-carousel">
        <Skeleton variant="text" width={200} height={28} className="skeleton-carousel__title" />
        <div className={`skeleton-carousel__track skeleton-carousel__track--${size}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={`skeleton-carousel__item skeleton-carousel__item--${size}`}>
                    <Skeleton variant="rectangular" className="skeleton-carousel__poster" />
                </div>
            ))}
        </div>
    </div>
));

CarouselSkeleton.displayName = 'CarouselSkeleton';

CarouselSkeleton.propTypes = {
    count: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

/**
 * Skeleton for movie detail page
 */
export const MovieDetailSkeleton = memo(() => (
    <div className="skeleton-detail">
        <div className="skeleton-detail__poster">
            <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>
        <div className="skeleton-detail__content">
            <Skeleton variant="text" width="70%" height={40} className="skeleton-detail__title" />
            <div className="skeleton-detail__meta">
                <Skeleton variant="text" width={80} height={24} />
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="text" width={60} height={24} />
            </div>
            <Skeleton variant="rectangular" width="100%" height={100} borderRadius={8} />
            <div className="skeleton-detail__actions">
                <Skeleton variant="rectangular" width={140} height={48} borderRadius={24} />
                <Skeleton variant="rectangular" width={120} height={48} borderRadius={24} />
            </div>
        </div>
    </div>
));

MovieDetailSkeleton.displayName = 'MovieDetailSkeleton';

export default Skeleton;
