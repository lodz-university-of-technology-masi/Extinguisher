import React, { Component } from 'react'
import CloseQuestionElement from './CloseQuestionElement'

class ClosedQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            avaibleAnswers: [],
            answersNumber: 0,
            givenAnswer: [],            
        }
        this.createAnswerPoles = this.createAnswerPoles.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
        this.dataFromChildHandler = this.dataFromChildHandler.bind(this)
        
    }

    componentDidMount(){
        let avaibleAnswers = this.props.item.avaibleAnswers.split("|");
        let ans = []
        
        for (let i = 0 ; i < avaibleAnswers.length ; i ++ ) {
           ans = [...ans,{avaibleAnswer: avaibleAnswers[i], isAnswer: false}]
        }

        this.setState({
            data: this.props.item,
            questionID: this.props.item.QuestionID,
            avaibleAnswers: ans,         
            answersNumber: this.props.item.numberOfAvaibleAnswers
                    })
        
    }


    dataFromChildHandler(data){
        let obj = []
        for (let i = 0 ; i < this.state.avaibleAnswers.length ; i ++ ) {
            if(data.avaibleAnswer == this.state.avaibleAnswers[i].avaibleAnswer){
                obj = [...obj,{avaibleAnswer: this.state.avaibleAnswers[i].avaibleAnswer, isAnswer: data.isAnswer}]
            } else {
                obj = [...obj,{avaibleAnswer: this.state.avaibleAnswers[i].avaibleAnswer, isAnswer: this.state.avaibleAnswers[i].isAnswer}]
            }
         }
         console.log(obj)
         this.setState({avaibleAnswers: obj})
    }

    createAnswerPoles(){
        let poles = []
        let key = 0;
 
        poles = this.state.avaibleAnswers.map(( answer , key) => 
            <CloseQuestionElement key = {key+1} answer={answer} handlerFromParent={this.dataFromChildHandler}/> 
        )
        
        return(
        <p>{poles}</p>
        )
    }

    submitHandler(evt){
        evt.preventDefault();
        let finalAnswer = ""
        let collectAnswers = []
        for (let i = 0; i < this.state.avaibleAnswers.length; i++) {
            if(this.state.avaibleAnswers[i].isAnswer){
                collectAnswers.push(this.state.avaibleAnswers[i].avaibleAnswer)
            }
        }
        finalAnswer = collectAnswers.join("|")
        console.log(finalAnswer)
        let obj = {
            questionID: this.state.questionID,
            answerContent: finalAnswer
        }
        this.props.handlerFromParant(obj);
    }

    render(){
        return(
            <div>
                <p>{this.state.data.questionContent}</p>
                <form onSubmit={this.submitHandler}>                
                    {this.createAnswerPoles()}
                    <input type="submit"/>
                </form>   
                
            </div>
            
        )
    }
}

export default ClosedQuestion; 