import { memo } from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = memo(({ size = 'medium', fullScreen = false, label = 'Cargando...' }) => {
    const loaderClass = `loader loader--${size}`;
    const containerClass = fullScreen ? 'loader-container loader-container--full' : 'loader-container';

    return (
        <div className={containerClass} role="status" aria-label={label}>
            <div className={loaderClass} aria-hidden="true" />
            <span className="visually-hidden">{label}</span>
        </div>
    );
});

Loader.displayName = 'Loader';

Loader.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    fullScreen: PropTypes.bool,
    label: PropTypes.string
};

export default Loader;
