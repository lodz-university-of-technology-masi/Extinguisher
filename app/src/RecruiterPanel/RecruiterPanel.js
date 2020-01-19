import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



class RecruiterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    onClickHandler() {
        console.log("Dupa")
    }

    render(){
        return(
            <div>
                <h1>Witaj Rekruterze</h1>
                 <ul>
                    <li><Link to="/recruiterPlankTestList">Zarządzaj testami</Link></li>
                    <li><Link to="/recruiterAssignedTestList">Zarządzaj testami kandydatów</Link></li>       
                </ul> 
     
            </div>
        )
    }

}

export default RecruiterPanel


