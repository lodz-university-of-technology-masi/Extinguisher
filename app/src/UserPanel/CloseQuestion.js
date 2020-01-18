import React, { Component } from 'react'
import CloseQuestionElement from './CloseQuestionElement'
import uuid from 'uuid';

class ClosedQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: {},
            answer: {}
        }
        this.createAnswerPoles = this.createAnswerPoles.bind(this);
        this.submitHandler = this.submitHandler.bind(this)
        this.dataFromChildHandler = this.dataFromChildHandler.bind(this)
        
    }

    componentDidMount(){
        
        

        // let avaiableAnswers = this.props.item.availableAnswers;
        // console.log(avaiableAnswers)
        // let ans = []
        
        // for (let i = 0 ; i <avaiableAnswers.length ; i ++ ) {
        //    ans = [...ans,{avaiableAnswer: avaiableAnswers[i], isAnswer: false}]
        // }
        // console.log(ans)
        // this.setState({
        //     data: this.props.item,
        //     avaiableAnswers: ans
        //             })
        // // console.log(this.state)
    }


    dataFromChildHandler(data){
        // let obj = []
    
        // for (let i = 0 ; i < this.state.avaiableAnswers.length; i++){
        //     if(data.avaiableAnswer == this.state.avaiableAnswers[i].avaiableAnswer){
        //         obj = [...obj,{avaiableAnswer: this.state.avaiableAnswers[i].avaiableAnswer, isAnswer: data.isAnswer}]
        //     } else {
        //         obj = [...obj,{avaiableAnswer: this.state.avaiableAnswers[i].avaiableAnswer, isAnswer: this.state.avaiableAnswers[i].isAnswer}]
        //     }
        // }
        // this.setState({avaiableAnswers: obj})
    }

    createAnswerPoles(){
        // let poles = []
        // console.log("create ", this.state.avaiableAnswers)
        // poles = this.state.avaiableAnswers.map(answer => 
        //     <CloseQuestionElement key = {uuid()} answer={answer} handlerFromParent={this.dataFromChildHandler}/> 
        // )
        // return(
        // <p>{poles}</p>
        //)
    }

    submitHandler(evt){
        // evt.preventDefault();

        // // let finalAnswer = ""
        // let collectAnswers = []
        // for (let i = 0; i < this.state.avaiableAnswers.length; i++) {
        //     if(this.state.avaiableAnswers[i].isAnswer){
        //         collectAnswers.push(this.state.avaiableAnswers[i].avaiableAnswer)
        //     }
        // }
        // // finalAnswer = collectAnswers.join("|")
        // //console.log(finalAnswer)
        // let obj = {
        //     //questionID: this.state.questionID,
        //     answerContent: collectAnswers
        // }
        // this.props.handlerFromParant(obj);
    }

    render(){
        return(
            <div>
                {/* <p>{this.state.data.questionContent}</p>
                <form onSubmit={this.submitHandler}>                
                    {this.createAnswerPoles()}
                    <input type="submit"/>
                </form>    */}
                
            </div>
            
        )
    }
}

export default ClosedQuestion; 