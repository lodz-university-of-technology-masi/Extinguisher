import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'react-uuid'
import { ButtonToolbar, Dropdown } from 'react-bootstrap';

class RecruiterAssignedTestListPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {

        this.setState({
            data: this.props.test
        })
    }

    countMaxResult(){
        let a = this.state.data.questionsList.length
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
                   ddd {/* {this.state.data.result} / {this.countMaxResult()} */}
                </td>
                <td>
                  ccc  {/* {this.setStatus()} */}
                </td>
                <td>
                    Wywołanie przejscia do okna sprawdzania
                </td>               
            
            </tr>
        )
    }
}

export default RecruiterAssignedTestListPosition;
