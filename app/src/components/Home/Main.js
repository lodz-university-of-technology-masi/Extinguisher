import React, {useContext} from 'react';
import '../style/Main.css'
import {AppContext} from "../context/AppContext";
import LoadingSpinner from "./LoadingSpinner"

const Main = () => {
    const {userp, auth} = useContext(AppContext);
    const [isAuthenticated, setIsAuthenticated] = auth;
    const [user, setUser] = userp;
    return (
        <div className="main">
            {isAuthenticated ? <h1>Witaj </h1> : <h1>Brak autentykacji</h1>}
        </div>
    );
};

export default Main;