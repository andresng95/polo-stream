import { memo } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = memo(({ 
    children, 
    variant = 'primary', 
    onClick, 
    className = '', 
    type = 'button',
    disabled = false,
    loading = false,
    'aria-label': ariaLabel
}) => {
    const baseClass = 'button';
    const variantClass = `button--${variant}`;
    const stateClasses = [
        disabled && 'button--disabled',
        loading && 'button--loading'
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass} ${stateClasses} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            aria-busy={loading}
        >
            {loading ? (
                <span className="button__spinner" aria-hidden="true" />
            ) : children}
        </button>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    'aria-label': PropTypes.string
};

export default Button;
