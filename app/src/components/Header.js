import React, {useState, useContext} from 'react';
import '../style/Header.css'
import {AppContext} from "../context/AppContext";
import {Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import Auth from "@aws-amplify/auth/lib/Auth";

const Header = () => {

    const {userp, auth} = useContext(AppContext);
    const [user, setUser] = userp;
    const [isAuthenticated, setIsAuthenticated] = auth;
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={NavLink} exact to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isAuthenticated && user.signInUserSession.idToken.payload['custom:role']=='recruiter'?
                        <>
                            <Nav.Link as={NavLink} exact to="/addTest">AddTest</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/userTestView">UserTestView</Nav.Link>
                            <Nav.Link as={NavLink} onClick={async () => {
                                //let currentUser = Auth.userPool.getCurrentUser();
                                //console.log(currentUser);
                                // await Auth.signOut();
                                setUser(null);
                                setIsAuthenticated(false)
                            }} exact to="/logout">Logout</Nav.Link>
                        </>
                        :
                        <>
                        { isAuthenticated?
                            <>
                             <Nav.Link as={NavLink} exact to="/userPanel">UserPanel</Nav.Link>
                             <Nav.Link as={NavLink} onClick={async () => {
                                //let currentUser = Auth.userPool.getCurrentUser();
                                //console.log(currentUser);
                                // await Auth.signOut();
                                setUser(null);
                                setIsAuthenticated(false)
                            }} exact to="/logout">Logout</Nav.Link>
                            </>
                        :
                        <>
                    
                            <Nav.Link as={NavLink} exact to="/login">Login</Nav.Link>
                            < Nav.Link as={NavLink} exact to="/register"> Register</Nav.Link>
                            <Nav.Link as={NavLink} exact to="/confirm"> Confirm</Nav.Link>
                        </>}</>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default Header;