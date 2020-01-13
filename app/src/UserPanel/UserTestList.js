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
            userId: ""
        }

        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
         
        //axios.get('https://wjdhyrfow4.execute-api.us-east-1.amazonaws.com/production/tests')
        axios.get('https://d1yalzslbd.execute-api.us-east-1.amazonaws.com/prod/tests')
        .then(res => {
            let data = res.data;
            // console.log(data.body)
            let data2 = JSON.parse(data.body);
            // console.log(data2)
            this.setState({data: data2})
        }).catch(function (error) {
            console.log(error)});
        this.setState({isDownloaded: true})
        // funkcja mapujaca po user id ?
        // ew lambda powinna to robic
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
                        <td>Test Name</td>
                        <td>Recruiter Id</td>
                        <td>Status</td>
                        <td>Go to the test</td>
    nie                 </tr>
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