import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__container">
                <Link to="/" className="header__logo">
                    <div className="header__logo-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff6b6b" />
                                    <stop offset="100%" stopColor="#ff3b30" />
                                </linearGradient>
                            </defs>
                            <rect width="40" height="40" rx="10" fill="url(#logoGradient)"/>
                            <path d="M16 12L30 20L16 28V12Z" fill="white"/>
                        </svg>
                    </div>
                    <div className="header__logo-text">
                        <span className="header__logo-brand">POLO</span>
                        <span className="header__logo-sub">STREAM</span>
                    </div>
                </Link>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <NavLink 
                                to="/" 
                                end
                                className={({ isActive }) => 
                                    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                                }
                            >
                                Inicio
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink 
                                to="/catalog" 
                                className={({ isActive }) => 
                                    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                                }
                            >
                                Catálogo
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink 
                                to="/library" 
                                className={({ isActive }) => 
                                    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                                }
                            >
                                Mi Biblioteca
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink 
                                to="/admin" 
                                className={({ isActive }) => 
                                    `header__nav-link header__nav-link--admin ${isActive ? 'header__nav-link--active' : ''}`
                                }
                            >
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
