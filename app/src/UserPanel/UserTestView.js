import React, {Component} from 'react'
import axios from 'axios';
import {Container, Form, Spinner} from "react-bootstrap";
import OpenQuestion from './OpenQuestion'
import ClosedQuestion from './CloseQuestion'
import uuid from 'uuid';

class UserTestView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isSolved: false,
            answers: [],
            questions: [],
            flag: false,
            testView: true
        }
        this.handleData = this.handleData.bind(this);
        this.handleEndTest = this.handleEndTest.bind(this);
        //this.createTest = this.createTest.bind(this);
    }

    async componentDidMount() {
        await this.setState({
            data: this.props.location.state.data,
            flag: true
        });
    }

    createPoles() {
        let temp = this.state.data.questionsList

        // // mapowanie, zeby na 100% połączyc ze sobą pytanie z dobrą odpowiedzią
        for (let i = 0; i < temp.length; i++) {

            let obj_b = {
                index: i,
                question: temp[i]
            }

            let obj_a = {
                index: i,
                answer: [],
                isAnswered: false
            }

            this.state.questions.push(obj_b)
            this.state.answers.push(obj_a)
            this.state.testView = false;
        }
    }

    createTest() {
        if (this.state.testView) {
            this.createPoles();
        }
        let rendered = []

        rendered = this.state.questions.map(
            question => {
                if (question.question.type == "O" || question.question.type == "o") {
                    return <OpenQuestion key={uuid()} question={question.question}
                                         answer={this.state.answers[question.index]}
                                         handlerFromParent={this.handleData}/>
                } else {
                    return <ClosedQuestion key={uuid()} question={question.question}
                                           answer={this.state.answers[question.index]}
                                           handlerFromParent={this.handleData}/>
                }
            }
        )


        //answer={this.state.answers[question.index]}
        return (
            <Form.Group>
                {rendered}
            </Form.Group>
        )

    }

    handleData(data) {

        let new_answers = []
        for (let i = 0; i < this.state.answers.length; i++) {
            if (data.index === this.state.answers[i].index) {
                new_answers.push({index: data.index, answer: data.answer, isAnswered: true})
            } else {
                new_answers.push({
                    index: this.state.answers[i].index,
                    answer: this.state.answers[i].answer,
                    isAnswered: this.state.answers[i].isAnswered
                })
            }
        }
        this.setState({answers: new_answers})

    }

    allowEndTest() {

        let isDone = false
        for (let i = 0; i < this.state.answers.length; i++) {
            if (isDone == false && this.state.answers[i].isAnswered == true) {
                isDone = true;
            } else {
                isDone *= this.state.answers[i].isAnswered
            }
        }

        return isDone
    }

    async handleEndTest() {

        //let questionsList = this.state.answers.map(answer => {return answer.answer})

        let questionsList = this.state.answers.map(answer => {
            return answer.answer
        })
        let arr2 = questionsList.flat()
        console.log(arr2)

        await this.setState(
            {
                data: {
                    recruiterID: this.state.data.recruiterID,
                    result: this.state.data.result,
                    testName: this.state.data.testName,
                    questionsList: this.state.data.questionsList,
                    answersList: arr2,
                    userID: this.state.data.userID,
                    isSolved: true,
                    isChecked: this.state.data.isChecked,
                    isPassed: this.state.data.isPassed,
                }
            }
        )

        let data = JSON.stringify(this.state.data)
        console.log(data)

        try {
            await axios.post('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/modifycandidatetest', data);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    render() {
        return (
            <Container>
                <h1>Podgląd testu: {this.state.data.testName}</h1>
                {this.state.flag ? this.createTest() :<Spinner animation="border"/>}

                {this.allowEndTest() ? <button onClick={this.handleEndTest}>Zakoncz</button> :
                    <p>Proszę, zatwierdź odpowiedzi</p>}
            </Container>
        )
    }
}

export default UserTestView

