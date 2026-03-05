import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import './ImageWithFallback.css';

const DEFAULT_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect fill="%231a1a1a" width="300" height="450"/%3E%3Ctext fill="%23666" font-family="sans-serif" font-size="14" text-anchor="middle" x="150" y="225"%3ENo Image%3C/text%3E%3C/svg%3E';

const ImageWithFallback = memo(({
    src,
    alt,
    fallbackSrc = DEFAULT_PLACEHOLDER,
    className = '',
    loadingClassName = 'image--loading',
    errorClassName = 'image--error',
    onLoad,
    onError,
    ...props
}) => {
    const [status, setStatus] = useState('loading');
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = useCallback((e) => {
        setStatus('loaded');
        onLoad?.(e);
    }, [onLoad]);

    const handleError = useCallback((e) => {
        if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setStatus('fallback');
        } else {
            setStatus('error');
        }
        onError?.(e);
    }, [currentSrc, fallbackSrc, onError]);

    const statusClass = status === 'loading' ? loadingClassName : status === 'error' ? errorClassName : '';

    return (
        <div className={`image-wrapper ${statusClass}`}>
            {status === 'loading' && (
                <div className="image-placeholder">
                    <div className="image-placeholder__shimmer" />
                </div>
            )}
            <img
                src={currentSrc || fallbackSrc}
                alt={alt}
                className={`image-fallback ${className} ${status === 'loaded' || status === 'fallback' ? 'image-fallback--visible' : ''}`}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
        </div>
    );
});

ImageWithFallback.displayName = 'ImageWithFallback';

ImageWithFallback.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
    fallbackSrc: PropTypes.string,
    className: PropTypes.string,
    loadingClassName: PropTypes.string,
    errorClassName: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

export default ImageWithFallback;
