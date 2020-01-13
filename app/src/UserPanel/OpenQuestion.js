import React, { Component } from 'react'

class OpenQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            QuestionID: "",
            question: "",
            answer: ""
        }

       this.handleChange = this.handleChange.bind(this);
       this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount(){
        this.setState({
            QuestionID: this.props.item.QuestionID,
            question: this.props.item.questionContent
        })

    }

    handleChange(event){
        this.setState({answer: event.target.value})
    }

    // nazwy do zmiany bo sa tragiczne !
    submitHandler(evt){
        evt.preventDefault();
        let obj = {
            questionID: this.state.QuestionID,
            answerContent: this.state.answer
        }
        this.props.handlerFromParant(obj);
    }

    render(){
        return(
            <div>
                <p>{this.state.question}</p>
                <form onSubmit={this.submitHandler}>
                    <input type="text" onChange={this.handleChange}/>
                    <input type="submit"/>                       
                </form> 
            </div>
        )
    }
}

export default OpenQuestion