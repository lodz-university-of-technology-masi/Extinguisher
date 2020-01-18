import React, { Component } from 'react'
import axios from 'axios';

import OpenQuestion from './OpenQuestion'
import ClosedQuestion from './CloseQuestion'
import uuid from 'uuid';

class UserTestView extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            isSolved: false,
            answers: [],
            questions: [],
            flag: false,
            testView: true
        }
        this.handleData = this.handleData.bind(this);
        //this.createTest = this.createTest.bind(this);
    }

    async componentDidMount(){
        await this.setState({data: this.props.location.state.data,
                                flag: true });
    }

    createPoles() {
        let temp = this.state.data.questionsList
        
        // // mapowanie, zeby na 100% połączyc ze sobą pytanie z dobrą odpowiedzią
        for (let i = 0 ; i < temp.length; i++) {

            let obj_b = {
                index: i,
                question: temp[i]
            }

            let obj_a = {
                index: i,
                answer: []
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
                         return <OpenQuestion key={uuid()} question={question.question} answer={this.state.answers[question.index]} handlerFromParent = {this.handleData}/>
                    } else {
                         return <ClosedQuestion key={uuid()} question={question.question} answer={this.state.answers[question.index]} handlerFromParent = {this.handleData}/>
                    }
                }
            )
       
        
        
        //answer={this.state.answers[question.index]}
        return (
            <div>
                {rendered}
            </div>
        )
        
    }

    handleData(data) {
       // console.log(data)
       //this.setState({testView: false})
        let new_answers = []
        for (let i = 0 ; i < this.state.answers.length; i++) {
            if (data.index === this.state.answers[i].index) {
                new_answers.push({index: data.index, answer: data.answer})
                console.log("raz",new_answers)
            } else {
                new_answers.push({index: this.state.answers[i].index, answer: this.state.answers[i].answer})
                console.log("dwa",new_answers)
            }
        }     

        console.log("trze",new_answers)
        this.setState({answers: new_answers})
          
    }
    
    render(){
        return(
            <div>
                <h1>Podgląd testu</h1>
                {this.state.flag ? this.createTest() : <p>Not updated ...</p>}

                {/* {this.state.isSolved ? <button onClick={this.handleEndTest}>Close Your Test</button> : <button onClick={this.handleTestView}>Start Test</button>}
                <div>{this.state.isSolved ? this.createTest() : null}</div> */}
            </div>
        )
    }
}

export default UserTestView

