import React, { Component } from 'react'
import axios from 'axios'
import TestListPosition from './TestListPosition'
import "./style/UserTestList.css"

class UserTestList extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
            isDownloaded: false
        }

        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
         
        axios.get('https://wjdhyrfow4.execute-api.us-east-1.amazonaws.com/production/tests')
        .then(res => {
            let data = res.data;
            let data2 = JSON.parse(data);

            this.setState({data: data2})
        }).catch(function (error) {
            console.log(error)});
        this.setState({isDownloaded: true})
    }

    createTestList(){
        let arrLength = this.state.data.length     
        
        let TestList = this.state.data.map(test => 
            <TestListPosition key={test.TestID} test = {test}/>
        )
        
        return (
            <table>
                <thead>
                    <tr>
                        <td>Test Id</td>
                        <td>Recruiter Id</td>
                        <td>Status</td>
                        <td>Go to the test</td>
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
                <p><button onClick = {this.handleClick}>Download Test</button></p>
                <div>{this.state.isDownloaded ? this.createTestList():<p>Not updated</p>}</div>
            </div>
        )
    }
}

export default UserTestList