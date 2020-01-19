import React, {Component} from 'react'

class RecruiterCheckTestView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isReady: false
        }
    }

    async componentDidMount() {

        await this.setState({data: this.props.location.state.data,
                            isReady: true})

        console.log(this.state.data)

    }

    // Wczytanie wszystkich danych
    // wyswietlenie obok siebie
    // jestli sugerowana odp to tez podac
    // punktacja 0,1,2

    //podsumowac i odesłac 75% zalicza elo

    generateTestView() {
        let toRender = [];
        let key = 0

        // toRender = this.state.data.questionsList.map(
        //     question => <CheckTestPosition key={key} index = {key} question={question} answer={this.state.data.answersList[key]}/>
        // )

        for (let i = 0 ; i < this.state.data.questionsList.length; i ++ ) {
            toRender.push(<CheckTestPosition key={i+1} index = {i} question={this.state.data.questionsList[i]} answer={this.state.data.answersList[i]}/>)
        } 

        return (
            <table>
                <thead>
                    <tr>
                        <td>
                            Lp
                        </td>
                        <td>
                            Pytanie
                        </td>
                        <td>
                            Odpowiedz
                        </td>
                        <td>
                            Sugerowana odpowiedz
                        </td>
                        <td>
                            Ocena
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {toRender}
                </tbody>
            </table>
        )
    }

    render(){
        return(
        <div>
            <h1>Rozwiązanie testu użytkownika {this.state.data.userID}</h1>
            <h2>Test: {this.state.data.testName}</h2>
            <div>
                {this.state.isReady ? this.generateTestView() : <p>Loading ...</p>}
            </div>
            <div>
                <button>Zakończ ocenianie</button>
            </div>
        </div>
        )
    }
}

class CheckTestPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            question: [],
            answer: [],
            isDownloaded: false
        }
    }

    async componentDidMount(){
        await this.setState( 
            {
                question: this.props.question,
                answer: this.props.answer,
                index: this.props.index,
                isDownloaded: true,
                rate: 0
            }
        )
    }

    showCorrect(){
        let correct = this.state.question.correctAnswers
        if (correct!= "") {
            return correct.toString();
        } else {
            return "-"
        }
    }

    selectChange(event){
        let rate = event.target.value
        //console.log(rate)
        this.setState({rate: rate})
    }

    rateAnswer(){
        return (
            <select onChange={this.selectChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        )
    }

    render(){
        return(
            <tr>
                <td>
                    {this.state.index}
                </td>
                <td>
                    {this.state.question.questionContent}
                </td>
                <td>
                    {this.state.answer}
                </td>
                <td>
                    {this.state.isDownloaded ? this.showCorrect() : <span>Loading ...</span>}
                </td>
                <td>
                    {this.rateAnswer()}
                </td>
            </tr>
        )
    }
    

}

export default RecruiterCheckTestView;