import React, { Component } from 'react'

class CloseQuestionElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avaiableAnswer: "",
            checked: true
        }
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    }

    componentDidMount(){
        this.setState({avaiableAnswer: this.props.avaiableAnswer})
    }

    handleCheckBoxChange(event) {
        
        this.setState({checked: !this.state.checked});
     
        let obj = {
           avaiableAnswer: this.state.avaiableAnswer,
           isAnswer: this.state.checked
        } 

       this.props.handlerFromParent(obj)      
    }

 

    render(){
        return(
            <label>
                {this.state.avaiableAnswer}
                <input type="checkbox" value={this.state.checked}  onChange={this.handleCheckBoxChange}/>
            </label>
        )
    }
}

export default CloseQuestionElement