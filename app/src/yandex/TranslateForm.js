import React, {Component} from 'react';
import {Button, Container, Form} from "react-bootstrap";

class TranslateForm extends Component {
    state = {
        text: '',
        language: 'ru'
    };

    translate = (event) => {
        event.preventDefault();

        const {text, language} = this.state;
        console.log(text);
        console.log(language);
        this.props.translate(text, language);
    }

    render() {
        return (
            <Container>
                <Form className="form-inline" onSubmit={this.translate}>
                    <input type="text"
                           placeholder="Enter a Text"
                           className="form-control"
                           onChange={(event) => {
                               this.setState({text: event.target.value})
                           }}/>
                    <select className="form-control" onChange={(event) => {
                        this.setState({language: event.target.value})
                    }}>
                        <option value="ru">Russian</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="zh">Chineese</option>
                    </select>
                    <Button  type="submit" variant="info">Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default TranslateForm;