import React, {Component} from 'react'

class RecruiterPlankTestView extends Component {
    constructor(props){
        super(props);
        this.state = {
            TestID: "",
            data: {}
        }
    }

    componentDidMount(){
        this.setState({data: this.props.location.state})
    }

    render(){
        return(
            <div>
                <h1>Podgląd pustego testu do modyfikacji</h1>
            </div>
        )
    }
}

export default RecruiterPlankTestView