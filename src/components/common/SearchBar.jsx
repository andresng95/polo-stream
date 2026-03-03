import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-bar__input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-bar__button">
                🔍
            </button>
        </form>
    );
};

export default SearchBar;
