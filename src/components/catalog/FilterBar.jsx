import './FilterBar.css';
import { categories } from '../../mocks/mockData';

const FilterBar = ({ activeCategory, onCategoryChange }) => {
    return (
        <div className="filter-bar">
            <h3 className="filter-bar__title">Categories</h3>
            <ul className="filter-bar__list">
                <li className="filter-bar__item">
                    <button
                        className={`filter-bar__btn ${activeCategory === 'all' ? 'filter-bar__btn--active' : ''}`}
                        onClick={() => onCategoryChange('all')}
                    >
                        All
                    </button>
                </li>
                {categories.map((category) => (
                    <li key={category.id} className="filter-bar__item">
                        <button
                            className={`filter-bar__btn ${activeCategory === category.id ? 'filter-bar__btn--active' : ''}`}
                            onClick={() => onCategoryChange(category.id)}
                        >
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterBar;
