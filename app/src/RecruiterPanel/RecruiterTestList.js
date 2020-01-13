import React, { Component } from 'react'
import axios from 'axios'
import RecTestListPosition from './RecTestListPosition'

class RecruiterTestList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isDownloaded: false,
            recruiterId: "",
            answersToTestTest:     {
                "TestID": "2664ac15-01de-48e9-b8dd-e76de3c592db",
                "TestAnswerID": "eb65179e-e304-4de0-badd-ef314c9b0547",
                "CandidateID": "442123",
                "answersList": [
                    {
                        "questionID": "94e39ea7-0e0f-414f-882d-1a577308093a",
                        "answerContent": "Przetwarzanie w chmurze jest dla mnie najlepsze"
                    },
                    {
                        "questionID": "f812ed5a-5e86-4fbb-a633-34b933e4c0f5",
                        "answerContent": "Tak"
                    }
                ]
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    // Pobieranie wszystkich testow
    handleClick() {
        // Get Testow / Get Odpowiedzi
        axios.get('https://d1yalzslbd.execute-api.us-east-1.amazonaws.com/prod/tests')
        //axios.get('https://qx7qoru7xa.execute-api.us-east-1.amazonaws.com/prod2/answers')
        .then(res => {
            let data = res.data;            
            let data2 = JSON.parse(data.body);
            //console.log(data2)
            this.setState({data: data2})
        }).catch(function (error) {
            console.log(error)});
        this.setState({isDownloaded: true});
    }

    createTestList(){
        let arrLength = this.state.data.length     
        
        let TestList = this.state.data.map(test => 
            <RecTestListPosition key={test.TestID} test = {test} minPoints={0}
                        maxPoints = {10} />
        )
        
        return (
            <table>
                <thead>
                    <tr>
                        <td>Test Name</td>
                        <td>Recruiter Id</td>
                        <td>Candidate Id</td>
                        <td>Result</td>
                        <td>Check Test</td>
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
                <p>
                    <button onClick={this.handleClick}>Pobierz testy</button>
                </p>
                <div>
                    {this.state.isDownloaded ? this.createTestList() : <p>Not updated ...</p>}
                </div>
            </div>
        )
    }
}

export  default RecruiterTestList;