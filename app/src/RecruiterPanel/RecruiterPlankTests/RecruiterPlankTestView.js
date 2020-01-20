import React, { Component } from 'react'
import {Container} from 'react-bootstrap'
import axios from 'axios'

class RecruiterPlankTestView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isReady: false
        }
        this.handlerDataFromChild = this.handlerDataFromChild.bind(this)
        this.handlerEdit = this.handlerEdit.bind(this)
    }

    async componentDidMount() {

        await this.setState({
            data: this.props.location.state.data,
            isReady: true
        })

    }


    generateTestView() {
        let toRender = [];
        let key = 0

        console.log(this.state.data.questionsList.length)

        for (let i = 0; i < this.state.data.questionsList.length; i++) {
            toRender.push(<EditPosition key={i + 1} index={i} question={this.state.data.questionsList[i]}
                                                                    handlerFromParent={this.handlerDataFromChild} />)
        }

        return (
            <Container>
                {toRender}
            </Container>
        )
    }

    async handlerDataFromChild(data) {
        console.log("Test")
    }

    async handlerEdit() {

        console.log("edycja taka dobra !")

        // await this.setState(
        //     {
        //         data: {
        //             recruiterID: this.state.data.recruiterID,
        //             result: finalResult,
        //             testName: this.state.data.testName,
        //             questionsList: this.state.data.questionsList,
        //             answersList: this.state.data.answersList,
        //             userID: this.state.data.userID,
        //             isSolved: true,
        //             isChecked: isChecked,
        //             isPassed: isPassed
        //         }
        //     }
        // )

        // let data = JSON.stringify(this.state.data)

        // try {
        //     await axios.post('https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/modifycandidatetest', data);
        // } catch (error) {
        //     console.log("error: ", error);
        // }
    }

    render() {
        return (
            <Container>
                <h1><input type="text" placeholder={this.state.data.testName}/></h1>
                <div>
                    {this.state.isReady ? this.generateTestView() : <p>Loading ...</p>}
                </div>
                <div>
                    <label>
                        Czy sprawdzony ?
                        <input type="checkbox" value={this.state.data.isChecked}/>
                    </label>
                    <label>
                        Czy rozwiązany ?
                        <input type="checkbox" value={this.state.data.isSolved}/>
                    </label>
                    <label>
                        Czy zdany ?
                        <input type="checkbox" value={this.state.data.isPassed}/>
                    </label>
                    
         
                </div>
                <div>
                    <button onClick={this.handlerEdit}>Zakończ edycje</button>
                </div>
            </Container>
        )
    }
}


class EditPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            isReady: false
        }
    }

async componentDidMount() {
    await this.setState({data: this.props.question,
                    isReady: true})
}



    render(){
        return(
            
            <Container>
                {
                    this.state.isReady ? <div>
                    <input type="text" placeholder={this.state.data.questionContent}/>  
                    <input type="text" placeholder={this.state.data.availableAnswers.join()}/>
                    <input type="text" placeholder={this.state.data.correctAnswers.join()}/> 
                    </div>: <p>not Ready</p>
                }
       
            </Container>

         
        )
    }
    

}


export default RecruiterPlankTestView;