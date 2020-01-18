import React, { Component } from 'react'
import axios from 'axios'
import TestListPosition from './TestListPosition'
import "./style/UserTestList.css"

class UserTestList extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
            isDownloaded: false,
            userId: "YoLepiejDamp"
        }

      
    }
    
    async componentDidMount() {

        try {
            let data = await axios.get('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/getcandidatestestsbyuserid'+'?userID='+this.state.userId);
            this.setState({data: data.data.testArray})
        } catch(error) {
            console.log("error: ", error);
        }

        this.setState({isDownloaded: true})
    }

    createTestList(){
        let arrLength = this.state.data.length     
        
        let TestList = this.state.data.map(test => 
            <TestListPosition key={test.testID} test = {test}/>
        )
        
        return (
            <table>
                <thead>
                    <tr>
                        <td>Nazwa Test</td>
                        <td>Status</td> 
                        <td>Wynik</td>
                        <td>Rozwiaz test</td>
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
                <h1>List testow !</h1>
                <div>{this.state.isDownloaded ? this.createTestList():<p>Not updated</p>}</div>
            </div>
        )
    }
}

export default UserTestList