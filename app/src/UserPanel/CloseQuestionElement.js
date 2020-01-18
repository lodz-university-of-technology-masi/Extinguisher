import React, { Component } from 'react'

class CloseQuestionElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: "",
            checked: false
        }
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    }

    componentDidMount(){
        this.setState({answer: this.props.answer.avaiableAnswer,
                            checked: this.props.answer.isAnswer})
    }


    handleCheckBoxChange(event) {
        this.setState({checked: event.target.value});
     
        let obj = {
           avaiableAnswer: this.state.answer,
            isAnswer: !this.state.checked
        } 
        
       this.props.handlerFromParent(obj)      
    }

 

    render(){
        return(
            <label>
                {this.state.answer}
                <input type="checkbox" value={this.state.checked}  onChange={this.handleCheckBoxChange}/>
            </label>
        )
    }
}

export default CloseQuestionElement