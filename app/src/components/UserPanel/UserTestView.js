import React, { Component } from 'react'

class UserTestView extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: null,
            isSolved: false,
        }

        this.handleTestView = this.handleTestView.bind(this)
    }

    componentDidMount(){
        this.setState({data: this.props.location.state.data})
    }

    handleTestView(){
        this.setState({isSolved: true})
    }

    createTest(){
        let openData = this.state.data.filter((item)=>{
            if ((item.type ==="O") || (item.type === "o")) 
            {return item}
        })

        let closeData = this.state.data.filter((item)=>{
            if ((item.type ==="W") || (item.type === "w")) 
            {return item}
        })

        let openQuestions = openData.map((item) => <OpenQuestion key={item.QuestionID} item={item}/>)
        let closedQuesions = closeData.map((item) => <ClosedQuestion key={item.QuestionID} item={item}/>)

        return (
            <div>
                <div>
                {openQuestions}
            </div>
            <div>
                {closedQuesions}
            </div>
            </div>
            
        )
    }

    render(){
        return(
            <div>
                <h1>Podgląd testu</h1>
                {this.state.isSolved ? <button>Close Your Test</button> : <button onClick={this.handleTestView}>Start Test</button>}
                <div>{this.state.isSolved ? this.createTest() : null}</div>
       
            </div>
        )
    }
}

class OpenQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: "",
            answer: ""
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.setState({question: this.props.item.questionContent})

    }

    handleChange(event){
        this.setState({answer: event.target.value})
    }

    render(){
        return(
            <div>
                <form>
                    <label>
                        {this.state.question}
                        <input type="text" onChange={this.handleChange}/>
                    </label>
                </form> 
            </div>
        )
    }
}

class ClosedQuestion extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: {},
            avaibleAnswers: [],
            answersNumber: 0
        }
        this.createAnswerPoles = this.createAnswerPoles.bind(this)
    }

    componentDidMount(){
        this.setState({
            data: this.props.item,
            avaibleAnswers: this.props.item.avaibleAnswers.split("|"),
            answersNumber: this.props.item.numberOfAvaibleAnswers
                    })
        
    }

    createAnswerPoles(){
        let poles = []
        let key = 0;

        poles = this.state.avaibleAnswers.map((answer,key )=> (   
            this.closeQuesionPosition(answer,key+1)
        )
        )
        return(
        <p>{poles}</p>
        )
    }

    closeQuesionPosition = (props,key) => {
        return(
            
                <label key={key}>
                    {props}
                    <input type="checkbox" />
                </label>
        
        )
    }

    render(){
        return(
            <div>   
                <p>{this.state.data.questionContent}</p>
                {this.createAnswerPoles()}
            </div>
            
        )
    }
}


export default UserTestView

