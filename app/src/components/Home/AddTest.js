import React, { Component } from 'react';
import '../style/AddTest.css'
import axios from 'axios';




class AddTest extends Component {
    state = {
        testName:"",
        question:"",
        type:"O",
        errors: {
            question: false,
            type: false,
        },
        types:["Open","Closed"],
        questionArray:[],
        toEdit:""
    }
    
        messages = {
            type_incorect: 'Question type have not been chosen',
            question_incorect: 'Your question has not any letter',
        }
        
        formValidation = () => {
            let question = false
            let type = false
            let correct = false
            
            if (this.state.type=="W" || this.state.type =="O") {
                type = true
            }
            if (this.state.question.length > 0) {
                question = true
            }
            if (question && type) {
                correct = true
            }
            return ({
                correct, question, type
            })
        }
        handleChange = (e) => {
            const name = e.target.id;
            this.setState({
                [name]: e.target.value
            })
        };
        handleChangeAnswer=(e)=>{
            const name = e.target.name;
            this.setState({
                [name]:document.getElementById(name)
            })
        }
        componentDidUpdate() {
            if (this.state.message !== '') {
                setTimeout(() => this.setState({
                    message: ''
                }), 1000);
            }
        }
        handleEdit=(e)=>{
            if(this.state.questionArray[e].type =='W'){

                document.getElementById("questionType").selectedIndex = "1";
            }
            else
            
            document.getElementById("questionType").selectedIndex="0";
            
            this.setState({
                question:this.state.questionArray[e].questionContent,
                type:this.state.questionArray[e].type,
                toEdit:{
                        type:this.state.questionArray[e].type,
                        language:"PL",
                        numberOfAvaibleAnswers:this.state.questionArray[e].numberOfAvaibleAnswers,
                        questionContent:this.state.questionArray[e].questionContent,
                        avaibleAnswers:this.state.questionArray[e].avaibleAnswers
                        
                    }
                }
            )
        }
        handleSendRequest(){
            let data={
                recruiterID:1234,
                testName:this.state.testName,
                questionList:this.state.questionArray
            }
            console.log(JSON.stringify(data));
            axios.post('http://arn:aws:execute-api:us-east-1:374991088908:wjdhyrfow4/*/POST/tests', data)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        handleQuestionSubmit=(e)=>{

            this.state.questionArray.push(e);
                
        }
        handleDeleteQuestion=(e)=>{
            
            this.state.questionArray.splice(e,1);
        }
        render() {
            
            return (
              
                <div className="addQuestion">
                    <div>
                        <label>Test Name: 
                        <input type="testName" id="testName" name="testName" value={this.state.testName} onChange={this.handleChange} />
                        </label>
                    </div>
                     <label htmlFor="question">Question:
                    <input type="question" id="question" name="question" value={this.state.question} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="type">Chose question type
                    </label>
                    <select id ='questionType' onChange={()=>{
        
        this.setState(
            
            {
            type:document.getElementById('questionType').value,
        })
    }}>
        <option value='O'>Open</option>
        <option value ='W'>Closed</option>
    </select>
                    <QuestionType toEdit={this.state.toEdit} type={this.state.type} question={this.state.question} pusher={this.handleQuestionSubmit}/>
                    <QuestionViewComponent handlerEdit = {this.handleEdit} handlerDelete={this.handleDeleteQuestion} questionArray={this.state.questionArray}></QuestionViewComponent> 
                    <button onClick={()=>{this.handleSendRequest() }}>Save Test</button>
               </div>
            );
        }
}
class OpenQuestion extends Component{
    constructor(props){
        super(props);
    this.state={        
    }
}
    handleQuestionSubmit = ()=>{
        var numberOfAvaibleAnswers = 0;
     var avaibleAnswers=""
                var questionObj={
                    type:"O",
                    language:"PL",
                    numberOfAvaibleAnswers:numberOfAvaibleAnswers,
                    questionContent:this.props.question,
                    avaibleAnswers:avaibleAnswers         
                }
                console.log(questionObj)
                this.props.pusher(questionObj);
    }
    render(){
        return <div>
        <button onClick={this.handleQuestionSubmit}>submit</button>
</div>
    }
}
class ClosedQuestion extends Component{

    constructor(props){
    super(props);
    this.state={
        numbers:[2,3,4,5,6],
        numberOfAvaibleAnswers:4,
        answer0:"",
        answer1:"",
        answer2:"",
        answer3:"",
        answer4:"",
        answer5:"",
        isCorrect0:false,
        isCorrect1:false,
        isCorrect2:false,
        isCorrect3:false,
        isCorrect4:false,
        isCorrect5:false,
        numberToRender:4,
    }
    console.log(this)
    }
    handleQuestionSubmit = ()=>{
       
        
        var numberOfAvaibleAnswers = this.state.numberOfAvaibleAnswers;
     var avaibleAnswers=""
            for(var i =0;i<this.state.numberOfAvaibleAnswers;i++)
            {
            avaibleAnswers+=eval('this.state.answer'+i);
            avaibleAnswers+="|";
            }
        avaibleAnswers= avaibleAnswers.substring(0,avaibleAnswers.length-1);
            
                var questionObj={
                    type:"W",
                    language:"PL",
                    numberOfAvaibleAnswers:numberOfAvaibleAnswers,
                    questionContent:this.props.question,
                    avaibleAnswers:avaibleAnswers
                    
                }
                console.log(questionObj)
                this.props.pusher(questionObj);
    }

    toggleChange = (e) => {
        const name = e.target.name
        
        this.setState({
         [name]: e.target.checked,
        });
      }
    
    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };
    render(){
        var rows = [];
        for (var i = 0; i < this.state.numberOfAvaibleAnswers; i++) {
           
            rows.push(<li htmlFor={'question'+i}>{'Question nubmer: '+(i+1)}
                  <input id= {'answer'+i} name={'answer'+i} type="text"   onChange = {this.handleChange}  value={this.state[i+2]}/>
                  <input id ={'isCorrect'+i} name ={'isCorrect'+i} type='checkbox' onChange={this.toggleChange} value ={this.state[i+8]} ></input>
            </li>);
        }
      return <div>
                    <select  id ='numberOfAvaibleAnswers' name ='numberOfAvaibleAnswers' defaultValue ='4' onChange={()=>{
                         
                         this.setState({
                            numberOfAvaibleAnswers:document.getElementById('numberOfAvaibleAnswers').value,
                        });
        ;
       
        }}> 
        {this.state.numbers.map((number)=>
                        <option id={number} name={number} value={number}>{number}</option>)}
                    </select>
                
        <div>
                {rows}
            </div>
            <button onClick={this.handleQuestionSubmit}>submit</button>
            </div>
        
    }
}
class QuestionType extends Component{
    constructor(props)
    {
        super(props)
    
    this.state={

    }

}
    render(){
        if ( this.props.type == "O") {
            return <OpenQuestion toEdit={this.toEdit} pusher={this.props.pusher} question={this.props.question} />;
        }
  
        return <ClosedQuestion  toEdit={this.toEdit} pusher={this.props.pusher} question={this.props.question}/>;
        }
    }
    class QuestionViewComponent extends Component{

        constructor(props){
            super(props)
            this.state={
            }
        }
        componentDidMount() {
            setInterval(() => {
                this.setState(() => {
                    console.log('setting state');
                    return { nothing : "" }
                });
            }, 1000);
        }

        createButtonList(){
            var questionList=[];
            
            for(let i=0; i<this.props.questionArray.length; i++)
            {
                let type;
                if(this.props.questionArray[i].type=="W") type="Closed Question with " + this.props.questionArray[i].numberOfAvaibleAnswers +" answers"
                else
                type="Open Question"
            questionList.push(<li> {this.props.questionArray[i].questionContent} {type}
            <button  onClick={()=>this.props.handlerDelete(i)}>delete</button>
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
export default AddTest;