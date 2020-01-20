import React, {Component} from 'react';
import '../style/AddQuestion.css'
import {Button, Container} from "react-bootstrap";
import OpenQuestion from "../UserPanel/OpenQuestion";
import ClosedQuestion from "../UserPanel/CloseQuestion";
import AddOpenQuestion from "./AddOpenQuestion";
import AddClosedQuestion from "./AddClosedQuestion";

class AddQuestion extends Component {
    state = {

    };


    toggleOpenQuestion = () => {
        this.setState({isOpen: !this.state.isOpen})
    }



    render() {
        return (
            <Container>
                <h1 className="font-weight-bold mb-3">Add New Question</h1>
                <Button variant="primary"
                        onClick={this.toggleOpenQuestion}> {this.state.isOpen ? "Open" : "Closed"}
                </Button>
                {this.state.isOpen === true ?
                    <AddOpenQuestion handleQuestionSubmit={this.props.handleQuestionSubmit}/> :
                    <AddClosedQuestion handleQuestionSubmit={this.props.handleQuestionSubmit}/>}
            </Container>
        );
    }
}

export default AddQuestion