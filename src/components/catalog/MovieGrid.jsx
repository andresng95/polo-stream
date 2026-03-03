import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import './MovieGrid.css';

const MovieGrid = ({ movies, title }) => {
    return (
        <section className="movie-grid-section">
            {title && <h2 className="movie-grid-section__title">{title}</h2>}

            {movies.length === 0 ? (
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
};

export default MovieGrid;
