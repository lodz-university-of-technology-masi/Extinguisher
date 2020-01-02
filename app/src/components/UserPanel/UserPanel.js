import React, {Component} from "react"
import {Link} from 'react-router-dom'

class UserPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "Test User !"
        }
    }

    // componentDidMount(){
    //     this.setState({userName: {}})
    // }

    render(){
        return(
            <div>
                <h1>Witaj </h1>
                <ul>
                    <li><Link to="/userTestList">Tests</Link></li>       
                </ul>
            </div>
        )
    }
}

export default UserPanel