import React from 'react';
import '../style/Main.css'
const Main = (props) => {
    return (
        <div className="main">
            {props.user ? <h1>Witaj {props.user.username}</h1> : <h1>Brak autentykacji</h1>}

        </div>
    );
};

export default Main;