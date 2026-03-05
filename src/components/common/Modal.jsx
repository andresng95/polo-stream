import { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = memo(({ isOpen, onClose, title, children, size = 'medium' }) => {
    // Handle escape key
    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // Handle body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <div 
            className="modal" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className={`modal__content modal__content--${size}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal__header">
                    <h2 id="modal-title" className="modal__title">{title}</h2>
                    <button 
                        className="modal__close" 
                        onClick={onClose}
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </button>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
});

Modal.displayName = 'Modal';

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Modal;
