import React, { Component } from 'react'
import axios from 'axios'
import RecruiterAssignedTestListPosition from './RecruiterAssignedTestsListPosition'
import uuid from 'react-uuid'

class RecruiterAssignedTestList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isDownloaded: false,
        }
     
    }

    async componentDidMount() {

        try {
            let data = await axios.get('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/getallcandidatestests');
            //console.log(data.data.testArray)
            this.setState({data: data.data.testArray})
        } catch(error) {
            console.log("error: ", error);
        }

        this.setState({isDownloaded: true})
    }

    createTestList(){
        let arrLength = this.state.data.length     
        
        let TestList = this.state.data.map(test => 
            <RecruiterAssignedTestListPosition key={uuid()} test = {test}/> )

        console.log(TestList)

        return (
            <div>
            <table>
                <thead>
                    <tr>
                        <td>Nazwa Testu</td>
                        <td>Identyfikator Kandydata</td>
                        <td>Wynik</td>
                        <td>Status</td>
                        <td>Sprawdz</td>
                    </tr>
                </thead>
                
                <tbody>
                   {TestList}
                </tbody>               
            </table>
            </div>
        )
    }

    render(){
        return(
            <div>
                <h1>Lista testów wszystkich kandydatów</h1>                
            
                
            </div>
        )
    }
}

export  default RecruiterAssignedTestList;