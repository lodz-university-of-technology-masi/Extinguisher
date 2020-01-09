import React, {Component} from 'react';
import '../style/Confirm.css'
import {Auth} from 'aws-amplify'
import {Alert, Button, Container, Form, FormControl, FormLabel, Spinner} from "react-bootstrap";

class Confirm extends Component {
    state = {
        email: "",
        code: "",
        message: '',
        loading: false,
        errors: {
            email: false,
            code: false,
        }
    };
    messages = {
        email_incorect: 'email does not contain @ ',
        code_incorect: 'Code has to have only 6 signs',
    };
    formValidation = () => {
        let email = false;
        let code = false;
        let correct = false;
        if (this.state.code.length === 6) {
            code = true
        }
        if (this.state.email.length > 5 && this.state.email.indexOf(' ') === -1) {
            email = true
        }
        if (email && code) {
            correct = true
        }
        return ({
            correct, code, email
        })
    };
    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };

    handleSubmit = async (e) => {
        const {email, code} = this.state;
        e.preventDefault();
        const validation = this.formValidation();
        console.log("Email:", email);
        console.log("Code:", code);
        if (validation.correct) {
            this.setState({
                errors: {
                    email: false,
                    code: false,
                }
            });
            try {
                await Auth.confirmSignUp(email, code);
                // console.log(vall)
                alert("User confirmed");
            } catch (e) {
                alert(e.message);
            }
        } else {
            this.setState({
                errors: {
                    email: !validation.email,
                    code: !validation.code,
                }
            })
        }
    }


    render() {
        const {email, message, code, errors, loading} = this.state;
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Confirm Account</h1>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" placeholder="Email" value={email} onChange={(event) => {
                        this.setState({email: event.target.value})
                    }}
                    />
                    {errors.email && <Alert variant="danger"> {this.messages.email_incorect}</Alert>}
                    <FormLabel>Code</FormLabel>
                    <FormControl type="text" placeholder="Code" value={code}
                                 onChange={(event) => {
                                     this.setState({code: event.target.value})
                                 }}
                    />
                    {errors.code && <Alert variant="danger"> {this.messages.code_incorect}</Alert>}
                    <Button variant="primary" type="submit">Confirm</Button>
                    {loading && <Spinner animation="border"/>}
                    {message.length > 1 && <Alert variant="danger">{message}</Alert>}
                </Form>
                <Button variant="primary" onClick={async () => {
                    try {
                        let s = await Auth.resendSignUp(email);
                        console.log(s);
                        alert("git")
                    } catch (e) {
                        alert("nah")
                    }
                }}>Resend code</Button>

            </Container>


            //
            // <div className="confirm">
            //     <form onSubmit={this.handleSubmit}>
            //         <input placeholder="Email" type="text" id="user" name="email" value={this.state.email}
            //                onChange={this.handleChange}/>
            //         {this.state.errors.email && <span> {this.messages.username_incorect}</span>}
            //         <input placeholder="Code" type="code" name="code" id="code" value={this.state.code}
            //                onChange={this.handleChange}/>
            //         {this.state.errors.code && <span> {this.messages.code_incorect}</span>}
            //
            //         <button>Confirm</button>
            //     </form>
            //     {this.state.message && <h3>{this.state.message}</h3>}
            //
            // < /div>
        );
    }
}

export default Confirm;