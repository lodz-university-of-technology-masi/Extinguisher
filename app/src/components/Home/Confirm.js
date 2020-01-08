import React, { Component } from 'react';
import '../style/Confirm.css'
import { Auth } from 'aws-amplify'

class Confirm extends Component {
    state = {
        email: "",
        code: "",
        message: '',
        errors: {
            email: false,
            code: false,
        }
    }
    messages = {
        username_incorect: 'email does not contain @ ',
        code_incorect: 'Code has to have only 6 signs',
    }
    formValidation = () => {
        let email = false
        let code = false
        let correct = false
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
                    code: false,
                }
            })
            try {

                await Auth.confirmSignUp(this.state.email, this.state.code);
                // console.log(vall)
                alert("User confirmed");
            } catch (e) {
                alert(e.message);
            }
        }
        else {
            this.setState({
                errors: {
                    email: !validation.email,
                    code: !validation.code,
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

            <div className="confirm">
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Email" type="text" id="user" name="email" value={this.state.email} onChange={this.handleChange} />
                    {this.state.errors.email && <span> {this.messages.username_incorect}</span>}
                    <input placeholder="Code" type="code" name="code" id="code" value={this.state.code} onChange={this.handleChange} />
                    {this.state.errors.code && <span> {this.messages.code_incorect}</span>}

                    <button>Confirm</button>
                </form>
                {this.state.message && <h3>{this.state.message}</h3>}

            </div>
        );
    }
}
export default Confirm;