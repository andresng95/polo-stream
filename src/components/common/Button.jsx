import './Button.css';

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
    const baseClass = 'button';
    const variantClass = `button--${variant}`;

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
