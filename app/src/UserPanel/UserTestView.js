import React, { Component } from 'react'
import axios from 'axios';

import OpenQuestion from './OpenQuestion'
import ClosedQuestion from './CloseQuestion'

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
            testID: this.state.TestAnswersID,
            candidateID: this.state.CandidateID,
            answersList: this.state.array
        }
        //console.log(data)

         let toSend = JSON.stringify(data);
        console.log(toSend)
                  //https://qx7qoru7xa.execute-api.us-east-1.amazonaws.com/prod/answers
        axios.post("https://qx7qoru7xa.execute-api.us-east-1.amazonaws.com/prod2/answers", toSend)
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

export default UserTestView

