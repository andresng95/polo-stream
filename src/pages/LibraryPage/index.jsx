import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { fetchMovieDetails, getImageUrl } from '../../services/tmdb';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import './LibraryPage.css';

const LibraryMovieCard = ({ movie, type }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="library-card">
            <div className="library-card__poster">
                <img 
                    src={getImageUrl(movie.poster_path, 'w342')} 
                    alt={movie.title}
                    loading="lazy"
                />
                <div className={`library-card__badge library-card__badge--${type}`}>
                    {type === 'bought' ? 'Comprada' : 'Alquilada'}
                </div>
            </div>
            <div className="library-card__info">
                <h3 className="library-card__title">{movie.title}</h3>
                <span className="library-card__year">
                    {movie.release_date?.split('-')[0]}
                </span>
            </div>
        </Link>
    );
};

const LibraryPage = () => {
    const [library] = useLocalStorageState('polostream_library', {
        rented: [],
        bought: []
    });
    const [movies, setMovies] = useState({ rented: [], bought: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibraryMovies = async () => {
            setLoading(true);
            try {
                // Fetch rented movies (excluding those also bought)
                const rentedIds = library.rented.filter(id => !library.bought.includes(id));
                const rentedPromises = rentedIds.map(id => 
                    fetchMovieDetails(id).catch(() => null)
                );
                
                // Fetch bought movies
                const boughtPromises = library.bought.map(id => 
                    fetchMovieDetails(id).catch(() => null)
                );

                const [rentedResults, boughtResults] = await Promise.all([
                    Promise.all(rentedPromises),
                    Promise.all(boughtPromises)
                ]);

                setMovies({
                    rented: rentedResults.filter(Boolean),
                    bought: boughtResults.filter(Boolean)
                });
            } catch (error) {
                console.error('Error fetching library movies:', error);
            } finally {
                setLoading(false);
            }
        };

        if (library.rented.length > 0 || library.bought.length > 0) {
            fetchLibraryMovies();
        } else {
            setLoading(false);
        }
    }, [library.rented, library.bought]);

    const isEmpty = movies.rented.length === 0 && movies.bought.length === 0;

    return (
        <div className="library-page">
            <div className="library-page__header">
                <h1 className="library-page__title">Mi Biblioteca</h1>
                <p className="library-page__subtitle">
                    Tus películas alquiladas y compradas en un solo lugar.
                </p>
            </div>

            {loading ? (
                <div className="library-page__loading">
                    <Loader />
                </div>
            ) : isEmpty ? (
                <EmptyState
                    title="Tu biblioteca está vacía"
                    message="Las películas que alquiles o compres aparecerán aquí."
                    icon="🎬"
                />
            ) : (
                <div className="library-page__content">
                    {movies.bought.length > 0 && (
                        <section className="library-section">
                            <h2 className="library-section__title">
                                Películas compradas ({movies.bought.length})
                            </h2>
                            <div className="library-grid">
                                {movies.bought.map(movie => (
                                    <LibraryMovieCard 
                                        key={movie.id} 
                                        movie={movie} 
                                        type="bought" 
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {movies.rented.length > 0 && (
                        <section className="library-section">
                            <h2 className="library-section__title">
                                Alquileres activos ({movies.rented.length})
                            </h2>
                            <div className="library-grid">
                                {movies.rented.map(movie => (
                                    <LibraryMovieCard 
                                        key={movie.id} 
                                        movie={movie} 
                                        type="rented" 
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default LibraryPage;
