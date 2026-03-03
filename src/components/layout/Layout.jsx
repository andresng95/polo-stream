import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="layout__main">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
