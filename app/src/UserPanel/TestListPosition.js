import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./style/TestListPosition.css"

class TestListPosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    async componentDidMount() {
        await this.setState(
            {
                data: this.props.test
            }
        )

        //console.log("Moj data to przeslania",this.state.data)
        
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
                    {this.setStatus()}
                </td>
                <td>
                    {this.state.data.result} / {this.countMaxResult()}
                </td>
                <td>
                <Link to={{
                    pathname: '/userTestView',
                    state: {
                        data: this.state.data
                    }
                }}>Open Test</Link>
                </td>
            </tr>
        )
    }
}

export  default TestListPosition