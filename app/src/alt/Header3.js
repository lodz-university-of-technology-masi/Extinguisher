import React, {useState, useContext} from 'react';
import '../style/Header.css'
import {Link} from 'react-router-dom'
import {AppContext} from "../../context/AppContext";

const Header3 = () => {

    const {isAuthenticated, logout} = useContext(AppContext);
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAuthenticated ?
                    <>
                        <li><Link onClick={logout} to="/logout">Logout</Link></li>
                        <li><Link to="/addTest">Add Test</Link></li>
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

export default Header3;