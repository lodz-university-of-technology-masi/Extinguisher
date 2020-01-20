import React, {Component} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import * as uuid from "uuid";
import Rend from "./Rend";

class AddClosedQuestion extends Component {
    state = {
        questionContent: "",
        availableAnswers: [],
        correctAnswers: [],
        number: 2,
        answers: [{
            answer: "",
            isCorrect: false
        }, {
            answer: "",
            isCorrect: false
        }],
        canLoad: true
    }

    setIQuestion = (id, answer, isCorrect) => {
        let answers = this.state.answers;
        console.log(id, answer, isCorrect)

        answers[id] = {
            answer: answer,
            isCorrect: isCorrect
        }
        console.log(answers)
        this.setState({answers: answers})
    }
    //it looks bad
    renderClosed = () => {
        const {number, answers} = this.state;
        let arr = answers;
        let idd = 0;
        arr = arr.map(answer => <Rend id={idd++} onSub={this.setIQuestion} answer={answer.answer}
                                      isCorrect={answer.isCorrect}/>)
        if (this.state.canLoad) {
            this.setState({canLoad: false});
        }

        return arr;
    }
    handleAdd = () => {
        let answers = this.state.answers;
        answers.push({
            answer: "",
            isCorrect: false
        })
        this.setState({answers: answers, canLoad: true})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {questionContent, correctAnswers} = this.state;
        console.log(this.state.answers)
        console.log("!!!", this.state.answers.filter(answer => answer.isCorrect === true).map(answer => answer.answer));
        if (questionContent.length < 2 && correctAnswers.length < 1) {
            this.setState({alert: true})
        } else {
            const questionObj = {
                type: "W",
                language: "PL",
                questionContent: questionContent,
                availableAnswers: this.state.answers.map(answer => answer.answer),
                correctAnswers: this.state.answers.filter(answer => answer.isCorrect === true).map(answer => answer.answer)
            }
            this.props.handleQuestionSubmit(questionObj);
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={e => {
                            this.setState({questionContent: e.target.value})
                        }}
                        placeholder="Write a question..."/>
                    <Form.Label>Answers</Form.Label>
                    {this.renderClosed()}
                    <Button variant="info" onClick={this.handleAdd}>Add Answer</Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {this.state.alert && <Alert variant="danger">Edit data</Alert>}

                </Form>
            </div>
        );
    }
}

export default AddClosedQuestion;