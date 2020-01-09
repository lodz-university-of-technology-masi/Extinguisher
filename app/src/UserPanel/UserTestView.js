import React, { Component } from 'react'
import axios from 'axios';

class UserTestView extends Component {
    constructor(props){
        super(props)
        this.state = {
            CandidateID: "182182",
            TestAnswersID: "",
            data: null,
            isSolved: false,
            array: []
        }

        this.handleTestView = this.handleTestView.bind(this);
        this.handleData = this.handleData.bind(this);
        this.handleEndTest = this.handleEndTest.bind(this);
    }

    componentDidMount(){
        this.setState({data: this.props.location.state.data,
                        TestAnswersID: this.props.location.state.testID
        })}

    handleTestView(){
        this.setState({isSolved: true})
    }

    handleEndTest(){
        let data={
            TestID: this.state.TestAnswersID,
            CandidateID: this.state.CandidateID,
            questionList: this.state.array
        }
        console.log(data)

        //https://i2rgmeu549.execute-api.us-east-1.amazonaws.com/production/testanswers

        console.log(JSON.stringify(data));
        axios.post('https://i2rgmeu549.execute-api.us-east-1.amazonaws.com/production/testanswers', data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    
        console.log("Sending answers !");
    }

    // handleChange(event){
    //     this.setState({array: event.target.value})
    // }

    handleData(data) {
        this.setState(prevState => ({
            array: [...prevState.array, data]
        }))
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

        let openQuestions = openData.map((item) => <OpenQuestion key={item.QuestionID} item={item} handlerFromParant={this.handleData}/>)
        let closedQuesions = closeData.map((item) => <ClosedQuestion key={item.QuestionID} item={item} handlerFromParant={this.handleData}/>)

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
                {this.state.isSolved ? <button onClick={this.handleEndTest}>Close Your Test</button> : <button onClick={this.handleTestView}>Start Test</button>}
                <div>{this.state.isSolved ? this.createTest() : null}</div>
            </div>
        )
    }
}

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
            QuestionID: this.state.QuestionID,
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
            QuestionID: this.props.item.QuestionID,
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
            QuestionID: this.state.QuestionID,
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
        this.setState({answer: this.props.answer.avaibleAnswer,
                            checked: this.props.answer.isAnswer})
    }

    handleCheckBoxChange(event) {
        this.setState({checked: event.target.checked});
     
        let obj = {
            avaibleAnswer: this.state.answer,
            isAnswer: !this.state.checked
        } 
  
        this.props.handlerFromParent(obj)      
    }

    render(){
        return(
            <label>
                {this.state.answer}
                <input type="checkbox" value={this.state.checked} onChange={this.handleCheckBoxChange}/>
            </label>
        )
    }
}

export default UserTestView

