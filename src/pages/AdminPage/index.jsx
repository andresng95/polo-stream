import { useState } from 'react';
import { movies, categories } from '../../mocks/mockData';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import './AdminPage.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('movies');

    return (
        <div className="admin-page">
            <div className="admin-page__header">
                <h1 className="admin-page__title">Admin Dashboard</h1>
                <Badge variant="warning">Read Only Mode</Badge>
            </div>

            <div className="admin-page__tabs">
                <button
                    className={`admin-page__tab-btn ${activeTab === 'movies' ? 'admin-page__tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('movies')}
                >
                    Movies
                </button>
                <button
                    className={`admin-page__tab-btn ${activeTab === 'categories' ? 'admin-page__tab-btn--active' : ''}`}
                    onClick={() => setActiveTab('categories')}
                >
                    Categories
                </button>
            </div>

            <div className="admin-page__content">
                <div className="admin-page__actions">
                    <Button variant="primary">+ Add New {activeTab === 'movies' ? 'Movie' : 'Category'}</Button>
                </div>

                {activeTab === 'movies' && (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Category</th>
                                    <th>Rent Price</th>
                                    <th>Buy Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map(movie => (
                                    <tr key={movie.id}>
                                        <td>{movie.id}</td>
                                        <td><strong>{movie.title}</strong></td>
                                        <td>{movie.year}</td>
                                        <td>{movie.categoryId}</td>
                                        <td>${movie.price}</td>
                                        <td>${movie.buyPrice}</td>
                                        <td>
                                            <div className="admin-table__actions">
                                                <button className="admin-btn admin-btn--edit">Edit</button>
                                                <button className="admin-btn admin-btn--delete">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'categories' && (
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td><strong>{category.name}</strong></td>
                                        <td>
                                            <div className="admin-table__actions">
                                                <button className="admin-btn admin-btn--edit">Edit</button>
                                                <button className="admin-btn admin-btn--delete">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
