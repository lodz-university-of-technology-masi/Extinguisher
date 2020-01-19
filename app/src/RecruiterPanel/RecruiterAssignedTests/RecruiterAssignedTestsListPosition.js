import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'react-uuid'
import { ButtonToolbar, Dropdown } from 'react-bootstrap';

class RecruiterAssignedTestListPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            questionsNumber: 0
        }
    }

    async componentDidMount() {
        await this.setState({
            data: this.props.test
        })
        let liczba = this.state.data.questionsList.length
        this.setState({
            questionsNumber: liczba
        })
    }

    countMaxResult(){
        let a =  this.state.questionsNumber
        let points = 2
        return a * points
    }

    setStatus(){
        if (this.state.data.isChecked && this.state.data.isPassed) {
            return (<p>Test zdany !</p>)
        } else if (this.state.data.isChecked && !this.state.data.isPassed) {
            return (<p>Test nie zdany !</p>)
        } else if (!this.state.data.isChecked && this.state.data.isSolved) {
            return(<p>Oczekuje na sprawdzenie</p>)
        } else if (!this.state.data.isSolved) {
            return (<p>Test nie został jeszcze rozwiązany</p>)
        }
    }

    render(){
        return(
            <tr>
                <td>
                    {this.state.data.testName}
                </td>
                <td>
                    {this.state.data.userID}
                </td>
                <td>
                  {this.state.data.result} / {this.countMaxResult()}
                </td>
                <td>
                  {this.setStatus()}
                </td>
                <td>
                <Link to={{
                    pathname: '/recruiterCheckTestView',
                    state: {
                        data: this.state.data
                        }
                }}>Sprawdz test</Link>
                </td>               
            
            </tr>
        )
    }
}

export default RecruiterAssignedTestListPosition;
