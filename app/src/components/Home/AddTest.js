import React, { Component } from 'react';
import '../style/AddTest.css'
import { Auth } from 'aws-amplify'




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
        questionArray:[]
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
        handleSubmit = async (e) => {
            e.preventDefault()
            const validation = this.formValidation()
            console.log(validation)
            if (validation.correct) {
                this.setState({
                    message: 'Send, please wait',
                    errors: {
                        question: false,
                        type: false,
                    }
                })
                try {   
                    
                    await Auth.confirmSignUp(this.state.question, this.state.type);
                    // console.log(vall)
                    alert("User confirmed");
                } catch (e) {
                    alert(e.message);
                }
            }
            else {
                this.setState({
                    errors: {
                        type: !validation.type,
                        question: !validation.question,
                    }
                })
            }
        }
        componentDidUpdate() {
            if (this.state.message !== '') {
                setTimeout(() => this.setState({
                    message: ''
                }), 9000);
            }
        }
        handleQuestionSubmit=(e)=>{

            this.state.questionArray.push(e);
                
        }
        render() {
            
            return (
             
                <div className="addQuestion">
                     <label htmlFor="testName">testName:
                    <input type="question" id="question" name="question" value={this.state.question} onChange={this.handleChange} />
                    </label>
                    <label htmlFor="type">Chose question type
                    </label>
                    <select id ='testType' onChange={()=>{
        
        this.setState(
            
            {
            type:document.getElementById('testType').value,
        })
       // this.setState();
    }}>
        <option value='O'>Open</option>
        <option value ='W'>Closed</option>
    </select>
                    <QuestionType type={this.state.type} question={this.state.question} pusher={this.handleQuestionSubmit}/>,
               </div>
            );
        }

 
}
class OpenQuestion extends Component{
    constructor(props){
        super(props);
    this.state={
                chceSieTuDostacZInnegoComponentu:"Ale nie moge"
    }
    
}

handleQuestionSubmit(){
    var avaibleAnswers = ""
    var numberOfAvaibleAnswers= 0;

           var questionObj={
                type:this.state.type,
                language:"PL",
                numberOfAvaibleAnswers:numberOfAvaibleAnswers,
                questionContent:this.props.question,
                avaibleAnswers:avaibleAnswers    
            }
            console.log(questionObj)
        
}
    render(){

        return <div>
            <div>DZIALA OPEN QUESTION HERE</div>
        <button onSubmit={this.handleQuestionSubmit}>submit</button>
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
                    type:"O",
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
            return <OpenQuestion  pusher={this.props.pusher} question={this.props.question} />;
        }
  
        return <ClosedQuestion pusher={this.props.pusher} question={this.props.question}/>;
        }
    }
export default AddTest;