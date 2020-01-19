import React, {useContext} from 'react';
import '../style/Main.css'
import {AppContext} from "../context/AppContext";
import {Jumbotron} from "react-bootstrap";
import {Link} from "react-router-dom";

const Main = () => {
    const {userp, auth} = useContext(AppContext);
    const [isAuthenticated, setIsAuthenticated] = auth;
    const [user, setUser] = userp;
    return (
        <div className="container">
            <Jumbotron>
                <h1>Recruiting app!</h1>
                {isAuthenticated ?
                    <>
                        <h2>Witaj {user.username} </h2>
                        <h3>Twoja rola to: {user.getSignInUserSession().getIdToken().payload['custom:role']}</h3>
                    </>
                    :
                    <><h1>Brak autentykacji </h1>  <Link to={`/login`} className="btn btn-success btn-md ml-3">Zaloguj
                        się!</Link></>
                }
                <br/>
                <br/>
                <p>Extinguisher</p>
            </Jumbotron>
        </div>
    );
};

export default Main;