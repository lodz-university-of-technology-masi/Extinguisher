import React, { Component } from 'react'
import axios from 'axios'
import RecruiterPlankTestListPosition from './RecruiterPlankTestListPosition'
import uuid from 'react-uuid'

class RecruiterPlankTestList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            users: [],
            isDownloaded: false,
        }
     
    }

    async componentDidMount() {
        try {
            let users = await axios.get(' https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/users');
            this.setState({users: users.data.userArray})
        } catch(error) {
            console.log("error: ", error);
        }

        try {
            let data = await axios.get('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/getalltemplatetests');
            this.setState({data: data.data.testArray})
        } catch(error) {
            console.log("error: ", error);
        }
    }

    createTestList(){
        let arrLength = this.state.data.length     
        
        let TestList = this.state.data.map(test => 
            <RecruiterPlankTestListPosition key={uuid()} test = {test} users = {this.state.users} minPoints={0}
                        maxPoints = {10} /> )
        
        return (
            <table>
                <thead>
                    <tr>
                        <td>Nazwa Testu</td>
                        <td>Identyfikator Rekrutera</td>
                        <td>Modyfikuj</td>
                        <td>Przypisz test</td>
                        <td></td>
                    </tr>
                </thead>
                
                <tbody>
                    {TestList}
                </tbody>               
            </table>
        )
    }

    render(){
        return(
            <div>
                <h1>Lista wszystkich utworzinych testów</h1>

                <div>
                   {this.createTestList()}
                </div>
            </div>
        )
    }
}

export  default RecruiterPlankTestList;