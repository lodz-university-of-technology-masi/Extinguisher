import React, {useContext} from 'react';
import {Link, Redirect, Route} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import {Button, Container} from "react-bootstrap";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {userp, auth} = useContext(AppContext);
    const [user, setUser] = userp;
    const [isAuthenticated, setIsAuthenticated] = auth;
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (isAuthenticated) {
                        return <Component {...props}/>;
                    } else {
                        return (
                            <Container>
                                <h1>Not Authorized</h1>
                                <Link to={"/login"} className="btn btn-success btn-md ml-3">Login </Link>
                            </Container>
                        )
                    }
                }
            }
        >

        </Route>
    );
};

export default ProtectedRoute;