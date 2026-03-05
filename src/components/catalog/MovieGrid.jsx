import { memo } from 'react';
import PropTypes from 'prop-types';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { MovieGridSkeleton } from '../common/Skeleton';
import './MovieGrid.css';

const MovieGrid = memo(({ movies, title, loading = false, skeletonCount = 8 }) => {
    return (
        <section className="movie-grid-section">
            {title && <h2 className="movie-grid-section__title">{title}</h2>}

            {loading ? (
                <MovieGridSkeleton count={skeletonCount} />
            ) : movies.length === 0 ? (
                <EmptyState
                    title="No movies found"
                    message="Try adjusting your search or filters."
                    icon="🎬"
                />
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </section>
    );
});

MovieGrid.displayName = 'MovieGrid';

MovieGrid.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.string,
            year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ).isRequired,
    title: PropTypes.string,
    loading: PropTypes.bool,
    skeletonCount: PropTypes.number
};

export default MovieGrid;
