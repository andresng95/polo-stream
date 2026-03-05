import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Layout from '../components/layout/Layout';
import { ToastProvider } from '../components/common/Toast';
import { ConfirmProvider } from '../components/common/ConfirmDialog';
import ErrorBoundary from '../components/common/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <ToastProvider>
                    <ConfirmProvider>
                        <Layout>
                            <ErrorBoundary>
                                <AppRoutes />
                            </ErrorBoundary>
                        </Layout>
                    </ConfirmProvider>
                </ToastProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
