import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import LibraryPage from '../pages/LibraryPage';
import AdminPage from '../pages/AdminPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
};

export default AppRoutes;
