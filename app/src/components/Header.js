import React, {useContext, useEffect} from 'react';
import '../style/Header.css'
import {AppContext} from "../context/AppContext";
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {Auth} from "aws-amplify";

const Header = () => {

    const {userp, auth} = useContext(AppContext);
    const [user, setUser] = userp;
    const [isAuthenticated, setIsAuthenticated] = auth;

    useEffect(() => {
        if (!isAuthenticated) {
            Auth.currentAuthenticatedUser()
                .then(r => {
                    setUser(r);
                    setIsAuthenticated(true);
                })
                .catch(error => {
                });
        }
    }, []);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={NavLink} exact to="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isAuthenticated && (
                        user !== null ?
                            <>

                                {user.getSignInUserSession().getIdToken().payload['custom:role'] === "candidate" ?
                                    <>
                                        <Nav.Link as={NavLink} exact to="/userPanel">UserPanel</Nav.Link>
                                        <Nav.Link as={NavLink} exact to="/userTestList">UserTestList</Nav.Link>
                                        <Nav.Link as={NavLink} exact to="/userTestView">UserTestView</Nav.Link>
                                    </> :
                                    <>
                                        <Nav.Link as={NavLink} exact to="/addTest">AddTest</Nav.Link>
                                        <Nav.Link as={NavLink} exact to="/recruiterPanel">RecruiterPanel</Nav.Link>
                                        <Nav.Link as={NavLink} exact to="/users">ManageUsers</Nav.Link>
                                    </>
                                }
                                <Nav.Link as={NavLink} onClick={async () => {
                                    setUser(null);
                                    setIsAuthenticated(false);
                                    await user.signOut();
                                }} exact to="/logout">Logout</Nav.Link>
                            </>
                            :
                            <>
                            </>
                    )}
                    {!isAuthenticated &&
                    <>
                        <Nav.Link as={NavLink} exact to="/login">Login</Nav.Link>
                        < Nav.Link as={NavLink} exact to="/register"> Register</Nav.Link>
                    </>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;