import React, {useState, useContext} from 'react';
import '../style/Header.css'
import {Link} from 'react-router-dom'
import {AppContext} from "../context/AppContext";

const Header = () => {

    const {userp, auth} = useContext(AppContext);
    const [user, setUser] = userp;
    const [isAuthenticated, setIsAuthenticated] = auth;
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAuthenticated ?
                    <>
                        <li><Link onClick={() => {
                            setIsAuthenticated(false);
                            setUser(false);
                        }} to="/logout">Logout</Link></li>
                        <li><Link to="/addTest">Add Test</Link></li>
                        <li><Link to="/userPanel">User Panel</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/login">Sign In</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                        <li><Link to="/confirm">Confirm</Link></li>
                    </>}
            </ul>
        </nav>
    );
}

export default Header;