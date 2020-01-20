import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'react-uuid'
import axios from 'axios'
import { ButtonToolbar, Dropdown } from 'react-bootstrap';

class RecruiterPlankTestListPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            users: [],
            user: ""
        }
        this.selectChanged = this.selectChanged.bind(this)
        this.assignUser = this.assignUser.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentDidMount() {

        this.setState({
            data: this.props.test,
            users: this.props.users
        })

    }

    async assignUser(){


        await this.setState(
            {
                data: {
                    recruiterID: this.state.data.recruiterID,
                    result: this.state.data.result,
                    testName: this.state.data.testName,
                    questionsList: this.state.data.questionsList,
                    answersList: [],
                    userID: "-",
                    isSolved: false,
                    isChecked: this.state.data.isChecked,
                    isPassed: this.state.data.isPassed,
                }
            }
        )
        let arr = []
        arr.push(this.state.user)
        let test =this.state.data
        let input = {test,candidates: arr }

        console.log(input)

        let data = JSON.stringify(input)
        console.log(data)

        
        try {
            await axios.post('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/signcandidate', data);
        } catch(error) {
            console.log("error: ", error);
        }

        
    }

    delete(){
        let name = this.state.data.testName
        console.log(name)



            try {
                axios.delete('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/deletesttemplatewithout'+'?testName='+name);
            } catch(error) {
                console.log("error: ", error);
            } 

    }

    selectChanged(event) {
        let user = event.target.value
        console.log(user)
        this.setState({user: user})
    }

    createCandidatesList(){
        
        let dropDownElements = []
        dropDownElements = this.state.users.map(user => <option key={uuid()} value={user.userName}>{user.userName}</option> )
        return dropDownElements
    }

    render(){
        return(
            <tr>
                <td>
                    {this.state.data.testName}
                </td>
                <td>
                    {this.state.data.recruiterID}
                </td>            
                <td>
                <Link to={{
                    pathname: '/recruiterPlankTestView',
                    state: {
                        data: this.state.data
                        }
                }}>Modyfikuj test</Link>
                </td>
                <td>
                    <button onClick={this.delete}>X</button>
                </td>
                <td>
                    <select onChange={this.selectChanged}>
                        {this.createCandidatesList()}
                    </select>
                </td>
                <td>
                    <button onClick={this.assignUser}>
                        => X
                    </button>
                </td>
            </tr>
        )
    }
}

export default RecruiterPlankTestListPosition;


{/* <Dropdown>
<Dropdown.Toggle>
        Wybierz Kandydata do przypisania
    </Dropdown.Toggle>

    <Dropdown.Menu>
        {this.createCandidatesList()}
    </Dropdown.Menu>
</Dropdown> */}

{/* <Dropdown.Item key = {user.userName} >{user.userName}</Dropdown.Item> */}