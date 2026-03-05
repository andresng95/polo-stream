import { memo } from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

const Tag = memo(({ text, className = '', variant = 'default' }) => {
    return (
        <span className={`tag tag--${variant} ${className}`}>
            {text}
        </span>
    );
});

Tag.displayName = 'Tag';

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'primary', 'secondary'])
};

export default Tag;
