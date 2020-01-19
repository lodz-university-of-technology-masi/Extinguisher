import React, { Component } from 'react'
import { EC2MetadataCredentials } from 'aws-sdk';

class OpenQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: {},
            answer: {}
        }

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState(
            {
                question: this.props.question,
                answer: this.props.answer
            }
        )
    }

    async handleChange(event){
        let ans = await event.target.value
        this.setState(
            prevState => (
                {
                    answer: {
                        index: prevState.answer.index,
                        answer: [ans],
                        isisAnswered: true
                    }
                }
            )   
        )

        
    }

    handleSubmit(evt) {
        evt.preventDefault();
        let obj = this.state.answer;
        this.props.handlerFromParent(obj);
       
    }

    render(){
        return(
            <div>
                <p>{this.state.question.questionContent}</p>
                <form>
                    <input type="text" placeholder={this.state.answer.answer}  onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}> + </button>        
                </form> 
              
            </div>
        )
    }
}

export default OpenQuestion