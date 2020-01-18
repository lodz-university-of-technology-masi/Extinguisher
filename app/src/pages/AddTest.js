import React, {Component} from 'react';
import '../style/AddTest.css'
import axios from 'axios';
import AddQuestion from "./AddQuestion.js"
import QuestionsView from "./QuestionsView.js"
import {Button, Container, FormControl, FormLabel} from "react-bootstrap";
import {AppContext} from "../context/AppContext";
import * as api from '../api/Api'


class AddTest extends Component {
    static contextType = AppContext;
    state = {
        testName: "",
        questionsList: []
    };
    messages = {
        type_incorect: 'Question type have not been chosen',
        question_incorect: 'Your question has not any letter',
    };

    handleQuestionSubmit = (question) => {
        let arr = this.state.questionsList;
        arr.push(question);
        this.setState({
            questionsList: arr
        })
    }
    handleSendRequest = () => {
        const {userp, auth} = this.context;
        const [user, setUser] = userp;
        let data = {
            recruiterID: user.username,
            testName: this.state.testName,
            questionsList: this.state.questionsList,
            answersList: [],
            userID: "-",
            isSolved: "false",
            isChecked: "false",
            isPassed: "false",
            result: "-1"
        }


        let data2 = JSON.stringify(data)
        console.log(data2)
        axios.post('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/newposttest', data2)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    render() {
        const {testName} = this.state;
        return (
            <Container>
                <FormLabel>Test Name:</FormLabel>
                <FormControl type="text" placeholder="Test Name" value={testName} onChange={(event) => {
                    this.setState({testName: event.target.value})
                }}
                />
                <AddQuestion handleQuestionSubmit={this.handleQuestionSubmit}/>
                <QuestionsView
                    questionArray={this.state.questionsList}
                    handleDeleteQuestion={this.handleDeleteQuestion}
                />
                <Button variant="primary" onClick={this.handleSendRequest}> Create Test</Button>

            </Container>
        );
    }
}

export default AddTest;