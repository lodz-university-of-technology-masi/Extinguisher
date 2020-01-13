import React,{Component} from 'react'
import {Link} from 'react-router-dom'



class RecruiterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <h1>Witaj Rekruterze</h1>
                <ul>
                    <li><Link to="/recruiterTestList">Tests</Link></li>       
                </ul>
            </div>
        )
    }

}

export default RecruiterPanel