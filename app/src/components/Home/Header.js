import React from 'react';
import '../style/Header.css'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <nav>
            <ul>
                <li> <Link to="/">Home</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
                <li><Link to="/userTestList">User Panel</Link></li>
                <li><Link to="/addTest">Add Question</Link></li>
            </ul>
            
        </nav>
    );
}

export default Header;