import React, { Component } from 'react';
import '../style/Register.css'
class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        message: '',
        errors: {
            username: false,
            email: false,
            password: false,
        }
    }

    messages = {
        username_incorect: 'Name has to be longer than 10 signs and cannot contain space',
        email_incorect: 'email does not contain @ ',
        password_incorect: 'Password has to be longer than 8 signs, one Big letter, one special sign, and one number',
    }
    formValidation = () => {
        let username = false
        let password = false
        let email = false
        let correct = false
        if (this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
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
    }
    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()

        const validation = this.formValidation()
        console.log(validation)
        if (validation.correct) {
            this.setState({
                message: 'Send, please wait',
                errors: {
                    username: false,
                    password: false,
                    email: false
                }
            })
        }
        else {
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
        return (
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="user">Username:
                           <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
                        {this.state.errors.username && <span> {this.messages.username_incorect}</span>}
                    </label>
                    <label htmlFor="email">Email:
                           <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                        {this.state.errors.email && <span> {this.messages.email_incorect}</span>}
                    </label>
                    <label htmlFor="password">Password:
                        <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                        {this.state.errors.password && <span> {this.messages.password_incorect}</span>}
                    </label>


                    <button>Confirm</button>
                </form>
                {this.state.message && <h3>{this.state.message}</h3>}
            </div>
        );
    }
}

export default Register;