import React from 'react';
import '../style/Header.css'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <nav>
            <ul>
                <li> <Link to="/home">Home</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default Header;