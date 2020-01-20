import React, {Component} from 'react';
import {Alert, Button, Form} from "react-bootstrap";

class AddOpenQuestion extends Component {
    state = {
        language: "PL",
        questionContent: "",
        answer: "",
        alert: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {questionContent, answer} = this.state;
        if (questionContent.length < 2 && answer.length < 1) {
            this.setState({alert: true})
        } else {
            const ans = [];
            ans.push(answer);
            const questionObj = {
                type: "O",
                language: "PL",
                questionContent: this.state.questionContent,
                availableAnswers: ans,
                correctAnswers: []
            }
            console.log(questionObj)
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
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="..."
                        onChange={e => {
                            this.setState({answer: e.target.value})
                        }}/>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {this.state.alert && <Alert variant="danger">Edit data</Alert>}

                </Form>
            </div>
        );
    }
}

export default AddOpenQuestion;