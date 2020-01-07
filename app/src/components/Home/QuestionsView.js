import React, { Component } from 'react';
import '../style/QuestionsView.css'


class QuestionsView extends Component{

    constructor(props){
        super(props)
        this.state={
        }
    }
  

    createButtonList(){
        var questionList=[];
        
        for(let i=0; i<this.props.questionArray.length; i++)
        {
            let type;
            console.log(this.props.questionArray)
            if(this.props.questionArray[i].type=="W") type="Closed Question with " + this.props.questionArray[i].numberOfAvaibleAnswers +" answers"
            else
            type="Open Question"
        questionList.push(<li  key ={i+"questionNumber"}> {this.props.questionArray[i].questionContent} {type}
        <button  onClick={()=>this.props.handleDeleteQuestion(i)}>Delete</button>
        </li>)
        }
        return questionList
    
}
    render(){
    return <div>
        {this.createButtonList()}
    </div>
}
}
export default   QuestionsView;