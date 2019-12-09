import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import '../style/UserTestList.css'
import TestView from './TestView';


class UserTestList extends Component {
    state = {
        testList: "[]",
        redirect: false,
        number: 0,
    }

    componentDidMount() {
        this.setState((state, props) => ({
            redirect: false,
            ref: null ,
            //test: this.props.testSend
            testList: [
                {
                    "recruiterID": "1223",
                    "TestID": "a15db44e-3dc7-4fd6-8bc2-4bb290d2c745",
                    "questionsList": [
                        {
                            "questionContent": "Opisz swoje doświadczenie z przetwarzaniem w chmurze",
                            "avaibleAnswers": "",
                            "QuestionID": "b4940adc-d5aa-4ddc-b3a7-39ae79f9a565",
                            "numberOfAvaibleAnswers": "0",
                            "type": "O",
                            "langugage": "PL"
                        },
                        {
                            "questionContent": "Czy ty lubisz przetwarzanie w chmurze",
                            "avaibleAnswers": "Tak|Nie",
                            "QuestionID": "fe2e85e0-4d07-4509-ada4-b72e1d86112c",
                            "numberOfAvaibleAnswers": "2",
                            "type": "W",
                            "langugage": "PL"
                        }
                    ],
                    "testName": "first test"
                },
                {
                    "recruiterID": "1223",
                    "TestID": "35d1e433-e34a-4ab3-8938-e269da15bb1f",
                    "questionsList": [
                        {
                            "questionContent": "Opisz swoje doświadczenie z przetwarzaniem w chmurze",
                            "avaibleAnswers": "",
                            "QuestionID": "9f7bc573-31ae-4c5c-8f4d-e694c8481960",
                            "numberOfAvaibleAnswers": "0",
                            "type": "O",
                            "langugage": "PL"
                        },
                        {
                            "questionContent": "Czy ty lubisz przetwarzanie w chmurze",
                            "avaibleAnswers": "Tak|Nie",
                            "QuestionID": "96980e0a-7f6f-4b7b-b718-0c3f5e54789c",
                            "numberOfAvaibleAnswers": "2",
                            "type": "W",
                            "langugage": "PL"
                        }
                    ],
                    "testName": "second test"
                },]
        }))
    }

    createTable = () => {
        let newTable = []
        let headers = ["Lp", "Nazwa testu", "Id Rekrutera", "Status", "Wynik", "Przejdz do testu"]
        let theadContent = []
        for (let i=0; i < headers.length ; i ++  ) {
        theadContent.push(<th>{headers[i]}</th>)
        }

        let message = "To be done !"
        let result = "-/10"

        let thead = []
        thead.push(<thead><tr>{theadContent}</tr></thead>);
        
        let tableRows = []

        for (let i = 0 ; i < this.state.testList.length; i++) {
            tableRows.push(<tr>
                    <td>
                        {i+1}
                    </td>
                    <td>
                        {this.state.testList[i].testName}
                    </td>
                    <td>
                        {this.state.testList[i].recruiterID}
                    </td>
                    <td>
                        {message}
                    </td>
                    <td>
                        {result}
                    </td>
                    <td>
                        <button type="button" onClick={() => {this.goToTest(i)}}>Start</button>
                    </td>
                </tr>)
        }
        let tbody = []
        tbody.push(<tbody>{tableRows}</tbody>)
        newTable.push(<table>{thead}{tbody}</table>)
        return newTable
    }

    // goToTest(testIndex) {
    //     console.log("Executed!")
    //     if (this.state.redirect === false ) {
    //         this.setState((state,testIndex) => {
    //             this.state.redirect = true;
    //             this.state.number = testIndex;
    //         }  )
    //         console.log("Done !")          
            
    //     }
    //     else {
    //         console.log("fake excaption")
    //     }

        
    // }

    // renderRedirect(){
    //     if(this.state.redirect === true){
    //         return <Redirect to='/testView'/>
    //     }
    // }

    goToTest(testIndex){
        this.setState({ref: '/testView',
                        number: testIndex})
    }


      

    render() {
        const {ref} = this.state
       
        if (ref === '/testView') return <TestView data={this.state.testList[this.state.number]}/>
        return (
            <section id="userTestList" className="section">
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/userTestList">Tests</Link></li>
                            <li><Link to="/">Log Out</Link></li>
                        </ul>
                    </nav>
                </div>

                <div>
                <h1> Tutaj widoczne sa twoje testy ! </h1>
                    <div id="userTests">
                        {this.createTable()}
                    </div>
                </div>
            </section>

        )
    }
}

export default UserTestList;