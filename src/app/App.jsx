import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Layout from '../components/layout/Layout';
import { ToastProvider } from '../components/common/Toast';
import { ConfirmProvider } from '../components/common/ConfirmDialog';

function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <ConfirmProvider>
                    <Layout>
                        <AppRoutes />
                    </Layout>
                </ConfirmProvider>
            </ToastProvider>
        </BrowserRouter>
    );
}

export default App;
