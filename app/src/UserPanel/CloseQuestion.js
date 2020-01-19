import React, { Component } from 'react'
import CloseQuestionElement from './CloseQuestionElement'
import uuid from 'uuid';
import {Form,FormLabel} from "react-bootstrap";


class ClosedQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: {},
            answer: {},
            temp: [],
            flag: false
        }
        this.createAnswerPoles = this.createAnswerPoles.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
        this.dataFromChildHandler = this.dataFromChildHandler.bind(this)
        
    }

    async componentDidMount(){
        
        await this.setState(
            {
                question: this.props.question,
                answer: this.props.answer,
                flag: true 
            }
        )

        let arr = this.state.question.availableAnswers.map(answer => {return ({posAnswer: answer,
                                                                     isCorrect: false})})
       
        this.setState({temp: arr})
    }


    dataFromChildHandler(data){

        for (let i = 0 ; i < this.state.temp.length; i++){
            if (this.state.temp[i].posAnswer === data.avaiableAnswer) {
                this.state.temp[i].isCorrect = data.isAnswer;
            } 
        }
    }

    createAnswerPoles(){
        let poles = []
        
        poles = this.state.question.availableAnswers.map( avaiableAnswer => 
                <CloseQuestionElement key = {uuid()} avaiableAnswer={avaiableAnswer} handlerFromParent={this.dataFromChildHandler}/> )
       
        return(
        <label className="form-inline">{poles}</label>
        )
    }

    submitHandler(evt){
        evt.preventDefault();

        let arr = []
        for (let i = 0 ; i < this.state.temp.length; i ++) {
            if (this.state.temp[i].isCorrect === true) {
               arr.push(this.state.temp[i].posAnswer)
            }
        }
        let arr2 = arr.join("|")
        this.state.answer.answer = arr2;
  

        this.props.handlerFromParent(this.state.answer);
    }

    render(){
        return(
                             
             <form >
                 <label className="form-inline">
                    {this.state.question.questionContent}  
                 </label>
                <label className="form-inline">
                    {this.state.flag ? this.createAnswerPoles() : <p>Loading ...</p>}
                    <button onClick={this.submitHandler}>+</button>
                </label>   
                
                
            </form>
 
              
        )
    }
}

export default ClosedQuestion; 