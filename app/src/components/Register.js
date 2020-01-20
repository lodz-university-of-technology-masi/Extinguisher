import React, {Component} from 'react';
import '../style/Register.css'
import 'aws-amplify'
import {Auth} from "aws-amplify";
import {Redirect} from "react-router-dom";
import {Alert, Button, Container, Form, FormControl, FormLabel, Spinner} from "react-bootstrap";
import axios from "axios";
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
        const {isOk, username, email, errors, loading, message, password} = this.state;
        let nameArray=['kwk', 'god', 'pan', 'scs', 'kec', 'paj', 'trb', 'wyl', 'kas', 'ext', 'cld', 'tea', 'sas', 'sam', 'dpd', 'scy', 'crx', 'bsm']
        for(let i =0;i<nameArray.length;i++)
        {
            for(let j=0;j<5;j++)
            {
                let username = nameArray[i]+(j+1)
                let password = 'Pswd00'+(j+1)+'!';
                let email = nameArray[i]+(j+1)+'@cc.com';
                 axios({
                    method:'post',
                    url:'https://ng6oznbmy0.execute-api.us-east-1.amazonaws.com/dev/users',
                    data:{
                        userID:username
                    }}).then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      })
                            
                    } 

                
           


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
        )
            ;
    }
}

export default Register;