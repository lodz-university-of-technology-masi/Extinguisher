import React, { Component } from 'react';
import '../style/Login.css'
import { Auth } from 'aws-amplify'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    state = {
        email: "",
        password: "",
        message: '',
        redirect: false,
        errors: {
            email: false,
            password: false,
        }
    }
    messages = {
        email_incorect: 'Name has to be longer than 10 signs and cannot contain space',
        password_incorect: 'Password has to be longer than 8 signs',
    }
    formValidation = () => {
        let email = false
        let password = false
        let correct = false
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
    }

    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    };
    handleSubmit = async (e) => {
        e.preventDefault()

        const validation = this.formValidation()
        console.log(validation)
        if (validation.correct) {
            this.setState({
                message: 'Send, please wait',
                errors: {
                    email: false,
                    password: false,
                }
            })
            try {

                await Auth.signIn(this.state.email, this.state.password).then(user => {
                    console.log(user)
                    this.props.user(user)
                });
                // Auth.currentAuthenticatedUser({
                //     bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
                // }).then(user => console.log(user))
                //     .catch(err => console.log(err));
                this.props.auth(true);
                this.setState({
                    redirect: true
                })
            } catch (e) {
                alert(e.message);
            }
        }
        else {
            this.setState({
                errors: {
                    email: !validation.email,
                    password: !validation.password,
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
    handleForgot = () => {
        Auth.forgotPassword(this.state.email)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/" />)
        }
        else {
            return (
                <div className="login">
                    <form onSubmit={this.handleSubmit}>
                        {/* <label htmlFor="user">Email: */}
                        <input type="text" id="user" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange} />
                        {this.state.errors.email && <span> {this.messages.email_incorect}
                        </span>}
                        {/* </label> */}

                        {/* <label htmlFor="password">Password: */}
                        <input type="password" placeholder="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                        {this.state.errors.password && <span> {this.messages.password_incorect}</span>}
                        {/* </label> */}

                        <button>Confirm</button>
                    </form>
                    {this.state.message && <h3>{this.state.message}</h3>}
                    <button onClick={this.handleForgot}>Forgot Password</button>
                </div>
            );
        }
    }
}

export default Login;

