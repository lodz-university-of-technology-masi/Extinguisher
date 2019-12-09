import React from 'react';
import '../style/Header.css'
import { Link } from 'react-router-dom'
const Header = (props) => {
    return (
        <nav>
            <ul>
                <li> <Link to="/">Home</Link></li>
                {props.auth ? <li><Link onClick={props.logout} to="/logout">Logout</Link></li> : <><li><Link to="/login">Sign In</Link></li>
                    <li><Link to="/register">Sign Up</Link></li><li><Link to="/confirm">Confirm</Link></li></>}

            </ul>
        </nav >
    );
}

export default Header;