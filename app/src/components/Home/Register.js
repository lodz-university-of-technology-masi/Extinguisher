import React, {Component} from 'react';
import '../style/Register.css'
import 'aws-amplify'
import {CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {Auth} from "aws-amplify";
import {Redirect} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import {Alert, Button, Container, Form, FormControl, FormLabel, Spinner} from "react-bootstrap";

class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        message: '',
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
    handleSubmit = e => {
        const {username, email, password} = this.state;
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

            Auth.signUp({
                username,
                password,
                attributes: {email}
            }).then(data => {
                console.log(data);
                this.setState({isOk: true})
            })
                .catch(err => {
                    console.log(err);
                    this.setState({message: err.message})
                })
                .finally(this.setState({loading: false}))

            /*  var poolData = {
                  UserPoolId: 'us-east-1_BfxnMv90t',
                  ClientId: '61qf8cn3re4asgfmvp6kha15r2'
              };
              var userPool = new CognitoUserPool(poolData);
              var attributeList = [];

              var dataEmail = {
                  Name: 'email',
                  Value: this.state.email
              };

              var attributeEmail = new CognitoUserAttribute(dataEmail);


              attributeList.push(attributeEmail);




            var cognitoUser;

            userPool.signUp(this.state.username, this.state.password, attributeList, null, function (err, result) {
                if (err) {
                    alert(err);
                    return;
                }

                cognitoUser = result.user;
                cognitoUser.confirmRegistration = true;
                console.log('user name is ' + cognitoUser.getUsername());
            });
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

    componentDidUpdate() {
        if (this.state.message !== '') {
            setTimeout(() => this.setState({
                message: ''
            }), 9000);
        }
    }

    render() {
const {isOk,username,email,errors,loading,message,password} = this.state;
        if (isOk) {
            return (
                <Redirect to="/confirm"/>);
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {this.state.loading && <Spinner animation="border"/>}
                    {this.state.message.length > 1 && <Alert variant="danger">{this.state.message}</Alert>}
                </Form>
            </Container>
            // <div className="register">
            //     <form onSubmit={this.handleSubmit}>
            //         <h2>Register</h2>
            //         <input type="text" placeholder="Username" id="user" name="username" value={this.state.username}
            //                onChange={this.handleChange}/>
            //         {this.state.errors.username && <span> {this.messages.username_incorect}</span>}
            //
            //         <input type="email" placeholder="Email" id="email" name="email" value={this.state.email}
            //                onChange={this.handleChange}/>
            //         {this.state.errors.email && <span> {this.messages.email_incorect}</span>}
            //
            //         <input type="password" placeholder="Password" name="password" id="password"
            //                value={this.state.password} onChange={this.handleChange}/>
            //         {this.state.errors.password && <span> {this.messages.password_incorect}</span>}
            //
            //
            //             <button type="submit">Confirm</button>
            //             {this.state.loading && <LoadingSpinner/>}
            //     </form>
            // </div>
        )
            ;
    }
}

export default Register;