import { useParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useMovies from '../../hooks/useMovies';
import { fetchMovieDetails, fetchMovieVideos } from '../../services/tmdb';
import MovieInfo from '../../components/movie/MovieInfo';
import TrailerSection from '../../components/movie/TrailerSection';
import EmptyState from '../../components/common/EmptyState';
import { MovieDetailSkeleton } from '../../components/common/Skeleton';
import { useLocalStorageState } from '../../hooks/useLocalStorageState';
import { useToast } from '../../components/common/Toast';
import { useConfirm } from '../../components/common/ConfirmDialog';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const { confirm } = useConfirm();

    const fetchDetailsFn = useCallback(() => fetchMovieDetails(id), [id]);
    const fetchVideosFn = useCallback(() => fetchMovieVideos(id), [id]);

    const { data: movieData, loading: detailsLoading, error: detailsError } = useMovies(fetchDetailsFn);
    const { data: videoData } = useMovies(fetchVideosFn);

    const [library, setLibrary] = useLocalStorageState('polostream_library', {
        rented: [],
        bought: []
    });

    const loading = detailsLoading || !movieData;
    const error = detailsError;

    if (loading) {
        return (
            <div className="movie-detail-page">
                <MovieDetailSkeleton />
            </div>
        );
    }

    if (error || !movieData) {
        return (
            <div className="movie-detail-page">
                <EmptyState
                    title="Película no encontrada"
                    message={error || "La película que buscas no existe o ha sido eliminada."}
                    icon="❓"
                />
                <div className="movie-detail-page__back-wrapper">
                    <button className="back-btn" onClick={() => navigate('/catalog')}>
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    // Format TMDB data to match our component structure
    const formattedMovie = {
        id: movieData.id.toString(),
        title: movieData.title,
        description: movieData.overview,
        year: movieData.release_date ? movieData.release_date.substring(0, 4) : 'N/A',
        categoryId: movieData.genres?.[0]?.name || 'Unknown',
        price: 3.99,
        buyPrice: 14.99,
        image: movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
        rating: movieData.vote_average ? (movieData.vote_average / 2).toFixed(1) : 'N/A'
    };

    // Find Trailer
    const trailerNode = videoData?.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
    const trailerUrl = trailerNode ? `https://www.youtube.com/embed/${trailerNode.key}` : null;

    const isRented = library.rented.includes(formattedMovie.id);
    const isBought = library.bought.includes(formattedMovie.id);

    const handleRent = async () => {
        const confirmed = await confirm({
            title: 'Alquilar película',
            message: `¿Deseas alquilar "${formattedMovie.title}" por $${formattedMovie.price}?`,
            confirmText: 'Alquilar',
            cancelText: 'Cancelar',
            type: 'default'
        });

        if (confirmed) {
            setLibrary(prev => ({
                ...prev,
                rented: [...prev.rented, formattedMovie.id]
            }));
            toast.success(`"¡${formattedMovie.title}" alquilada! Tienes 48 horas para verla.`);
        }
    };

    const handleBuy = async () => {
        const confirmed = await confirm({
            title: 'Comprar película',
            message: `¿Deseas comprar "${formattedMovie.title}" por $${formattedMovie.buyPrice}?`,
            confirmText: 'Comprar',
            cancelText: 'Cancelar',
            type: 'success'
        });

        if (confirmed) {
            setLibrary(prev => ({
                ...prev,
                bought: [...prev.bought, formattedMovie.id]
            }));
            toast.success(`"¡${formattedMovie.title}" comprada! Añadida a tu biblioteca permanentemente.`);
        }
    };

    return (
        <div className="movie-detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                &larr; Volver
            </button>

            <div className="movie-detail-page__contenido">
                <MovieInfo
                    movie={formattedMovie}
                    onRent={handleRent}
                    onBuy={handleBuy}
                    isRented={isRented}
                    isBought={isBought}
                />

                {trailerUrl && (
                    <TrailerSection
                        trailerUrl={trailerUrl}
                        title={formattedMovie.title}
                    />
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
