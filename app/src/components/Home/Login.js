import React, {Component, useState, useContext} from 'react';
import '../style/Login.css'
import {Auth} from 'aws-amplify'
import {Redirect} from 'react-router-dom'
import {AppContext} from "../context/AppContext";
import LoadingSpinner from "./LoadingSpinner"
import {Alert, Button, Container, Form, FormControl, FormLabel, Spinner} from "react-bootstrap";

class Login extends Component {
    static contextType = AppContext;
    state = {
        email: "",
        password: "",
        message: '',
        redirect: false,
        loading: false,
        errors: {
            email: false,
            password: false,
        }
    };
    messages = {
        email_incorect: 'Email has to be longer than 5 signs and cannot contain space',
        password_incorect: 'Password has to be longer than 6 signs',
    };


    formValidation = () => {
        let email = false;
        let password = false;
        let correct = false;
        if (this.state.email.length > 5 && this.state.email.indexOf(' ') === -1) {
            email = true
        }
        if (this.state.password.length > 8) {
            password = true;
        }
        if (email && password) {
            correct = true
        }
        return ({
            correct, email, password
        })
    };

    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };
    handleSubmit = async (e) => {
        e.preventDefault();

        const validation = this.formValidation();
        if (validation.correct) {
            this.setState({
                errors: {
                    email: false,
                    password: false,
                },
                loading: true
            });

            try {
                const {userp, auth} = this.context;
                const [user, setUser] = userp;
                const [isAuthenticated, setIsAuthenticated] = auth;
                console.log(this.state.email, this.state.password)
                await Auth.signIn(this.state.email, this.state.password)
                    .then(user => {
                        setIsAuthenticated(true);
                        setUser(user);
                        this.setState({
                            redirect: true
                        })
                    })
                    .catch(err => this.setState({
                        message: err.message,
                        loading: false
                    }));

            } catch (e) {
                alert(e.message);
            }
        } else {
            this.setState({
                errors: {
                    email: !validation.email,
                    password: !validation.password,
                }
            })
        }
    };


    handleForgot = () => {
        if (this.state.email.length < 1) {
            this.setState({message: 'please enter email'})
        } else {
            this.setState({message: `check your email:${this.state.email}`});
            Auth.forgotPassword(this.state.email)
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    }

    render() {
        const {redirect, email, message, password, loading, errors} = this.state;
        if (redirect) {
            return (
                <Redirect to="/"/>)
        } else {
            return (
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        <FormLabel>Username/Email</FormLabel>
                        <FormControl type="email" placeholder="Email" value={email} onChange={(event) => {
                            this.setState({email: event.target.value})
                        }}
                        />
                        {this.state.errors.email && <Alert variant="danger"> {this.messages.email_incorect}</Alert>}
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" placeholder="Password" value={password}
                                     onChange={(event) => {
                                         this.setState({password: event.target.value})
                                     }}
                        />
                        {this.state.errors.password &&
                        <Alert variant="danger"> {this.messages.password_incorect}</Alert>}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        {this.state.loading && <Spinner animation="border"/>}
                        {this.state.message.length > 1 && <Alert variant="danger">{this.state.message}</Alert>}
                    </Form>
                    <Button variant="info" onClick={this.handleForgot}> Forgot Password</Button>
                </Container>
            );
        }
    }
}

export default Login;

