import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">
                    &copy; {new Date().getFullYear()} POLO STREAM. All rights reserved.
                </p>
                <div className="footer__links">
                    <a href="#" className="footer__link">Terms of Service</a>
                    <a href="#" className="footer__link">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
