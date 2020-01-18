import React, {Component} from 'react';
import '../style/AddQuestion.css'

class AddQuestion extends Component {
    state = {
        question: "",
        numbers: [2, 3, 4, 5, 6],
        numberOfAvaibleAnswers: 4,
        isOpen: true,
        answers: [],
        ifAnswersAreCorrect: [false, false, false, false, false, false, false],
        errors: {
            question: false,
            type: false,
        },
    };

  handleSwitchOpenQuestion = () => {
        this.setState({
            isOpen: true
        })

    };
    handleSwitchClosedQuestion = () => {
        this.setState({
            isOpen: false
        })
    };
    renderSwitchButton = () => {
        return (
            <div className="row">
                <button
                    className={this.state.isOpen ? "btn btn-primary disabled" : "btn btn-primary"}
                    onClick={this.handleSwitchOpenQuestion}>Open
                </button>
                <button
                    className={(this.state.isOpen) ? "btn btn-primary disabled" : "btn btn-primary"}
                    onClick={this.handleSwitchClosedQuestion}>Closed
                </button>
            </div>
        );
    };
    handleChange = (e) => {
        let index = e.target.name - 10;
        let arr = this.state.answers;
        arr[index] = e.target.value;
        this.setState({
            answers: arr
        })
    };
    handleChangeName = (e) => {
        const name = e.target.id;
        this.setState({
            [name]: e.target.value
        })
    };
    toggleChange = (e) => {
        let index = e.target.name - 20;
        let arr = this.state.ifAnswersAreCorrect;
        arr[index] = e.target.checked;
        this.setState({
            ifAnswersAreCorrect: arr
        });
    }
    handleOpenQuestionSubmit = () => {
        var numberOfAvaibleAnswers = 0;
        var avaibleAnswers = []
        var questionObj = {
            type: "O",
            language: "PL",
            questionContent: this.state.question,
            availableAnswers: avaibleAnswers,
            correctAnswers: []
        }

        this.props.handleQuestionSubmit(questionObj);
    }


  

    handleClosedQuestionSubmit = () => {
        let numberOfAvaibleAnswers = this.state.numberOfAvaibleAnswers;
        let avaibleAnswers = [];
        let correctAnswers = [];
        let isCorrect = "";
        for (let i = 0; i < this.state.numberOfAvaibleAnswers; i++) {
            avaibleAnswers.push(this.state.answers[i])
            if (this.state.ifAnswersAreCorrect[i] ){
                correctAnswers.push(this.state.answers[i])
            }
        }

        var questionObj = {
            type: "W",
            language: "PL",
            questionContent: this.state.question,
            availableAnswers: avaibleAnswers,
            correctAnswers: correctAnswers
        }
        //console.log(questionObj);

        this.props.handleQuestionSubmit(questionObj);
    }
    renderOpenQuestion = () => {
        return (
            <div>
                <label htmlFor="question">Answer:</label>
                <input className="form-control mb-4"
                       name="openAnswer"/>
                <div className="row mt-4">
                    <button onClick={this.handleOpenQuestionSubmit} type="submit" className="btn btn-primary">
                        Add question to test
                    </button>
                </div>
            </div>

        );
    };
    renderClosedQuestion = () => {
        var rows = [];
        for (var i = 0; i < this.state.numberOfAvaibleAnswers; i++) {

            rows.push(<div key={i + "rowID"} htmlFor={'question' + i}>{'Question number: ' + (i + 1)}
                <input id={'answer' + i} name={10 + i} type="text" onChange={this.handleChange}
                       value={this.state[i + 2]}/>
                <input id={'isCorrect' + i} name={20 + i} type='checkbox' onChange={this.toggleChange}
                       value={this.state[i + 8]}></input>
            </div>);
        }
        return (
            <div>
                <select id='numberOfAvaibleAnswers' name='numberOfAvaibleAnswers' defaultValue='4' onChange={() => {
                    this.setState({numberOfAvaibleAnswers: document.getElementById('numberOfAvaibleAnswers').value})
                }}>
                    {this.state.numbers.map((number) => <option key={number} id={number} name={number}
                                                                value={number}>{number}</option>)}
                </select>
                <div>
                    {rows}
                </div>
                <button onClick={this.handleClosedQuestionSubmit}>Add</button>
            </div>
        );
    };

    render() {
        return (
            <>
                <div className="card border container mt-5">
                    <header className="card-body row justify-content-center">
                        <h className="font-weight-bold mb-3">Add New Question</h>
                    </header>
                    {this.renderSwitchButton()}
                    <div className="card-body">
                        <label htmlFor="question">Question:
                            <input type="question" id="question" name="question" value={this.state.question}
                                   onChange={this.handleChangeName}/>
                        </label>
                        {this.state.isOpen ? this.renderOpenQuestion() : this.renderClosedQuestion()}
                    </div>
                </div>
            </>
        );
    }
}

export default AddQuestion