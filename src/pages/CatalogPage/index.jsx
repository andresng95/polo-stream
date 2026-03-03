import { useState, useEffect, useCallback, useMemo } from 'react';
import useMovies from '../../hooks/useMovies';
import { fetchPopularMovies, searchMovies } from '../../services/tmdb';
import MovieGrid from '../../components/catalog/MovieGrid';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import './CatalogPage.css';

const CatalogPage = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const [filters, setFilters] = useState({ year: 'all', language: 'all' });

    // Debounce query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    // Create the fetch function based on query
    const fetchFunction = useCallback(() => {
        if (debouncedQuery.trim()) {
            return searchMovies(debouncedQuery);
        } else {
            return fetchPopularMovies();
        }
    }, [debouncedQuery]);

    const { data, loading, error } = useMovies(fetchFunction);

    const movies = data?.results || [];

    // Local filtering for Year and Language since TMDB search endpoint is simpler
    const filteredMovies = useMemo(() => {
        return movies.filter(movie => {
            const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : '';
            const matchesYear = filters.year === 'all' || releaseYear === filters.year;
            const matchesLang = filters.language === 'all' || movie.original_language === filters.language;

            return matchesYear && matchesLang;
        }).map(m => ({
            id: m.id.toString(),
            title: m.title,
            description: m.overview,
            year: m.release_date ? m.release_date.substring(0, 4) : 'N/A',
            categoryId: m.genre_ids?.[0]?.toString() || 'action', // Mock category mapping
            price: 3.99,
            buyPrice: 14.99,
            image: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
            rating: m.vote_average ? (m.vote_average / 2).toFixed(1) : 'N/A' // Scale 10 to 5
        }));
    }, [movies, filters]);

    const uniqueYears = ['all', ...Array.from(new Set(movies.map(m => m.release_date?.substring(0, 4)).filter(Boolean))).sort().reverse()];
    const uniqueLangs = ['all', ...Array.from(new Set(movies.map(m => m.original_language).filter(Boolean)))];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="catalog">
            <div className="catalog__header">
                <h1 className="catalog__title">Movie Catalog</h1>
            </div>

            <div className="catalog__toolbar">
                <div className="catalog__search">
                    <input
                        type="text"
                        className="catalog__search-input"
                        placeholder="Search movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="catalog__filters">
                    <select
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className="catalog__select"
                    >
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>
                                {year === 'all' ? 'All Years' : year}
                            </option>
                        ))}
                    </select>

                    <select
                        name="language"
                        value={filters.language}
                        onChange={handleFilterChange}
                        className="catalog__select"
                    >
                        {uniqueLangs.map(lang => (
                            <option key={lang} value={lang}>
                                {lang === 'all' ? 'All Languages' : lang.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="catalog__content">
                {loading && (
                    <div className="catalog__loader">
                        <Loader size="large" />
                    </div>
                )}

                {error && (
                    <div className="catalog__error">
                        <EmptyState
                            title="Oops! Something went wrong."
                            message={error}
                            icon="⚠️"
                        />
                    </div>
                )}

                {!loading && !error && (
                    <div className="catalog__grid">
                        <MovieGrid
                            movies={filteredMovies}
                            title={debouncedQuery ? `Search Results for "${debouncedQuery}"` : "Popular Movies"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
