import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class Rend extends Component {
    state = {
        id: this.props.id,
        answer: this.props.answer,
        isCorrect: this.props.isCorrect
    }

    changeVal(rep) {
        const {id, answer, isCorrect} = this.state;

        this.props.onSub(id, rep, isCorrect);
    }

    changeIsCorrect(res) {
        const {id, answer, isCorrect} = this.state;
        this.props.onSub(id, answer, res);
    }


    render() {
        const {id, answer, isCorrect} = this.state;
        return (
            <div>
                <Form.Control
                    type="text"
                    key={id}
                    onChange={e => {
                        this.setState({answer: e.target.value});
                        this.changeVal(e.target.value);
                    }}
                /><Form.Check
                key={(id + 1) * 100}
                type="checkbox"
                checked={this.state.isCorrect}
                onChange={() => {
                    this.setState({isCorrect: !isCorrect});
                    this.changeIsCorrect(!isCorrect);
                }}
            />
            </div>
        );
    }
}

export default Rend;