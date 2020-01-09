import React, {Component, useState, useContext} from 'react';
import '../style/AddTest.css'
import axios from 'axios';
import AddQuestion from "./AddQuestion.js"
import QuestionsView from "./QuestionsView.js"
import Services from  "../services/services.js"
import {AppContext} from "../context/AppContext.js"


class AddTest extends Component {
  static contextType = AppContext;
    constructor(props){
     
    super(props)
        this.state = {
        testName:"",
        questionArray:[],
    }
}
        messages = {
            type_incorect: 'Question type have not been chosen',
            question_incorect: 'Your question has not any letter',
        }
        
       

        handleChange = (e) => {
            let name = e.target.id;
            this.setState({
                [name]: e.target.value
            })
        };

       
        handleQuestionSubmit=(question)=>{
                let arr = this.state.questionArray;
                arr.push(question);
                this.setState({
                    questionArray:arr
                })

        }
        handleSendRequest=()=>{
          const {userp, auth} = this.context;
          const [user, setUser] = userp;
          const [isAuthenticated, setIsAuthenticated] = auth;
            let data={
                //recruiterID:user.username,
                recruiterID:"test",
                testName:this.state.testName,
                questionsList:this.state.questionArray
            }
            console.log(JSON.stringify(data));
            console.log(Services.addTest(data));
        }
        handleDeleteQuestion=(e)=>{
            let arr = this.state.questionArray;
            arr.splice(e,1);
            this.setState({
                questionArray:arr
            })
        }
        render() {
            return (   <div className="blur-background">
                        <label>Test Name: 
                        <input type="testName" id="testName" name="testName" value={this.state.testName} onChange={this.handleChange} />
                        </label>
            <AddQuestion
              handleQuestionSubmit={this.handleQuestionSubmit}
            />
            <QuestionsView
              questionArray={this.state.questionArray}
              handleDeleteQuestion={this.handleDeleteQuestion}
            />
            <button onClick={this.handleSendRequest}>Create Test</button>
          </div>);
}
}
export default AddTest;