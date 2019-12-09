import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../style/UserPanel.css'

class UserPanel extends Component {

    render() {
        return (
                <section id="userPanel" className="section">
                    <nav>
                        <ul>
                            <li><Link to="/userTestList">Tests</Link></li>
                            <li><Link to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                    <h1>Witaj na tescie rekrutacyjnym ; )</h1>
                </section>
            
        )
    }
}

export default UserPanel;