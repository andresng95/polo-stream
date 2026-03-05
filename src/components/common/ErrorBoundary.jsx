import { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            errorInfo: null 
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        
        // Log error to monitoring service in production
        if (process.env.NODE_ENV === 'production') {
            // Could integrate with Sentry, LogRocket, etc.
            console.error('Error caught by ErrorBoundary:', error, errorInfo);
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary">
                    <div className="error-boundary__content">
                        <div className="error-boundary__icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                        </div>
                        <h2 className="error-boundary__title">Algo salió mal</h2>
                        <p className="error-boundary__message">
                            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-boundary__details">
                                <summary>Detalles del error</summary>
                                <pre>{this.state.error.toString()}</pre>
                                <pre>{this.state.errorInfo?.componentStack}</pre>
                            </details>
                        )}
                        <div className="error-boundary__actions">
                            <Button variant="primary" onClick={this.handleRetry}>
                                Intentar de nuevo
                            </Button>
                            <Button variant="outline" onClick={() => window.location.href = '/'}>
                                Ir al inicio
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node
};

export default ErrorBoundary;
