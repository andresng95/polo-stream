import { memo } from 'react';
import PropTypes from 'prop-types';
import './Badge.css';

const Badge = memo(({ children, variant = 'primary' }) => {
    return (
        <span className={`badge badge--${variant}`}>
            {children}
        </span>
    );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info'])
};

export default Badge;
