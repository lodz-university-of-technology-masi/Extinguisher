import React, { Component } from 'react';
import '../style/Login.css'
import { Auth } from 'aws-amplify'
class Login extends Component {
    state = {
        username: "",
        password: "",
        message: '',
        errors: {
            username: false,
            password: false,
        }
    }
    messages = {
        username_incorect: 'Name has to be longer than 10 signs and cannot contain space',
        password_incorect: 'Password has to be longer than 8 signs',
    }
    formValidation = () => {
        let username = false
        let password = false
        let correct = false
        if (this.state.username.length > 5 && this.state.username.indexOf(' ') === -1) {
            username = true
        }
        if (this.state.password.length > 8) {
            password = true;
        }
        if (username && password) {
            correct = true
        }
        return ({
            correct, username, password
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
                    username: false,
                    password: false,
                }
            })
            try {

                await Auth.signIn(this.state.username, this.state.password);
                // console.log(vall)
                alert("Logged in");
            } catch (e) {
                alert(e.message);
            }
        }
        else {
            this.setState({
                errors: {
                    username: !validation.username,
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

    render() {
        return (

            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="user">Username:
                           <input type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} />
                        {this.state.errors.username && <span> {this.messages.username_incorect}</span>}
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

export default Login;

