import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/TestView.css'

class TestView extends Component {

constructor(props) {
    super(props)
    this.state.data = this.props.data
}


    state = {
            data: '{}',
            name: 'dupa'             
    }

    render() {
      
        return (
            <section id="testView" className="section">
                <nav>
                    <ul>
                        <li><Link to="/userTestList">Tests</Link></li>
                        <li><Link to="/">Log Out</Link></li>
                    </ul>
                </nav>
                <h1>{this.state.data.testName}</h1>
                <div id="questionary">

                    <div id="question_1">
                        {this.state.data.questionsList[0].questionContent}
                        <input type="text" size="300"></input>
                    </div>
                    <div id="question_2">
                        {this.state.data.questionsList[1].questionContent}
                        <select>
                            <option>Tak</option>
                            <option>Nie</option>
                        </select>         
                    </div>                   
                </div>
                <button>Submit</button>
            </section>

        )
    }
}

export default TestView;