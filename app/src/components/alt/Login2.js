import React, {Component} from 'react';
import '../style/Login.css'
import {Auth} from 'aws-amplify'
import {Redirect} from 'react-router-dom'
import {AppContext} from "../context/AppContext";

class Login2 extends Component {
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
                const {login} = this.context;

                login(this.state.email, this.state.password)
                    .then(this.setState({redirect: true}))
                    .catch(err => this.setState({message: err.message}));

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
    };


    handleForgot = () => {
        Auth.forgotPassword(this.state.email)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    render() {

        if (this.state.redirect) {
            return (
                <Redirect to="/"/>)
        } else {
            return (
                <div className="login">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="user" placeholder="email" name="email" value={this.state.email}
                               onChange={this.handleChange}/>
                        {this.state.errors.email && <span> {this.messages.email_incorect}</span>}
                        <input type="password" id="password" placeholder="password" name="password"
                               value={this.state.password} onChange={this.handleChange}/>
                        {this.state.errors.password && <span> {this.messages.password_incorect}</span>}
                        {/*<div className="wrap">*/}
                            <button type="submit">Confirm</button>
                            {/*{this.state.loading && <LoadingSpinner/>}</div>*/}
                    </form>
                    <button onClick={this.handleForgot}>Forgot Password</button>

                </div>
            );
        }
    }
}

export default Login2;

