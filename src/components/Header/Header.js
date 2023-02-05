import React from 'react';
import TeeRex from '../../assets/TeeRex.png';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import './Header.scss';

function Header() {
    const state = useSelector(state => state.cart);
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/"><img src={TeeRex} alt="app_logo" /></Link>
                </div>
                
                <ul className="navbar-links">
                    <li className="navbar-item">
                        <Link to="/">Products</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/my_cart">
                          <svg width="20" height="20" fill="blue" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.6 1.2a1.2 1.2 0 0 0 0 2.4h1.464l.366 1.466.012.05 1.63 6.517L6 12.703C4.488 14.215 5.558 16.8 7.697 16.8H18a1.2 1.2 0 1 0 0-2.4H7.697l1.2-1.2H16.8a1.199 1.199 0 0 0 1.073-.664l3.6-7.2A1.2 1.2 0 0 0 20.4 3.6H7.536l-.372-1.492A1.2 1.2 0 0 0 6 1.2H3.6Zm15.6 18.6a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0ZM7.8 21.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"></path>
                            </svg>
                        </Link>
                        <div className="badge">
                          <span>{state.count}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header