import React, {Component} from 'react';
import '../style/Register.css'
import 'aws-amplify'
import {Auth} from "aws-amplify";
import {Redirect} from "react-router-dom";
import {Alert, Button, Col, Container, Form, FormControl, FormLabel, Spinner} from "react-bootstrap";
import * as Api from '../api/Api'

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        message: '',
        role: 'candidate',
        isOk: false,
        loading: false,
        errors: {
            username: false,
            email: false,
            password: false,
        }
    }

    messages = {
        username_incorect: 'Name has to be longer than 6 signs and cannot contain space',
        email_incorect: 'email does not contain @ ',
        password_incorect: 'Password has to be longer than 8 signs, one Big letter, one special sign, and one number',
    }
    formValidation = () => {
        let username = false;
        let password = false;
        let email = false;
        let correct = false;
        if (this.state.username.length > 6 && this.state.username.indexOf(' ') === -1) {
            username = true
        }
        if (this.state.password.length > 8) {
            password = true;
        }
        if (this.state.email.indexOf('@') !== -1) {
            email = true;
        }
        if (username && password && email) {
            correct = true
        }
        return ({
            correct, username, password, email
        })
    };
    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };
    handleSubmit = async e => {
        const {username, email, password, role} = this.state;
        e.preventDefault();

        const validation = this.formValidation();
        if (validation.correct) {
            this.setState({
                errors: {
                    username: false,
                    password: false,
                    email: false
                },
                loading: true
            });

            await Auth.signUp({
                username,
                password,
                attributes: {
                    email, 'custom:role': role
                }
            }).then(data => {
                this.setState({isOk: true});
                Api.confirmUser({userID: username});
            })
                .catch(err => {
                    this.setState({message: err.message})
                })
                .finally(this.setState({loading: false}))


            /*  var poolData = {
                  UserPoolId: 'us-east-1_BfxnMv90t',
                  ClientId: '61qf8cn3re4asgfmvp6kha15r2'
              };
            */
        } else {
            this.setState({
                errors: {
                    username: !validation.username,
                    password: !validation.password,
                    email: !validation.email
                }
            })
        }
    }
    toggleRole = (id) => {
        const {role} = this.state;
        if (role === "candidate") {
            this.setState({role: "recruiter"})
        } else {
            this.setState({role: "candidate"})
        }
    }

    render() {
        const {isOk, username, email, errors, loading, message, password, role} = this.state;
        if (isOk) {
            return (
                <Redirect to="/login"/>);
        }

        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="text" placeholder="Email" value={email} onChange={(event) => {
                        this.setState({email: event.target.value})
                    }}
                    />
                    {errors.email && <Alert variant="danger"> {this.messages.email_incorect}</Alert>}
                    <FormLabel>Username</FormLabel>
                    <FormControl type="text" placeholder="Username" value={username} onChange={(event) => {
                        this.setState({username: event.target.value})
                    }}
                    />
                    {errors.username && <Alert variant="danger"> {this.messages.username_incorect}</Alert>}
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" placeholder="Password" value={password}
                                 onChange={(event) => {
                                     this.setState({password: event.target.value})
                                 }}
                    />
                    {this.state.errors.password &&
                    <Alert variant="danger"> {this.messages.password_incorect}</Alert>}
                    <Form.Group as={Form.Row}>
                        <Form.Label as="legend" column sm={2}>
                            Role
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Candidate"
                                checked={role !== "recruiter"}
                                onChange={e => this.toggleRole(e.target.id)}
                                id="candidate"
                            />
                            <Form.Check
                                type="radio"
                                label="Recruiter"
                                checked={role !== "candidate"}
                                onChange={e => this.toggleRole(e.target.id)}

                                id="recruiter"
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {this.state.loading && <Spinner animation="border"/>}
                    {this.state.message.length > 1 && <Alert variant="danger">{this.state.message}</Alert>}
                </Form>
            </Container>
        )
            ;
    }
}

export default Register;