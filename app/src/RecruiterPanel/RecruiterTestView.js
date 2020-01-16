import React, {Component} from 'react'

class RecruiterTestView extends Component {
    constructor(props){
        super(props);
        this.state = {
            TestID: "",
            questions: [],


        }
    }

    componentDidMount(){
        this.setState({questions: this.props.item.questions})
    }

    render(){
        return(
            <div>
                <h1>No to jest test do sprawdzenia !</h1>
            </div>
        )
    }
}

export default RecruiterTestView